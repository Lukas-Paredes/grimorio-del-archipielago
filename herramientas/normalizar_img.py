#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
normalizar_img.py — Normalizador de imágenes de El Grimorio del Archipiélago.

Herramienta OFFLINE (carpeta herramientas/). El sitio publicado NO depende de
ella: convierte un PNG crudo de Gemini en la imagen final del sitio
(sello tapado · grid de pixel real y uniforme · paleta contenida · peso mínimo).

Uso:
  python herramientas/normalizar_img.py crudo.png --id trauco --slot hero
    -> assets/img/trauco-hero.webp  +  assets/img/trauco-hero.png

  python herramientas/normalizar_img.py --contacto assets/img/caleuche.png assets/img/trauco.png
    -> herramientas/contacto/contacto.html (compara grid 2/3/4; NO toca assets/img/)

Slots: hero (16:9) · descenso (9:16) · cierre (16:9) · card (1:1) · portada (libre)
       · ui (pieza suelta sobre negro: plomada, sigilos, ornamentos)
El nombre de salida SIEMPRE es <id>-<slot> (o el --out exacto).

El slot `ui` (regla del mandato 2026-07): SIN grid ni paleta; el negro del
lienzo se recorta a transparencia (umbral sobre el canal máximo), se recorta
la caja de la pieza (el sello ✦ queda fuera del recorte) y se reduce con
LANCZOS a la altura real de uso (--alto, p. ej. 48 px). Nitidez a tamaño
real de uso, no a tamaño de lienzo.

Pipeline (Pillow): sello -> grid (NEAREST) -> paleta (MEDIANCUT) -> export webp+png8.
No es una cadena de build; el sitio abre igual sin esto.
"""
import argparse, os, sys, io
from PIL import Image
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "assets", "img")
# Proporción esperada por slot (solo para avisar; no recorta).
SLOTS = {"hero": (16, 9), "descenso": (9, 16), "cierre": (16, 9), "card": (1, 1),
         "portada": None, "fondo": None, "ui": None}
# REGLA DE ORO (auditoría 2026-07): los slots FULL-VIEWPORT (fondos de página
# completa: portada-*, fondo-*, descenso, cierre) se sirven a 1800 px por el
# lado mayor y NUNCA pasan por grid-reduction ni cuantización de paleta —
# solo sello tapado + resize LANCZOS + WebP q90. El criterio de aceptación es
# VISUAL a pantalla completa, no el peso. Grid+paleta queda SOLO para heroes.
FULLVIEW = {"portada", "fondo", "descenso", "cierre"}
FULLVIEW_MAX = 1800


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0 + 1e-9), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def cubrir_sello(im, radio_frac=0.20, fuerza=1.0, verbose=True):
    """Detecta el sello ✦ (brillo en la esquina inferior derecha) y lo funde a
    negro con un degradado radial smoothstep, para que se lea como penumbra
    natural (sin parche duro). Si no detecta sello, deja la imagen intacta."""
    rgb = im.convert("RGB")
    a = np.asarray(rgb).astype(np.float32)
    h, w = a.shape[:2]
    cw, ch = int(w * 0.22), int(h * 0.22)          # región de búsqueda: esquina inf-der
    x0, y0 = w - cw, h - ch
    corner = a[y0:h, x0:w]
    lum = corner.mean(axis=2)
    thr = max(lum.mean() + 2.2 * lum.std(), float(np.percentile(lum, 99.5)))
    ys, xs = np.where(lum >= thr)
    if len(xs) < 6:                                # sin sello claro -> no tocar
        if verbose:
            print("  sello: no detectado (imagen sin cambios)")
        return rgb
    cx = x0 + xs.mean()
    cy = y0 + ys.mean()
    ext = max(int(xs.max() - xs.min()), int(ys.max() - ys.min()))
    r_in = ext * 0.9 + 2.0
    r_out = max(r_in * 2.6, min(w, h) * radio_frac)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    darken = (1.0 - smoothstep(r_in, r_out, dist)) * float(fuerza)   # 1 en el centro, 0 fuera
    out = a * (1.0 - darken)[:, :, None]
    if verbose:
        print("  sello: detectado y cubierto (centro=%d,%d r_in=%.0f r_out=%.0f)"
              % (cx, cy, r_in, r_out))
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def snap_grid(rgb, g):
    if g <= 1:
        return rgb
    w, h = rgb.size
    return rgb.resize((max(1, w // g), max(1, h // g)), Image.Resampling.NEAREST)


def cuantizar(rgb, colors, dither):
    d = Image.Dither.FLOYDSTEINBERG if dither else Image.Dither.NONE
    return rgb.convert("RGB").quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=d)


def export_webp(rgb, path):
    """Guarda la más liviana entre WebP lossless y lossy q90. Devuelve (bytes, modo)."""
    bl = io.BytesIO(); rgb.save(bl, "WEBP", lossless=True, method=6)
    by = io.BytesIO(); rgb.save(by, "WEBP", quality=90, method=6)
    if bl.tell() <= by.tell():
        best, modo = bl, "lossless"
    else:
        best, modo = by, "lossy q90"
    with open(path, "wb") as f:
        f.write(best.getvalue())
    return best.tell(), modo


def procesar(src, grid, colors, dither, sello=True, radio_frac=0.20, verbose=True):
    im = Image.open(src)
    w0, h0 = im.size
    rgb = cubrir_sello(im, radio_frac=radio_frac, verbose=verbose) if sello else im.convert("RGB")
    rgb = snap_grid(rgb, grid)
    if colors <= 0:
        # --colors 0: SIN cuantización (ley de calidad, mandato 2026-07).
        # MEDIANCUT sacrifica degradés brillantes que ocupan pocos píxeles
        # (p. ej. el cuerno dorado del Camahueto quedaba apagado hasta con
        # 256 colores, al MISMO peso webp). El PNG fallback sale RGB.
        return rgb, (w0, h0), 0
    q = cuantizar(rgb, colors, dither)             # P-mode (paleta)
    n = len(q.getcolors(maxcolors=256) or [])
    return q, (w0, h0), n


def procesar_fondo(src, sello=True, radio_frac=0.20, verbose=True):
    """Pipeline FULL-VIEWPORT: sello tapado + resize LANCZOS al lado mayor de
    1800 px. SIN grid, SIN cuantización (regla de oro: calidad visual manda)."""
    im = Image.open(src)
    w0, h0 = im.size
    rgb = cubrir_sello(im, radio_frac=radio_frac, verbose=verbose) if sello else im.convert("RGB")
    w, h = rgb.size
    if max(w, h) > FULLVIEW_MAX:
        if w >= h:
            nw, nh = FULLVIEW_MAX, round(h * FULLVIEW_MAX / w)
        else:
            nw, nh = round(w * FULLVIEW_MAX / h), FULLVIEW_MAX
        rgb = rgb.resize((nw, nh), Image.Resampling.LANCZOS)
    return rgb, (w0, h0)


def procesar_ui(src, alto, umbral=20, margen=6, verbose=True):
    """Pipeline UI (mandato 2026-07): pieza suelta sobre lienzo negro.
    Negro -> alfa (umbral duro: es pixel art, bordes netos), recorte de la
    caja de la pieza (el sello ✦ de la esquina inf-der se excluye de la
    máscara, así el recorte lo deja fuera), LANCZOS a la altura de uso."""
    im = Image.open(src).convert("RGB")
    a = np.asarray(im)
    h, w = a.shape[:2]
    lum = a.max(axis=2)
    mask = lum > umbral
    # El sello vive en la esquina inferior derecha: se excluye de la caja.
    sello_zone = np.zeros_like(mask)
    sello_zone[int(h * 0.72):, int(w * 0.72):] = True
    pieza = mask & ~sello_zone
    ys, xs = np.where(pieza)
    if not len(xs):
        sys.exit("ui: no se encontró pieza sobre el negro (umbral %d)." % umbral)
    x0, x1 = max(0, xs.min() - margen), min(w, xs.max() + margen + 1)
    y0, y1 = max(0, ys.min() - margen), min(h, ys.max() + margen + 1)
    rgba = np.dstack([a, np.where(mask, 255, 0).astype(np.uint8)])
    rec = rgba[y0:y1, x0:x1]
    out = Image.fromarray(rec, "RGBA")
    if verbose:
        print("  pieza: caja %dx%d (recortada del lienzo %dx%d; sello fuera)"
              % (out.size[0], out.size[1], w, h))
    if alto and out.size[1] > alto:
        nw = max(1, round(out.size[0] * alto / out.size[1]))
        out = out.resize((nw, alto), Image.Resampling.LANCZOS)
    return out, (w, h)


def run_slot(args):
    src = args.src
    if not os.path.isfile(src):
        sys.exit("No existe el crudo: " + src)
    if args.slot not in SLOTS:
        sys.exit("Slot inválido: %s (válidos: %s)" % (args.slot, ", ".join(SLOTS)))
    base = args.out or ("%s-%s" % (args.id, args.slot))
    out_webp = os.path.join(IMG_DIR, base + ".webp")
    out_png = os.path.join(IMG_DIR, base + ".png")
    fullview = args.slot in FULLVIEW
    for p in (out_webp,) + (() if (fullview and args.sin_png) else (out_png,)):
        if os.path.exists(p) and not args.forzar:
            sys.exit("Ya existe %s (usá --forzar para sobrescribir)." % os.path.relpath(p, ROOT))
    if args.slot == "ui":
        print("Normalizando (UI, negro->alfa, sin grid) %s -> %s  alto=%s"
              % (os.path.relpath(src, ROOT), base, args.alto or "original"))
        out, (w0, h0) = procesar_ui(src, args.alto, umbral=args.ui_umbral)
        out.save(out_webp, "WEBP", lossless=True, method=6)
        out.save(out_png, "PNG", optimize=True)
        print("  antes:   %dx%d (lienzo)" % (w0, h0))
        print("  después: %dx%d RGBA" % out.size)
        print("  webp:  %7.1f KB (lossless+alfa)" % (os.path.getsize(out_webp) / 1024.0))
        print("  png:   %7.1f KB (RGBA)" % (os.path.getsize(out_png) / 1024.0))
        print("Listo: %s" % os.path.relpath(out_webp, ROOT))
        return
    if fullview:
        print("Normalizando (FULL-VIEWPORT, sin grid/paleta) %s -> %s"
              % (os.path.relpath(src, ROOT), base))
        rgb, (w0, h0) = procesar_fondo(src, sello=not args.no_sello, radio_frac=args.sello_radio)
        kb_webp, modo = export_webp(rgb, out_webp)
        print("  antes:   %dx%d" % (w0, h0))
        print("  después: %dx%d (LANCZOS, color pleno)" % rgb.size)
        print("  webp:  %7.1f KB (%s)" % (kb_webp / 1024.0, modo))
        if not args.sin_png:
            rgb.save(out_png, "PNG", optimize=True)
            print("  png:   %7.1f KB (RGB, fallback)" % (os.path.getsize(out_png) / 1024.0))
    else:
        print("Normalizando %s -> %s(.webp/.png)  grid=%d colors=%d dither=%s"
              % (os.path.relpath(src, ROOT), base, args.grid, args.colors, bool(args.dither)))
        q, (w0, h0), n = procesar(src, args.grid, args.colors, args.dither,
                                  sello=not args.no_sello, radio_frac=args.sello_radio)
        qrgb = q.convert("RGB")
        kb_webp, modo = export_webp(qrgb, out_webp)
        q.save(out_png, "PNG", optimize=True)
        kb_png = os.path.getsize(out_png)
        w1, h1 = qrgb.size
        print("  antes:   %dx%d" % (w0, h0))
        print("  después: %dx%d  · %d colores" % (w1, h1, n))
        print("  webp:  %7.1f KB (%s)" % (kb_webp / 1024.0, modo))
        print("  png-8: %7.1f KB" % (kb_png / 1024.0))
        ar = SLOTS[args.slot]
        if ar and abs((w1 / h1) - (ar[0] / ar[1])) > 0.06:
            print("  AVISO: proporción %.3f no coincide con %d:%d del slot '%s'."
                  % (w1 / h1, ar[0], ar[1], args.slot))
        if args.slot == "hero" and kb_webp / 1024.0 > 60:
            print("  AVISO: el hero webp supera 60 KB (%.1f KB)." % (kb_webp / 1024.0))
    print("Listo: %s" % os.path.relpath(out_webp, ROOT))


def run_contacto(args):
    """Compara grid 2/3/4 sobre una o más imágenes. Escribe solo en
    herramientas/contacto/ (no toca assets/img/); las lee para comparar."""
    outdir = os.path.join(ROOT, "herramientas", "contacto")
    os.makedirs(outdir, exist_ok=True)
    factors = [2, 3, 4]
    rows = []
    for src in args.contacto:
        if not os.path.isfile(src):
            print("(salto, no existe) " + src); continue
        name = os.path.splitext(os.path.basename(src))[0]
        orig = Image.open(src)
        ow, oh = orig.size
        orig_kb = os.path.getsize(src) / 1024.0
        cells = [("original · %dx%d · %.0f KB" % (ow, oh, orig_kb),
                  os.path.relpath(src, outdir).replace(os.sep, "/"))]
        line = "%-16s original %dx%d %.0fKB" % (name, ow, oh, orig_kb)
        for g in factors:
            q, _, n = procesar(src, g, args.colors, args.dither,
                               sello=not args.no_sello, radio_frac=args.sello_radio, verbose=False)
            qrgb = q.convert("RGB")
            fn = "%s.g%d.webp" % (name, g)
            kb, modo = export_webp(qrgb, os.path.join(outdir, fn))
            cells.append(("grid %d · %dx%d · %d col · %.1f KB (%s)"
                          % (g, qrgb.size[0], qrgb.size[1], n, kb / 1024.0, modo), fn))
            line += "  | g%d %dx%d %d col %.1fKB" % (g, qrgb.size[0], qrgb.size[1], n, kb / 1024.0)
        rows.append((name, cells))
        print(line)
    html = ["<!doctype html><meta charset=utf-8><title>contacto · normalizar_img</title>",
            "<style>body{background:#02060c;color:#ece4d2;font-family:system-ui,sans-serif;margin:1.4rem}",
            "h1{color:#f2b65a}h2{color:#e0a24a;font-weight:600;margin-top:1.6rem}",
            ".row{display:flex;gap:14px;flex-wrap:wrap;margin:0 0 1rem}figure{margin:0}",
            "img{width:340px;image-rendering:pixelated;background:#000;border:1px solid #f2b65a55;display:block}",
            "figcaption{font-size:.78rem;color:#9fb6bd;margin-top:4px;max-width:340px}</style>",
            "<h1>Comparación de factor de grid — elegí el default</h1>",
            "<p style=color:#9fb6bd>Cada fila: original vs downscale NEAREST /2, /3, /4 (paleta " +
            str(args.colors) + " colores). El navegador los agranda con image-rendering:pixelated.</p>"]
    for name, cells in rows:
        html.append("<h2>%s</h2><div class=row>" % name)
        for cap, href in cells:
            html.append('<figure><img src="%s" alt=""><figcaption>%s</figcaption></figure>' % (href, cap))
        html.append("</div>")
    with open(os.path.join(outdir, "contacto.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(html) + "\n")
    print("\nAbrí: %s" % os.path.relpath(os.path.join(outdir, "contacto.html"), ROOT))


def main():
    ap = argparse.ArgumentParser(description="Normalizador de imágenes del Grimorio (offline).")
    ap.add_argument("src", nargs="?", help="PNG crudo de entrada (modo normal).")
    ap.add_argument("--id", help="id de la criatura (p. ej. trauco).")
    ap.add_argument("--slot", help="hero|descenso|cierre|card|portada|fondo")
    ap.add_argument("--out", help="nombre de salida exacto (para fondos históricos: portada-*, fondo-*).")
    ap.add_argument("--sin-png", action="store_true",
                    help="full-viewport: no regenerar el PNG de fallback (conservar el existente).")
    ap.add_argument("--alto", type=int, default=None,
                    help="slot ui: altura final en px (tamaño real de uso, p. ej. 48).")
    ap.add_argument("--ui-umbral", type=int, default=20,
                    help="slot ui: umbral de negro->alfa sobre el canal máximo (default 20).")
    ap.add_argument("--grid", type=int, default=3, help="factor de downscale NEAREST (default 3, fijado con las anclas).")
    ap.add_argument("--colors", type=int, default=96,
                    help="colores de la cuantización (default 96: calibrado con las anclas — 48 "
                         "aplanaba los degradés del rayo del Trauco; 96 los conserva al mismo peso).")
    ap.add_argument("--dither", action="store_true", help="activar dithering (default no).")
    ap.add_argument("--no-sello", action="store_true", help="no cubrir el sello.")
    ap.add_argument("--sello-radio", type=float, default=0.20,
                    help="radio del degradado del sello (fracción del lado menor).")
    ap.add_argument("--forzar", action="store_true", help="sobrescribir si el destino ya existe.")
    ap.add_argument("--contacto", nargs="+", metavar="IMG",
                    help="modo comparación grid 2/3/4 (no escribe en assets/img/).")
    args = ap.parse_args()
    if args.contacto:
        run_contacto(args)
    elif args.src and args.slot and (args.id or args.out):
        run_slot(args)
    else:
        ap.error("Modo normal requiere: src --slot y (--id o --out); o usá --contacto IMG...")


if __name__ == "__main__":
    main()
