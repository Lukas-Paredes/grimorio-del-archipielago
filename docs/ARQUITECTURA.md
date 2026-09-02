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
├── index-legacy.html          legado — se queda, ver §7
├── <id>.html × 12             fichas: 11 generadas + juicio-1880 bespoke
├── lecho.html · 404.html · robots.txt · sitemap.xml
├── assets/
│   ├── css/                   13 hojas por responsabilidad
│   ├── js/                    motor, datos y renderizadores
│   ├── img/                   arte publicado (+ _raw/, crudos)
│   │   ├── referencia/        conjunto: las 41 piezas actuales (§5)
│   │   ├── comisionado/       conjunto: obra contratada (§5)
│   │   ├── beta/              conjunto: experimentos (§5)
│   │   └── creditos.yaml      manifiesto de autoría, una entrada por pieza (§5)
│   ├── audio/ fonts/ icons/ data/
├── contenido/                 EL CORPUS (+ prosa/)
├── datos/                     versiones.yaml — las dos salidas (§5)
├── dist/                      PRODUCTO, no fuente. Solo dist/grimorio/;
│                              Fondart se genera a la raíz. En .gitignore (§5)
├── fuentes/                   la biblioteca y la trazabilidad
├── herramientas/              scripts Python offline
├── pages/                     legado — se queda, ver §7
├── legacy/                    material archivado (v7/, demo/)
├── docs/                      documentación de trabajo
└── postulaciones/
    └── fondart-2027/          dossier de la postulación en curso
```

`postulacion/` (la de Chacao 2026) se conserva. Su reubicación a
`postulaciones/chacao-2026/` queda para después del envío.

---

## 5 · FASE 4 · DOS VERSIONES DE LA OBRA DESDE UN SOLO ORIGEN

### Qué se quiere

Existen **dos proyectos que comparten origen**:

- **El Grimorio del Archipiélago** — el proyecto personal, en pixel art, tal como
  está hoy.
- **El Grimorio del Archipiélago · Fondart** — la versión que se transforma con
  las ilustraciones comisionadas y con lo que definan la dirección de arte y el
  frente territorial.

El segundo **empieza siendo idéntico al primero** y se va diferenciando pieza por
pieza a medida que llega el trabajo del equipo. **No hay un momento en que esté
incompleto.**

**Ninguna de las dos es una rama.** Son dos salidas del mismo generador, desde el
mismo corpus, con el mismo motor y las mismas herramientas.

### La regla que gobierna esta fase

> **Nada de lo que ya existe se pierde, se rehace ni se duplica.**

El corpus se escribe una vez. El motor es uno. **Las 41 piezas actuales se
conservan íntegras y siguen siendo las que dan forma a la obra**: no son un
borrador que se reemplaza, son el estándar sobre el que se construye. Cada pieza
comisionada que llegue **se suma**; ninguna borra a la anterior.

Si una tarea de esta fase implica copiar el corpus, bifurcar el motor o eliminar
arte existente, **está mal planteada**. Detenerse y preguntar.

### Por qué no son ramas

Con dos ramas, Pages publica solo una, y cada arreglo del motor habría que
llevarlo a mano de una a otra, con conflictos, porque el contenido diverge: con el
tiempo una queda atrás.

Con dos salidas del mismo repositorio, **una mejora del motor beneficia a ambas
sin copiar nada**, y las dos se pueden abrir a la vez y comparar lado a lado —
que es lo que hace falta para decidir si una pieza nueva funciona.

### Los conjuntos

Se trabaja **dentro de `assets/img/`**, sin renombrar carpetas ni mover rutas del
sitio (§4).

```
assets/img/referencia/    las 41 piezas actuales
assets/img/comisionado/   obra contratada
assets/img/beta/          experimentos
assets/img/_raw/          crudos — fuera de los conjuntos, nunca se publican
```

Convención, la misma que ya rige: `<entidad>-<slot>.webp`, con respaldo `.png`
que no se publica.

### Los slots y sus variantes

| Slot | Variante | Medida | Uso |
|---|---|---|---|
| **`hero`** | enmarcado | **917 × 512** | Pieza enmarcada en el portal del capítulo |
| **`hero`** | **a sangre completa** | **1800 × 1005** | Fondo a pantalla completa. Lo usan `juicio-1880` y `recta-provincia` |
| `lamina` | — | 565 × 842 | Retrato 2:3 colgado sobre el fondo abisal |
| `descenso` | — | 1005 × 1800 | Fondo del cuerpo; **es lo que se ve en teléfono** |
| `cierre` | — | 1800 × 1005 | Pantalla final del capítulo |
| `card` | — | 1:1 | Miniatura. Sin producir |

**El slot `hero` tiene dos variantes legítimas, no una medida con excepciones.**
El validador comprueba que cada pieza calce con **alguna variante declarada de su
slot**, no con una sola medida.

### Orden de resolución por versión

`datos/versiones.yaml` declara las dos versiones y, para cada una, el orden de
conjuntos en que se busca cada imagen. Se usa **el primero que la tenga**.

- **`grimorio`** mira solo `referencia`: queda exactamente como está hoy y **no
  cambia nunca** por lo que ocurra en `comisionado`.
- **`fondart`** mira primero `comisionado` y cae en `referencia` cuando la pieza
  aún no existe: **empieza idéntica y se transforma sola**.

Cuando llegue el hero pintado del Caleuche, se deja caer en `comisionado/`, se
regenera, y aparece en Fondart. La versión personal no se entera. No se edita
configuración, no se toca código, no se borra nada.

Para probar algo: `beta` primero en el orden de una versión. Para deshacerlo: se
saca del orden.

**La resolución ocurre al generar**, en el generador Python, nunca en JavaScript
en el navegador. Cada salida queda con rutas ya resueltas: cero costo en ejecución
y coherente con que todo el sitio es estático.

### Publicación

| Salida | Dónde | Quién la publica |
|---|---|---|
| **Fondart** | **la raíz del repositorio, como hoy** | GitHub Pages, sin configurar nada |
| **Grimorio** | `dist/grimorio/` | Nadie. HTML estático autocontenido: se arrastra a Netlify o se abre en local |

**No hay `dist/fondart/`.** Pages, en deploy por rama, sirve **solo desde la raíz
o desde `/docs`**, y `/docs` está ocupada por la documentación (§8). La raíz ya es
la versión Fondart de facto, así que se genera ahí y Pages sigue funcionando sin
mecanismos nuevos.

`dist/` es **producto, no fuente**: se regenera con un comando y va a `.gitignore`.

### El renderizado pixelado, por versión

`image-rendering: pixelated` está hoy en **12 reglas**: 2 globales sobre `img` y
10 sobre clases, de las cuales **6 pintan arte y no interfaz** — `.descenso-bg`,
`.cierre__bg`, `.capa__bg`, `.capa__img`, `.abyss__sea`, `.mist`.

Sobre una ilustración pintada, esa regla **la destroza**. Y un atributo en el
`img` no alcanza a las seis que pintan fondo por CSS.

El generador escribe `data-arte="<conjunto>"` en cada `img` y marca el `<html>` de
cada página con la versión y el conjunto que resolvió cada fondo. Las reglas pasan
de globales a condicionadas por esa marca. Mientras `descenso` y `cierre` sigan en
`referencia`, **el comportamiento es idéntico al actual**; el mecanismo existe
para el día en que se comisione un fondo pintado.

### Créditos como dato

`assets/img/creditos.yaml`, **una entrada por pieza — 41, no 80**. El manifiesto
declara **autoría**, y la autoría es de la pieza, no del formato: los respaldos
PNG son detalle técnico.

Cada entrada: archivo, entidad, slot, autoría, técnica, conjunto, fecha, si fue
contratada, y el rótulo de recreación artística. Las piezas de `referencia` llevan
además `origen`, que declara que fueron producidas con apoyo de herramientas de IA
bajo dirección de arte humana.

La postulación compromete acreditar nominalmente a cada ilustrador y distinguir
pieza de referencia de obra contratada: **como dato, eso se cumple solo y es
auditable**. `generar_creditos.py` produce la página de créditos de cada versión
desde aquí.

**Las excepciones se declaran en el manifiesto, no se parchean en el validador.**
Un campo lo dice y el validador lo respeta:

| Pieza | Excepción |
|---|---|
| `motas-capa-1`, `motas-capa-2` | Piezas de sistema **sin par WebP**. Se sirven como PNG |
| `iniciacion-lamina` | **Arte en reserva**: ninguna ficha la referencia porque `iniciacion` vive en la vitrina de la Recta Provincia, no como ficha propia. No es huérfana |

### El validador

`herramientas/validar_arte.py`, en el espíritu de `validar_fuentes.py`. Sale con
código distinto de cero si algo falla, y se corre antes de cada generación.

- Toda imagen que una ficha necesita **se resuelve en alguna versión declarada**.
- Toda pieza tiene entrada en `creditos.yaml`, y viceversa — **por pieza, no por
  archivo**.
- Toda pieza calce con **alguna variante declarada de su slot**.
- Ninguna pieza de `comisionado` declara `origen` de IA.
- Las excepciones declaradas en el manifiesto **se respetan**, no se reportan.

### Los pasos

En `desarrollo`. Cada paso termina con **ambas versiones generadas y
verificadas**. Si un paso rompe algo, se revierte antes de seguir. **Un commit por
paso**: la granularidad es lo que permite elegir después qué conservar.

| # | Paso |
|---|---|
| **1** | Crear los tres conjuntos y mover las 41 piezas a `referencia/`. **Commit propio y verificación de paridad antes de seguir** — ver el aviso abajo |
| 2 | `datos/versiones.yaml` con las dos versiones |
| 3 | Generador: recorrer versiones, resolver por orden, una salida por versión |
| 4 | `data-arte` en cada `img` y la marca de versión en el `<html>` |
| 5 | Migrar las 12 reglas de `image-rendering`; verificar que la interfaz no perdió la suya |
| 6 | `creditos.yaml` con las 41 piezas y sus excepciones declaradas |
| 7 | `validar_arte.py` y `generar_creditos.py`. El validador pasa limpio |
| 8 | Prueba del mecanismo: pieza a `comisionado/` con otro nombre de entidad, generar, confirmar que aparece en Fondart y no en Grimorio; quitarla, generar, confirmar que ambas vuelven |
| 9 | **Paridad:** la salida `grimorio` idéntica al sitio de `main` congelada. Cualquier diferencia es un error, no una mejora |
| 10 | **Accesibilidad en ambas salidas** (§1 regla 4 y la lista de verificación del proyecto) |
| 11 | Documentar aquí cómo se agrega una versión nueva y cómo se publica cada salida |

> **Aviso sobre el paso 1.** Mover las 41 piezas **no es un cambio menor**. Toca
> **14 archivos HTML, 3 hojas CSS con 16 referencias**, `camino.js`, `ficha.js`,
> `generar_fichas.py` y `normalizar_img.py`, más la **edición a mano de
> `juicio-1880.html`**, que es bespoke y no se regenera. Es la parte más delicada
> de la fase.

### Deudas de esta fase

| Deuda | Consecuencia |
|---|---|
| **`juicio-1880.html` no participa del mecanismo** | Es `BESPOKE`: el generador nunca la regenera, así que sus 7 rutas de imagen quedan fijas. **Mientras siga así, su hero no se puede comisionar.** Y «El Expediente» del proceso de Ancud de 1880 es **contenido central de la postulación**: la pieza histórica más fuerte del proyecto quedaría fuera del encargo de arte. **No es una nota técnica: es una limitación de alcance.** Se resuelve en la fase 4 o después, pero se resuelve |
| `camahueto-cierre` a 1376 × 768 | Defecto real: la mitad de la resolución de sus pares. **A la lista de corrección**, sin arreglarlo ahora |
| `lamina` fuera de `normalizar_img.py` | El generador y el CSS la conocen; el diccionario `SLOTS` del normalizador no. `--slot lamina` sería rechazado. Agregar `"lamina": (2,3)` antes de encargar más piezas de ese tipo |
| `datos/` no existe | Se crea en el paso 2 |

### Decisiones fechadas

- **2026-09-01 · Dos versiones, no dos ramas.** Dos salidas del mismo generador
  desde el mismo corpus y el mismo motor. Una mejora del motor beneficia a ambas
  sin copiar nada.
- **2026-09-01 · Fondart se genera a la raíz; no hay `dist/fondart/`.** Pages sirve
  solo desde la raíz o `/docs`, y `/docs` está ocupada. `dist/grimorio/` es la
  única salida nueva y no la publica Pages. *(Corrige el anexo original, que pedía
  `dist/fondart/` sin verificar cómo publica Pages.)*
- **2026-09-01 · El slot `hero` tiene dos variantes legítimas**, enmarcado
  917 × 512 y a sangre completa 1800 × 1005. Se declaran como variantes, **no como
  excepción**: el validador comprueba contra alguna variante del slot, no contra
  una medida única.
- **2026-09-01 · `creditos.yaml` lleva una entrada por pieza, 41.** El manifiesto
  declara autoría, y la autoría es de la pieza, no del formato.
- **2026-09-01 · Los casos borde se declaran en el manifiesto**, no se parchean en
  el validador. Un campo lo dice y el validador lo respeta.
- **2026-09-01 · El paso 1 lleva commit propio** y verificación de paridad antes
  de seguir.

---

## 6 · PUNTOS DE ENTRADA DEL EQUIPO

### La decisión

> **2026-09-01 · Todo aporte de un profesional del equipo entra al proyecto como
> dato declarado en un archivo propio, nunca editando el motor ni el sitio a
> mano.**

Es la misma regla que ya rige la publicación de capítulos, extendida a las
personas: **el costo de incorporar el trabajo de alguien es curaduría, no
desarrollo.**

**De dónde sale.** El proyecto ya demostró que agregar una entidad no exige tocar
`ficha.js`, `ficha.css`, `camino.js` ni `portada.js`: se agrega un objeto a los
datos y el sistema se acomoda. Ese mismo principio, aplicado al equipo, tiene tres
consecuencias prácticas:

- **El profesional no depende del desarrollo para trabajar.** Entrega su archivo;
  no espera a que alguien programe.
- **Su aporte es auditable y reversible.** Un dato declarado se lee, se versiona y
  se saca del orden sin tocar código.
- **La autoría queda registrada como dato**, no enterrada en un commit. La
  postulación compromete acreditar nominalmente: como estructura, eso se cumple
  solo.

**Por qué la separación de ramas sirve a esto.** `desarrollo` no es una rama de
archivo: es dónde se pavimenta la llegada del equipo mientras `main` queda
congelada y visible para la comisión.

### Los tres frentes

De la suma de estos aportes sale el Grimorio Fondart.

| Frente | Qué define | Estado del punto de entrada |
|---|---|---|
| **Dirección de arte** | Línea editorial y técnica por slot; criterios de la convocatoria | **Parcialmente resuelto.** `versiones.yaml` y `creditos.yaml` (§5) son el punto de entrada **de lectura**. **Falta el documento donde la dirección de arte decide**, no solo donde se registra lo decidido |
| **Frente territorial** | Propuesta cartográfica, metodología, formatos y software que la respalda | **No existe.** Hueco identificado: el plan actual no dice dónde entra la cartografía ni en qué formato |
| **Registro oral** | Testimonios con cesión firmada y atribución nominal | **No existe.** Necesita la misma trazabilidad que hoy tienen las fuentes bibliográficas: cesión de derechos, atribución nominal e ingreso al corpus **como fuente primaria** |

### Fase 4b — entre los conjuntos de arte y la extracción del motor

**No se diseñan todavía.** Diseñar un punto de entrada sin saber qué va a entrar
es adivinar, y adivinar produce formatos que después hay que rehacer.

**Se diseñan cuando cada profesional diga qué necesita.** Uno por frente, en el
orden en que se incorpore la persona. Cada uno hereda lo que ya existe: archivo
declarado, validador que lo comprueba, generador que lo lee, y nada escrito a mano
en el motor.

El registro oral, además, entra bajo la regla sagrada del contenido: un testimonio
es fuente primaria y se cita con su atribución, igual que el proceso de Ancud de
1880.

---

## 7 · EL SISTEMA LEGADO SE QUEDA

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

## 8 · CRITERIOS DE LIMPIEZA

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
| `docs/` en el sitio publicado | **Se queda visible.** No se esconde bajo un nombre con guion bajo. Esa solución solo funciona porque hoy no existe `.nojekyll`, así que dejaría el contenido dependiendo de una decisión futura que puede revertirlo de golpe. Además la postulación compromete publicar el método y la documentación bajo licencia abierta: un repositorio donde el método está a la vista es coherente con lo declarado. La deuda técnica anotada y las copias divergentes detectadas no debilitan el proyecto — muestran uno que se audita a sí mismo, que es el mismo argumento del verificador de prosa |
| `.nojekyll` | **Aplazado.** Sin Jekyll, Pages serviría todo lo que hoy ignora por empezar con `_`, incluidos `assets/img/_raw/` (205 MB) y `_handoff/`. Se agrega después de resolver esos dos |

---

## 9 · LO QUE NO SE DECIDE EN SOLITARIO

- Mover, renombrar o borrar cualquier archivo antes del envío.
- Borrar cualquier rama, etiqueta o archivo sin aprobación por nombre.
- Tocar contenido del corpus, aunque parezca un error tipográfico.
- Cambiar nombres de slots, medidas o la convención de archivos de arte.
- Introducir cualquier dependencia externa.
- Usar «juego», «RPG», «niveles» o «jugador» en cualquier nombre.
- Hacer `push`.
- Fusionar a `main`.

---

## 10 · DÓNDE ESTÁ CADA COSA

Este documento no repite lo que ya está escrito en otra parte.

| Necesitas | Ve a |
|---|---|
| **Las cifras de la obra**, verificadas y con su método | [`ESTADO-VERIFICADO-2026-08.md`](ESTADO-VERIFICADO-2026-08.md) |
| **Las 40 fuentes** una por una, la matriz de citas, qué validan las herramientas | [`SISTEMA-DE-FUENTES.md`](SISTEMA-DE-FUENTES.md) |
| **Paleta, tipografías, slots con medidas y las 41 piezas** | [`SISTEMA-VISUAL-Y-ARTE.md`](SISTEMA-VISUAL-Y-ARTE.md) |
| **Estado del repositorio y problemas abiertos** | [`INVENTARIO-2026-08.md`](INVENTARIO-2026-08.md) |
| **Diagnóstico de fase 0**: git, estructura, motor, plan de limpieza | [`DIAGNOSTICO-2026-09.md`](DIAGNOSTICO-2026-09.md) |
| **Qué dice el corpus sobre el territorio**: lugares, entidades, puntos y vacíos — insumo cartográfico | [`TERRITORIO-CORPUS.md`](TERRITORIO-CORPUS.md) |
| **El recorrido del proyecto** por hitos, con la decisión que motivó cada uno | [`HISTORIAL.md`](HISTORIAL.md) |
| **Qué entregó cada profesional** del equipo, y dónde entró | [`APORTES.md`](APORTES.md) |
| **Contexto completo** para alguien que llega de cero | [`GUIA-DE-CONTEXTO.md`](GUIA-DE-CONTEXTO.md) |
| **Las reglas del proyecto y las decisiones fechadas** | [`../CLAUDE.md`](../CLAUDE.md) |
| **El plano permanente** y el mapa de carpetas | [`../MAPA-PROYECTO.md`](../MAPA-PROYECTO.md) |
| **Publicar una entidad nueva**, paso a paso | [`../COMO-AGREGAR-CAPITULO.md`](../COMO-AGREGAR-CAPITULO.md) |
| **Convenciones de código** y trampas del entorno | [`../HANDOFF-CODE.md`](../HANDOFF-CODE.md) |
| **El dossier de la postulación** | [`../postulaciones/fondart-2027/README.md`](../postulaciones/fondart-2027/README.md) |
