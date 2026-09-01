# MAPA-PROYECTO — El Grimorio del Archipiélago

**El plano permanente del proyecto entero.** Si sos una sesión nueva de Claude
Code (o una persona nueva), esto es lo PRIMERO que se lee: el todo. Después:
la última migración en `_handoff/migraciones/` (el ayer) y `_handoff/HANDOFF.md`
(el detalle). La orden de apertura exacta está en `_handoff/PROTOCOLO.md`.
Actualizado: 2026-07-11.

---

## 1 · QUÉ ES

**El Grimorio del Archipiélago** es un archivo digital y recorrido cultural
dedicado a la difusión y puesta en valor de figuras, relatos, memorias,
relaciones y fuentes del imaginario de Chiloé y su entorno insular. Se
presenta como **archivo cultural, consulta pública y mediación cultural** —
NO como videojuego, Pokédex, dashboard ni clasificación oficial.

- **La forma:** un descenso. El visitante baja desde la superficie del mar
  hasta el lecho del archipiélago, capítulo a capítulo, criatura a criatura.
- **El alma visual:** editorial marítima, gótico insular, museo nocturno,
  dark fantasy en pixel art. Mar, niebla, bosque, bronce y óxido. UNA sola
  luz cálida ámbar (#f2b65a) sobre paleta abisal (#02060c→#15384a). Sin
  pergamino ni papel en el sistema nuevo: placas de bronce y agua abisal.
- **El público:** consulta pública general + mediación cultural del
  territorio (Chiloé, Calbuco, Maullín).
- **Lenguaje:** la capa interactiva es «relato interactivo» o «recorrido
  narrativo». Jamás «juego», «RPG», «niveles», «quests».

## 2 · LA REGLA SAGRADA (filosofía editorial)

1. **Nada inventado.** Ni relatos, ni fuentes, ni testimonios, ni citas, ni
   fechas, ni páginas, ni territorios. Lo que no está en la fuente, no existe
   en el sitio.
2. **Verbatim.** El texto cultural se copia literal de su fuente (corpus,
   DEFINITIVO, dossier, papers), con ortografía de época intacta cuando es
   documento histórico. Marcas `[¿palabra?]`/`[ilegible]` se muestran tal cual.
3. **Variantes se muestran, jamás se zanjan.** Las discrepancias entre
   fuentes legítimas (cifras del proceso, luz del macuñ, forma del challanco,
   penas) son material narrativo: todas con su fuente, en tono que invite a
   habitar la incertidumbre. Un dato SIN fuente que contradice a las fuentes
   es ERROR y se corrige (precedente: el caso «Cavada»).
4. **Estatus siempre diferenciado:** tradición documentada · variante ·
   interpretación curatorial · antecedente histórico · recreación artística ·
   pendiente de verificación. La etiqueta curatorial del testimonio de 1880
   es obligatoria y nunca dice «tradición documentada».
5. **Verificación contra el original:** toda cita académica lleva
   (Autor, año, p. X) cotejada contra el PDF/txt archivado en el repo; lo no
   verificable queda `[por verificar]` y NO se publica.
6. Detalle y decisiones fechadas: `CLAUDE.md` → sección **Decisiones**.

## 3 · ARQUITECTURA TÉCNICA

HTML estático + CSS modular + JS clásico. **Sin frameworks, sin npm, sin
backend, sin build.** Se sirve con `python -m http.server 8000` desde la raíz.
Rutas relativas (funciona en local y en subruta). Namespace global:
`window.Grimorio`. Sin módulos ES, sin `fetch()` estructural.

**Conviven DOS sistemas:**

- **Sitio antiguo (consulta; NO se toca):** `index-legacy.html` + `pages/*`
  + `assets/js/pages/*` (home, bestiary, worlds, journey…) + `assets/js/`
  (app, navigation, search, filters, journey-reveal) + `assets/js/data/`
  (figures, worlds, variants, relationships, sources, illustrations).
- **Sistema nuevo (donde se trabaja):** el camino del mito.
  - `index.html` — portada-descenso (superficie → umbral del Cap. I →
    columna → lecho), pintada por `assets/js/portada.js` +
    `assets/js/pages/portada-capitulos.js` (umbral = primer capítulo
    publicado).
  - **Modelo de datos** (`assets/js/data/capitulos.js`, curado A MANO):
    `actos[]` (los Libros del DEFINITIVO: numeral, título, zona, y opcional
    `umbral {img, bajada}`) → `capitulos[]` (cada uno = UNA entidad:
    `id` = @ENTIDAD = `<id>.html` = prefijo de imágenes; `n` = orden del
    descenso; `acto`; `estado` publicado/sellado; `atmosfera`; `musica`;
    `img`; `puente` opcional). `indice.js` (generado) = las 68 entidades.
  - **Motor compartido:** `camino.js` (chrome universal: botonera, carta de
    capítulos, «El camino continúa» con encadenado por `n`, umbral de acto al
    cruzar de Libro, bruma entre páginas con fix bfcache) · `ficha.js`
    (parsea `window.FICHA.raw` @ENTIDAD y pinta la ficha; doble columna
    mito‖testimonio si hay `@TESTIMONIO`; Lecturas si hay `@LECTURAS`;
    vitrina del capítulo si hay `galeria`) · `sonido.js` (atmósfera
    procedural por reino + música por capítulo, Caleuche intermitente,
    slider maestro v²) · `config.js` (perillas).
  - **Fichas config-driven:** cada criatura es `<id>.html` en la raíz con su
    `window.FICHA` embebido. Las GENERA `herramientas/generar_fichas.py`
    (inputs: corpus + `contenido/prosa/<id>.txt` + `plantilla_ficha.html` +
    `publicadas.txt`; el set `BESPOKE` protege páginas a mano). **No se
    editan a mano: se regenera.**
  - **Página bespoke (excepción declarada):** `juicio-1880.html` («El
    Expediente») + `assets/css/expediente.css`. Su texto viene del maestro
    `fuentes/proceso-ancud-1880.md`.
- **Flujo de trabajo típico:** editar corpus/prosa → `python
  herramientas/generar_fichas.py` → verificar en server local → commit.
  Guía paso a paso: `COMO-AGREGAR-CAPITULO.md`.

## 4 · MAPA DE CARPETAS («si buscás X, está en Y»)

```
/                       fichas <id>.html (generadas) · juicio-1880.html (bespoke)
├─ index.html           portada-descenso (sistema nuevo)
├─ index-legacy.html    sitio antiguo (consulta; intocable)
├─ lecho.html           fin del camino · 404.html
├─ MAPA-PROYECTO.md     ESTE archivo (el todo)
├─ CLAUDE.md            constitución + Decisiones fechadas
├─ CHANGELOG.md         hitos cronológicos del proyecto
├─ HANDOFF-CODE.md      guía de arranque para Code (snapshot 07-09 + delta)
├─ COMO-AGREGAR-CAPITULO.md · DEPLOY.md · CREDITOS-AUDIO.md · README.md
├─ ESTADO-DEL-PROYECTO.md · HORIZONTE-RELATO.md · PLAN-*.md (planes de obra)
├─ assets/
│  ├─ js/               motor (camino, ficha, sonido, portada, config)
│  │  ├─ data/          capitulos.js (CURADO A MANO) · indice.js (generado)
│  │  │                 + datos del sitio viejo (figures, worlds…)
│  │  └─ pages/         renderizadores (portada-capitulos = nuevo; resto = viejo)
│  ├─ css/              por responsabilidad: ficha, camino, portada,
│  │                    expediente (bespoke), fuentes, tokens, legacy…
│  ├─ img/              imágenes NORMALIZADAS (webp+png por par)
│  │  └─ _raw/          crudos originales (NUNCA se borran)
│  ├─ audio/            musica-<id>.ogg/.mp3 (6 pistas, -18 LUFS, loop)
│  └─ fonts/ icons/     tipografías self-host · favicons
├─ contenido/
│  ├─ El_Grimorio_Datos_Estructurados.txt   corpus: 68 bloques @ENTIDAD…@FIN
│  ├─ El_Grimorio_del_Archipielago_DEFINITIVO.txt  grimorio literario (Libros)
│  └─ prosa/<id>.txt    prosa curada por ficha (@DESCRIPCION/@INTERPRETACION/
│                       @ORIGEN-MITO/@TESTIMONIO/@LECTURAS/@CIERRE)
├─ fuentes/             LA BIBLIOTECA (todo lo citable vive aquí)
│  ├─ proceso-ancud-1880.md   dossier MAESTRO del juicio (verbatim + aparato)
│  ├─ _raw/             MC0033459.pdf (folleto 1908) + OCR crudo
│  │  ├─ lecturas/      papers verificados (pdf+txt, autor-año-título)
│  │  └─ prensa/        REGISTRO-PRENSA.md (rastreable: descargado/localizable)
│  ├─ lecturas/         lecturas-recta-provincia.md (bibliografía + evaluación)
│  └─ bibliografia/     MATRIZ-CITAS.md (mapa de solidez documental ✅⚠️❌)
├─ herramientas/        OFFLINE (no son build): generar_fichas.py ·
│                       normalizar_img.py · audio_pipeline.py ·
│                       verificar_prosa.py · plantilla_ficha.html ·
│                       publicadas.txt · pendientes.md (backlog GENERADO)
├─ docs/                documentación de trabajo (arquitectura, curaduría,
│  └─ propuestas/       bandeja de PDFs de Lucas (SIN trackear; candidatas
│                       promovibles bajo filtro — CLAUDE.md Decisiones)
├─ _handoff/            traspaso entre sesiones/máquinas
│  ├─ HANDOFF.md        foto de la última sesión
│  ├─ PROTOCOLO.md      órdenes de APERTURA y CIERRE
│  └─ migraciones/      MIGRACION-AAAA-MM-DD.md (historial, uno por cierre)
├─ entrada/ _entrada-audio/   bandejas locales (gitignoradas)
├─ pages/ demo/ legacy/       sitio antiguo y archivo
└─ postulacion/         fondo Puente Chacao (ENVIADA — congelado, no tocar)
```

## 5 · PIPELINE DE IMÁGENES

- **ADN visual:** pixel art dark fantasy, grilla visible, sin antialiasing.
  Paleta abisal #02060c→#15384a + óxido #a04a30. UNA sola luz ámbar #f2b65a,
  sin lámpara/vela visible (brillo interior). Esquina inferior derecha
  despejada (ahí va el sello ✦). Tipografías: Jacquard 24 (display),
  Pixelify Sans (UI), EB Garamond (cuerpo) — self-host.
- **Flujo:** Gemini genera (prompts con el ADN) → crudo a `assets/img/_raw/`
  (se conserva SIEMPRE) → `herramientas/normalizar_img.py` produce el par
  webp+png en `assets/img/` → el generador los cablea por NOMBRE.
- **Slots por ficha** (`<id>-<slot>`): `hero` 16:9 (portal full-bleed) ·
  `lamina` 2:3 retrato (pieza enmarcada; fallback de hero) · `descenso` 9:16
  (fondo del cuerpo, se funde a negro al bajar) · `cierre` 16:9 · `card` 1:1.
  Umbrales de portada: `portada-<id>` (o el hero como provisional).
  Reino no-mar sin arte propio → fondos neutros (nada de naufragio heredado).

## 6 · ESTADO ACTUAL DEL CONTENIDO (2026-07-11)

**El descenso (12 paradas publicadas, `n` PROVISIONAL hasta CAMINO-DEL-MITO):**

| n | Capítulo | Acto (Libro) | Nota |
|---|---|---|---|
| I | El Caleuche | Tercero | música intermitente |
| II | La Pincoya | Segundo | |
| III | El Trauco | Cuarto | |
| IV | El Invunche | **Octavo** | abre la Recta Provincia |
| V | La Cueva de Quicaví | Octavo | piloto: lámina + mito‖testimonio |
| VI | La Recta Provincia | Octavo | HUB + vitrina (7 piezas) + Lecturas |
| VII | El Brujo chilote | Octavo | lámina |
| VIII | El Macuñ | Octavo | mito‖testimonio + Lecturas |
| IX | El Challanco | Octavo | Lecturas |
| X | La Voladora | Octavo | Lecturas |
| XI | El Camahueto | Quinto | movido antes del clímax |
| XII | **El juicio de Ancud de 1880** | Octavo | BESPOKE: Expediente + Epílogo (absolución verbatim) + Lecturas → lecho |

Umbral de entrada del Libro Octavo (boca de la cueva) al cruzar de acto.
El resto de las 68 entidades: selladas en la carta. Fiura: crudos en `_raw/`
sin montar. Sin `-descenso` propios aún los 7 del bloque (prompts listos).

## 7 · EL SISTEMA DE TRAZABILIDAD (quién guarda qué)

| Archivo | Qué guarda |
|---|---|
| **MAPA-PROYECTO.md** | El TODO permanente (este archivo) |
| **CLAUDE.md** | Constitución: reglas culturales/técnicas + Decisiones fechadas |
| **_handoff/migraciones/** | Un archivo por cierre de sesión: el AYER exacto |
| **_handoff/HANDOFF.md** | Foto detallada de la última sesión |
| **_handoff/PROTOCOLO.md** | Órdenes estándar de apertura/cierre (2 máquinas) |
| **CHANGELOG.md** | Hitos grandes, cronológicos |
| **fuentes/bibliografia/MATRIZ-CITAS.md** | Solidez documental por tema (✅⚠️❌) + direcciones a reforzar |
| **herramientas/pendientes.md** | Backlog GENERADO (editar en generar_fichas.py, no a mano) |
| **HANDOFF-CODE.md** | Arquitectura práctica para Code (gotchas de entorno incluidos) |

## 8 · CÓMO EMPEZAR UNA SESIÓN NUEVA

Usar la orden de APERTURA de `_handoff/PROTOCOLO.md`. En corto:
**1)** leer este MAPA (el todo) → **2)** la última migración en
`_handoff/migraciones/` (el ayer) → **3)** `_handoff/HANDOFF.md` +
`herramientas/pendientes.md` (el detalle) → **4)** `git status` + `git pull`
en `main` → **5)** reportar y ESPERAR el mandato de Lucas.
Trabajo solo en la rama actual; commit/push solo con mandato; nada se borra.
