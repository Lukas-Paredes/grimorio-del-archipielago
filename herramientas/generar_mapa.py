# -*- coding: utf-8 -*-
"""
generar_mapa.py — Mapa del archipiélago (mandato 2026-07-13).

Lee la geometría REAL de la provincia de Chiloé (assets/data/chiloe-geo.json,
subconjunto verbatim del GeoJSON DPA/SUBDERE vía caracena/chile-geojson) y
emite assets/js/data/mapa-datos.js: paths SVG proyectados + los puntos
VERIFICADOS de fuentes/investigacion/geografia-cosmologia.md con coordenadas
reales (OpenStreetMap/Nominatim, consultadas 2026-07-13).

REGLA SAGRADA aplicada a la forma: la silueta SALE del GeoJSON oficial.
La simplificación (Douglas-Peucker) solo reduce vértices dentro de una
tolerancia sub-píxel visual; no se dibuja ni se inventa costa. Se descartan
únicamente anillos con área proyectada menor a MIN_AREA px² (motas
invisibles a este tamaño), jamás islas con nombre en el relato.

Herramienta OFFLINE (no es build): el sitio carga el .js generado.
Uso:  python herramientas/generar_mapa.py
"""
import json
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEO = os.path.join(ROOT, "assets", "data", "chiloe-geo.json")
SALIDA = os.path.join(ROOT, "assets", "js", "data", "mapa-datos.js")
PREVIEW = os.path.join(ROOT, "assets", "data", "mapa-preview.svg")

ANCHO = 640.0          # px del viewBox (alto sale de la proporción real)
TOL = 0.7              # tolerancia Douglas-Peucker, px proyectados
MIN_AREA = 6.0         # px² proyectados: bajo esto es una mota, no una isla

# Puntos VERIFICADOS (fuentes/investigacion/geografia-cosmologia.md).
# lat/lon: OpenStreetMap/Nominatim (2026-07-13). clave/rol: corpus del
# Grimorio (@SIETE-REPUBLICAS l.1296, @CUEVA-QUICAVI, @TENAUN, dossier 1880).
# `relato`: micro-relato VERBATIM del corpus (los GANCHO:: de cada @ENTIDAD);
# main() lo verifica como substring EXACTO del corpus y aborta si no lo es.
GANCHO_7REP = ("Para operar en secreto, dividieron el archipiélago en siete "
               "distritos con nombres en clave de ciudades lejanas: Lima, "
               "España, Salamanca...")
FUENTE_7REP = "Corpus del Grimorio — @SIETE-REPUBLICAS (gancho, verbatim)"
PUNTOS = [
    {"id": "quicavi", "nombre": "Quicaví", "clave": "«Lima»",
     "rol": "Capital de la Recta Provincia, sede del Rey. En su costa, la Cueva de los Brujos — la Casa Grande, guardada por el Invunche.",
     "relato": "La capital de la Recta Provincia. Una cueva oculta en la costa de Quemchi, con letras grabadas que nadie ha podido leer, y el Invunche en la boca.",
     "relatoFuente": "Corpus del Grimorio — @CUEVA-QUICAVI (gancho, verbatim)",
     "fuente": "Corpus del Grimorio (siete repúblicas · cueva) · Ampuero 2016",
     "href": "cueva-quicavi.html", "lat": -42.2721, "lon": -73.3519},
    {"id": "tenaun", "nombre": "Tenaún", "clave": "«Santiago»",
     "rol": "Origen legendario de la Recta Provincia: aquí, hacia 1786, la Chilpilla dejó en seco el barco de Moraleda y recibió el Libro de Arte.",
     "relato": "El pueblo de la iglesia de estrellas azules, donde la bruja Chilpilla dejó en seco el barco del explorador Moraleda.",
     "relatoFuente": "Corpus del Grimorio — @TENAUN (gancho, verbatim)",
     "fuente": "Corpus del Grimorio (siete repúblicas · Tenaún)",
     "href": "recta-provincia.html", "lat": -42.3044, "lon": -73.3875},
    {"id": "achao", "nombre": "Achao", "clave": "«Buenos Aires»",
     "rol": "Distrito de la Recta Provincia en la isla Quinchao. Cuna de Bernardo Quintana, recopilador de estas leyendas.",
     "relato": "La villa de la iglesia más antigua de Chiloé, y la tierra natal del doctor Quintana, que rescató estas leyendas.",
     "relatoFuente": "Corpus del Grimorio — @ACHAO (gancho, verbatim)",
     "fuente": "Corpus del Grimorio (siete repúblicas · Achao)",
     "href": None, "lat": -42.4710, "lon": -73.4881},
    {"id": "queilen", "nombre": "Queilén", "clave": "«España»",
     "rol": "Distrito de la Recta Provincia. En las declaraciones de 1880 el nombre «España» aparece ligado a Payos — el mapa en clave varió entre voces.",
     "relato": GANCHO_7REP, "relatoFuente": FUENTE_7REP,
     "fuente": "Corpus del Grimorio (siete repúblicas) · variante: Hernández 2013",
     "href": None, "lat": -42.8899, "lon": -73.4721},
    {"id": "caucahue", "nombre": "Isla Caucahué", "clave": "«Perú»",
     "rol": "Distrito insular de la Recta Provincia, frente a Quemchi.",
     "relato": GANCHO_7REP, "relatoFuente": FUENTE_7REP,
     "fuente": "Corpus del Grimorio (siete repúblicas · Caucahué)",
     "href": None, "lat": -42.1442, "lon": -73.4135},
    {"id": "rauco", "nombre": "Rauco", "clave": "«Salamanca»",
     "rol": "Distrito de la Recta Provincia, al sur de Castro. En las declaraciones de 1880, «Salamanca» aparece ligado a Tenaún — otra voz del mapa en clave.",
     "relato": GANCHO_7REP, "relatoFuente": FUENTE_7REP,
     "fuente": "Corpus del Grimorio (siete repúblicas) · variante: Hernández 2013",
     "href": None, "lat": -42.5453, "lon": -73.7974},
    {"id": "dalcahue", "nombre": "Dalcahue", "clave": "«Villarrica»",
     "rol": "Distrito de la Recta Provincia, puerta de las islas del mar interior.",
     "relato": GANCHO_7REP, "relatoFuente": FUENTE_7REP,
     "fuente": "Corpus del Grimorio (siete repúblicas · Dalcahue)",
     "href": None, "lat": -42.3796, "lon": -73.6473},
    {"id": "ancud", "nombre": "Ancud", "clave": "El juicio de 1880",
     "rol": "Sede del proceso a los brujos de Chiloé (Juzgado de Letras, 1880-1881). Su Museo Regional guarda las figuras míticas en fibra, madera y cancagua.",
     "relato": "El día que el Estado de Chile entró a la cueva: llevó a los brujos a juicio, y lo que era rumor se volvió expediente.",
     "relatoFuente": "Corpus del Grimorio — juicio-1880 (gancho, verbatim)",
     "fuente": "Dossier del proceso (folleto 1908, MC0033459) · Núñez 2022",
     "href": "juicio-1880.html", "lat": -41.8682, "lon": -73.8287},
]

CORPUS = os.path.join(ROOT, "contenido", "El_Grimorio_Datos_Estructurados.txt")


def verificar_relatos():
    """REGLA SAGRADA: cada relato debe ser substring EXACTO del corpus."""
    with open(CORPUS, encoding="utf-8") as f:
        corpus = f.read()
    malos = [p["id"] for p in PUNTOS if p["relato"] not in corpus]
    if malos:
        raise SystemExit("REGLA SAGRADA VIOLADA - relato NO verbatim del corpus: %s"
                         % ", ".join(malos))
    print("Relatos verificados VERBATIM contra el corpus: %d/%d"
          % (len(PUNTOS), len(PUNTOS)))


def anillos(geom):
    if geom["type"] == "Polygon":
        for r in geom["coordinates"]:
            yield r
    elif geom["type"] == "MultiPolygon":
        for poly in geom["coordinates"]:
            for r in poly:
                yield r


def dp(puntos, tol):
    """Douglas-Peucker iterativo (sin recursión, listas grandes)."""
    n = len(puntos)
    if n < 3:
        return puntos
    keep = [False] * n
    keep[0] = keep[-1] = True
    pila = [(0, n - 1)]
    while pila:
        a, b = pila.pop()
        ax, ay = puntos[a]
        bx, by = puntos[b]
        dx, dy = bx - ax, by - ay
        norma = math.hypot(dx, dy)
        degenerado = norma < 1e-9   # anillo cerrado: primer punto == último
        dmax, imax = -1.0, -1
        for i in range(a + 1, b):
            px, py = puntos[i]
            if degenerado:
                d = math.hypot(px - ax, py - ay)
            else:
                d = abs(dx * (ay - py) - dy * (ax - px)) / norma
            if d > dmax:
                dmax, imax = d, i
        if dmax > tol:
            keep[imax] = True
            pila.append((a, imax))
            pila.append((imax, b))
    return [p for p, k in zip(puntos, keep) if k]


def area(puntos):
    s = 0.0
    for i in range(len(puntos) - 1):
        s += puntos[i][0] * puntos[i + 1][1] - puntos[i + 1][0] * puntos[i][1]
    return abs(s) / 2.0


def main():
    verificar_relatos()
    with open(GEO, encoding="utf-8") as f:
        geo = json.load(f)

    # Bounds reales
    lons, lats = [], []
    for feat in geo["features"]:
        for r in anillos(feat["geometry"]):
            for lon, lat in r:
                lons.append(lon)
                lats.append(lat)
    lon0, lon1 = min(lons), max(lons)
    lat0, lat1 = min(lats), max(lats)
    k = math.cos(math.radians((lat0 + lat1) / 2.0))   # corrección de longitud
    escala = ANCHO / ((lon1 - lon0) * k)
    alto = (lat1 - lat0) * escala

    def proy(lon, lat):
        return ((lon - lon0) * k * escala, (lat1 - lat) * escala)

    paths, total_in, total_out, descartadas = [], 0, 0, 0
    for feat in geo["features"]:
        for r in anillos(feat["geometry"]):
            pts = [proy(lon, lat) for lon, lat in r]
            total_in += len(pts)
            simple = dp(pts, TOL)
            if len(simple) < 4 or area(simple) < MIN_AREA:
                descartadas += 1
                continue
            total_out += len(simple)
            d = "M" + "L".join("%.1f %.1f" % (x, y) for x, y in simple) + "Z"
            paths.append(d)

    puntos_js = []
    for p in PUNTOS:
        x, y = proy(p["lon"], p["lat"])
        q = dict(p)
        q["x"], q["y"] = round(x, 1), round(y, 1)
        puntos_js.append(q)

    proc = ("Forma: DPA/SUBDERE (comunas de la provincia de Chiloé) vía "
            "github.com/caracena/chile-geojson — geometría real, simplificada "
            "sin redibujar. Coordenadas de los puntos: OpenStreetMap.")

    js = [
        "/* mapa-datos.js — GENERADO por herramientas/generar_mapa.py. NO editar a mano.",
        "   Silueta REAL de la provincia de Chiloé (assets/data/chiloe-geo.json,",
        "   DPA/SUBDERE vía caracena/chile-geojson) proyectada a SVG + puntos",
        "   VERIFICADOS (fuentes/investigacion/geografia-cosmologia.md; lat/lon OSM).",
        "   La forma no se inventa: se regenera desde la fuente. */",
        "window.Grimorio = window.Grimorio || {};",
        "window.Grimorio.mapaChiloe = {",
        '  viewBox: "0 0 %d %d",' % (round(ANCHO), round(alto)),
        "  procedencia: %s," % json.dumps(proc, ensure_ascii=False),
        "  islas: [",
    ]
    js += ['    "%s",' % d for d in paths]
    js += [
        "  ],",
        "  puntos: [",
    ]
    for q in puntos_js:
        js.append("    " + json.dumps(
            {kk: q[kk] for kk in ("id", "nombre", "clave", "rol", "relato",
                                  "relatoFuente", "fuente", "href",
                                  "x", "y", "lat", "lon")},
            ensure_ascii=False) + ",")
    js += ["  ]", "};", ""]

    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    with open(SALIDA, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js))

    # Preview autónomo para QA de ojo humano (no lo carga el sitio).
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d">'
           % (round(ANCHO), round(alto)),
           '<rect width="100%" height="100%" fill="#02060c"/>']
    for d in paths:
        svg.append('<path d="%s" fill="#0e2433" stroke="#0e2433" stroke-width="0.8"/>' % d)
    for q in puntos_js:
        svg.append('<circle cx="%s" cy="%s" r="5" fill="#f2b65a"/>' % (q["x"], q["y"]))
        svg.append('<text x="%s" y="%s" fill="#f2b65a" font-size="13" font-family="monospace">%s</text>'
                   % (q["x"] + 9, q["y"] + 4, q["nombre"]))
    svg.append("</svg>")
    with open(PREVIEW, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(svg))

    kb = os.path.getsize(SALIDA) // 1024
    print("Anillos: %d emitidos, %d motas descartadas (<%.0f px2)"
          % (len(paths), descartadas, MIN_AREA))
    print("Vertices: %d -> %d (DP tol %.1f px)" % (total_in, total_out, TOL))
    print("viewBox: 0 0 %d %d | puntos: %d" % (round(ANCHO), round(alto), len(puntos_js)))
    print("Escrito: %s (%d KB)" % (os.path.relpath(SALIDA, ROOT), kb))
    print("Preview: %s" % os.path.relpath(PREVIEW, ROOT))


if __name__ == "__main__":
    main()
