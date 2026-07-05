#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
verificar_prosa.py — Guardarraíl VERBATIM de la prosa curada.

Herramienta OFFLINE (carpeta herramientas/). Comprueba que cada párrafo de
contenido/prosa/<id>.txt exista literalmente (módulo espacios/saltos de línea)
en contenido/El_Grimorio_del_Archipielago_DEFINITIVO.txt.

Reglas de la comprobación:
  · El DEFINITIVO viene con corte duro de línea (~78 col): se normaliza todo
    espacio en blanco a un espacio simple antes de comparar.
  · Los marcadores de forma de la prosa («» de cita, "» ", "— fuente",
    "| lado → lado") se desarman: cada lado se verifica por separado.
  · Los lados de regla se comparan case-insensitive (el DEFINITIVO tipografía
    los resultados en VERSALES; convertirlos a redonda es práctica aprobada,
    igual que los numerales de Libro en capitulos.js).
  · El @CIERRE es curatorial (práctica aprobada: Caleuche, Trauco) y NO se
    verifica contra el DEFINITIVO; se lista aparte para revisión humana.

Uso:
  python herramientas/verificar_prosa.py pincoya [invunche camahueto ...]
  python herramientas/verificar_prosa.py --todas   # todas las de contenido/prosa/
"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFINITIVO = os.path.join(ROOT, "contenido", "El_Grimorio_del_Archipielago_DEFINITIVO.txt")
PROSA_DIR = os.path.join(ROOT, "contenido", "prosa")


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def segmentos(parrafo):
    """Devuelve [(texto, case_sensitive), ...] a verificar de un párrafo."""
    out = []
    if parrafo.startswith("» "):
        for linea in parrafo.split("\n"):
            if linea.startswith("— "):
                continue          # la atribución se revisa a ojo (nombre+fuente)
            out.append((norm(linea.lstrip("» ").strip("«»")), True))
    elif parrafo.startswith("| "):
        for linea in parrafo.split("\n"):
            for lado in linea.lstrip("| ").split(" → "):
                out.append((norm(lado), False))
    else:
        out.append((norm(parrafo), True))
    return out


def verificar(idc, texto_def, texto_def_lower):
    path = os.path.join(PROSA_DIR, idc + ".txt")
    if not os.path.isfile(path):
        print("%s: NO EXISTE %s" % (idc, os.path.relpath(path, ROOT)))
        return False
    cuerpo = io.open(path, encoding="utf-8").read()
    ok = True
    seccion = None
    for bloque in cuerpo.split("\n"):
        if bloque.startswith("@"):
            seccion = bloque.strip()
    # separar secciones
    secs, cur, buf = {}, None, []
    for line in cuerpo.split("\n"):
        if line.startswith("@"):
            if cur: secs[cur] = "\n".join(buf).strip()
            cur, buf = line.strip(), []
        else:
            buf.append(line)
    if cur: secs[cur] = "\n".join(buf).strip()

    for sec, contenido in secs.items():
        if not contenido:
            continue
        if sec == "@CIERRE":
            print("  [%s] CURATORIAL (revisión humana): %s" % (sec, contenido))
            continue
        for parrafo in [p for p in contenido.split("\n\n") if p.strip()]:
            for seg, cs in segmentos(parrafo):
                if not seg:
                    continue
                hallado = (seg in texto_def) if cs else (seg.lower() in texto_def_lower)
                marca = "OK " if hallado else "FALLA"
                if not hallado:
                    ok = False
                print("  [%s] %s · %s%s" % (sec, marca, seg[:72], "…" if len(seg) > 72 else ""))
    return ok


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit("Uso: verificar_prosa.py <id> [<id>...] | --todas")
    texto_def = norm(io.open(DEFINITIVO, encoding="utf-8").read())
    texto_def_lower = texto_def.lower()
    if args == ["--todas"]:
        args = sorted(f[:-4] for f in os.listdir(PROSA_DIR) if f.endswith(".txt"))
    fallo = False
    for idc in args:
        print("== %s ==" % idc)
        if not verificar(idc, texto_def, texto_def_lower):
            fallo = True
    sys.exit(1 if fallo else 0)


if __name__ == "__main__":
    main()
