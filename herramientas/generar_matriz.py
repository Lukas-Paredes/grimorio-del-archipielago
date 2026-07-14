# -*- coding: utf-8 -*-
"""
generar_matriz.py — Salidas automáticas del sistema de fuentes (mandato 2026-07-13).

Lee fuentes/bibliografia/fuentes.yaml (el índice estructurado, editado A MANO)
y EMITE — jamás modifica el índice ni el corpus:

  · fuentes/bibliografia/MATRIZ-CITAS.md            (cruce tema × fuente, CALCULADO)
  · fuentes/bibliografia/BIBLIOGRAFIA.md            (bibliografía formateada APA)
  · fuentes/bibliografia/REPORTE-FUENTES.md         (stats + huecos + prioridades)

CRITERIO DEL SEMÁFORO (documentado, decisión 2026-07-13):
  El semáforo BASE cuenta solo fuentes con estado `archivada` (verificables
  en el repo — coherente con la matriz manual y la regla sagrada):
      ✅ = 2+ archivadas · ⚠️ = 1 · ❌ = 0
  Las fuentes `localizable`/`por-conseguir` que respaldan el tema se listan
  aparte como PENDIENTES y, si al conseguirse subirían el nivel, el símbolo
  lleva asterisco (⚠️* / ❌*): «respaldo que existe pero aún no tengo».
  `perdida`/`no-verificada` se listan pero nunca suman.

Desde 2026-07-13 la matriz GENERADA es la oficial (MATRIZ-CITAS.md); la
manual histórica quedó archivada como MATRIZ-CITAS-manual-respaldo.md.

Uso:  python herramientas/generar_matriz.py
"""
import collections
import os
import re

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YAML_PATH = os.path.join(ROOT, "fuentes", "bibliografia", "fuentes.yaml")
CORPUS = os.path.join(ROOT, "contenido", "El_Grimorio_Datos_Estructurados.txt")
DIR_OUT = os.path.join(ROOT, "fuentes", "bibliografia")
OUT_MATRIZ = os.path.join(DIR_OUT, "MATRIZ-CITAS.md")
OUT_BIBLIO = os.path.join(DIR_OUT, "BIBLIOGRAFIA.md")
OUT_REPORTE = os.path.join(DIR_OUT, "REPORTE-FUENTES.md")

CUENTAN = {"archivada"}                       # verificables en repo
PENDIENTES = {"localizable", "por-conseguir"}  # existen, faltan conseguir
ORDEN_TIPOS = ["primaria", "prensa", "academica", "institucional",
               "terciaria", "oral", "geodatos", "corpus-interno",
               "referencia-interna"]
NOMBRE_TIPO = {
    "primaria": "Fuentes primarias", "prensa": "Prensa de época",
    "academica": "Literatura académica", "institucional": "Institucionales",
    "terciaria": "Terciarias (punteros)", "oral": "Atribuciones orales",
    "geodatos": "Datos geográficos", "corpus-interno": "Corpus interno",
    "referencia-interna": "Referencia interna",
}


def cargar():
    with open(YAML_PATH, encoding="utf-8") as f:
        return yaml.safe_load(f)["fuentes"]


def menciones_corpus(fuentes):
    """Cuántas líneas FUENTE:: del corpus apuntan a cada entrada (vía alias)."""
    with open(CORPUS, encoding="utf-8") as f:
        lineas = [m.strip() for m in re.findall(r"^FUENTE:: (.+)$", f.read(), re.M)]
    conteo = collections.Counter(lineas)
    return {f["id"]: sum(conteo.get(a, 0) for a in (f.get("alias_corpus") or []))
            for f in fuentes}


def wr(ruta, texto):
    with open(ruta, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)
    print("Escrito: %s" % os.path.relpath(ruta, ROOT))


def apa(f):
    autor = f.get("autor") or "[s. a.]"
    anio = f.get("anio")
    anio_s = " (%s)." % anio if anio else " (s. f.)."
    partes = [autor + anio_s, " *%s*." % f["titulo"]]
    if f.get("publicacion"):
        partes.append(" %s." % f["publicacion"])
    if f.get("url"):
        partes.append(" <%s>" % f["url"])
    return "".join(partes)


ETIQUETA_ESTADO = {
    "archivada": "**[EN REPO]**", "localizable": "[localizable]",
    "por-conseguir": "[por conseguir]", "perdida": "[PERDIDA]",
    "no-verificada": "[no verificada]", "atribucion-oral": "[atribución oral]",
    "referencia": "[referencia]",
}


def emitir_matriz(fuentes):
    temas = collections.defaultdict(lambda: {"repo": [], "pend": [], "otras": []})
    for f in fuentes:
        for r in (f.get("respalda") or []):
            cel = "%s (%s)" % (f["id"], r.get("pagina", "—"))
            if f["estado"] in CUENTAN:
                temas[r["tema"]]["repo"].append(cel)
            elif f["estado"] in PENDIENTES:
                temas[r["tema"]]["pend"].append(cel)
            else:
                temas[r["tema"]]["otras"].append(cel + " [%s]" % f["estado"])
    filas = []
    stats = collections.Counter()
    for tema in sorted(temas):
        t = temas[tema]
        n, np = len(t["repo"]), len(t["pend"])
        s = "✅" if n >= 2 else ("⚠️" if n == 1 else "❌")
        if s != "✅" and (n + np) >= (2 if s == "⚠️" else 1):
            s += "*"       # subiría de nivel al conseguir las pendientes
        stats[s.rstrip("*")] += 1
        celdas = t["repo"] + (["*pend:* " + " · ".join(t["pend"])] if t["pend"] else []) \
                           + (["*otras:* " + " · ".join(t["otras"])] if t["otras"] else [])
        filas.append("| **%s** | %s | %s |" % (tema, " · ".join(celdas), s))
    md = [
        "# MATRIZ DE CITAS — GENERADA",
        "",
        "_GENERADA por `herramientas/generar_matriz.py` desde `fuentes.yaml`.",
        "NO editar a mano: se edita el índice y se regenera._",
        "",
        "**Criterio:** el semáforo cuenta SOLO fuentes `archivada` (verificables",
        "en repo): ✅ 2+ · ⚠️ 1 · ❌ 0. El asterisco (⚠️*/❌*) marca temas que",
        "SUBIRÍAN de nivel al conseguir sus fuentes pendientes (localizable /",
        "por-conseguir). `perdida`/`no-verificada` se listan y nunca suman.",
        "",
        "| Tema | Fuentes (en repo primero, con página) | Estado |",
        "|---|---|---|",
    ] + filas + [
        "",
        "**Totales:** ✅ %d · ⚠️ %d · ❌ %d (de %d temas)."
        % (stats["✅"], stats["⚠️"], stats["❌"], len(temas)),
        "",
    ]
    wr(OUT_MATRIZ, "\n".join(md))
    return temas, stats


def emitir_biblio(fuentes):
    md = ["# BIBLIOGRAFÍA — El Grimorio del Archipiélago",
          "",
          "_GENERADA por `herramientas/generar_matriz.py` desde `fuentes.yaml`._",
          "_Formato APA aproximado; la etiqueta final indica su estado en el archivo._",
          ""]
    for tipo in ORDEN_TIPOS:
        grupo = [f for f in fuentes if f["tipo"] == tipo]
        if not grupo:
            continue
        md.append("## %s" % NOMBRE_TIPO.get(tipo, tipo))
        md.append("")
        for f in sorted(grupo, key=lambda x: (x.get("autor") or "zz").lower()):
            md.append("- %s %s" % (apa(f), ETIQUETA_ESTADO.get(f["estado"], "")))
        md.append("")
    wr(OUT_BIBLIO, "\n".join(md))


def emitir_reporte(fuentes, temas, stats, menciones):
    por_estado = collections.Counter(f["estado"] for f in fuentes)
    por_tipo = collections.Counter(f["tipo"] for f in fuentes)
    md = ["# REPORTE DE FUENTES — huecos, stats y prioridades",
          "",
          "_GENERADO por `herramientas/generar_matriz.py` desde `fuentes.yaml`._",
          "",
          "## Stats",
          "",
          "- Fuentes en el índice: **%d**" % len(fuentes),
          "- Por estado: " + " · ".join("%s **%d**" % (k, v) for k, v in por_estado.most_common()),
          "- Por tipo: " + " · ".join("%s **%d**" % (k, v) for k, v in por_tipo.most_common()),
          "- Temas cruzados: **%d** → ✅ %d · ⚠️ %d · ❌ %d"
          % (len(temas), stats["✅"], stats["⚠️"], stats["❌"]),
          "",
          "## Huecos (temas sin respaldo pleno en repo)",
          ""]
    for tema in sorted(temas):
        t = temas[tema]
        if len(t["repo"]) >= 2:
            continue
        md.append("- **%s** — en repo: %d · pendientes: %s · otras: %s"
                  % (tema, len(t["repo"]),
                     " · ".join(t["pend"]) or "—",
                     " · ".join(t["otras"]) or "—"))
    md += ["",
           "## Prioridad de adquisición (pendientes, por peso en el proyecto)",
           "",
           "_Orden: menciones FUENTE:: en el corpus + temas que respaldarían._",
           "",
           "| Fuente | Menciones en corpus | Temas que respaldaría | Acceso |",
           "|---|---|---|---|"]
    pend = [f for f in fuentes if f["estado"] in PENDIENTES]
    pend.sort(key=lambda f: (menciones.get(f["id"], 0)
                             + len(f.get("respalda") or [])), reverse=True)
    for f in pend:
        md.append("| **%s** — %s | %d | %d | %s |"
                  % (f["id"], (f.get("titulo") or "")[:60],
                     menciones.get(f["id"], 0),
                     len(f.get("respalda") or []), f.get("acceso", "—")))
    perdidas = [f for f in fuentes if f["estado"] in ("perdida", "no-verificada")]
    if perdidas:
        md += ["", "## Perdidas / no verificadas (no suman jamás)", ""]
        for f in perdidas:
            md.append("- **%s** — %s [%s]" % (f["id"], f["titulo"], f["estado"]))
    cosecha = [f for f in fuentes if f["estado"] in CUENTAN
               and not (f.get("respalda") or [])
               and f["tipo"] not in ("corpus-interno", "geodatos")]
    if cosecha:
        md += ["", "## Archivadas sin respaldo asignado (cosecha pendiente)", ""]
        for f in cosecha:
            md.append("- **%s** — %s" % (f["id"], f["titulo"]))
    md.append("")
    wr(OUT_REPORTE, "\n".join(md))


def main():
    fuentes = cargar()
    ids = [f["id"] for f in fuentes]
    if len(ids) != len(set(ids)):
        raise SystemExit("IDs duplicados en fuentes.yaml: %s"
                         % [i for i, c in collections.Counter(ids).items() if c > 1])
    menciones = menciones_corpus(fuentes)
    temas, stats = emitir_matriz(fuentes)
    emitir_biblio(fuentes)
    emitir_reporte(fuentes, temas, stats, menciones)
    print("Fuentes: %d | Temas: %d | ✅ %d · ⚠️ %d · ❌ %d"
          % (len(fuentes), len(temas), stats["✅"], stats["⚠️"], stats["❌"]))


if __name__ == "__main__":
    main()
