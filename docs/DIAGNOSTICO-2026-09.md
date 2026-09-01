# DIAGNÓSTICO — Fase 0

**El Grimorio del Archipiélago** · 2026-09-01 · rama `main`, commit `5ee6187`
Ejecutado en **solo lectura**. Este archivo es lo único que se escribió. Nada se
movió, renombró ni borró. Nada se commiteó.

> **Cómo leerlo.** El documento de arquitectura se escribió con conocimiento
> parcial del repositorio y dice que **el repositorio manda**. La sección 1 reúne
> todo lo que el repositorio contradice; las siguientes son el diagnóstico pedido.

---

## 1 · DONDE EL REPOSITORIO CONTRADICE AL DOCUMENTO

Once puntos. Los tres primeros afectan decisiones de fase, no detalles.

### 1.1 · La estrategia de ramas ya se decidió, y fue al revés

El documento (§3.1, fase 3 paso 1) dice renombrar `v8-arquitectura` a `desarrollo`
y usarla como rama de trabajo permanente. **El repositorio dice otra cosa.**

El 2026-09-01 se consolidó todo en `main`, se registró como decisión fechada en
`CLAUDE.md`, se corrigieron los cinco documentos que decían «nunca main» y se
publicó. El commit `5ee6187` es exactamente eso.

Y hay un dato que cambia el problema: **`v8-arquitectura` está completamente
fusionada en `main`.**

```
main            = 5ee6187  (2026-09-01)
v8-arquitectura = dd27bc7  (2026-07-13)
commits en v8 que main NO tiene: 0
commits que a v8 le faltan:      1
```

Por el criterio §5.1 del propio documento —«fusionada completamente en `main` →
eliminar»— `v8-arquitectura` **es candidata a eliminación, no a renombre**.
Renombrarla a `desarrollo` resucitaría una rama muerta y crearía una segunda línea
de trabajo donde hoy hay una sola.

**Tres salidas, y es decisión tuya:**

| | Qué implica |
|---|---|
| **A. Mantener `main` como rama única** *(recomendada)* | Es el estado actual y funciona. Se elimina `v8-arquitectura` por estar fusionada. El congelamiento de fase 2 se protege con la etiqueta y con no commitear, no con una rama aparte |
| **B. Crear `desarrollo` desde `main`** | Rama nueva desde `5ee6187`, no renombre. `v8-arquitectura` se elimina igual. Da la separación publicado/trabajo que busca el documento, al costo de gestionar dos ramas |
| **C. Renombrar `v8-arquitectura` a `desarrollo`** *(lo que dice el documento)* | Deja `desarrollo` **un commit por detrás de `main`** desde el día uno. Contradice §5.1 |

Hasta que decidas, sigo en `main` y no toco ninguna rama.

### 1.2 · `CLAUDE.md` ya existe, y es más de lo que pide la fase 1

Fase 1 paso 1 lo pide como archivo nuevo. Existe en la raíz, **178 líneas**, con
identidad del proyecto, reglas culturales, arquitectura, flujo git, criterios de
diseño, vocabulario, conceptos y **14 decisiones fechadas** con su porqué —
incluida la de rama del 2026-09-01.

Lo que la fase 1 pide y **sí** falta: el flujo por checkpoints y la regla de no
push sin aprobación. Son dos secciones a **agregar**, no un archivo a crear.

### 1.3 · `docs/` ya tiene contenido, y cinco documentos se solapan con entregables futuros

| Ya existe en `docs/` | Se solapa con |
|---|---|
| `ESTADO-VERIFICADO-2026-08.md` | las cifras que fase 1 paso 4 manda verificar |
| `SISTEMA-DE-FUENTES.md` | parte de `FORMATO-CORPUS.md` (fase 5) |
| `SISTEMA-VISUAL-Y-ARTE.md` | el inventario de arte de §2.5 y §4 |
| `INVENTARIO-2026-08.md` | parte de este diagnóstico |
| `GUIA-DE-CONTEXTO.md` | parte de `ARQUITECTURA.md` (fase 1) |

Más 10 documentos anteriores en `docs/arquitectura/`, `docs/curaduria/`,
`docs/handoff/`, `docs/pruebas/` y `docs/pedagogia/` (esta última **vacía**).

**Recomendación:** `ARQUITECTURA.md` debe referenciar estos documentos, no
reescribirlos, o quedan dos verdades que se contradicen en dos semanas.

### 1.4 · Trece de dieciséis rutas del esquema 3.3 no existen

| Existe | No existe |
|---|---|
| `fuentes/` · `herramientas/` · `docs/` | `motor/` · `datos/` · `datos/corpus/` · `arte/` y sus tres conjuntos · `sonido/` · `travesia/` · `pendientes/` · `postulaciones/` y sus dos hijas · `legado/` |

Dónde vive realmente cada cosa:

| Concepto | Ruta real |
|---|---|
| Corpus | `contenido/` (+ `contenido/prosa/`) |
| Arte | `assets/img/` (crudos en `assets/img/_raw/`) |
| Sonido | `assets/audio/` |
| Camino | `assets/js/data/capitulos.js` — **no** `camino.yaml` |
| Postulación anterior | `postulacion/` |

**El esquema 3.3 no es un ordenamiento: es una reorganización completa de
`assets/`**, que es donde apuntan todas las rutas del sitio. Dimensionado en §7.

### 1.5 · El legado SÍ tiene enlaces entrantes

§2.1 y fase 3 paso 4 lo dejan a lo que encuentre la fase 0. Encontró esto:

| Archivo | Enlaza a |
|---|---|
| `index.html` | `index-legacy.html` · `pages/metodologia.html` |
| `lecho.html` | `index-legacy.html` · `pages/bestiario.html` · `mundos` · `recta-provincia` · `cosmologia` · `metodologia` |
| `404.html` | `index-legacy.html` |
| `sitemap.xml` | `index-legacy.html` + las 5 páginas |
| `assets/js/camino.js` | `index-legacy.html` · `pages/metodologia.html` — **en el chrome universal, presente en todas las páginas** |

**Por la regla del propio documento, el legado se queda donde está.** No es
candidato a archivo. `lecho.html` —el final del recorrido narrativo— usa esas cinco
páginas como las puertas del archivo de consulta: mover el legado rompe el cierre
de la obra.

### 1.6 · `image-rendering: pixelated` no es simplemente global

§4.4 dice «hoy es global». Es más matizado, y la diferencia importa para el
encargo. Doce reglas en dos archivos — detalle completo en §4.

**Dos** son globales sobre `img`. **Diez** son sobre clases concretas, y de esas
**seis pintan arte**, no interfaz. Si una pieza pintada llega a `descenso` o
`cierre`, `img[data-arte]` no la salva: la pixelan `.descenso-bg` y `.cierre__bg`.

Coherente con `por_slot: {descenso: [referencia], cierre: [referencia]}` mientras
esos slots sigan en pixel art. **Deja de serlo el día que se comisione un fondo
pintado.**

### 1.7 · El corte del motor no es limpio

Fase 5 está condicionada a que la fase 0 muestre un corte limpio. **No lo es**, pero
el bloqueo está acotado a dos archivos. Detalle en §5.

### 1.8 · «36 criaturas pendientes» no se verifica

§2.8 lo da por hecho. El apéndice «Criaturas por venir» del grimorio literario lista
**21 nombres en 15 viñetas**. Ninguna cuenta da 36. Ya está registrado en
`docs/ESTADO-VERIFICADO-2026-08.md`. La cifra verificable equivalente es
**56 entidades por publicar** (68 − 12).

### 1.9 · Las 41 piezas se reparten distinto

§2.5 dice «19 por criatura, 20 de sistema, 2 sin par». El total cuadra; el reparto
no: son **21 por criatura y 20 de sistema**, y las 2 sin par WebP
(`motas-capa-1/2.png`) están **dentro** de las 20 de sistema, no aparte.

### 1.10 · `lamina` no está en el normalizador

§2.5 la lista como slot con medida fija. El generador la conoce
(`generar_fichas.py:37`) y el CSS también, pero `normalizar_img.py:37` define
`SLOTS` **sin** `lamina`: `--slot lamina` sería rechazado. Las 7 láminas existentes
son consistentes a 565×842 pero se produjeron por otra vía.

### 1.11 · Fechas

§1 dice envío «7 u 8 de septiembre»; el dato que consta de la convocatoria es
**cierre el 9 de septiembre a las 15:00**. No es contradicción —enviar antes del
cierre es lo sensato— pero conviene fijar cuál es la fecha operativa de fase 2.

---

## 2 · GIT

### Árbol

**Limpio.** Sin cambios sin commitear, sin archivos sin trackear fuera de lo
ignorado. Rama actual: `main`, sincronizada con `origin/main`.

### Ramas

| Rama | Commit | Fecha | Autor | Upstream | vs `main` |
|---|---|---|---|---|---|
| `main` | `5ee6187` | 2026-09-01 | Lukas-Paredes | `origin/main` | — |
| `v8-arquitectura` | `dd27bc7` | 2026-07-13 | Lukas-Paredes | `origin/v8-arquitectura` | **fusionada**; 1 commit por detrás |
| `origin/main` | `5ee6187` | 2026-09-01 | Lukas-Paredes | — | idéntica |
| `origin/v8-arquitectura` | `dd27bc7` | 2026-07-13 | Lukas-Paredes | — | **fusionada**; 1 por detrás |

**No hay ramas locales sin remoto ni remotas sin local.** No hay `exp/` ni
`hotfix/`. Total: 2 ramas, ambas con par local/remoto.

### Etiquetas

| Etiqueta | Commit | Fecha | ¿Ancestro de `main`? | ¿En el remoto? |
|---|---|---|---|---|
| `backup-main-pre-merge` | `62237e4` | 2026-06-24 | **Sí** | Sí |
| `pre-fondart-2027` | `dd27bc7` | 2026-07-13 | **Sí** | Sí |

No existe `fondart-2027-envio` ni `chacao-2026-envio`.

**Sobre `chacao-2026-envio`:** el `CHANGELOG.md` fecha el envío a Chacao en el
tramo «5-6 de julio de 2026 — Camino del mito + postulación cerrada», y
`HANDOFF-CODE.md` nombra el commit `32126d3` como «Postulación (frente cerrado):
sección 11 equipo de tres + datos reales». **Es el candidato**, pero el envío
pudo ocurrir en cualquier commit posterior. No lo doy por identificado sin que lo
confirmes.

### Publicación

**GitHub Pages sirve `main`**, verificado empíricamente: un archivo que solo existe
en el commit `5ee6187` responde 200 en Pages. La API de configuración requiere
autenticación y devolvió 404, así que la rama configurada no se pudo leer del
panel; la prueba de contenido es concluyente igual.

No hay `.github/`: **no hay workflow de Actions**. Pages publica directo desde la
rama.

### Riesgo latente: no existe `.nojekyll`

Sin ese archivo, Pages procesa el sitio con **Jekyll**, que **ignora todo archivo o
carpeta que empiece con `_`**. Hoy no rompe nada —lo que empieza con `_` es
`_handoff/`, `fuentes/_raw/` y `assets/img/_raw/`, que no se sirven—, pero es una
clase entera de falla silenciosa: el día que un recurso viva bajo un nombre con
guion bajo, no se publicará y no habrá error.

Dado que «un sitio caído es la peor falla posible», **crear `.nojekyll` vacío es la
mejor relación beneficio/riesgo de todo este trabajo**: es una adición pura,
permitida antes del 9, y elimina el riesgo por completo. Propuesto para fase 1.

---

## 3 · ESTRUCTURA

Árbol real, excluyendo lo ignorado por git:

```
grimorio-del-archipielago/
├── index.html · index-legacy.html · lecho.html · 404.html
├── 12 fichas <id>.html   (11 generadas + juicio-1880.html bespoke)
├── robots.txt · sitemap.xml · CNAME.placeholder
├── CLAUDE.md · MAPA-PROYECTO.md · CHANGELOG.md · README.md
├── ESTADO-DEL-PROYECTO.md · HANDOFF-CODE.md · HORIZONTE-RELATO.md
├── COMO-AGREGAR-CAPITULO.md · DEPLOY.md · CREDITOS-AUDIO.md
├── PLAN-PORTADA-PRO.md · PLAN-SCRIPTS.md
├── assets/{css,js,img,audio,fonts,icons,data}
├── contenido/{,prosa}          ← el corpus
├── fuentes/{_raw,bibliografia,investigacion,lecturas}
├── herramientas/               ← 7 scripts Python
├── docs/{arquitectura,curaduria,handoff,pedagogia,pruebas} + 5 .md nuevos
├── _handoff/{,migraciones}
├── pages/                      ← legado, 8 páginas
├── legacy/v7/ · demo/ · postulacion/{,capturas}
└── entrada/ · _entrada-audio/  ← bandejas locales, ignoradas
```

**344 archivos trackeados.** Ignorados por `.gitignore`: `deploy-netlify/` (58 MB),
`docs/propuestas/` (66 MB), `_para-project/`, `entrada/`, `_entrada-audio/`.

Contraste con el esquema 3.3: ver §1.4.

---

## 4 · ARTE

### Dónde viven y cómo se nombran

Todo en **`assets/img/`**, plano, sin subcarpetas salvo `_raw/`.
Convención: **`<entidad>-<slot>.webp` + `.png`**. Coincide con la de §4.2 del
documento salvo por el prefijo de conjunto, que no existe.

**41 piezas únicas · 80 archivos · 39 pares WebP+PNG completos.**
21 por criatura, 20 de sistema. WebP servido: 2,4 MB. PNG de respaldo: 39 MB.
Crudos en `_raw/`: 40 archivos, 205 MB, nunca publicados.

### Cómo las resuelve el generador

`herramientas/generar_fichas.py`, con un único directorio cableado:

```python
IMG_DIR = os.path.join(ROOT, "assets", "img")
has = lambda slot: os.path.isfile(os.path.join(IMG_DIR, "%s-%s.webp" % (idc, slot)))
if has("hero"):   ...
elif has("lamina"): ...
```

Emite `image-set(url("../img/X.webp"), url("../img/X.png"))` para fondos CSS y
`assets/img/X` para `<img>`.

**Buena noticia para fase 4:** la resolución ya está centralizada en un `has()` de
una línea. Convertirla en búsqueda por orden de conjuntos es un cambio pequeño y
localizado, no una reescritura. El punto de inserción de `data-arte` es el mismo.

### `image-rendering: pixelated` — las doce apariciones

| Archivo | Línea | Selector | Naturaleza |
|---|---|---|---|
| `ficha.css` | 58 | `img` | **GLOBAL** — migrar a `img[data-arte="referencia"]` |
| `portada.css` | 57 | `img` | **GLOBAL** — migrar |
| `ficha.css` | 59 | `.pixel` | interfaz — se queda |
| `ficha.css` | 299 | `.rule::before, .rule::after` | interfaz — se queda |
| `ficha.css` | 368 | `.rivet` | interfaz (remaches) — se queda |
| `ficha.css` | 614 | `.pieza__sigil` | interfaz (sigilo) — se queda |
| `ficha.css` | 73 | `.abyss__sea` | **arte de fondo** — revisar |
| `ficha.css` | 285 | `.descenso-bg` | **arte, slot `descenso`** — revisar |
| `ficha.css` | 676 | `.cierre__bg` | **arte, slot `cierre`** — revisar |
| `portada.css` | 80 | `.capa__bg` | **arte de portada** — revisar |
| `portada.css` | 93 | `.capa__img` | **arte de portada** — revisar |
| `portada.css` | 141 | `.mist` | **arte (niebla)** — revisar |

La migración de §4.4 cubre **2 de 12**. Las 4 de interfaz se quedan tal cual. Las
**6 marcadas «revisar»** son el punto ciego: pintan arte por clase, no por
atributo, así que `data-arte` no las alcanza. Mientras `descenso` y `cierre` sigan
en pixel art por `por_slot`, es correcto; hay que resolverlo antes de comisionar un
fondo pintado.

### Huérfanos y duplicados

| Hallazgo | Detalle |
|---|---|
| Imágenes referenciadas | **78 de 80** |
| «Huérfanas» | `iniciacion-lamina.webp` + `.png` (262 KB) |
| Duplicados exactos | **0 grupos** en todo el árbol publicable |
| Artefactos de sistema | **0** (`.DS_Store`, `Thumbs.db`, `.swp`…) |
| Archivos con `INTERNO` | **0** |
| Sin referencia en otras carpetas | `assets/icons/icon-512.png` |

**Las dos «huérfanas» no lo son.** `iniciacion` tiene prosa y lámina listas y está
deliberadamente sin publicar: vive dentro de la vitrina de la Recta Provincia. Es
**arte en reserva**, no basura. No proponer su borrado.

`icon-512.png` sin referencia sugiere un manifiesto PWA que nunca se escribió.
Inofensivo.

---

## 5 · MOTOR

### Qué lo compone

| Archivo | Rol |
|---|---|
| `herramientas/generar_fichas.py` | Generador: corpus + prosa + plantilla → fichas, `indice.js`, `pendientes.md` |
| `herramientas/plantilla_ficha.html` | Plantilla |
| `assets/js/ficha.js` + `assets/css/ficha.css` | Motor de fichas |
| `assets/js/camino.js` + `assets/css/camino.css` | Chrome del recorrido |
| `assets/css/tokens.css` | Tokens (**del sitio antiguo**, ver aviso) |
| `herramientas/verificar_prosa.py` | Guardarraíl verbatim |
| `herramientas/validar_fuentes.py` | Validador de fuentes |
| `herramientas/generar_matriz.py` | Matriz, bibliografía, reporte, menú público |
| `herramientas/normalizar_img.py` | Pipeline de imágenes |
| `herramientas/generar_mapa.py` | GeoJSON → mapa |

### De qué contenido dependen — el gate de fase 5

Conté menciones de entidades concretas y separé comentario de código:

| Archivo | En comentario | **En código** | Veredicto |
|---|---|---|---|
| `validar_fuentes.py` | 0 | **0** | **limpio** |
| `generar_matriz.py` | 0 | **0** | **limpio** |
| `camino.js` | 0 | **0** | **limpio** |
| `ficha.css` | 1 | 1 *(comentario)* | **limpio** |
| `verificar_prosa.py` | 0 | 2 *(ejemplos de uso)* | **limpio** |
| `normalizar_img.py` | 1 | 5 *(ejemplos y texto de ayuda)* | **limpio** |
| **`ficha.js`** | 4 | **14** | **BLOQUEA** |
| **`generar_fichas.py`** | 0 | **17** | **BLOQUEA** |

**`ficha.js` (líneas 12-61):** lleva incrustada una **ficha completa del Caleuche
como valor por defecto** —`ID::`, `NOMBRE::`, `ALIAS::`, `RESUMEN::`,
`DESCRIPCION::`, dos `VARIANTE::`, `RELACIONES::`, relato, interpretación y origen
del mito— para que `caleuche.html` funcione sin configuración. Es contenido de
Chiloé dentro del motor. Se reemplaza por un ejemplo neutro.

**`generar_fichas.py`:** tres acoplamientos reales.
`BESPOKE = {"juicio-1880"}` (L43) · el mapa de vitrina de `recta-provincia` a sus
siete piezas (L51-52) · un bloque grande de **texto del backlog del proyecto
escrito dentro del generador** (L341-405), que se emite a `pendientes.md`. Los tres
deben salir a configuración.

**Conclusión:** el corte **es viable y está acotado** — 6 de 8 archivos salen tal
cual. Pero **fase 5 no puede arrancar hoy**: primero hay que sacar el contenido de
esos dos archivos a configuración, y eso es trabajo de fase 4 o posterior.

> **Aviso sobre `tokens.css`.** Contiene la paleta del **sitio antiguo** —papel,
> musgo, cobre, Iowan Old Style—, no la abisal. La paleta vigente está en el
> `:root` de `ficha.css`. Extraer `tokens.css` como «tokens de diseño» del motor
> se llevaría el sistema equivocado.

---

## 6 · PLAN DE LIMPIEZA PROPUESTO

**Nada de esto se ejecutó.** Cada línea espera aprobación por nombre.

### Ramas

| Rama | Situación | Acción propuesta |
|---|---|---|
| `main` | Publicada, al día | **Conservar** |
| `v8-arquitectura` (local y remota) | **Fusionada en `main`**, 1 commit por detrás, sin trabajo propio | **Eliminar** — pero ver §1.1: el documento propone renombrarla. **Decisión tuya antes de tocarla** |

### Etiquetas

| Etiqueta | Situación | Acción propuesta |
|---|---|---|
| `backup-main-pre-merge` | Sobre `62237e4` (jun 2026), ancestro de `main`. Lo que protegía está fusionado y verificado | **Eliminar** por §5.2 |
| `pre-fondart-2027` | Sobre `dd27bc7`, ancestro de `main`. Creada como respaldo antes de consolidar | **Conservar hasta fase 3**, luego eliminar por §5.2 |
| `fondart-2027-envio` | No existe | **Crear en fase 2** |
| `chacao-2026-envio` | No existe. Candidato `32126d3` sin confirmar | **Esperar tu confirmación** |

### Archivos

| Elemento | Situación | Acción propuesta |
|---|---|---|
| Artefactos de sistema | **0 encontrados** | Nada que borrar. Agregar patrones a `.gitignore` como prevención |
| Duplicados exactos | **0 grupos** | Nada |
| `iniciacion-lamina.webp/.png` | Sin referencia, **por diseño** | **Conservar.** Arte en reserva, no huérfano |
| `assets/icons/icon-512.png` | Sin referencia | **Conservar.** Inofensivo; probable icono PWA sin manifiesto |
| `assets/img/_raw/` (205 MB) | Crudos dentro del repo publicado | **Listado por §5.3.** Jekyll no los sirve por el `_`, pero pesan en cada clon. Decisión tuya |
| `demo/` | Prototipo superado: pergamino y CDN, contra las reglas vigentes | **Listado.** Candidato a `legacy/` en fase 3 |
| `_handoff/` | 8 copias **divergentes** de archivos vivos. La peor: `_handoff/CLAUDE.md`, la constitución **sin** las decisiones fechadas | **Listado.** Riesgo real de que una sesión lea la versión vieja |
| `docs/pedagogia/` | Vacía, solo `.gitkeep` | **Listado** |
| `postulacion/POSTULACION-MOCKUP.html` | Contiene nombre, correo y teléfono, en repo público | **Conservar** por decisión tuya del 2026-09-01. Anotado por trazabilidad |
| `.nojekyll` | **No existe** | **Crear en fase 1** (adición pura, ver §2) |

### Lo que este plan nunca toca

Corpus · fuentes archivadas · las 41 piezas · las pistas de sonido · el sistema
legado.

---

## 7 · DIMENSIONAMIENTO DEL RIESGO DE LA REORGANIZACIÓN

No lo pide la fase 0, pero condiciona las fases 3 y 4 y la regla de que el sitio no
puede caer.

Migrar a `datos/`, `arte/` y `sonido/` significa mover **todo `assets/`**, que es
adonde apunta cada ruta del sitio:

| Superficie afectada | Cantidad |
|---|---|
| Archivos HTML con rutas a `assets/` | 16 en la raíz + 8 en `pages/` |
| Hojas CSS con `url(../img/…)` | 13 |
| Archivos JS con rutas cableadas | `camino.js`, `ficha.js`, `portada.js`, `sonido.js`, `generar_fichas.py` |
| Metadatos | `sitemap.xml`, `robots.txt`, `canonical` y `og:image` en 15 páginas |
| Herramientas con rutas absolutas al árbol | 7 scripts |

**Recomendación:** separar lo que da beneficio real de lo que solo renombra.

- **Alto beneficio, riesgo bajo:** los conjuntos de arte (§4), porque resuelven el
  problema concreto de la obra comisionada. Se pueden implementar **dentro de
  `assets/img/`** —`assets/img/referencia/`, `assets/img/comisionado/`— sin tocar
  ninguna otra ruta del sitio.
- **Beneficio nominal, riesgo alto:** renombrar `assets/img` → `arte`,
  `assets/audio` → `sonido`, `contenido` → `datos/corpus`. Cambia cientos de rutas
  para que las carpetas se llamen en castellano.

Sugiero hacer la fase 4 sobre la estructura actual y dejar el renombre global de
carpetas para después de que salgan los resultados de la convocatoria, si es que
entonces sigue pareciendo necesario. **Es una propuesta, no una decisión.**

---

## 8 · VERIFICACIÓN

Servidor local en `localhost:8001` sobre la raíz del repositorio.

| Prueba | Resultado |
|---|---|
| **Portada** | 12 capítulos y 68 entidades cargados. Botonera completa: Capítulos · Mapa · Fuentes · Movimiento · Sonido. Todas las peticiones 200 |
| **Capítulo** (`caleuche.html`) | 22 secciones, 17.580 px de alto. **`window.FICHA.raw` presente (2.057 caracteres)** — la copia embebida de §2.4 funciona |
| **Menú de capítulos** | `<dialog>` abre con 17 placas, marca «ESTÁS AQUÍ» en el capítulo actual |
| **Consola** | Sin errores reales |
| **Sitio publicado** | `lukas-paredes.github.io/grimorio-del-archipielago/` → HTTP 200 |

**Un aviso sobre el único error de consola.** Apareció un
`net::ERR_CONNECTION_RESET` en `fondo-lecho.webp`. **No es un fallo del sitio**: es
`python -m http.server`, de un solo hilo, ahogándose con peticiones paralelas. El
navegador reintentó y la segunda petición devolvió 200. En Pages, que sirve por
CDN, no ocurre. Conviene saberlo para no confundirlo con un recurso roto en futuras
verificaciones.

---

## 9 · LO QUE ESPERA TU DECISIÓN

| # | Decisión | Bloquea |
|---|---|---|
| 1 | **Ramas: A, B o C** (§1.1) | Fase 3 paso 1 |
| 2 | ¿`ARQUITECTURA.md` referencia los 5 documentos de `docs/` o los reescribe? (§1.3) | Fase 1 paso 2 |
| 3 | ¿Agregar `.nojekyll` en fase 1? (§2) | Fase 1 |
| 4 | ¿Fecha operativa de fase 2: 7, 8 o 9 de septiembre? (§1.11) | Fase 2 |
| 5 | ¿`chacao-2026-envio` sobre `32126d3`, o lo confirmas de otro modo? (§2) | Fase 3 paso 5 |
| 6 | ¿Eliminar `backup-main-pre-merge`? (§6) | Fase 3 paso 2 |
| 7 | ¿Conjuntos de arte dentro de `assets/img/` o renombre global de carpetas? (§7) | Fases 3 y 4 |
| 8 | ¿Qué hacer con `_handoff/`, `demo/` y `assets/img/_raw/`? (§6) | Fase 3 |

**Fase 0 terminada.** Nada se movió, renombró ni borró. Este archivo no está
commiteado. Espero tu «dale».
