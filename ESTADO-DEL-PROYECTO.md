# ESTADO DEL PROYECTO — El Grimorio del Archipiélago

> Foto del proyecto para retomar desde cualquier PC. Rama de trabajo:
> **`main`** (decisión de Lucas, 2026-09-01: todo el trabajo se consolida en
> `main`; `v8-arquitectura` queda como rama histórica, sin borrar).
> Última actualización: 2026-09-01.
> Para arrancar local: `python -m http.server 8000` desde la raíz → http://localhost:8000/

---

## 1 · Qué es

Archivo cultural digital de la mitología de Chiloé (68 entidades documentadas),
estética dark-fantasy pixel art. **Dos maneras de recorrerlo, misma data:**

- **El camino del mito** (sistema nuevo, donde se trabaja): páginas separadas que
  se recorren como un descenso — inicio → «Abordar» → capítulo → «Siguiente ▼» →
  … → el lecho. Cada capítulo es su propia página.
- **El archivo clásico** (sistema viejo, NO se toca): `index-legacy.html` + `pages/`.

Regla sagrada: **nada se inventa**. Todo texto cultural sale VERBATIM de los `.txt`
de `contenido/`. Stack: HTML + CSS + JS clásico, sin frameworks, sin build.

## 2 · Qué existe hoy (navegable)

- **5 capítulos completos**, en orden: I·Caleuche → II·Pincoya → III·Trauco →
  IV·Invunche → V·Camahueto. Archivos raíz `<id>.html` (generados, no editar a mano).
- **El camino**: `index.html` (superficie + umbral del Cap. I), `lecho.html`
  (cierre + puertas al archivo), carta de capítulos con las 68 (publicadas + selladas),
  transiciones de niebla entre páginas, botonera fija (Capítulos · Movimiento · Sonido).
- **Atmósfera viva**: farol/luces que titilan, motas de sedimento, zonas de color,
  parallax, profundímetro en brazas. Todo pausable con «Movimiento»; respeta
  `prefers-reduced-motion`.
- **Banda sonora** (ver §4).

## 3 · Arquitectura clave (para no romper nada)

- **Data-driven**: `assets/js/data/capitulos.js` es la fuente. Cambiar el orden =
  cambiar los `n`. Agregar capítulo = agregar objeto + su `<id>.html` (generado).
- **Motor de fichas genérico**: `assets/js/ficha.js` + `assets/css/ficha.css`
  (no se editan por criatura). Las fichas las produce
  `herramientas/generar_fichas.py` (parser 1:1 del `.txt`; el `raw` embebido es
  **byte-idéntico** al `@ENTIDAD` — la regla sagrada automatizada).
- **Chrome del camino**: `assets/js/camino.js` + `assets/css/camino.css` (botonera,
  carta, «El camino continúa», bruma).
- **GOTCHA de rutas**: `url()` en CSS resuelve relativo a `assets/css/` → `../img/`;
  `<img>` en HTML de raíz → `assets/img/`.
- **Imágenes**: full-viewport (fondos) a 1800px color pleno, NUNCA grid-reduction;
  heroes enmarcados a grid 3 · 96 colores. Crudos en `assets/img/_raw/`. Manifiesto
  y regla en `assets/img/README.md`. Procesador: `herramientas/normalizar_img.py`.

## 4 · Sistema de sonido (opt-in, apagado por defecto, jamás autoplay)

Un **solo botón «Sonido»** enciende/apaga TODO; un **slider** ajusta el volumen
maestro (curva perceptual, persiste separado del on/off). Dos capas por el mismo
low-pass de profundidad y el mismo master:

1. **Atmósfera procedural** (`assets/js/sonido.js`, Web Audio, cero archivos):
   una receta de reino por capítulo (niebla, mar-adentro, bosque, cueva, tormenta,
   abismo). Se declara en `capitulos.js` (campo `atmosfera`).
2. **Música de fondo** (capa POR DEBAJO): 6 pistas de Pixabay normalizadas a
   −18 LUFS con loop sin costura, en `assets/audio/musica-<pista>.ogg/.mp3`
   (streaming lazy: solo el capítulo actual + prefetch del siguiente). Se declara
   en `capitulos.js` (campo `musica`). El **Caleuche es intermitente** (aparece y
   se va, con low-pass de distancia + eco = fiesta lejana).

**Afinar a oído** (sin tocar código): `assets/js/config.js → audio`
(`volumen`, `volumenMusica`, `musica: {ajuste por pista}`, `caleuche: {tiempos}`,
`atmosferas: {perillas}`). Diagnóstico en consola: `Grimorio.sonido.estado()`.
**Reprocesar audio**: `herramientas/audio_pipeline.py` (necesita ffmpeg; ver §7).
Créditos: `CREDITOS-AUDIO.md` (falta que Lucas ponga título/autor de cada pista
desde Pixabay — los MP3 no traían metadatos).

## 5 · Deploy (parqueado — decisión de Lucas)

Todo está listo para **GitHub Pages** (URL prevista
`lukas-paredes.github.io/grimorio-del-archipielago`, ya cableada en
canonical/og/sitemap/robots/404). **Bloqueo**: el plan gratuito no sirve Pages en
repos **privados** → hay que hacer el repo **público** (Settings → General →
Change visibility, o autorizar el flip). Guía completa: `DEPLOY.md`. El dominio
`.cl` propio (NIC Chile, ~$10–12 mil CLP/año) puede esperar; para postular basta
la URL de Pages.

## 6 · Postulación al fondo — ENVIADA / CERRADA (frente congelado)

`postulacion/POSTULACION-MOCKUP.html` quedó final (sección 11 = equipo de tres,
datos reales de portada). **No regenerar PDFs ni tocar esa carpeta.**

## 7 · Herramientas offline (`herramientas/`, no las necesita el sitio publicado)

- `generar_fichas.py` — .txt → `<id>.html` + `indice.js` + `pendientes.md`.
- `normalizar_img.py` — crudo Gemini → webp/png del sitio (sello, grid, paleta).
- `audio_pipeline.py` — MP3 crudo → ogg/mp3 normalizado + loop. **Necesita ffmpeg**;
  no está en el sistema: se bajó un binario estático a scratchpad (no versionado).
  Para reprocesar en otra PC: instalar ffmpeg o bajar `imageio-ffmpeg` y pasar
  `--ffmpeg <ruta>`.
- Bandejas locales ignoradas por git: `_entrada-audio/` (MP3 crudos),
  `entrada/` (imágenes crudas). Los canónicos viven en `assets/img/_raw/`.

## 8 · Pendientes de Lucas

1. **Hacer el repo público** para activar GitHub Pages (o decidir hosting alt.).
2. **Escuchar el audio** en un navegador real y afinar volúmenes en `config.js`
   (yo no tengo salida de audio; verifiqué el mecanismo, no el timbre).
3. **`CREDITOS-AUDIO.md`**: completar título/autor de las 6 pistas desde Pixabay.
4. **Documento NotebookLM (CAMINO-DEL-MITO)**: cuando llegue, ajustar orden (`n`)
   y cargar los `puente {texto, fuente}` en `capitulos.js`.
5. **Imágenes de portada** por generar en Gemini (ver `herramientas/pendientes.md`):
   `portada-invunche`, `portada-camahueto` (hoy usan el hero provisional).
6. **Probar en Android real**: scroll-snap y slider de volumen táctil.
7. **Certificado de residencia 10 años** (trámite, no depende del sitio).

## 9 · Visión a futuro (bloqueada hasta orden expresa)

`HORIZONTE-RELATO.md` — la capa jugable de «relato interactivo y travesía»
(dos caminos sobre la misma página). NO se construye ahora; solo marca reglas para
no bloquearla.

---

_Documentos guía: `CLAUDE.md` (reglas), `DEPLOY.md`, `CREDITOS-AUDIO.md`,
`herramientas/pendientes.md` (backlog vivo), `HORIZONTE-RELATO.md` (visión)._
