# -*- coding: utf-8 -*-
"""
audio_pipeline.py — Prepara la música de fondo del camino (herramienta OFFLINE).

Toma los MP3 crudos de _entrada-audio/<cap>.mp3 y produce, por pista, la versión
final del sitio en assets/audio/musica-<cap>.ogg + .mp3:
  · loudness normalizado a ~-18 LUFS (loudnorm de dos pasadas) → volumen parejo
    entre pistas;
  · recorte de silencios de cabeza y cola;
  · LOOP SIN COSTURA por auto-crossfade cola→cabeza (acrossfade), sin "hipo";
  · pistas muy largas capadas a MAXLOOP s (memoria/peso en móvil);
  · export OGG (libvorbis q5) + MP3 (libmp3lame q5) de respaldo (Safari/iOS).

El sitio NO depende de este script: los .ogg/.mp3 finales ya versionados bastan.
ffmpeg se pasa por --ffmpeg (binario estático; no se instala en el sistema).
"""
import argparse, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENTRADA = os.path.join(ROOT, "_entrada-audio")
SALIDA = os.path.join(ROOT, "assets", "audio")
PISTAS = ["main", "caleuche", "pincoya", "trauco", "invunche", "camahueto"]
LUFS = -18.0
MAXLOOP = 120.0     # tope de loop (s): acota memoria decodificada y peso

def run(ff, args):
    return subprocess.run([ff, "-hide_banner", "-y"] + args, capture_output=True, text=True)

def dur(ff, path):
    r = subprocess.run([ff, "-hide_banner", "-i", path], capture_output=True, text=True)
    m = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", r.stderr)
    return int(m.group(1))*3600 + int(m.group(2))*60 + float(m.group(3)) if m else -1.0

def medir_loudness(ff, path, cap=None):
    """Pasada 1 de loudnorm: devuelve dict con measured_* (para pasada 2)."""
    af = (("atrim=0:%.3f," % cap) if cap else "") + \
         "loudnorm=I=%.1f:TP=-1.5:LRA=11:print_format=json" % LUFS
    r = run(ff, ["-i", path, "-af", af, "-f", "null", "-"])
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S)
    if not m:
        raise SystemExit("no se pudo medir loudness de " + path + "\n" + r.stderr[-800:])
    return json.loads(m.group(0))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ffmpeg", required=True)
    args = ap.parse_args()
    ff = args.ffmpeg
    os.makedirs(SALIDA, exist_ok=True)
    tmp = os.path.join(SALIDA, "_tmp")
    os.makedirs(tmp, exist_ok=True)

    rep = []
    for cap_name in PISTAS:
        src = os.path.join(ENTRADA, cap_name + ".mp3")
        if not os.path.isfile(src):
            rep.append((cap_name, "FALTA EL CRUDO", None)); continue
        d0 = dur(ff, src)
        capado = d0 > MAXLOOP
        d_eff = min(d0, MAXLOOP)
        cf = min(2.0, d_eff * 0.2)

        # 1) medir loudness (con cap si aplica)
        M = medir_loudness(ff, src, cap=MAXLOOP if capado else None)

        # 2) normalizar (loudnorm linear con lo medido) + recortar silencios
        norm = os.path.join(tmp, cap_name + "-norm.wav")
        pre = ("atrim=0:%.3f," % MAXLOOP) if capado else ""
        ln = ("loudnorm=I=%.1f:TP=-1.5:LRA=11:measured_I=%s:measured_TP=%s:"
              "measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true" %
              (LUFS, M["input_i"], M["input_tp"], M["input_lra"],
               M["input_thresh"], M["target_offset"]))
        trim = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
                "areverse,"
                "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
                "areverse")
        r = run(ff, ["-i", src, "-af", pre + ln + "," + trim, "-ar", "44100", norm])
        if not os.path.isfile(norm):
            raise SystemExit("fallo normalizando %s\n%s" % (cap_name, r.stderr[-800:]))

        # 3) loop sin costura: auto-crossfade cola→cabeza. La entrada se decodifica
        #    DOS veces (-i norm -i norm): con asplit las ramas (2s vs L-2s) hacen
        #    deadlock y acrossfade sale vacío. Cola de la copia 0 ⨯ cabeza de la 1.
        loop = os.path.join(tmp, cap_name + "-loop.wav")
        fc = ("[0:a]atrim=start=%.3f,asetpts=PTS-STARTPTS[b];"
              "[1:a]atrim=0:%.3f,asetpts=PTS-STARTPTS[a];"
              "[b][a]acrossfade=d=%.3f:c1=tri:c2=tri[o]") % (cf, cf, cf)
        r = run(ff, ["-i", norm, "-i", norm, "-filter_complex", fc, "-map", "[o]", "-ar", "44100", loop])
        d_loop = dur(ff, loop)
        if not os.path.isfile(loop) or d_loop < 5:
            raise SystemExit("fallo en loop %s (dur=%.2f)\n%s" % (cap_name, d_loop, r.stderr[-1000:]))

        # 4) export OGG + MP3
        ogg = os.path.join(SALIDA, "musica-%s.ogg" % cap_name)
        mp3 = os.path.join(SALIDA, "musica-%s.mp3" % cap_name)
        run(ff, ["-i", loop, "-c:a", "libvorbis", "-qscale:a", "5", ogg])
        run(ff, ["-i", loop, "-c:a", "libmp3lame", "-qscale:a", "5", mp3])

        # 5) verificar loudness final (sobre el ogg)
        MF = medir_loudness(ff, ogg)
        rep.append((cap_name, "ok", {
            "dur_orig": d0, "capado": capado, "cf": cf, "dur_loop": d_loop,
            "in_lufs": float(M["input_i"]), "out_lufs": float(MF["input_i"]),
            "kb_ogg": os.path.getsize(ogg)/1024.0, "kb_mp3": os.path.getsize(mp3)/1024.0,
        }))
        print("  %-11s listo" % cap_name)

    # limpiar temporales
    for f in os.listdir(tmp):
        try: os.remove(os.path.join(tmp, f))
        except OSError: pass
    try: os.rmdir(tmp)
    except OSError: pass

    print("\n=== REPORTE ===")
    print("%-11s %8s %7s %7s %8s %8s %9s %9s" %
          ("pista", "orig(s)", "loop(s)", "cf(s)", "in LUFS", "out LUFS", "ogg KB", "mp3 KB"))
    tot_ogg = tot_mp3 = 0.0
    for name, st, d in rep:
        if st != "ok":
            print("%-11s %s" % (name, st)); continue
        cap = " (CAPADO)" if d["capado"] else ""
        print("%-11s %8.1f %7.1f %7.2f %8.1f %8.1f %9.1f %9.1f%s" %
              (name, d["dur_orig"], d["dur_loop"], d["cf"], d["in_lufs"],
               d["out_lufs"], d["kb_ogg"], d["kb_mp3"], cap))
        tot_ogg += d["kb_ogg"]; tot_mp3 += d["kb_mp3"]
    print("%-11s %54s %9.1f %9.1f" % ("TOTAL", "", tot_ogg, tot_mp3))
    print("total agregado al repo (ogg+mp3): %.2f MB" % ((tot_ogg + tot_mp3) / 1024.0))

if __name__ == "__main__":
    main()
