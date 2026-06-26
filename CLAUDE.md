# CLAUDE.md

Guía de arranque para Claude Code en **El Grimorio del Archipiélago**.

## Identidad del proyecto

El Grimorio del Archipiélago es un archivo digital y recorrido cultural dedicado a la difusión y puesta en valor de figuras, relatos, memorias, relaciones y fuentes del imaginario de Chiloé y su entorno insular.

El proyecto debe presentarse como archivo cultural, consulta pública y mediación cultural. No es un videojuego, una Pokédex, una colección de monstruos, un dashboard ni una clasificación cultural oficial. Tampoco debe presentarse principalmente como intervención educativa formal.

## Reglas culturales

No inventes relatos, fuentes, testimonios, citas, fechas, páginas bibliográficas ni territorios asociados. No presentes interpretaciones curatoriales como tradición documentada. No afirmes validación académica, comunitaria, patrimonial o institucional si no está documentada en el repositorio.

Diferencia siempre entre:

- tradición documentada;
- variante;
- interpretación curatorial;
- antecedente histórico;
- recreación artística;
- contenido pendiente de verificación.

## Arquitectura técnica

La arquitectura vigente es HTML estático, CSS modular y JavaScript clásico, sin frameworks, sin npm, sin backend y sin cadena de compilación.

- `index.html` es una cáscara estructural: carga estilos, scripts, datos, componentes y el renderizador de portada.
- La portada se renderiza desde `assets/js/pages/home.js`.
- Las páginas secundarias están en `pages/`.
- Los estilos viven en `assets/css/` y se dividen por responsabilidad.
- Los datos estructurados viven en `assets/js/data/`.
- Los componentes reutilizables viven en `assets/js/components/`.
- Los renderizadores de página viven en `assets/js/pages/`.
- Las rutas deben seguir siendo relativas para funcionar en local y en una subruta tipo `/grimorio-del-archipielago/`.
- No uses `fetch()` como requisito estructural.
- No uses módulos ES.
- No introduzcas frameworks ni una cadena de compilación.

El namespace global controlado es:

```js
window.Grimorio = window.Grimorio || {};
```

El proyecto debe seguir abriendo con:

```bash
python -m http.server 8000
```

desde:

```text
http://localhost:8000/
```

## Flujo Git

- Trabaja solamente en la rama actual.
- Ejecuta `git status` antes de modificar.
- Revisa `git diff` y `git diff --stat` al terminar.
- No hagas commit ni push salvo instrucción expresa del usuario.
- No hagas merge hacia `main`.
- No modifiques el remoto.
- No crees copias con sufijos como `final`, `nuevo`, `v9` o `backup`.
- Modifica los archivos estables existentes.
- Usa `legacy/` solo para material realmente archivado.

## Criterios de diseño

Mantén la dirección editorial marítima, gótico insular, archivo cultural y museo nocturno: papel, tinta, mar, bosque, neblina, cobre y óxido.

Evita tarjetas repetidas, exceso de bordes redondeados, exceso de sombras, estética genérica de inteligencia artificial, apariencia SaaS, lenguaje de videojuego y elementos visuales sin función cultural.

## Conceptos principales

- **Inicio**: recorrido y explicación general del archivo.
- **Bestiario**: archivo de figuras y relatos.
- **Mundos**: recorridos curatoriales; no son clasificación oficial.
- **Recta Provincia**: expediente histórico-documental especial.
- **Cosmología o Relaciones**: lectura interpretativa de vínculos.
- **Fuentes y Metodología**: trazabilidad, criterios, límites y pendientes.

## Verificación antes de cerrar una intervención

Revisa como mínimo:

- portada;
- todas las páginas;
- enlaces relativos;
- búsqueda;
- filtros;
- vista rápida;
- menú móvil;
- consola del navegador;
- funcionamiento a 390 px;
- navegación por teclado;
- tecla Escape;
- ausencia de scroll horizontal;
- ausencia de contenido cultural inventado.
