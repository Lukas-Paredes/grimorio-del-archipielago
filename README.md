# El Grimorio del Archipiélago

Plataforma educativa y visual para consultar el **Bestiario del Archipiélago**, siete mundos curatoriales, fichas enciclopédicas, una exposición especial sobre la Recta Provincia, relaciones y fuentes.

Los siete mundos son una organización editorial del proyecto. No constituyen una clasificación tradicional oficial ni una validación territorial, académica o institucional.

## Cómo abrir el proyecto

No requiere instalación, servidor, npm ni compilación.

1. Descarga o clona el repositorio.
2. Abre `index.html` con doble clic.
3. Navega mediante los enlaces relativos.

El proyecto está diseñado para funcionar con el protocolo `file://`.

## Páginas principales

- `index.html`: portada y tres puertas de entrada.
- `bestiario.html`: búsqueda, índice, filtros y vista rápida de las 24 fichas.
- `figura.html?id=caleuche`: plantilla de ficha con URL directa.
- `mundos.html`: índice abierto de los siete mundos.
- `mundo.html?id=origin`: plantilla de mundo.
- `recta-provincia.html`: exposición especial.
- `cosmologia.html`: relaciones en vista textual accesible.
- `metodologia.html`: fuentes, estados y agenda de investigación.
- `recorrido.html`: concepto del futuro recorrido narrativo opcional.

## Estructura

```text
assets/
├── css/                  Sistema visual dividido por responsabilidad
└── js/
    ├── components/       Encabezado, pie, tarjetas, sellos, fuentes y vista rápida
    ├── data/             Mundos, figuras, relaciones, variantes, fuentes e ilustraciones
    └── pages/            Renderizadores de cada página
docs/
├── arquitectura/         Definiciones y decisiones de arquitectura
├── curaduria/            Auditorías curatoriales internas
├── diseno/               Documentación futura de diseño
└── pruebas/              Registro acumulativo de pruebas actuales
legacy/v7/                Respaldo histórico monolítico, no editable
```

Los datos se cargan mediante scripts clásicos y un namespace global controlado:

```js
window.Grimorio = window.Grimorio || {};
```

No se utiliza `fetch()`, módulos ES, frameworks ni dependencias externas indispensables.

## Cómo agregar una figura

1. Añade un objeto en `assets/js/data/figures.js`.
2. Usa un `id` estable, único y sin espacios.
3. Completa sólo información respaldada por los archivos disponibles.
4. Asigna `worldId`, `illustrationId`, `classification` y `status`.
5. Registra afirmaciones trazables en `assets/js/data/sources.js`.
6. Añade relaciones existentes en `assets/js/data/relationships.js`.
7. Incorpora el identificador en el mundo correspondiente de `assets/js/data/worlds.js`.
8. Prueba `figura.html?id=identificador` y la vista rápida del Bestiario.

Los campos vacíos deben permanecer como no documentados, pendientes o no aplicables. No se completan por inferencia.

## Cómo agregar o modificar un mundo

1. Edita `assets/js/data/worlds.js`.
2. Mantén el rótulo de organización curatorial.
3. Incluye figuras, ambientes, señales, idea educativa, fuentes y pendientes.
4. Registra relaciones curatoriales en `assets/js/data/relationships.js`.
5. Prueba el índice, `mundo.html?id=identificador` y el filtro del Bestiario.

Un mundo no debe presentarse como clasificación histórica, académica o tradicional oficial.

## Cómo agregar una ilustración

1. Guarda el archivo optimizado en `assets/illustrations/`.
2. Actualiza la entrada correspondiente en `assets/js/data/illustrations.js`.
3. Completa texto alternativo, crédito, licencia y estado.
4. Prueba usos panorámico, vertical y cuadrado.
5. Comprueba que un recorte de una pieza coral no parezca una iconografía individual validada.

Mientras una obra no exista, el componente muestra un placeholder editorial neutral.

## Cómo modificar fuentes

1. Añade o corrige fuentes en `assets/js/data/sources.js`.
2. Vincula cada afirmación mediante `sourceIds`.
3. Conserva por separado tradición, variante, interpretación, historia documentada y recreación artística.
4. No inventes ediciones, páginas, citas, testimonios, expedientes, fechas o localizaciones.

## Cómo probar

La guía vigente está en `docs/pruebas/PRUEBAS_ARQUITECTURA_ACTUAL.md`.

Como mínimo:

1. abre `index.html` mediante `file://`;
2. navega a todas las páginas;
3. prueba búsqueda, filtros y vista rápida;
4. abre fichas y mundos mediante parámetros;
5. usa teclado y Escape;
6. revisa a 390 px;
7. comprueba enlaces relativos y consola.

## Flujo Git recomendado

1. Crea o selecciona una rama de trabajo; no trabajes directamente sobre `main`.
2. Ejecuta `git status` antes de modificar archivos.
3. Realiza cambios sobre los nombres estables existentes.
4. Actualiza el único `CHANGELOG.md`.
5. Ejecuta las pruebas.
6. Revisa `git diff --stat` y `git diff`.
7. Solicita revisión antes de commit, push o merge.

Git conserva el historial. No se crean copias con sufijos de versión.
