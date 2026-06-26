# El Grimorio del Archipiélago

Archivo digital para la difusión cultural y la puesta en valor del imaginario del archipiélago. Reúne el **Bestiario del Archipiélago**, siete mundos curatoriales, fichas consultables, un expediente especial sobre la Recta Provincia, relaciones, variantes y fuentes.

Los siete mundos son una organización editorial del proyecto. No constituyen una clasificación tradicional oficial ni una validación territorial, académica o institucional.

## Cómo abrir el proyecto

No requiere instalación, npm ni compilación.

1. Descarga o clona el repositorio.
2. Desde la carpeta raíz, inicia un servidor local:

```bash
python -m http.server 8000
```

3. Abre `http://localhost:8000/`.
4. Navega mediante los enlaces relativos.

El proyecto mantiene compatibilidad con `file://`, pero el servidor local ofrece una prueba más fiel del comportamiento del navegador.

## Páginas principales

- `index.html`: entrada principal y explicación de las cinco puertas de consulta.
- `pages/bestiario.html`: búsqueda, índice, filtros y vista rápida de las 24 fichas.
- `pages/figura.html?id=caleuche`: plantilla de ficha con URL directa.
- `pages/mundos.html`: índice abierto de los siete mundos.
- `pages/mundo.html?id=origin`: plantilla de mundo.
- `pages/recta-provincia.html`: exposición especial.
- `pages/cosmologia.html`: relaciones en vista textual accesible.
- `pages/metodologia.html`: fuentes, estados y agenda de investigación.
- `pages/recorrido.html`: recorrido sugerido por contenido abierto y delimitación de su fase narrativa futura.

## Estructura

```text
index.html                  Entrada principal
pages/                      Ocho páginas secundarias
assets/
├── css/                  Sistema visual dividido por responsabilidad
└── js/
    ├── components/       Encabezado, pie, tarjetas, sellos, fuentes y vista rápida
    ├── data/             Mundos, figuras, relaciones, variantes, fuentes e ilustraciones
    └── pages/            Renderizadores de cada página
docs/
├── arquitectura/         Definiciones y decisiones de arquitectura
├── curaduria/            Auditorías curatoriales internas
├── pedagogia/            Documentos pedagógicos actuales y futuros
└── pruebas/              Registro acumulativo de pruebas actuales
legacy/v7/
├── el_grimorio_del_archipielago_v7.html
└── docs/                  Guía de pruebas y matriz curatorial históricas de V7
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
8. Prueba `pages/figura.html?id=identificador` y la vista rápida del Bestiario.

Los campos vacíos deben permanecer como no documentados, pendientes o no aplicables. No se completan por inferencia.

## Cómo agregar o modificar un mundo

1. Edita `assets/js/data/worlds.js`.
2. Mantén el rótulo de organización curatorial.
3. Incluye figuras, ambientes, señales, clave de lectura, fuentes y pendientes.
4. Registra relaciones curatoriales en `assets/js/data/relationships.js`.
5. Prueba el índice, `pages/mundo.html?id=identificador` y el filtro del Bestiario.

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

1. inicia `python -m http.server 8000` y abre `http://localhost:8000/`;
2. navega a todas las páginas;
3. prueba búsqueda, filtros y vista rápida;
4. abre `pages/figura.html?id=caleuche` y una página `pages/mundo.html?id=...`;
5. usa teclado y Escape;
6. revisa a 390 px;
7. comprueba enlaces relativos y consola.

## Continuar el desarrollo con Claude Code

Claude Code trabaja sobre esta misma carpeta Git: no existe una migración de código ni una copia paralela del proyecto. Debe iniciarse desde la raíz del repositorio con `claude`.

Las reglas principales están en [`CLAUDE.md`](CLAUDE.md). La guía completa de traspaso está en [`docs/handoff/CLAUDE_CODE_HANDOFF.md`](docs/handoff/CLAUDE_CODE_HANDOFF.md) y la guía para trabajar desde otro computador está en [`docs/handoff/WORKING_FROM_ANOTHER_PC.md`](docs/handoff/WORKING_FROM_ANOTHER_PC.md).

GitHub Desktop sigue siendo la herramienta recomendada para revisar cambios, crear commits y hacer push después de la revisión manual del usuario.

## Flujo Git recomendado

1. Crea o selecciona una rama de trabajo; no trabajes directamente sobre `main`.
2. Ejecuta `git status` antes de modificar archivos.
3. Realiza cambios sobre los nombres estables existentes.
4. Actualiza el único `CHANGELOG.md`.
5. Ejecuta las pruebas.
6. Revisa `git diff --stat` y `git diff`.
7. Solicita revisión antes de commit, push o merge.

Git conserva el historial. No se crean copias con sufijos de versión.

Las mejoras futuras deben modificar los archivos estables existentes. No se crean variantes como `index_v9.html`, `final.html`, `nuevo.html` ni respaldos duplicados fuera de `legacy/`.
