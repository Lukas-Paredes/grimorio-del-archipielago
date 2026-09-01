# INVENTARIO — El Grimorio del Archipiélago

**Fecha:** 2026-08-31 · **Commit:** `dd27bc7` · **Nada fue modificado ni movido.**

---

# ⚠️ DOS COSAS ANTES DE SEGUIR

## A · El repositorio YA está en GitHub y es PÚBLICO — con tu teléfono dentro

Tu instrucción dice: *«Publica en GitHub como repositorio PRIVADO (contiene
material de postulación y datos personales; no debe ser público)»*.

El repositorio ya existe y **es público ahora mismo**:

```
origin  https://github.com/Lukas-Paredes/grimorio-del-archipielago.git
API sin autenticar  → HTTP 200   (privado daría 404)
GitHub Pages        → HTTP 200   (el sitio está EN LÍNEA)
```

`postulacion/POSTULACION-MOCKUP.html` **está trackeado**, y lo descargué sin
autenticarme desde `raw.githubusercontent.com` → **HTTP 200**. Cualquiera puede
bajarlo. Contiene:

| Dato | Dónde |
|---|---|
| Nombre completo (Lucas Ignacio Fidel Paredes Vásquez) | portada del anexo |
| Correo personal | portada del anexo |
| **Teléfono móvil** | portada del anexo |
| Comuna de residencia, universidades, fondo previo adjudicado | §11 Equipo |
| Estrategia completa de postulación, presupuesto de roles, hoja de ruta | §7, §11, §12 |

**El compromiso:** el plan gratuito de GitHub **no sirve Pages desde repos
privados**. Eso es exactamente lo que `ESTADO-DEL-PROYECTO.md` §5 describía como
bloqueo, y se resolvió haciendo el repo público. Si lo pasas a privado ahora, **el
sitio en `lukas-paredes.github.io` se cae**.

**Por eso la carpeta de Netlify que armamos vale más de lo que parecía:** desacopla
el sitio de la visibilidad del repo. La secuencia limpia es:

1. Subes `deploy-netlify` a Netlify → tienes URL viva e independiente.
2. Pasas el repo a privado → el sitio sigue arriba, los datos dejan de estar expuestos.
3. Actualizas `canonical`/`sitemap`/`robots` a la URL de Netlify.

*Nota honesta:* el archivo estuvo público un tiempo. Aunque lo hagas privado hoy,
conviene dar el teléfono y el correo **por ya expuestos** — pueden haber quedado en
cachés, forks o buscadores. No es alarma, es cómo funciona.

**No cambié la visibilidad.** Es un ajuste de tu cuenta y lo decides tú. Además
`gh` (GitHub CLI) no está instalado en esta máquina, así que se hace desde la web:
*Settings → General → Danger Zone → Change visibility*.

## B · Ya existe un documento maestro. `CONTEXTO_MAESTRO.md` lo duplicaría

Pediste que revisara antes de crear. Existe, y no es un README: es un **sistema de
trazabilidad de siete piezas**, escrito para exactamente lo que describes —que otra
sesión sin contexto se ponga a trabajar de inmediato.

| Archivo | Qué cubre de tu estructura pedida |
|---|---|
| **`MAPA-PROYECTO.md`** (12,5 KB) | Identidad · regla de fuentes · arquitectura · mapa de carpetas · pipeline de imágenes · estado del contenido · sistema de trazabilidad · cómo empezar una sesión |
| **`CLAUDE.md`** (9,2 KB) | Reglas culturales y técnicas · criterios de diseño · lenguaje · conceptos · **11 Decisiones fechadas** (justo tu sección «decisiones cerradas que NO se re-discuten») |
| `ESTADO-DEL-PROYECTO.md` | Estado actual · sonido · deploy · pendientes |
| `HANDOFF-CODE.md` (19 KB) | Convenciones de código y gotchas de entorno |
| `herramientas/pendientes.md` | Tabla de criaturas con estado — **generada**, nunca a mano |
| `CHANGELOG.md` | Hitos cronológicos |
| `_handoff/PROTOCOLO.md` | Órdenes de apertura y cierre de sesión entre tus dos máquinas |

`MAPA-PROYECTO.md` incluso abre diciendo: *«Si sos una sesión nueva de Claude Code
(o una persona nueva), esto es lo PRIMERO que se lee»*.

**Lo que SÍ falta** respecto de tu estructura, y es real:

| Sección pedida | Estado |
|---|---|
| Línea de financiamiento (fondos, plazos, requisitos, dónde están los documentos) | **NO EXISTE** en ninguna parte |
| Glosario de términos chilotes | Existe **dentro del corpus** (`DEFINITIVO.txt`, sección GLOSARIO), no como documento de trabajo |
| Tabla de criaturas con estado | Existe pero **generada** en `herramientas/pendientes.md` |
| Propuesta de valor / para quién | Existe pero disperso entre `MAPA-PROYECTO.md` y el anexo de postulación |

**Recomendación:** no crear `CONTEXTO_MAESTRO.md`. Añadir a `MAPA-PROYECTO.md` la
sección de financiamiento que falta y un puntero al glosario. Si aun así quieres el
archivo con ese nombre, que sea **un índice de una página** que apunte a los siete,
no una copia — o tendrás dos verdades que se contradicen en dos semanas.

---

# 1 · INVENTARIO

## 1.1 · Árbol (sin `.git`, sin binarios pesados)

```
grimorio-del-archipielago/
├── index.html                    portada-descenso (sistema vigente)
├── index-legacy.html             sitio antiguo · lecho.html · 404.html
├── 12 fichas .html               caleuche pincoya trauco invunche camahueto
│                                 cueva-quicavi recta-provincia brujo-chilote
│                                 macun challanco voladora juicio-1880
├── robots.txt · sitemap.xml · CNAME.placeholder
│
├── assets/
│   ├── css/      13 hojas (tokens base layout ficha camino portada
│   │             expediente fuentes atmosphere components journey pages responsive)
│   ├── js/       38 archivos — motor: camino ficha portada sonido config
│   │   ├── data/     capitulos.js (a mano) · indice.js mapa-datos.js
│   │   │             fuentes-datos.js (generados) · + datos del sitio viejo
│   │   └── pages/    portada-capitulos.js (nuevo) + 8 del sitio viejo
│   ├── img/      80 archivos = 41 piezas · + _raw/ (40 crudos, 205 MB)
│   ├── audio/    6 pistas × ogg+mp3
│   ├── fonts/    8 .woff2 self-host (Jacquard 24 · EB Garamond · Pixelify Sans)
│   ├── icons/    favicons
│   └── data/     chiloe-geo.json (377 KB) · mapa-preview.svg
│
├── contenido/                    EL CORPUS
│   ├── El_Grimorio_Datos_Estructurados.txt      68 bloques @ENTIDAD…@FIN
│   ├── El_Grimorio_del_Archipielago_DEFINITIVO.txt  10 Libros, 40 capítulos
│   └── prosa/                    12 .txt de prosa curada por ficha
│
├── fuentes/                      LA BIBLIOTECA
│   ├── proceso-ancud-1880.md     dossier maestro del juicio (40 KB)
│   ├── _raw/                     folleto 1908 + OCR · lecturas/ (8 papers
│   │                             pdf+txt) · prensa/ · geo/
│   ├── bibliografia/             fuentes.yaml (40 fuentes) + 5 .md
│   ├── investigacion/            geografia-cosmologia.md
│   └── lecturas/
│
├── herramientas/                 7 scripts Python OFFLINE + plantilla + listas
├── docs/                         arquitectura(6) curaduria(1) pruebas(1)
│   ├── handoff(2) pedagogia(VACÍA)
│   └── propuestas/               18 PDFs · 66 MB · SIN TRACKEAR
├── _handoff/                     21 archivos de continuidad entre sesiones
├── postulacion/                  anexo Puente Chacao + 13 capturas  ← TRACKEADO
├── pages/                        8 páginas del sitio antiguo
├── legacy/v7/                    HTML monolítico V7 + 2 docs
├── demo/                         prototipo superado (pergamino + CDN)
├── deploy-netlify/               carpeta de publicación · SIN TRACKEAR
└── entrada/ · _entrada-audio/    bandejas locales · gitignoradas
```

**344 archivos trackeados.**

## 1.2 · Stack técnico real (detectado, no declarado)

| | |
|---|---|
| Framework | **Ninguno.** HTML estático + CSS modular + JavaScript clásico |
| Build / bundler | **Ninguno.** Sin npm, sin `package.json`, sin `node_modules` |
| Backend / BD | **Ninguno.** Sin `fetch()` estructural, sin módulos ES |
| Namespace global | `window.Grimorio` |
| Servidor local | `python -m http.server 8000` desde la raíz |
| Tipografías | Self-host `.woff2` — Jacquard 24 (display), EB Garamond (cuerpo), Pixelify Sans (UI). Sin CDN |
| Audio | Web Audio API — atmósfera **procedural** (cero archivos) + 6 pistas de música |
| Datos | Archivos `.js` que asignan a `window.Grimorio.*`; carga perezosa por `<script>` inyectado |
| Herramientas | **Python 3** offline en `herramientas/` — no son cadena de compilación; el sitio publicado no depende de ellas |
| Dependencia externa de pago | **Ninguna.** Costo operativo = el dominio |

Un solo enlace saliente en todo el sitio: el `canonical` a GitHub Pages.

## 1.3 · Estado de cada ficha de criatura

**Corpus: 68 entidades. Publicadas y navegables: 12. Selladas: 56.**

| Criatura | Sección | Prosa | Publicada | Imágenes que tiene | Le falta |
|---|---|---|---|---|---|
| caleuche | 03-barcos-y-almas | sí | **sí** | hero | descenso · cierre · card |
| pincoya | 02-corte-del-mar | sí | **sí** | hero · descenso · cierre | card |
| trauco | 04-bosque | sí | **sí** | hero · descenso · cierre | card |
| invunche | 09-recta-provincia | sí | **sí** | hero · descenso · cierre | card |
| camahueto | 05-bestias | sí | **sí** | hero · descenso · cierre | card |
| cueva-quicavi | 09-recta-provincia | sí | **sí** | lámina | descenso · cierre · card |
| recta-provincia | 09-recta-provincia | sí | **sí** | hero | descenso · cierre · card |
| brujo-chilote | 09-recta-provincia | sí | **sí** | lámina | descenso · cierre · card |
| macun | 09-recta-provincia | sí | **sí** | lámina | descenso · cierre · card |
| challanco | 09-recta-provincia | sí | **sí** | lámina | descenso · cierre · card |
| voladora | 09-recta-provincia | sí | **sí** | lámina | descenso · cierre · card |
| juicio-1880 | 09-recta-provincia | — *(bespoke)* | **sí** | hero | — |
| **iniciacion** | 09-recta-provincia | **sí** | **NO** | lámina | Es la única con prosa y arte **sin publicar**: vive dentro de la vitrina de `recta-provincia`, no como ficha propia |
| Las otras 55 | — | — | — | — | todo |

**Cuellos de botella reales:**
- **8 de 12** publicadas no tienen `descenso` (9:16, el fondo del cuerpo en móvil).
- **8 de 12** no tienen `cierre`.
- **Ninguna de las 13** tiene `card` (1:1). El slot existe en el pipeline y está vacío en todo el proyecto.
- Fiura: crudos en `_raw/` sin normalizar ni montar.

## 1.4 · Assets gráficos

**41 piezas únicas · 80 archivos · 39 pares `webp`+`png` completos.**

| Formato | Peso |
|---|---|
| `.webp` (lo que sirve el navegador) | 2,4 MB |
| `.png` (respaldo del `<picture>`) | 39 MB |
| `_raw/` crudos originales, 40 archivos | **205 MB** — nunca se borran, nunca se publican |

**Anomalía única:** `motas-capa-1.png` y `motas-capa-2.png` **no tienen par webp**.
Son las dos únicas piezas sin normalizar del set. Se sirven a todos los visitantes
como PNG. Vale pasarlas por `normalizar_img.py`.

**20 piezas de sistema** (no ligadas a criatura): `portada-superficie`,
`portada-columna`, `portada-lecho`, `portada-niebla`, `portada-caleuche`,
`portada-pincoya`, `portada-trauco`, `fondo-mar`, `fondo-abismo`, `fondo-lecho`,
`cueva-vacia`, `archivo-ardiendo`, `indicador-plomada`, `recogida`,
`mota-ambar`, `mota-gris`, `mota-gris-chica`, `motas-sprite`, `motas-capa-1/2`.

**Falta:** umbrales de portada propios para `invunche` y `camahueto` (hoy usan el
hero como provisional) — está anotado en `herramientas/pendientes.md`.

## 1.5 · Documentos de texto

| Tipo | Dónde |
|---|---|
| **Corpus estructurado** | `contenido/El_Grimorio_Datos_Estructurados.txt` — 68 `@ENTIDAD`, 108 `FUENTE::`, 70 `ENLACE::`, 47 `VARIANTE::`, 21 `INTERPRETACION::`, 11 secciones |
| **Grimorio literario** | `contenido/El_Grimorio_del_Archipielago_DEFINITIVO.txt` — 10 Libros, 40 capítulos I–XL, + advertencia del archivero, 5 capítulos de contexto educativo, **glosario**, guía de lugares, apéndice de criaturas por venir, colofón |
| **Prosa curada** | `contenido/prosa/*.txt` — 12 archivos con flags `@DESCRIPCION` `@INTERPRETACION` `@ORIGEN-MITO` `@TESTIMONIO` `@LECTURAS` `@CIERRE` |
| **Fuente primaria** | `fuentes/proceso-ancud-1880.md` — transcripción verbatim del folleto de 1908 con aparato crítico |
| **Papers archivados** | `fuentes/_raw/lecturas/` — 8 en pdf+txt: Catepillan 2019, Hernández 2013, León 2016, Núñez 2022, Valenzuela 2014, Romo Sánchez, Ampuero 2016 (solo txt), estudio lingüístico-folklórico |
| **Investigación territorial** | `fuentes/investigacion/geografia-cosmologia.md` — 8 lugares ✅ verificados, 4 ⚠️ descartados por falta de fuente |
| **Notas sueltas** | `docs/arquitectura/` (6, de la planificación V8 de junio), `docs/curaduria/AUDITORIA_SIETE_MUNDOS.md`, `docs/pruebas/`, `PLAN-PORTADA-PRO.md`, `PLAN-SCRIPTS.md` |

## 1.6 · Documentos de postulación o financiamiento

Hay **uno solo**, y es el de la postulación anterior:

| Ruta | Qué es |
|---|---|
| `postulacion/POSTULACION-MOCKUP.html` | **Anexo técnico completo** del Fondo Cultura Puente Chacao — 12 secciones, 1,36 MB, 13 capturas en base64, formateado para imprimir a PDF A4. Fue declarada **inadmisible**. |
| `postulacion/capturas/` | Las mismas 13 capturas sueltas en JPG |

Las 12 secciones: 1 Resumen · 2 Dirección de arte · 3 Estructura de navegación ·
4 Prototipo pantalla por pantalla · 5 Ficha real del Caleuche · 6 Metodología y
compromiso documental · 7 Artistas locales y vitrina · 8 Accesibilidad · 9 Ficha
técnica · 10 Beneficiarios e impacto · **11 Equipo** · 12 Estado y hoja de ruta.

**NO existe en el repositorio:** ningún FUP, formulario, presupuesto, carta de
compromiso, ni borrador de Fondart, Fondo del Libro u otra línea. Tampoco un
documento que registre plazos, requisitos o a qué fondos apunta el proyecto.

**Advertencia de contenido:** el anexo describe **5 capítulos publicados**. Hoy son
**12**. Todo el material heredado subestima el estado real de la obra.

## 1.7 · Duplicados, versiones antiguas y basura

### Duplicados exactos (mismo hash)

| Copia redundante | Original | Peso |
|---|---|---|
| 7 PDFs en `docs/propuestas/` | ya archivados en `fuentes/_raw/lecturas/` con nombre canónico | ~25 MB |
| `docs/propuestas/…11780-28358-1-CE (1).pdf` | `…11780-28358-1-CE.pdf` — la descarga duplicada del navegador | — |
| `_handoff/El_Grimorio_Datos_Estructurados.txt` | `contenido/…` | 113 KB |
| `_handoff/El_Grimorio_del_Archipielago_DEFINITIVO.txt` | `contenido/…` | 197 KB |

Los 7 PDFs ya promovidos son: estudio lingüístico-folklórico, Romo Sánchez,
León 2016, Núñez 2022, Catepillan 2019, Hernández 2013, Valenzuela 2014.

### Copias DIVERGENTES — el riesgo real

`_handoff/` guarda versiones **viejas y distintas** de archivos vivos. No son
copias: son fotos de julio que ya no coinciden con el original. Si alguien las
edita creyendo que son las buenas, pierde trabajo.

| Copia en `_handoff/` | Original vivo | Diferencia |
|---|---|---|
| `ficha.js` | `assets/js/ficha.js` | 18,8 KB vs **32,1 KB** |
| `ficha.css` | `assets/css/ficha.css` | 29,2 KB vs **42,1 KB** |
| `portada.css` | `assets/css/portada.css` | 15,4 KB vs **23,7 KB** |
| `portada.js` | `assets/js/portada.js` | 3,9 KB vs 4,2 KB |
| `caleuche.html` | `caleuche.html` | 6,5 KB vs **14,5 KB** |
| `trauco.html` | `trauco.html` | 11,0 KB vs 14,0 KB |
| `index-portada.html` | `index.html` | 5,8 KB vs 6,0 KB |
| **`CLAUDE.md`** | `CLAUDE.md` | 3,9 KB vs **9,2 KB** — le faltan las 11 Decisiones fechadas |

El más peligroso es `_handoff/CLAUDE.md`: es la constitución **sin** las decisiones
editoriales. Una sesión que lea esa en vez de la de raíz opera con reglas viejas.

### Superado / archivo

| Ruta | Estado |
|---|---|
| `demo/` | Prototipo anterior al sistema actual. Usa **pergamino** (hoy prohibido por `CLAUDE.md`) y Cinzel desde **CDN de Google**. Su `LEEME.txt` pide imágenes que nunca se colocaron. |
| `legacy/v7/` | HTML monolítico V7 + 2 docs. Archivo histórico legítimo. |
| `docs/pedagogia/` | **Vacía** (solo `.gitkeep`) |
| `fuentes/bibliografia/MATRIZ-CITAS-manual-respaldo.md` | Versión manual previa de un archivo hoy generado |

### Sin trackear y **sin estar en `.gitignore`**

| Ruta | Peso | Riesgo |
|---|---|---|
| `docs/propuestas/` | **66 MB** | Un `git add .` los sube. 7 de los 18 ya están duplicados en `fuentes/` |
| `deploy-netlify/` | **58 MB** | Regenerable con un comando. Un `git add .` los sube |

Juntos: **124 MB** a un `git add .` de distancia de entrar al historial para siempre.

---

# 2 · PUBLICACIÓN EN GITHUB — ya está hecha

| Lo que pediste | Estado real |
|---|---|
| Crear `.gitignore` | **Ya existe.** Ignora `.DS_Store`, `Thumbs.db`, `.vscode/`, `.env*`, `__pycache__/`, `herramientas/contacto/`, `entrada/`, `_entrada-audio/`. Apropiado al stack. **Le faltan** `docs/propuestas/` y `deploy-netlify/` |
| Inicializar repo | **Ya inicializado**, con historial real |
| Commit inicial | Hay historial completo hasta `dd27bc7` |
| Publicar en GitHub | **Ya publicado** en `github.com/Lukas-Paredes/grimorio-del-archipielago` |
| Que sea **privado** | ❌ **Es público.** Ver bloque A |

**Ramas:** `main` y `v8-arquitectura` apuntan **al mismo commit** — cero divergencia,
local y remoto. Tu instrucción de trabajar siempre desde `main` no requiere ningún
merge: basta `git switch main`. Quedan cuatro documentos (`CLAUDE.md`,
`ESTADO-DEL-PROYECTO.md`, `MAPA-PROYECTO.md`, `_handoff/PROTOCOLO.md`) que dicen
«rama de trabajo `v8-arquitectura`, nunca `main`» y habría que corregir.

**Clonar y sincronizar desde otra máquina** (ya documentado en
`docs/handoff/WORKING_FROM_ANOTHER_PC.md`):

```bash
git clone https://github.com/Lukas-Paredes/grimorio-del-archipielago.git
cd grimorio-del-archipielago
python -m http.server 8000
```

Si lo pasas a privado necesitarás autenticación: GitHub Desktop, o `gh auth login`
(no está instalado aquí), o un Personal Access Token.

---

# 3 · DOCUMENTO MAESTRO — ver bloque B

No lo creé. Duplicaría `MAPA-PROYECTO.md` + `CLAUDE.md`, que ya cubren casi toda tu
estructura. Espero tu decisión entre:

- **(a)** Completar lo que falta dentro de los documentos que ya existen —
  financiamiento y glosario— y crear `scripts/actualizar_contexto.md` apuntando a
  ellos. *Recomendado.*
- **(b)** Crear `CONTEXTO_MAESTRO.md` como índice de una página que apunte a los
  siete, sin copiar contenido.
- **(c)** Crear `CONTEXTO_MAESTRO.md` completo como pediste, asumiendo que quedan
  dos fuentes de verdad que habrá que mantener sincronizadas.

---

# 4 · LO QUE ESPERA TU CONFIRMACIÓN

Nada fue borrado, movido ni modificado.

| # | Decisión |
|---|---|
| 1 | **¿Pasar el repo a privado?** Requiere subir antes a Netlify o el sitio se cae |
| 2 | ¿Agregar `docs/propuestas/` y `deploy-netlify/` al `.gitignore`? (124 MB) |
| 3 | ¿Borrar los 7 PDFs de `docs/propuestas/` ya duplicados en `fuentes/_raw/lecturas/`? |
| 4 | ¿Borrar las 8 copias divergentes de `_handoff/`, sobre todo `_handoff/CLAUDE.md`? |
| 5 | ¿Archivar `demo/` a `legacy/`? |
| 6 | ¿Cambiar a `main` y corregir las 4 menciones de rama? |
| 7 | Documento maestro: **(a)**, **(b)** o **(c)** |
| 8 | ¿Normalizar `motas-capa-1/2.png` para que tengan par webp? |
| 9 | Fondart Regional 2027 cierra el **9 de septiembre, 15:00**. ¿Retomamos el rescate del anexo de Chacao? |
