# ARQUITECTURA — decisiones de ordenamiento y limpieza

**El Grimorio del Archipiélago** · establecido 2026-09-01 sobre el commit `5ee6187`.

Este documento fija las decisiones de arquitectura del repositorio: ramas,
etiquetas, estructura de carpetas, conjuntos de arte y criterios de limpieza.
Se escribió después del diagnóstico de fase 0, así que **refleja la estructura
real**, no una propuesta.

> **No duplica contenido.** El estado de la obra, el sistema de fuentes, el
> sistema visual y el inventario viven en documentos propios. Aquí solo se
> decide *cómo se ordena el repositorio*. La tabla del final dice dónde está
> cada cosa.

---

## 1 · REGLAS QUE NO SE ROMPEN

1. **Sin frameworks, sin npm, sin CDN, sin cadena de compilación** en lo
   publicado. HTML, CSS y JavaScript clásico. Herramientas offline en Python
   dentro de `herramientas/` están permitidas. Es una decisión declarada en la
   postulación.
2. **La regla sagrada del contenido.** Toda prosa es verbatim de fuente
   documentada; nada se inventa; las discrepancias entre fuentes se muestran
   atribuidas, nunca se resuelven. **Esta arquitectura no toca contenido.** Si
   una tarea lleva a modificar un texto del corpus, aunque parezca un error
   tipográfico, se detiene y se pregunta.
3. **Antes del envío solo se agregan archivos.** No se mueve, no se renombra, no
   se borra nada que exista.
4. `image-rendering: pixelated` y `prefers-reduced-motion` son parte del sistema
   visual declarado. Se reorganizan, no se eliminan.
5. **Vocabulario.** La capa interactiva futura se llama siempre «relato
   interactivo» o «travesía». Nunca «juego», «RPG», «niveles» ni «jugador» — en
   archivos, carpetas, funciones, comentarios ni commits.

**Por qué la restricción técnica.** No es purismo: es sostenibilidad. Un archivo
cultural debe seguir abriendo en diez años. Sin cadena de compilación no hay
dependencias que caduquen ni versiones que rompan el sitio. Cualquier servidor
estático lo sirve tal cual.

---

## 2 · LA VENTANA DE EVALUACIÓN

La obra es lo que evalúa la postulación a **Fondart Regional 2027** (línea
Creación Artística, folio 878718). La comisión puede visitar el sitio durante los
**50 días hábiles** posteriores al envío.

**Un sitio caído en ese período es la peor falla posible del proyecto.** Toda
decisión de este documento está subordinada a eso, y de ahí sale la estructura de
ramas de §3.

---

## 3 · RAMAS Y ETIQUETAS

### Ramas

| Rama | Rol |
|---|---|
| `main` | Lo publicado. GitHub Pages sirve desde aquí. **Se congela el día del envío** hasta que salgan los resultados |
| `desarrollo` | Rama de trabajo. Se crea **nueva desde `main`**, no por renombre |
| `hotfix/<qué>` | Corrección urgente sobre `main` congelada. Se fusiona con `--no-ff` a `main` y luego a `desarrollo` |
| `exp/<qué>` | Experimentos de corta vida. Nacen de `desarrollo` y mueren al fusionarse o descartarse |

No hay más ramas permanentes. **Las variantes de arte no son ramas: son
conjuntos** (§5).

**Por qué `desarrollo` se crea nueva y no se renombra.** El diagnóstico encontró
que `v8-arquitectura` estaba **completamente fusionada** en `main` y un commit por
detrás. Renombrarla habría resucitado una rama muerta y `desarrollo` habría nacido
desfasada. Se crea desde `5ee6187` y `v8-arquitectura` se elimina por fusionada.

**Por qué hay dos ramas y no una.** Las fases de ordenamiento caen dentro de la
ventana de evaluación. Trabajar solo en `main` significaría que cada commit sale
al aire mientras la comisión puede estar mirando.

### Etiquetas

| Etiqueta | Sobre qué | Estado |
|---|---|---|
| `fondart-2027-envio` | Commit exacto que ve la comisión | Se crea el día que se confirme el envío, tras el certificado de recepción |
| `pre-fondart-2027` | Respaldo previo a la consolidación en `main` | Se conserva hasta después del envío; se evalúa entonces |
| `backup-main-pre-merge` | Respaldo de junio de 2026 | **Se elimina.** Lo que protegía está fusionado y verificado |
| `chacao-2026-envio` | — | **Omitida.** El commit no se pudo confirmar, y una etiqueta mal puesta es peor que ninguna |

Las etiquetas de envío son permanentes. Las de respaldo se limpian cuando
cumplieron su función.

---

## 4 · ESTRUCTURA DE CARPETAS

**Se conserva la estructura actual.** Un esquema anterior proponía renombrar
`assets/img` → `arte`, `assets/audio` → `sonido` y `contenido` → `datos/corpus`.
**Ese renombre queda cancelado.**

**Por qué.** El diagnóstico dimensionó la migración: tocaría 24 archivos HTML,
13 hojas CSS, 5 archivos JS, los metadatos de 15 páginas y 7 herramientas con
rutas al árbol. Todo eso para que las carpetas se llamen en castellano. Beneficio
nominal, riesgo alto, dentro de la ventana de evaluación. Los conjuntos de arte
—que sí resuelven un problema real— se implementan **dentro de `assets/img/`**
sin tocar ninguna otra ruta.

```
grimorio-del-archipielago/
├── CLAUDE.md                  reglas del proyecto; toda sesión lo lee
├── index.html                 portada-descenso (sistema vigente)
├── index-legacy.html          legado — se queda, ver §6
├── <id>.html × 12             fichas: 11 generadas + juicio-1880 bespoke
├── lecho.html · 404.html · robots.txt · sitemap.xml
├── assets/
│   ├── css/                   13 hojas por responsabilidad
│   ├── js/                    motor, datos y renderizadores
│   ├── img/                   arte publicado (+ _raw/, crudos)
│   │   ├── referencia/        conjunto: las 41 piezas actuales (§5)
│   │   └── comisionado/       conjunto: obra contratada (§5)
│   ├── audio/ fonts/ icons/ data/
├── contenido/                 EL CORPUS (+ prosa/)
├── fuentes/                   la biblioteca y la trazabilidad
├── herramientas/              scripts Python offline
├── pages/                     legado — se queda, ver §6
├── legacy/                    material archivado (v7/, demo/)
├── docs/                      documentación de trabajo
└── postulaciones/
    └── fondart-2027/          dossier de la postulación en curso
```

`postulacion/` (la de Chacao 2026) se conserva. Su reubicación a
`postulaciones/chacao-2026/` queda para después del envío.

---

## 5 · CONJUNTOS DE ARTE

### El problema

La postulación compromete **30 ilustraciones nuevas de autoría humana
contratada**: portales (`hero`, `lamina`) en ilustración pintada, entorno
(`descenso`, `cierre`) en pixel art. Las 41 piezas actuales son **referencia del
encargo** y no se descartan. Ambas deben convivir sin duplicar archivos, y debe
poder probarse un conjunto experimental y sacarlo sin rastro.

### La convención

```
assets/img/<conjunto>/<entidad>-<slot>.webp
assets/img/<conjunto>/<entidad>-<slot>.png     respaldo, no se publica
```

Los crudos siguen fuera de los conjuntos, en `assets/img/_raw/`, y nunca se
publican.

### Resolución por orden

`datos/arte.yaml` — o la ruta que se fije al implementarlo:

```yaml
conjuntos: [comisionado, referencia]
por_slot:
  descenso: [referencia]
  cierre:   [referencia]
```

**La resolución ocurre en tiempo de generación**, en el generador Python, nunca
en JavaScript en el navegador. El sitio queda con rutas resueltas: cero costo en
ejecución, coherente con que todo es estático.

Efecto: llega `assets/img/comisionado/caleuche-hero.webp`, se regenera, aparece.
Nada se edita, nada se borra. Para un experimento, `beta/` primero en el orden;
para deshacerlo, se saca del orden.

**El generador ya está preparado.** El diagnóstico encontró que la resolución está
centralizada en un `has()` de una línea en `generar_fichas.py`. Convertirla en
búsqueda por orden es un cambio localizado, no una reescritura.

### El renderizado pixelado

El diagnóstico corrigió una suposición: `image-rendering: pixelated` **no es una
regla global**, son **doce**.

- **2 son globales** sobre `img` (`ficha.css:58`, `portada.css:57`). Estas migran
  a `img[data-arte="referencia"]`, con el generador escribiendo `data-arte` en
  cada `<img>`.
- **4 son de interfaz** (`.pixel`, `.rule::before/after`, `.rivet`,
  `.pieza__sigil`). **Se quedan tal cual**: son pixel art por diseño.
- **6 pintan arte por clase** (`.descenso-bg`, `.cierre__bg`, `.capa__bg`,
  `.capa__img`, `.abyss__sea`, `.mist`). **`data-arte` no las alcanza.** Correcto
  mientras `descenso` y `cierre` sigan en pixel art por `por_slot`; **hay que
  resolverlo antes de comisionar un fondo pintado.**

### Créditos y validación

`assets/img/creditos.yaml`, una entrada por pieza publicada, con `entidad`,
`slot`, `autoria`, `tecnica`, `conjunto`, `rotulo` y —para las de referencia—
`origen`. La postulación compromete acreditar nominalmente a cada ilustrador y
distinguir pieza de referencia de obra contratada: como dato estructurado, eso se
cumple solo y es auditable.

`validar_arte.py`, en el espíritu de `validar_fuentes.py`: toda imagen
referenciada existe en algún conjunto del orden; todo archivo tiene entrada en
créditos y viceversa; toda pieza mide lo que su slot exige; ninguna pieza
comisionada declara origen de IA. Sale con código distinto de cero si algo falla.

### Deuda anotada

`lamina` está en el generador (`generar_fichas.py:37`) y en el CSS
(`ficha.css:802`), pero **no** en el diccionario `SLOTS` de `normalizar_img.py`:
`--slot lamina` sería rechazado. Las 7 láminas existentes son consistentes a
565×842 pero se produjeron por otra vía. **Pendiente de resolver al implementar
los conjuntos.**

---

## 6 · EL SISTEMA LEGADO SE QUEDA

Conviven dos sistemas: el **legado** (`index-legacy.html` + `pages/`) y el
**vigente** (`index.html` + fichas generadas por el motor).

El diagnóstico buscó enlaces entrantes al legado y los encontró:

| Archivo | Enlaza a |
|---|---|
| `index.html` | `index-legacy.html` · `pages/metodologia.html` |
| `lecho.html` | `index-legacy.html` + las 5 páginas del legado |
| `404.html` | `index-legacy.html` |
| `sitemap.xml` | `index-legacy.html` + las 5 páginas |
| `assets/js/camino.js` | `index-legacy.html` · `pages/metodologia.html` — **en el chrome universal** |

**Decisión: el legado se queda donde está.** `lecho.html` —el final del recorrido
narrativo— usa esas cinco páginas como las puertas del archivo de consulta. Mover
el legado rompería el cierre de la obra. No se modifica.

---

## 7 · CRITERIOS DE LIMPIEZA

### Ramas

| Situación | Acción |
|---|---|
| Fusionada completamente en `main` o en `desarrollo` | Eliminar |
| Sin fusionar, sin commits en más de 60 días | Listar y decidir caso a caso |
| Sin fusionar, con trabajo reciente | Conservar, o convertir en `exp/<qué>` |

### Archivos

| Situación | Acción |
|---|---|
| Recurso no referenciado por ningún HTML, CSS, JS ni config | Listar como huérfano. **No borrar sin aprobación por nombre** |
| Imágenes con el mismo hash en dos rutas | Listar como duplicado |
| Artefactos de sistema | Eliminar y agregar a `.gitignore` |
| Archivos de trabajo que no debieron commitearse | Listar y decidir |

### Lo que la limpieza nunca toca

Contenido del corpus · fuentes archivadas · las 41 piezas de referencia · las
pistas de sonido · el sistema legado.

### Decisiones tomadas

| Elemento | Decisión |
|---|---|
| `_handoff/` | **Borrar.** Ocho copias divergentes de archivos vivos; su `CLAUDE.md` sin las decisiones fechadas es un riesgo activo |
| `demo/` | **Mover a `legacy/demo/`** con un README que explique qué era y por qué está superado |
| `assets/img/_raw/` | **No tocar.** Borrarlo del árbol no libera peso —queda en el historial— y no se reescribe historia mientras el repositorio está siendo evaluado. Se revisa después de los resultados |
| `iniciacion-lamina.webp/.png` | **Conservar.** Sin referencia por diseño: es arte en reserva, no huérfano |
| `postulacion/POSTULACION-MOCKUP.html` | **Se conserva, sin datos de contacto.** El expediente de Chacao 2026 —declarado **inadmisible** por falta de un documento, no por el proyecto— queda como historia. El 2026-09-01 se retiró de él el bloque de contacto (nombre completo, correo y teléfono): la página **es alcanzable e indexable** en Pages, `postulacion/` no empieza con guion bajo y la postulación en curso dirige tráfico al dominio. El dato **permanece en el historial de git** y no se reescribe mientras el repositorio esté bajo evaluación; el objetivo fue que dejara de servirse |
| `.nojekyll` | **Aplazado.** Sin Jekyll, Pages serviría todo lo que hoy ignora por empezar con `_`, incluidos `assets/img/_raw/` (205 MB) y `_handoff/`. Se agrega después de resolver esos dos |

---

## 8 · LO QUE NO SE DECIDE EN SOLITARIO

- Mover, renombrar o borrar cualquier archivo antes del envío.
- Borrar cualquier rama, etiqueta o archivo sin aprobación por nombre.
- Tocar contenido del corpus, aunque parezca un error tipográfico.
- Cambiar nombres de slots, medidas o la convención de archivos de arte.
- Introducir cualquier dependencia externa.
- Usar «juego», «RPG», «niveles» o «jugador» en cualquier nombre.
- Hacer `push`.
- Fusionar a `main`.

---

## 9 · DÓNDE ESTÁ CADA COSA

Este documento no repite lo que ya está escrito en otra parte.

| Necesitas | Ve a |
|---|---|
| **Las cifras de la obra**, verificadas y con su método | [`ESTADO-VERIFICADO-2026-08.md`](ESTADO-VERIFICADO-2026-08.md) |
| **Las 40 fuentes** una por una, la matriz de citas, qué validan las herramientas | [`SISTEMA-DE-FUENTES.md`](SISTEMA-DE-FUENTES.md) |
| **Paleta, tipografías, slots con medidas y las 41 piezas** | [`SISTEMA-VISUAL-Y-ARTE.md`](SISTEMA-VISUAL-Y-ARTE.md) |
| **Estado del repositorio y problemas abiertos** | [`INVENTARIO-2026-08.md`](INVENTARIO-2026-08.md) |
| **Diagnóstico de fase 0**: git, estructura, motor, plan de limpieza | [`DIAGNOSTICO-2026-09.md`](DIAGNOSTICO-2026-09.md) |
| **Contexto completo** para alguien que llega de cero | [`GUIA-DE-CONTEXTO.md`](GUIA-DE-CONTEXTO.md) |
| **Las reglas del proyecto y las decisiones fechadas** | [`../CLAUDE.md`](../CLAUDE.md) |
| **El plano permanente** y el mapa de carpetas | [`../MAPA-PROYECTO.md`](../MAPA-PROYECTO.md) |
| **Publicar una entidad nueva**, paso a paso | [`../COMO-AGREGAR-CAPITULO.md`](../COMO-AGREGAR-CAPITULO.md) |
| **Convenciones de código** y trampas del entorno | [`../HANDOFF-CODE.md`](../HANDOFF-CODE.md) |
| **El dossier de la postulación** | [`../postulaciones/fondart-2027/README.md`](../postulaciones/fondart-2027/README.md) |
