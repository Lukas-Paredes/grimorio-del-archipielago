# PLAN — HERRAMIENTAS OFFLINE (2 scripts)

> Para Claude Code. **El Grimorio del Archipiélago.**
> Dos scripts Python que corren FUERA del sitio (carpeta `herramientas/`).
> El sitio publicado sigue siendo estático puro y NO depende de ellos: son
> herramientas de contenido, como el script PIL del sello que ya existe.
> Añadir a CLAUDE.md una línea que lo aclare: "Las herramientas offline de
> `herramientas/` están permitidas; el sitio publicado no las requiere."

Restricciones heredadas: respetar CLAUDE.md (git: solo rama actual, sin
commit/push salvo pedido; no tocar `ficha.js`/`ficha.css`; regla sagrada:
ningún texto cultural se reescribe — se copia VERBATIM).

---

## Script 1 · Normalizador de imágenes — `herramientas/normalizar_img.py`

**Qué hace:** toma un PNG crudo de Gemini y emite la imagen final del sitio:
sello tapado, grid de pixel REAL y uniforme, paleta contenida, peso mínimo.
Es el igualador que hace que ~200 imágenes parezcan de la misma mano.

**Uso:**
```
python herramientas/normalizar_img.py crudo.png --id trauco --slot hero
# → assets/img/trauco-hero.webp + assets/img/trauco-hero.png
```
Slots válidos: `hero` (16:9) · `descenso` (9:16) · `cierre` (16:9) · `card` (1:1)
· `portada` (libre). El nombre de salida SIEMPRE es `<id>-<slot>`.

**Pipeline (Pillow):**
1. **Sello de Gemini:** integrar el método ya validado del proyecto (detección
   por brillo en esquina inferior derecha + overlay radial smoothstep hacia
   negro). Si el script existente está en el repo, reutilizarlo; si no,
   reimplementarlo fiel a esa descripción.
2. **Snap de grid:** downscale con `Image.NEAREST` por factor `--grid` (default
   3; probar 2/3/4 en las primeras corridas y fijar el default que mejor
   conserve el detalle del ancla Caleuche). Servir a resolución nativa
   resultante — el CSS del sitio ya hace `image-rendering: pixelated` al
   escalar. Flag opcional `--upscale` (re-agranda nearest al tamaño original)
   solo para comparar; no usarlo en producción (peso inútil).
3. **Cuantización de paleta:** `quantize()` MEDIANCUT a `--colors` (default 48,
   sin dithering por default; flag `--dither` para probar). Opción
   `--paleta-maestra`: construir la paleta desde las imágenes ancla de
   `herramientas/anclas/` (combinar y cuantizar) y aplicarla a todas — probar
   primero por-imagen; la maestra es la opción agresiva si aún hay deriva.
4. **Export:** WebP (probar lossless vs. lossy q90, guardar el más liviano) +
   PNG-8 de fallback. Sin metadatos EXIF.
5. **Reporte en consola:** dimensiones antes/después, nº de colores, KB de cada
   salida, y advertencia si el hero queda > 60 KB.

**Criterios de aceptación:**
- Corrida sobre `caleuche` y `trauco` actuales: grid visiblemente uniforme
  entre ambas, paleta sin verdes/cianes saturados fuera del ADN, sello
  invisible, pesos ≤ 60 KB (hero) sin degradación notoria a tamaño de teléfono.
- Comparación lado a lado (script puede emitir un `contacto.html` temporal con
  antes/después) para que Lucas apruebe el factor de grid por defecto.
- El script nunca escribe fuera de `assets/img/` y nunca pisa un archivo sin
  flag `--forzar`.

---

## Script 2 · Generador de fichas — `herramientas/generar_fichas.py`

**Qué hace:** convierte la base de datos en fichas HTML estáticas. Una sola
fuente de verdad (`El_Grimorio_Datos_Estructurados.txt`) → cero copiado a mano
→ cero erratas culturales. También produce el backlog de imágenes pendientes.

**Entradas:**
1. `El_Grimorio_Datos_Estructurados.txt` — parser FIEL al esquema documentado
   en su cabecera y ya implementado en `ficha.js`: bloques `@ENTIDAD…@FIN`,
   campos `CLAVE:: valor`, valores multilínea, repetibles `VARIANTE` (formato
   `Título | texto`) / `FUENTE` / `ENLACE`, `#` = comentario. Portar ese parser
   a Python 1:1 (mismos nombres de campos).
2. **Prosa curada por criatura** en `contenido/prosa/<id>.txt` (NO parsear el
   DEFINITIVO.txt automáticamente: es frágil y la prosa requiere limpieza
   manual — sin cajas ASCII, sin bullets, sin `[→ url]`). Formato simple:
   ```
   @DESCRIPCION
   párrafo…

   párrafo…
   @INTERPRETACION
   párrafo…
   @ORIGEN-MITO
   párrafo…
   @CIERRE
   Frase final de la criatura.
   ```
   Secciones ausentes → se omiten (igual que la plantilla). El generador crea
   los `contenido/prosa/caleuche.txt` y `trauco.txt` iniciales EXTRAYENDO
   VERBATIM lo que hoy vive embebido en `ficha.js` (default del Caleuche) y en
   `trauco.html` — así el contenido actual queda como referencia canónica.
3. `herramientas/plantilla_ficha.html` — creada UNA vez a partir de
   `trauco.html` con placeholders (`{{TITLE}}`, `{{META}}`, `{{FICHA_RAW}}`,
   `{{PROSA_JSON}}`, `{{CIERRE}}`, `{{IMG_VARS}}`, `{{HERO_IMG}}`,
   `{{HERO_ALT}}`, `{{BODY_ID}}`). La estructura HTML de secciones no cambia.

**Salida por criatura publicada:** `<id>.html` en la raíz con:
- `window.FICHA = { raw, prosa, cierre }` — `raw` es el bloque `@ENTIDAD`
  COPIADO VERBATIM (bytes idénticos) del .txt; `prosa`/`cierre` desde su
  archivo de prosa.
- Variables CSS `--img-descenso` / `--img-cierre` (y `--img-fondo` si aplica)
  con rutas `../img/<id>-*.webp/png` (¡regla de rutas CSS!), `<img>` del hero
  con `assets/img/<id>-hero.webp/png` y `alt` tomado de un campo opcional
  `ALT_HERO::` del bloque o, en su defecto, del `RESUMEN` (factual, sin
  adornos).
- `<title>`, meta description (RESUMEN), OG (`og:title/description/image`),
  `twitter:card`, canonical, y JSON-LD `CreativeWork` (nombre, descripción =
  RESUMEN, `citation` = FUENTEs, `isPartOf` el sitio). `theme-color #02060c`.

**Qué criaturas genera:** solo las listadas en `herramientas/publicadas.txt`
(una por línea: `caleuche`, `trauco`, …). Para el resto, NO genera HTML pero sí
reporta. Flags: `--solo <id>`, `--todas` (solo listado/reporte, no escritura).

**Reporte (el backlog de Gemini):** tabla en consola + `herramientas/pendientes.md`:
por cada una de las 68, qué imágenes existen/faltan (`<id>-hero/descenso/
cierre/card`), si tiene prosa curada, y si está publicada. Es la lista de
trabajo de Lucas.

**Criterios de aceptación:**
- Regenerar `trauco.html` produce una ficha funcionalmente idéntica a la
  actual (diferencias aceptables SOLO: metadatos nuevos y whitespace). Abrirla
  en `python -m http.server` y verificar contra el checklist de CLAUDE.md.
- Regenerar `caleuche.html` como ficha explícita (con su `window.FICHA` desde
  el .txt + prosa extraída) y verificar que se ve idéntica a la versión que
  usa los defaults de `ficha.js`. Los defaults de `ficha.js` NO se tocan.
- `diff` byte a byte entre cada bloque `@ENTIDAD` del .txt y el `raw` embebido
  en su HTML generado: idéntico. (Este diff ES la regla sagrada automatizada.)
- El script jamás modifica el .txt de datos, `ficha.js`, `ficha.css` ni nada
  fuera de: raíz `<id>.html`, `contenido/prosa/`, `herramientas/`.

---

## Orden sugerido de ejecución (con Claude Code)

1. Script 1 (normalizador) + validar factor de grid con las imágenes actuales.
2. Script 2 (generador) + regenerar Caleuche y Trauco como prueba de fuego.
3. Recién entonces, nueva criatura (Pincoya): imágenes por el normalizador,
   `pincoya` a `publicadas.txt`, prosa curada, generar — y debería existir en
   minutos, no en una tarde.
