# -*- coding: utf-8 -*-
"""
validar_fuentes.py — Chequeos del sistema de fuentes (mandato 2026-07-13, fase 3).

Valida fuentes/bibliografia/fuentes.yaml contra la realidad del repo.
SOLO AVISA — jamás modifica nada. Sale con código != 0 si hay problemas
(los avisos ⚠ no cambian el código de salida; los errores ✗ sí).

Chequeos:
  ✗ ids duplicados o mal formados (no kebab-case)
  ✗ vocabularios fuera de los controlados (tipo / acceso / estado)
  ✗ archivo_local que NO existe en el disco
  ✗ estado `archivada` sin ningún archivo_local
  ✗ entrada de `respalda` sin tema o sin página
  ✗ alias_corpus que NO corresponde a ninguna línea FUENTE:: real del corpus
  ✗ línea FUENTE:: del corpus SIN entrada en el índice (cobertura inversa)
  ⚠ url ausente en fuentes de acceso abierta/localizable (aviso)
  ⚠ archivada con pdf pero sin txt de verificación (aviso)

Uso:  python herramientas/validar_fuentes.py
"""
import os
import re
import sys

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YAML_PATH = os.path.join(ROOT, "fuentes", "bibliografia", "fuentes.yaml")
CORPUS = os.path.join(ROOT, "contenido", "El_Grimorio_Datos_Estructurados.txt")

TIPOS = {"primaria", "academica", "institucional", "terciaria", "prensa",
         "oral", "corpus-interno", "geodatos", "referencia-interna"}
ACCESOS = {"abierta", "localizable", "de-pago", "perdida", "no-aplica"}
ESTADOS = {"archivada", "localizable", "por-conseguir", "perdida",
           "no-verificada", "atribucion-oral", "referencia"}


def main():
    errores, avisos = [], []

    with open(YAML_PATH, encoding="utf-8") as f:
        fuentes = yaml.safe_load(f)["fuentes"]

    with open(CORPUS, encoding="utf-8") as f:
        corpus_fuentes = set(m.strip() for m in
                             re.findall(r"^FUENTE:: (.+)$", f.read(), re.M))

    vistos = set()
    alias_todos = set()
    for fu in fuentes:
        fid = fu.get("id", "¿sin id?")
        pre = "[%s] " % fid
        if fid in vistos:
            errores.append(pre + "id DUPLICADO")
        vistos.add(fid)
        if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", fid):
            errores.append(pre + "id no es kebab-case")
        if fu.get("tipo") not in TIPOS:
            errores.append(pre + "tipo fuera de vocabulario: %r" % fu.get("tipo"))
        if fu.get("acceso") not in ACCESOS:
            errores.append(pre + "acceso fuera de vocabulario: %r" % fu.get("acceso"))
        if fu.get("estado") not in ESTADOS:
            errores.append(pre + "estado fuera de vocabulario: %r" % fu.get("estado"))

        archivos = fu.get("archivo_local") or []
        for ruta in archivos:
            if not os.path.isfile(os.path.join(ROOT, ruta.replace("/", os.sep))):
                errores.append(pre + "archivo_local NO existe: %s" % ruta)
        if fu.get("estado") == "archivada" and not archivos:
            errores.append(pre + "estado archivada pero archivo_local vacío")
        if fu.get("estado") == "archivada":
            tiene_pdf = any(r.endswith(".pdf") for r in archivos)
            tiene_txt = any(r.endswith((".txt", ".md", ".json", ".py")) for r in archivos)
            if tiene_pdf and not tiene_txt:
                avisos.append(pre + "pdf sin txt de verificación al lado")

        for r in (fu.get("respalda") or []):
            if not r.get("tema"):
                errores.append(pre + "entrada de respalda sin tema")
            if not (r.get("pagina") or "").strip():
                errores.append(pre + "respalda «%s» sin página/detalle" % r.get("tema"))

        for a in (fu.get("alias_corpus") or []):
            alias_todos.add(a)
            if a not in corpus_fuentes:
                errores.append(pre + "alias_corpus no existe como FUENTE:: en el corpus: «%s»" % a)

        if fu.get("acceso") in ("abierta",) and not fu.get("url") \
                and fu.get("estado") not in ("archivada", "atribucion-oral"):
            avisos.append(pre + "acceso abierta sin url")

    sin_indice = sorted(corpus_fuentes - alias_todos)
    for s in sin_indice:
        errores.append("[corpus] FUENTE:: sin entrada en el índice: «%s»" % s)

    print("Fuentes validadas: %d | líneas FUENTE:: únicas del corpus: %d"
          % (len(fuentes), len(corpus_fuentes)))
    if errores:
        print("\n✗ ERRORES (%d):" % len(errores))
        for e in errores:
            print("  ✗ " + e)
    if avisos:
        print("\n⚠ AVISOS (%d):" % len(avisos))
        for a in avisos:
            print("  ⚠ " + a)
    if not errores and not avisos:
        print("Todo limpio: índice coherente con el disco y el corpus.")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
