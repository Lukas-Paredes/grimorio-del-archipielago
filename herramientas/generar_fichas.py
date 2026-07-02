#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
generar_fichas.py — Generador de fichas de El Grimorio del Archipiélago.

Herramienta OFFLINE (carpeta herramientas/). Convierte la BASE DE DATOS
(contenido/El_Grimorio_Datos_Estructurados.txt) en fichas HTML estáticas.
UNA sola fuente de verdad -> cero copiado a mano -> cero erratas culturales.

  - El bloque @ENTIDAD se copia VERBATIM (bytes idénticos) al window.FICHA.raw.
  - La prosa rica sale de contenido/prosa/<id>.txt (curada a mano, no del .txt).
  - Solo se generan los ids de herramientas/publicadas.txt.
  - Emite además assets/js/data/indice.js (las 68) y herramientas/pendientes.md.

El sitio publicado NO depende de este script (no es cadena de build); solo
regenera archivos estáticos que después se sirven con python -m http.server.

Uso:
  python herramientas/generar_fichas.py            # genera las publicadas
  python herramientas/generar_fichas.py --solo trauco
  python herramientas/generar_fichas.py --todas    # solo reporte (no escribe HTML)

NO modifica: el .txt de datos, ficha.js, ficha.css. Escribe solo en:
  <id>.html (raíz) · contenido/prosa/ (init si falta) · herramientas/ · assets/js/data/indice.js
"""
import argparse, io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATOS = os.path.join(ROOT, "contenido", "El_Grimorio_Datos_Estructurados.txt")
PROSA_DIR = os.path.join(ROOT, "contenido", "prosa")
IMG_DIR = os.path.join(ROOT, "assets", "img")
PLANTILLA = os.path.join(ROOT, "herramientas", "plantilla_ficha.html")
PUBLICADAS = os.path.join(ROOT, "herramientas", "publicadas.txt")
INDICE = os.path.join(ROOT, "assets", "js", "data", "indice.js")
PENDIENTES = os.path.join(ROOT, "herramientas", "pendientes.md")

SLOTS_IMG = ["hero", "descenso", "cierre", "card"]


def rd(p):
    return io.open(p, encoding="utf-8").read()


def wr(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with io.open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(s)


# ── Extracción VERBATIM de cada bloque @ENTIDAD…@FIN (incluidos ambos marcadores) ──
def split_blocks(text):
    lines = text.split("\n")
    blocks, i, n = [], 0, len(lines)
    while i < n:
        if lines[i].strip() == "@ENTIDAD":
            j = i
            while j < n and lines[j].strip() != "@FIN":
                j += 1
            raw = "\n".join(lines[i:(j + 1 if j < n else j)])
            blocks.append(raw)
            i = j + 1
        else:
            i += 1
    return blocks


# ── Parser 1:1 con parseEntidad() de ficha.js ──────────────────────────────────
IS_FIELD = re.compile(r"^[A-Z_]+:: ")


def parse_entidad(raw):
    lines = raw.split("\n")
    single, repeat = {}, {"VARIANTE": [], "FUENTE": [], "ENLACE": []}
    state = {"key": None, "buf": []}

    def flush():
        if state["key"] is None:
            return
        val = "\n".join(state["buf"]).strip()
        if state["key"] in repeat:
            repeat[state["key"]].append(val)
        else:
            single[state["key"]] = val
        state["key"], state["buf"] = None, []

    for line in lines:
        t = line.strip()
        if t == "@ENTIDAD" or t == "@FIN":
            flush(); continue
        if t[:1] == "#":
            continue
        if IS_FIELD.match(line):
            flush()
            p = line.index(":: ")
            state["key"] = line[:p]
            state["buf"] = [line[p + 3:]]
        elif state["key"] is not None:
            state["buf"].append(line)
    flush()
    return {
        "id": single.get("ID", ""),
        "nombre": single.get("NOMBRE", ""),
        "seccion": single.get("SECCION", ""),
        "reino": single.get("REINO", ""),
        "resumen": single.get("RESUMEN", ""),
        "alt_hero": single.get("ALT_HERO", ""),
        "fuentes": list(repeat["FUENTE"]),
    }


# ── Prosa curada: contenido/prosa/<id>.txt ─────────────────────────────────────
def load_prosa(idc):
    path = os.path.join(PROSA_DIR, idc + ".txt")
    if not os.path.isfile(path):
        return None, None
    secs, cur, buf = {}, None, []
    for line in rd(path).split("\n"):
        if line.startswith("@"):
            if cur is not None:
                secs[cur] = "\n".join(buf).strip()
            cur, buf = line.strip(), []
        else:
            buf.append(line)
    if cur is not None:
        secs[cur] = "\n".join(buf).strip()

    def paras(s):
        return [x.strip() for x in s.split("\n\n") if x.strip()] if s else []

    prosa = {}
    if secs.get("@DESCRIPCION"):
        prosa["descripcion"] = paras(secs["@DESCRIPCION"])
    if secs.get("@INTERPRETACION"):
        prosa["interpretacion"] = " ".join(paras(secs["@INTERPRETACION"]))
    if secs.get("@ORIGEN-MITO"):
        prosa["origenMito"] = paras(secs["@ORIGEN-MITO"])
    cierre = secs.get("@CIERRE", "") or None
    return prosa, cierre


# ── Helpers de render ──────────────────────────────────────────────────────────
def html_escape(s):
    return (s.replace("&", "&amp;").replace('"', "&quot;")
             .replace("<", "&lt;").replace(">", "&gt;"))


def image_set(base):
    return ('image-set(url("../img/%s.webp") type("image/webp"), '
            'url("../img/%s.png") type("image/png"))' % (base, base))


def img_vars(d):
    idc, reino = d["id"], d["reino"]
    lines = []
    has = lambda slot: os.path.isfile(os.path.join(IMG_DIR, "%s-%s.webp" % (idc, slot)))
    if has("fondo"):
        lines.append('    --img-fondo: %s;' % image_set(idc + "-fondo"))
    elif reino and reino != "mar":
        lines.append('    --img-fondo: none;                                  /* sin imagen de mar; solo penumbra */')
    if has("descenso"):
        lines.append('    --img-descenso: %s;' % image_set(idc + "-descenso"))
    if has("cierre"):
        lines.append('    --img-cierre: %s;' % image_set(idc + "-cierre"))
    return "\n".join(lines)


def build_meta(d):
    nombre, resumen, idc = d["nombre"], d.get("resumen", ""), d["id"]
    ld = {"@context": "https://schema.org", "@type": "CreativeWork",
          "name": nombre, "inLanguage": "es-CL", "description": resumen,
          "isPartOf": {"@type": "WebSite", "name": "El Grimorio del Archipiélago"}}
    if d.get("fuentes"):
        ld["citation"] = d["fuentes"]
    lines = [
        '<meta name="description" content="%s">' % html_escape(resumen),
        '<meta name="theme-color" content="#02060c">',
        '<link rel="canonical" href="%s.html">' % idc,
        '<meta property="og:type" content="article">',
        '<meta property="og:title" content="%s">' % html_escape(nombre),
        '<meta property="og:description" content="%s">' % html_escape(resumen),
        '<meta property="og:image" content="assets/img/%s-hero.webp">' % idc,
        '<meta property="og:locale" content="es_CL">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<script type="application/ld+json">',
        json.dumps(ld, ensure_ascii=False, indent=2),
        '</script>',
    ]
    return "\n".join(lines)


def generar_html(d, raw, plantilla, publicadas):
    idc = d["id"]
    prosa, cierre = load_prosa(idc)
    if prosa is None:
        raise RuntimeError("falta prosa curada: contenido/prosa/%s.txt" % idc)
    if "`" in raw or "${" in raw or "\\" in raw:
        raise RuntimeError("el bloque @ENTIDAD de %s contiene ` , ${ o \\ (rompería el template literal)" % idc)
    alt = d["alt_hero"] or d.get("resumen", "")
    prosa_json = json.dumps(prosa, ensure_ascii=False, indent=2).replace("\n", "\n    ")
    repl = {
        "{{TITLE}}": "%s · El Grimorio del Archipiélago" % d["nombre"],
        "{{META}}": build_meta(d),
        "{{IMG_VARS}}": img_vars(d),
        "{{FICHA_RAW}}": raw,
        "{{PROSA_JSON}}": prosa_json,
        "{{CIERRE}}": json.dumps(cierre or "", ensure_ascii=False),
        "{{PUBLICADAS}}": json.dumps(publicadas, ensure_ascii=False),
        "{{HERO_IMG}}": "assets/img/%s-hero" % idc,
        "{{HERO_ALT}}": html_escape(alt),
        "{{BODY_ID}}": idc,
    }
    out = plantilla
    for k, v in repl.items():
        out = out.replace(k, v)
    return out


# ── indice.js (las 68, verbatim id/nombre/seccion) ─────────────────────────────
def emit_indice(entidades):
    items = ",\n".join(
        '  { "id": %s, "nombre": %s, "seccion": %s }'
        % (json.dumps(e["id"], ensure_ascii=False),
           json.dumps(e["nombre"], ensure_ascii=False),
           json.dumps(e["seccion"], ensure_ascii=False))
        for e in entidades)
    body = ("/* indice.js — GENERADO por herramientas/generar_fichas.py.\n"
            "   Índice mínimo de las %d entidades (id/nombre/seccion VERBATIM del\n"
            "   .txt) para poblar la carta de navegación (F3/F4). No editar a mano. */\n"
            "window.Grimorio = window.Grimorio || {};\n"
            "window.Grimorio.indice = [\n%s\n];\n") % (len(entidades), items)
    wr(INDICE, body)


# ── pendientes.md (backlog de imágenes / prosa / publicado) ────────────────────
def emit_pendientes(entidades, publicadas):
    def mark(b):
        return "sí" if b else "—"
    rows = []
    for e in entidades:
        idc = e["id"]
        imgs = " ".join("%s:%s" % (s, "sí" if os.path.isfile(os.path.join(IMG_DIR, "%s-%s.webp" % (idc, s))) else "—")
                        for s in SLOTS_IMG)
        prosa_ok = os.path.isfile(os.path.join(PROSA_DIR, idc + ".txt"))
        rows.append("| %s | %s | %s | %s | %s |"
                    % (idc, e["seccion"], imgs, mark(prosa_ok), mark(idc in publicadas)))
    md = ["# Pendientes — backlog de El Grimorio del Archipiélago",
          "",
          "_Generado por `herramientas/generar_fichas.py`. Es la lista de trabajo:",
          "qué imágenes faltan por criatura, si hay prosa curada y si está publicada._",
          "",
          "Slots de imagen: `hero` (16:9) · `descenso` (9:16) · `cierre` (16:9) · `card` (1:1).",
          "",
          "| id | sección | imágenes (`<id>-<slot>`) | prosa | publicada |",
          "|---|---|---|---|---|"]
    md.extend(rows)
    total = len(entidades)
    pub = sum(1 for e in entidades if e["id"] in publicadas)
    conpr = sum(1 for e in entidades if os.path.isfile(os.path.join(PROSA_DIR, e["id"] + ".txt")))
    conhero = sum(1 for e in entidades if os.path.isfile(os.path.join(IMG_DIR, "%s-hero.webp" % e["id"])))
    md += ["", "## Resumen",
           "- Entidades: **%d**" % total,
           "- Publicadas: **%d**" % pub,
           "- Con prosa curada: **%d**" % conpr,
           "- Con hero: **%d**" % conhero,
           "",
           "## Pendiente de UI (registrado desde F0)",
           "- Botón visible «marea» (pausa de movimiento) en las fichas → **F4** (toca `ficha.css`).",
           ""]
    wr(PENDIENTES, "\n".join(md) + "\n")


def read_publicadas():
    if not os.path.isfile(PUBLICADAS):
        return []
    out = []
    for line in rd(PUBLICADAS).split("\n"):
        s = line.strip()
        if s and not s.startswith("#"):
            out.append(s)
    return out


def main():
    ap = argparse.ArgumentParser(description="Generador de fichas del Grimorio (offline).")
    ap.add_argument("--solo", metavar="ID", help="generar solo esta criatura.")
    ap.add_argument("--todas", action="store_true", help="solo reporte (no escribe HTML).")
    args = ap.parse_args()

    if not os.path.isfile(DATOS):
        sys.exit("No existe la base de datos: " + DATOS)
    text = rd(DATOS)
    raws = split_blocks(text)
    entidades = []
    raw_by_id = {}
    for raw in raws:
        d = parse_entidad(raw)
        if not d["id"]:
            continue
        entidades.append(d)
        raw_by_id[d["id"]] = raw
    ids = [e["id"] for e in entidades]
    dup = set(x for x in ids if ids.count(x) > 1)
    if dup:
        print("AVISO: ids duplicados en el .txt: " + ", ".join(sorted(dup)))
    print("Entidades parseadas: %d" % len(entidades))

    publicadas = read_publicadas()
    print("Publicadas (publicadas.txt): %s" % (", ".join(publicadas) or "(ninguna)"))

    # Reportes (siempre)
    emit_indice(entidades)
    emit_pendientes(entidades, set(publicadas))
    print("Escrito: %s" % os.path.relpath(INDICE, ROOT))
    print("Escrito: %s" % os.path.relpath(PENDIENTES, ROOT))

    if args.todas:
        print("\n--todas: reporte solamente, no se generó HTML.")
        return

    objetivo = [args.solo] if args.solo else publicadas
    plantilla = rd(PLANTILLA)
    hechas = []
    for idc in objetivo:
        if idc not in raw_by_id:
            print("  SALTO %s: no está en el .txt." % idc); continue
        d = next(e for e in entidades if e["id"] == idc)
        try:
            html = generar_html(d, raw_by_id[idc], plantilla, publicadas)
        except RuntimeError as e:
            print("  SALTO %s: %s" % (idc, e)); continue
        out = os.path.join(ROOT, idc + ".html")
        wr(out, html)
        hechas.append(idc)
        print("  Generada: %s.html" % idc)
    print("\nFichas generadas: %d (%s)" % (len(hechas), ", ".join(hechas) or "ninguna"))


if __name__ == "__main__":
    main()
