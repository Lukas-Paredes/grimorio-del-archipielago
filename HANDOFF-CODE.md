# HANDOFF-CODE.md — para tu primer día como Claude Code en este repo

> Lo escribió el Claude Code anterior para vos, su sucesor. No sabés nada todavía;
> esto te deja trabajar desde el minuto uno sin romper nada. Todo lo que sigue está
> **verificado contra el repo** (git + lectura de archivos), no de memoria.
> **Primero de todo:** `git status` y `git log --oneline -10`, y leé también
> `CLAUDE.md`, `pendientes.md` (`herramientas/pendientes.md`) y `ESTADO-DEL-PROYECTO.md`.
> Después esperá el primer mandato de Lucas.
>
> ⚠️ **Snapshot del 2026-07-09.** Desde entonces el sistema creció (capítulo
> Recta Provincia completo: @TESTIMONIO, @LECTURAS, GALERIAS, BESPOKE, slot
> lámina, umbral por acto, Expediente). El delta está en: `CLAUDE.md` →
> Decisiones (fechadas) + `_handoff/migraciones/` (traspasos por sesión) +
> `CHANGELOG.md` (hitos). Leé la migración más reciente ANTES que este archivo.

---

## 1 · Identidad del proyecto

**El Grimorio del Archipiélago**: archivo cultural digital de la mitología de
Chiloé (68 entidades documentadas), estética dark-fantasy pixel art. Se presenta
como **archivo cultural y mediación**, nunca como videojuego/Pokédex/dashboard.

**LA REGLA SAGRADA (cultural, innegociable):** no se inventa NADA — ni relatos,
ni fuentes, ni fechas, ni territorios, ni iconografía. Todo texto cultural se
copia **VERBATIM** desde los dos `.txt` de `contenido/`:
- `El_Grimorio_Datos_Estructurados.txt` — la base de datos (bloques
  `@ENTIDAD…@FIN`, campos `CLAVE:: valor`, repetibles `VARIANTE::`/`FUENTE::`/`ENLACE::`).
- `El_Grimorio_del_Archipielago_DEFINITIVO.txt` — el grimorio literario (prosa rica).

Las **variantes de un mito se muestran, no se zanjan** (el sitio presenta las
versiones documentadas sin decidir cuál es "la verdadera"). Si un texto falta,
la respuesta correcta es "falta contenido, lo curás vos" — jamás lo redactás.

**ADN visual (resumen):** paleta abismo `#02060c → #050d18 → #081726 → #0e2433
→ #15384a` + **UNA sola luz cálida ámbar `#f2b65a`** (con `#e0a24a`, `#b9772b`) +
óxido `#a04a30` + hueso `#ece4d2`. Tipografías self-host: **Jacquard 24**
(nombres/títulos), **EB Garamond** (cuerpo), **Pixelify Sans** (etiquetas/UI).
Pixel art con grid visible; marcos dorados con remaches; cajas = **placa de bronce
+ agua abisal, JAMÁS pergamino ni textura de papel**. Detalle completo en `CLAUDE.md`.

---

## 2 · Cómo se trabaja con Lucas

- **Mandatos autónomos**: Lucas da un mandato grande y espera que lo ejecutes
  entero, en automático, hasta un **reporte final**. No pidas OK entre pasos salvo
  que algo sea ambiguo Y riesgoso.
- **Guardarraíles innegociables:**
  1. Solo la rama **`v8-arquitectura`**. **JAMÁS `main`**, jamás merge a main.
  2. **Commit + push por fase** a `origin/v8-arquitectura` (respaldo; trabaja en 2 PCs).
  3. **Nada se borra.** Crudos SIEMPRE a `assets/img/_raw/`. El sitio viejo
     (`index-legacy.html` + `pages/`) NO se toca.
  4. **Verbatim con diff**: donde toques cerca de texto cultural, verificá que el
     `raw` embebido sea byte-idéntico al `@ENTIDAD` del `.txt`.
  5. **Vanilla estático**: HTML + CSS + JS clásico. Sin frameworks, sin npm, sin
     build, sin módulos ES, sin `fetch()` como requisito. Namespace `window.Grimorio`.
     Rutas **relativas**.
  6. **Ambigüedad riesgosa** (borrar, pisar, reinterpretar orden) → elegí la opción
     **reversible** y anotala en el reporte; no te detengas.
  7. **`pendientes.md` al día** con todo lo que quede.
- **2 PCs**: `git pull` antes de empezar, `git push` al terminar cada fase.
- **El QA final es de Lucas**: su **ojo** (imágenes) y su **oído** (sonido) mandan.
  El criterio es **perceptual, no el KB** — si algo se ve/oye mal, se arregla aunque
  "el peso esté bien".
- **Correr local**: `python -m http.server 8000` desde la raíz → http://localhost:8000/
  (para el celu de Lucas: `http://<IP-LAN>:8000/`, ojo con el firewall del puerto).
- **Herramientas Python offline en `herramientas/` están permitidas**; el sitio
  publicado no depende de ellas.

---

## 3 · Arquitectura real del sitio (rutas exactas)

**Dos sistemas en el repo:**
- **Sitio viejo (NO SE TOCA)**: `index-legacy.html` + `pages/*.html` + su CSS/JS
  (`assets/css/tokens|base|layout|components|pages|responsive.css`,
  `assets/js/app.js`, `navigation.js`, `search.js`, `filters.js`,
  `assets/js/data/*`, `components/*`, `pages/*`). Es la consulta clásica; intacto.
- **Sistema nuevo (donde se trabaja)** — «el camino del mito»:

### El camino (páginas separadas, un capítulo por página)
- `index.html` — inicio: superficie (Chiloé de noche) + **umbral del Capítulo 1**
  (tarjeta + «Abordar»). El umbral lo pinta `assets/js/pages/portada-capitulos.js`
  con el **primer capítulo publicado** de `capitulos.js`.
- `<id>.html` (raíz) — cada capítulo es su ficha (`caleuche.html`, `pincoya.html`,
  `trauco.html`, `invunche.html`, `camahueto.html`). Al cerrar, el bloque «El camino
  continúa» lleva al **siguiente** (por orden `n`); tras el último → `lecho.html`.
- `lecho.html` — fin del camino: la columna + el lecho con las puertas al archivo viejo.
- **Orden actual (n=1..5):** Caleuche → Pincoya → Trauco → Invunche → Camahueto.

### `capitulos.js` = ÚNICA fuente de verdad data-driven
`assets/js/data/capitulos.js` → `window.Grimorio.portada = { fin, musicaInicio,
actos:[…], capitulos:[…] }`. Cada capítulo declara: `id, n, acto, nombre, alias,
gancho, tags, verbo, href, estado("publicado"|"sellado"), img, ventana/ventanaMovil,
brillo, atmosfera, musica`. **Agregar un capítulo NO toca HTML/CSS**: se agrega el
objeto (con su `<id>.html` generado) y el umbral/carta/sonda/orden se acomodan solos.
**Guía paso a paso: `COMO-AGREGAR-CAPITULO.md`.** Textos culturales (`nombre/alias/
gancho`) VERBATIM del `@ENTIDAD`; `verbo/labelSonda/ventana` son UI.

### Motor de fichas (genérico, NO se edita por criatura)
- `assets/js/ficha.js` + `assets/css/ficha.css` — el motor. Lee `window.FICHA =
  { raw, prosa, cierre, publicadas }` embebido en cada `<id>.html`. Campo ausente
  en el `@ENTIDAD` → su sección no se renderiza.
- **Los `<id>.html` los GENERA `herramientas/generar_fichas.py`** desde el `.txt`
  (parser 1:1) + `contenido/prosa/<id>.txt` (prosa curada a mano) +
  `herramientas/plantilla_ficha.html`. El `raw` embebido es **byte-idéntico** al
  bloque `@ENTIDAD` (la regla sagrada automatizada; el script lo verifica con diff).
  No edites los `<id>.html` a mano: cambiá la fuente y **regenerá**.

### Chrome del camino
- `assets/js/camino.js` + `assets/css/camino.css` — botonera fija, carta de
  capítulos (`<dialog>`), bloque «El camino continúa», y la **bruma** entre páginas.
- **Botonera** (primera en el orden de teclado): **Capítulos** (abre la carta con
  las 68: publicadas enlazadas + selladas sin enlaces muertos) · **Movimiento**
  (pausa toda animación, persiste `grimorio:motion`) · **Sonido** (§5) + slider.
- **Profundímetro**: la sonda/relleno lateral marca la profundidad en "brazas"
  (`portada.js`, decorativo).

### Transiciones de bruma + FIX del bfcache (NO lo reintroduzcas)
Al hacer clic en un enlace `[data-transicion]`, `camino.js` baja un velo de niebla
(`.bruma.is-activa`) y navega. **BUG REAL que se arregló:** al volver con el botón
«atrás» del navegador, el **bfcache** restauraba la página *con el velo aún activo*
(`pointer-events:auto`) → pantalla oscurecida y **todos los clics muertos** (parecía
que «Siguiente» no funcionaba). El fix (en `camino.js`, listener `pageshow`, ~línea
300) **limpia el velo SIEMPRE** en `pageshow` (`bruma-in` + `is-activa`), y hay una
red de seguridad que lo levanta solo a los ~3s. Si tocás la bruma, no rompas esto.

### GOTCHA de rutas (causó bugs reales)
- `url()` **dentro de un CSS** se resuelve **relativo al archivo CSS** (`assets/css/`)
  → los fondos y variables `--img-*` van con **`../img/…`**.
- Un `<img>` dentro de un HTML de la **raíz** va con **`assets/img/…`**.
  Confundirlos = fondos/imágenes rotas.

---

## 4 · Pipeline de imágenes (crítico, con los porqués)

Herramienta: **`herramientas/normalizar_img.py`** (Pillow). Reglas **codificadas**
(no las cambies sin pedido):

- **Heroes enmarcados** (`--slot hero`, y `card`): **grid 3 + 96 colores**
  (`--grid 3 --colors 96`, defaults). *Por qué 96 y no 48*: a 48 colores la
  cuantización **aplanaba los degradés** (el rayo de luz del Trauco perdía dirección);
  96 los conserva **al mismo peso** (WebP absorbe la paleta extra). Grid downscale
  NEAREST → el CSS agranda con `image-rendering: pixelated`.
- **Fondos FULL-VIEWPORT** (`--slot portada|fondo|descenso|cierre`): **1800px por el
  lado mayor, COLOR PLENO, JAMÁS grid-reduction ni cuantización** (solo sello + LANCZOS
  + WebP q90). *Por qué*: hubo una **regresión real** — fondos servidos ultra-
  comprimidos con posterización visible que **Lucas detectó a ojo**; se restauraron
  desde `_raw/` y la regla quedó **codificada** en el script (`FULLVIEW`, `FULLVIEW_MAX=1800`).
  **El criterio de aceptación es VISUAL a pantalla completa, no el peso.**
- **Sello ✦ de Gemini**: Gemini estampa una estrella en la **esquina inferior
  derecha** (posición fija; p. ej. detectada ~2511,1295 en los crudos 2752px,
  ~1726,931 en los heroes 1800px). El script la **detecta por brillo** y la tapa con
  un **degradado radial a negro del propio diseño** (penumbra natural) — **nunca un
  parche/manchón duro**. Los prompts a Gemini reservan esa esquina oscura y vacía.
- **Crudos SIEMPRE respaldados en `assets/img/_raw/`.** Manifiesto y regla de oro:
  `assets/img/README.md`.
- **Flujo de ingesta**: Lucas tira descargas con nombres feos en `entrada/` (bandeja
  local ignorada por git). Se identifican por **formato + contenido** (hoja de contacto),
  se propone el **mapeo** (archivo → `<id>-<slot>`), y se procesan a `assets/img/`.

**`normalizar_img.py` — flags clave:**
`crudo.png --id <id> --slot hero|descenso|cierre|card|portada|fondo` → `<id>-<slot>.webp/.png`.
`--out <nombre>` (para fondos históricos `portada-*`/`fondo-*`), `--sin-png`
(no regenerar el PNG de fallback), `--forzar` (sobrescribir), `--grid`/`--colors`,
`--contacto IMG…` (hoja de comparación, no toca `assets/img/`).

**`generar_fichas.py`** — `.txt` + `contenido/prosa/<id>.txt` + plantilla →
`<id>.html` (solo los de `herramientas/publicadas.txt`) + `assets/js/data/indice.js`
(las 68) + `herramientas/pendientes.md`. Verifica verbatim con diff. Flags:
`--solo <id>`, `--todas` (solo reporte).

---

## 5 · Sistema de sonido — estado exacto (COMPLETADO)

Un **solo botón «Sonido»** enciende/apaga TODO; un **slider** ajusta el volumen
maestro. **Off por defecto, jamás autoplay**, arranca con gesto, preferencia
persistente (`grimorio:audio`). Dos capas por el mismo low-pass de profundidad y el
mismo master:

### (a) Atmósfera procedural — `assets/js/sonido.js` (Web Audio, cero archivos)
Una **receta de reino** por capítulo, construida/destruida al entrar/salir con
crossfade. Recetas (en `RECETAS`): `superficie`, `niebla` (Caleuche: mar lejano +
fiesta insinuada), `mar-adentro` (Pincoya, subacuático), `bosque` (Trauco),
`espesura` (Fiura, reservada), `cueva` (Invunche), `tormenta` (Camahueto),
`abismo` (lecho). Se asigna con el campo **`atmosfera`** en `capitulos.js` (si falta,
se deriva de la zona del acto). **Low-pass ligado a la profundidad del scroll**
(más hondo = todo más apagado). Perillas: `assets/js/config.js → audio`
(`volumen`, `lowpass`, `atmosferas:{…}`).

### (b) Música de fondo por capítulo — HECHO (commit `a910b26`)
- **6 pistas** (Pixabay) en `assets/audio/musica-<pista>.ogg` + `.mp3`:
  `main` (inicio), `caleuche`, `pincoya`, `trauco`, `invunche`, `camahueto`.
- Procesadas con **`herramientas/audio_pipeline.py`** (necesita **ffmpeg**;
  ver §8): loudness **−18 LUFS** de dos pasadas, silencios recortados, **loop sin
  costura** (auto-crossfade cola→cabeza), OGG q5 + MP3 q5 de respaldo. Pistas largas
  **capadas a 120s** (`MAXLOOP`, por memoria móvil): `trauco` y `camahueto`.
- **Capa de música POR DEBAJO de la atmósfera** en `sonido.js`: `<audio>` en
  **streaming** (memoria acotada) ruteado por Web Audio; buses `atmBus` + `musicaBus`
  bajo el low-pass de profundidad y el master. Asignación por campo **`musica`** en
  `capitulos.js`; página de inicio usa `portada.musicaInicio: "main"`. **Lazy load**:
  solo la pista del capítulo actual + prefetch de la siguiente.
- **CALEUCHE INTERMITENTE** (fiel al mito): no loopea continuo — **fade-in ~5s →
  suena 40–60s → fade-out ~6s → silencio 30–50s (aleatorio) → vuelve**, con
  **low-pass de distancia (1200Hz) + eco** = fiesta lejana entre la niebla. Tiempos
  en `config.js → audio.caleuche`.
- **SLIDER de volumen maestro** (`camino.js` + `camino.css`): `input range` nativo,
  **curva perceptual (ganancia = valor²)**, persistencia en `grimorio:volumen`
  **separada del on/off**, estilo placa de bronce (riel abisal, perilla ámbar),
  **≥44px** táctil, foco ámbar. En móvil se **despliega al encender** el sonido.
  Slider en 0 = silencio real.
- Perillas de afinación: `config.js → audio` (`volumenMusica`, `volumenMaestroDefault`,
  `musica:{ajuste por pista}`, `caleuche:{…}`). Diagnóstico en consola:
  `Grimorio.sonido.estado()`.

**Lo que se verificó**: mecanismo completo (default off, encender→atmósfera+música
por página, slider perceptual+persistente, 0=silencio, Caleuche: el `<audio>`
reproduce y la envolvente sube 0→pico, móvil ok, consola limpia). **Lo que NO se
pudo verificar (Chrome headless no tiene salida de audio real)**: el **timbre/mezcla
audibles** y **2 ciclos completos** del Caleuche → eso lo prueba Lucas con auriculares
y afina con las perillas. **Créditos**: `CREDITOS-AUDIO.md` — falta que Lucas complete
título/autor de cada pista (los MP3 no traían metadatos; no se inventan).

---

## 6 · Estado git (verificado)

- **Rama:** `v8-arquitectura`. Árbol **limpio**. **Sincronizado con origin (0/0).**
- **Último commit:** `4462107` — «Documento de continuidad: ESTADO-DEL-PROYECTO.md».
- **Últimos 10 commits:**
  1. `4462107` — ESTADO-DEL-PROYECTO.md (foto para retomar desde cualquier PC).
  2. `a910b26` — **Banda sonora por capítulo** (6 pistas −18 LUFS, capa música,
     Caleuche intermitente, slider, CREDITOS-AUDIO.md).
  3. `32126d3` — Postulación (frente cerrado): sección 11 equipo de tres + datos reales.
  4. `ecd71d8` — Deploy-prep: URL de Pages en canonical/og/sitemap/robots/404; `_entrada-audio` ignorado.
  5. `bf7e051` — Postulación final alineada al formulario del fondo (secciones 10/11/12).
  6. `6366d09` — Sonido por capítulo (campo `atmosfera`, recetas procedurales, perillas).
  7. `244df70` — Documento de postulación (mockup imprimible A4 con capturas reales).
  8. `2b6a726` — Análisis estructural (qué escala / qué cruje).
  9. `783c3fc` — Cajas de variantes expandibles (a11y).
  10. `fb4cdde` — `config.js` centraliza afinación + `COMO-AGREGAR-CAPITULO.md`.

---

## 7 · Inventario de pendientes técnicos (por prioridad)

- **(a) Audio — COMPLETADO** (commit `a910b26`). Lo único que falta es de Lucas:
  escuchar y afinar volúmenes en `config.js`, y completar título/autor en
  `CREDITOS-AUDIO.md`.
- **(b) LA FIURA como Capítulo VI** — sus **crudos están en `_raw/`**
  (`fiura-hero.png`, `fiura-descenso.png`, `fiura-cierre.png`) y en `entrada/`.
  Falta: normalizar (hero→grid; descenso/cierre→full-viewport) con `normalizar_img.py`,
  curar `contenido/prosa/fiura.txt` **verbatim** del DEFINITIVO, agregar `fiura` a
  `herramientas/publicadas.txt`, `generar_fichas.py`, y agregar el objeto a
  `capitulos.js` (atmósfera `espesura` ya existe; asignarle `musica` si Lucas trae pista).
- **(c) Portadas de capítulo faltantes**: `invunche` y `camahueto` usan su **hero
  provisional** como fondo del umbral (`img: "invunche-hero"`/`"camahueto-hero"` en
  `capitulos.js`); faltan `portada-invunche`/`portada-camahueto` por generar en Gemini.
  (`portada-caleuche/pincoya/trauco` sí existen.) Backlog de UI/imágenes en `pendientes.md`.
- **(d) Deploy a GitHub Pages** — listo pero **PARQUEADO**: el plan gratuito no sirve
  Pages en repos privados → hay que hacer el repo **público** (decisión de Lucas).
  URL prevista `lukas-paredes.github.io/grimorio-del-archipielago` ya cableada.
  Guía: **`DEPLOY.md`**. El dominio `.cl` propio puede esperar. No urgente.
- **(e) Todo lo de `herramientas/pendientes.md`** (backlog vivo, autogenerado).

**⚠️ EL FRENTE DE POSTULACIÓN ESTÁ CERRADO/CONGELADO.** `postulacion/` NO se toca
(ni regenerar PDFs) salvo pedido explícito de Lucas.

---

## 8 · Lecciones / gotchas que te ahorran dolor

- **El criterio perceptual manda sobre el peso** (imágenes y sonido). Si Lucas dice
  que se ve/oye mal, se arregla; no discutas con el KB.
- **Las capturas de pantalla del entorno (preview) a veces se cuelgan o la pestaña
  se recarga/deriva sola** → verificá por **DOM** (`preview_eval` sobre el estado)
  y hacé los tests **deterministas en UN solo eval** (no repartidos en varios, o
  caés en estados distintos). No metas `location.replace()` dentro del mismo eval
  que después lee el DOM (mata el contexto).
- **bfcache** (ver §3): el velo de bruma quedaba pegado al volver «atrás». No lo
  reintroduzcas; `pageshow` debe limpiar SIEMPRE.
- **Chrome headless no tiene salida de audio real** → el analizador puede leer 0 aunque
  el grafo esté bien. Verificá estructura/estado, no "energía".
- **localhost vs IP para el móvil**: Lucas prueba en el celu con `http://<IP-LAN>:8000/`;
  puede requerir abrir el **puerto 8000 en el firewall** de Windows.
- **OneDrive** (el repo vive en `…/OneDrive/Documentos/…`) puede pelear con git /
  bloquear archivos en el PC de Lucas. Si ves rarezas de índice, es eso.
- **Un repo por PC**: hubo un **clon duplicado** en la otra PC. Confirmá que estás en
  el repo correcto y `git pull` antes de tocar nada.
- **`ffmpeg` NO está instalado** ni sale por pip (SSL roto). `urllib` sí baja: se usó
  un binario estático (`imageio-binaries` ffmpeg 4.2.2) a scratchpad, no versionado.
  Para reprocesar audio: conseguí ffmpeg y pasá `--ffmpeg <ruta>` a `audio_pipeline.py`.
- **No asumas que existe un archivo porque un commit lo menciona** — verificá con
  `ls`/lectura antes de recomendarlo o tocarlo.
- **CRLF/LF**: git avisa "LF will be replaced by CRLF"; es normal (`.gitattributes`
  normaliza a LF en el repo). No es un error.

---

_Documentos guía en la raíz: `CLAUDE.md` (reglas, manda sobre todo),
`ESTADO-DEL-PROYECTO.md` (foto general), `COMO-AGREGAR-CAPITULO.md`, `DEPLOY.md`,
`CREDITOS-AUDIO.md`, `HORIZONTE-RELATO.md` (visión futura, bloqueada), y
`herramientas/pendientes.md` (backlog vivo)._
