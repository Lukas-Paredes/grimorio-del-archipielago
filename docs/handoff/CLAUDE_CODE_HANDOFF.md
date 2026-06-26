# Traspaso a Claude Code

Este documento prepara el trabajo continuo de **El Grimorio del Archipiélago** desde Codex hacia Claude Code. Claude Code debe trabajar en el mismo repositorio local, la misma rama `v8-arquitectura` y el mismo remoto de GitHub. No se debe crear un repositorio nuevo, duplicar el proyecto ni migrar la arquitectura.

## A. Estado actual

El proyecto implementa una arquitectura modular de sitio estático:

- portada renderizada desde `assets/js/pages/home.js`;
- Bestiario con búsqueda, filtros, índice alfabético, tarjetas y consulta breve;
- fichas individuales con URL directa mediante `pages/figura.html?id=...`;
- siete mundos curatoriales y páginas de detalle mediante `pages/mundo.html?id=...`;
- expediente especial de Recta Provincia;
- página de Cosmología/Relaciones con lectura interpretativa de vínculos;
- página de Fuentes y Metodología;
- recorrido sugerido en `pages/recorrido.html`;
- componentes compartidos para encabezado, pie, tarjetas, sellos, fuentes, mundos y vista rápida;
- sistema de ilustraciones preparado con placeholders editoriales en `assets/js/data/illustrations.js` y carpeta `assets/illustrations/`;
- estilos responsivos en `assets/css/responsive.css`;
- documentación vigente en `docs/arquitectura/`, `docs/curaduria/`, `docs/pruebas/` y `docs/handoff/`;
- legado V7 archivado en `legacy/v7/`.

Al crear este handoff se verificó por auditoría local que el repositorio está inicializado, la rama activa es `v8-arquitectura`, existe el remoto `origin` y el historial Git está disponible. Las pruebas funcionales deben repetirse al cerrar cada nueva intervención.

## B. Árbol de carpetas

Estructura real relevante al momento de este traspaso:

```text
grimorio-del-archipielago/
├── .gitattributes
├── .gitignore
├── index.html
├── README.md
├── CHANGELOG.md
├── CLAUDE.md
├── pages/
│   ├── bestiario.html
│   ├── cosmologia.html
│   ├── figura.html
│   ├── metodologia.html
│   ├── mundo.html
│   ├── mundos.html
│   ├── recorrido.html
│   └── recta-provincia.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   └── responsive.css
│   ├── icons/
│   ├── illustrations/
│   └── js/
│       ├── app.js
│       ├── navigation.js
│       ├── search.js
│       ├── filters.js
│       ├── components/
│       │   ├── figure-card.js
│       │   ├── footer.js
│       │   ├── header.js
│       │   ├── quick-view.js
│       │   ├── seals.js
│       │   ├── sources.js
│       │   └── world-card.js
│       ├── data/
│       │   ├── figures.js
│       │   ├── illustrations.js
│       │   ├── relationships.js
│       │   ├── sources.js
│       │   ├── variants.js
│       │   └── worlds.js
│       └── pages/
│           ├── bestiary.js
│           ├── cosmology.js
│           ├── figure-detail.js
│           ├── home.js
│           ├── journey.js
│           ├── methodology.js
│           ├── recta-provincia.js
│           ├── world-detail.js
│           └── worlds.js
├── docs/
│   ├── arquitectura/
│   │   ├── DECISIONES_PENDIENTES_DISENO_V8.md
│   │   ├── INVENTARIO_CONTENIDO_BESTIARIO_V8.md
│   │   ├── MAPA_SITIO_GRIMORIO_V8.md
│   │   ├── MATRIZ_ILUSTRACIONES_Y_USOS_V8.md
│   │   └── WIREFRAMES_TEXTUALES_GRIMORIO_V8.md
│   ├── curaduria/
│   │   └── AUDITORIA_SIETE_MUNDOS.md
│   ├── pedagogia/
│   │   └── .gitkeep
│   ├── pruebas/
│   │   └── PRUEBAS_ARQUITECTURA_ACTUAL.md
│   └── handoff/
│       ├── CLAUDE_CODE_HANDOFF.md
│       └── WORKING_FROM_ANOTHER_PC.md
└── legacy/
    └── v7/
        ├── el_grimorio_del_archipielago_v7.html
        └── docs/
            ├── GUIA_PRUEBAS_V7.md
            └── MATRIZ_CURATORIAL_V7.md
```

## C. Responsabilidad de cada carpeta

- `index.html`: entrada principal y montaje de portada; no contiene el contenido completo de la portada.
- `pages/`: documentos HTML secundarios. Cada archivo carga la misma base de estilos, scripts, datos y componentes, más un renderizador específico.
- `assets/css/`: sistema visual dividido por responsabilidad: tokens, base, layout, componentes, estilos de páginas y responsive.
- `assets/js/data/`: contenido estructurado: figuras, mundos, relaciones, variantes, fuentes e ilustraciones.
- `assets/js/components/`: HTML reutilizable y comportamiento compartido: encabezado, pie, tarjetas, vista rápida, sellos y fuentes.
- `assets/js/pages/`: renderizado específico de cada página.
- `assets/illustrations/`: carpeta destinada a obras gráficas finales u optimizadas. Actualmente el sistema puede operar con placeholders si una obra aún no existe.
- `assets/icons/`: carpeta de soporte para iconografía del sitio si se incorpora material propio.
- `docs/`: documentación vigente de arquitectura, curaduría, pruebas y traspaso.
- `legacy/v7/`: respaldo histórico de la versión anterior. No debe editarse para desarrollar la versión actual.

## D. Orden de carga

El orden real de los scripts en `index.html` y en las páginas de `pages/` sigue esta secuencia:

1. scripts generales:
   - `assets/js/app.js`;
   - `assets/js/navigation.js`;
   - `assets/js/search.js`;
   - `assets/js/filters.js`.
2. datos:
   - `assets/js/data/sources.js`;
   - `assets/js/data/illustrations.js`;
   - `assets/js/data/worlds.js`;
   - `assets/js/data/figures.js`;
   - `assets/js/data/relationships.js`;
   - `assets/js/data/variants.js`.
3. componentes:
   - `assets/js/components/seals.js`;
   - `assets/js/components/sources.js`;
   - `assets/js/components/figure-card.js`;
   - `assets/js/components/world-card.js`;
   - `assets/js/components/quick-view.js`;
   - `assets/js/components/header.js`;
   - `assets/js/components/footer.js`.
4. renderizador de página:
   - `assets/js/pages/home.js` para la portada;
   - `assets/js/pages/bestiary.js` para Bestiario;
   - `assets/js/pages/figure-detail.js` para ficha;
   - `assets/js/pages/worlds.js` para Mundos;
   - `assets/js/pages/world-detail.js` para detalle de mundo;
   - `assets/js/pages/recta-provincia.js` para Recta Provincia;
   - `assets/js/pages/cosmology.js` para Cosmología/Relaciones;
   - `assets/js/pages/methodology.js` para Fuentes y Metodología;
   - `assets/js/pages/journey.js` para Recorrido.

Los datos y componentes deben estar disponibles antes de que el renderizador correspondiente intente usarlos. Mantén `defer` y el orden relativo actual.

## E. Flujo para agregar contenido

### Agregar una figura

1. Editar `assets/js/data/figures.js`.
2. Usar un `id` estable, único, sin espacios y apto para URL.
3. Completar solo información respaldada por fuentes, variantes o pendientes explícitos.
4. Asignar `worldId`, `illustrationId`, `classification`, `status`, ambientes y fuentes.
5. Vincular relaciones en `assets/js/data/relationships.js` cuando correspondan.
6. Incluir el `id` en el mundo correspondiente dentro de `assets/js/data/worlds.js`.
7. Probar `pages/figura.html?id=identificador`, el Bestiario y la consulta breve.

### Agregar una ilustración

1. Guardar la obra optimizada en `assets/illustrations/`.
2. Crear o actualizar la entrada en `assets/js/data/illustrations.js`.
3. Completar `alt`, crédito, licencia, estado y usos.
4. Verificar los usos panorámico, vertical y cuadrado donde correspondan.
5. Evitar que un recorte de una pieza coral parezca iconografía individual validada si no lo es.

### Agregar una fuente

1. Editar `assets/js/data/sources.js`.
2. Crear un `id` estable.
3. Registrar solo datos bibliográficos o documentales disponibles.
4. No inventar páginas, citas, ediciones, testimonios, fechas ni enlaces.
5. Vincular la fuente mediante `sourceIds` o claims existentes.

### Modificar un mundo

1. Editar `assets/js/data/worlds.js`.
2. Mantener claro que el mundo es recorrido curatorial, no clasificación oficial.
3. Revisar `figureIds`, `principalIds`, `secondaryIds`, ambientes, señales, clave de lectura, fuentes y pendientes.
4. Ajustar relaciones en `assets/js/data/relationships.js` si cambia la lectura de vínculos.
5. Probar `pages/mundos.html`, `pages/mundo.html?id=identificador` y filtros del Bestiario.

### Agregar relaciones

1. Editar `assets/js/data/relationships.js`.
2. Confirmar que `from` y `to` apunten a figuras o mundos existentes.
3. Usar un `type` coherente con los filtros de Cosmología/Relaciones.
4. Describir la relación como lectura interpretativa si no es tradición documentada.
5. Probar `pages/cosmologia.html` y las fichas relacionadas.

### Modificar textos de portada

1. Editar `assets/js/pages/home.js`.
2. Mantener las cinco puertas de entrada: Bestiario, Mundos curatoriales, Recta Provincia, Cosmología/Relaciones y Fuentes/Metodología.
3. Evitar lenguaje de videojuego, colección o plataforma SaaS.
4. Probar portada en escritorio y a 390 px.

### Modificar componentes

1. Editar el archivo correspondiente en `assets/js/components/`.
2. Revisar todas las páginas que usan el componente.
3. Mantener accesibilidad básica: enlaces claros, botones reales, `aria` cuando corresponda, Escape para diálogos y navegación por teclado.

### Probar una ficha mediante parámetros de URL

Usa:

```text
http://localhost:8000/pages/figura.html?id=caleuche
```

o reemplaza `caleuche` por el `id` de la figura. Para detalle de mundo:

```text
http://localhost:8000/pages/mundo.html?id=origin
```

## F. Riesgos conocidos

- Parte del contenido sigue marcado como pendiente o provisional dentro de los datos.
- La bibliografía específica y algunas trazabilidades pueden requerir revisión más fina antes de presentarse como documentación cerrada.
- Las ilustraciones profesionales finales aún no están incorporadas en `assets/illustrations/`; el sitio usa placeholders editoriales cuando falta una obra.
- La revisión patrimonial, comunitaria o académica no debe asumirse como realizada si no está documentada.
- Algunos textos pueden necesitar mayor claridad conceptual para reforzar que el proyecto es archivo cultural y mediación, no clasificación oficial.
- El comportamiento con `file://` puede diferir del servidor local; la prueba principal debe hacerse con `python -m http.server 8000`.
- Las rutas relativas deben revisarse cada vez que se agreguen páginas o recursos nuevos.

## G. Primera sesión de Claude Code

Comandos sugeridos al comenzar:

```bash
git status
git branch --show-current
git pull
python -m http.server 8000
```

Ejecuta `git pull` solo cuando no existan cambios locales sin guardar. Si `git status` muestra archivos modificados, primero identifica si son cambios esperados del usuario.

Claude Code debe abrirse desde la raíz del repositorio:

```bash
claude
```

No abras Claude Code desde una subcarpeta, porque podría perder contexto de rutas, documentación y estado Git.

## H. Cierre de sesión

Antes de cerrar una sesión, revisar:

```bash
git status
git diff --stat
git diff
```

Claude debe entregar al usuario:

- archivos modificados;
- funciones cambiadas;
- decisiones tomadas;
- pruebas ejecutadas;
- problemas pendientes.

Claude no debe hacer commit ni push salvo que el usuario lo ordene expresamente.

## Prompt sugerido para la primera sesión

> Lee primero `CLAUDE.md`, `README.md`, `CHANGELOG.md` y `docs/handoff/CLAUDE_CODE_HANDOFF.md`. Audita la arquitectura antes de modificar archivos. Confirma la rama Git actual y revisa `git status`. No hagas commit, push, merge ni cambios de remoto. Mantén HTML estático, CSS modular, JavaScript clásico, rutas relativas y el namespace `window.Grimorio`. No inventes información cultural. Antes de implementar, resume tu comprensión del proyecto, el estado actual y los archivos que planeas modificar.
