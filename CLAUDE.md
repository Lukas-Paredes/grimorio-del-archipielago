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

El mapa completo del proyecto (qué es, carpetas, motor, pipeline, estado y
sistema de trazabilidad) vive en `MAPA-PROYECTO.md` (raíz) — leerlo primero
en toda sesión nueva, según la apertura de `_handoff/PROTOCOLO.md`.

La arquitectura vigente es HTML estático, CSS modular y JavaScript clásico, sin frameworks, sin npm, sin backend y sin cadena de compilación.

En el repositorio conviven **dos sistemas** que comparten paleta y ADN visual:

**Sitio antiguo (consulta pública; NO se modifica).** Es el archivo clásico, operativo:

- `index-legacy.html` es una cáscara estructural: carga estilos, scripts, datos, componentes y el renderizador de portada.
- La portada de ese sitio se renderiza desde `assets/js/pages/home.js`.
- Las páginas secundarias están en `pages/`.
- Los datos estructurados viven en `assets/js/data/`.
- Los componentes reutilizables viven en `assets/js/components/`.
- Los renderizadores de página viven en `assets/js/pages/`.

La descripción anterior (`home.js`, componentes, renderizadores) corresponde a este sitio antiguo.

**Sistema nuevo (donde se trabaja).**

- `index.html` es la portada-descenso estática, con estilo e interacción propios en `assets/css/portada.css` y `assets/js/portada.js`.
- Las fichas de criatura son config-driven: cada criatura es un `.html` en la raíz (`caleuche.html`, `trauco.html`, …) que declara su `window.FICHA` embebido y sus imágenes.
- El motor de fichas es genérico y compartido: `assets/js/ficha.js` + `assets/css/ficha.css`. No se editan por criatura.

Reglas comunes a ambos sistemas:

- Los estilos viven en `assets/css/` y se dividen por responsabilidad.
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

Las herramientas offline de `herramientas/` (scripts Python de contenido e imágenes) están permitidas; el sitio publicado no depende de ellas y sigue abriendo con `python -m http.server 8000`. No constituyen una cadena de compilación.

## Flujo Git

- **La rama de trabajo es `main`** (decisión de Lucas, 2026-09-01): todo lo que
  sirve se consolida ahí. `v8-arquitectura` queda como rama histórica: no se
  borra y no se trabaja en ella.
- Trabaja solamente en la rama actual.
- Ejecuta `git status` antes de modificar.
- Revisa `git diff` y `git diff --stat` al terminar.
- No hagas commit ni push salvo instrucción expresa del usuario.
- No fusiones ramas viejas hacia `main` sin mandato expreso.
- No modifiques el remoto.
- No crees copias con sufijos como `final`, `nuevo`, `v9` o `backup`.
- Modifica los archivos estables existentes.
- Usa `legacy/` solo para material realmente archivado.

## Criterios de diseño

Mantén la dirección editorial marítima, gótico insular, archivo cultural y museo nocturno: mar, niebla, bosque, bronce y óxido, con UNA sola luz cálida ámbar sobre una paleta abisal (#02060c→#15384a; ámbar #f2b65a).

En el sistema nuevo NUNCA uses pergamino ni textura de papel: las superficies son placas de bronce y agua abisal.

Evita tarjetas repetidas, exceso de bordes redondeados, exceso de sombras, estética genérica de inteligencia artificial, apariencia SaaS, lenguaje de videojuego y elementos visuales sin función cultural.

## Lenguaje

La capa interactiva se denomina «relato interactivo» o «recorrido narrativo». Nunca «juego», «RPG», «niveles» ni «quests» en interfaz, textos ni documentación.

## Conceptos principales

- **Inicio**: recorrido y explicación general del archivo.
- **Bestiario**: archivo de figuras y relatos.
- **Mundos**: recorridos curatoriales; no son clasificación oficial.
- **Recta Provincia**: expediente histórico-documental especial.
- **Cosmología o Relaciones**: lectura interpretativa de vínculos.
- **Fuentes y Metodología**: trazabilidad, criterios, límites y pendientes.

## Decisiones

Registro de decisiones editoriales/técnicas vigentes (fecha · decisión):

- **2026-07-10 · Doble columna mito‖testimonio**: sección `@TESTIMONIO` aditiva
  tras flag en la prosa curada; etiqueta curatorial obligatoria («Antecedente
  histórico — declaración del proceso de Ancud, 1880 (recreación editorial,
  Ponce Hermanos, 1908)»). Jamás «tradición documentada».
- **2026-07-10 · El Expediente**: `juicio-1880.html` es página bespoke
  (excepción declarada, en la lista `BESPOKE` del generador: nunca se
  regenera). Su texto se deriva del maestro `fuentes/proceso-ancud-1880.md`.
- **2026-07-11 · Capa Lecturas**: sección `@LECTURAS` («qué dice la academia»)
  como patrón aditivo tras flag, igual que `@TESTIMONIO`. Solo se publica lo
  VERIFICADO contra los PDF/txt de `fuentes/_raw/lecturas/`, con
  (Autor, año, p. X); lo no verificable queda `[por verificar]` y no se monta.
- **2026-07-11 · El Epílogo del Expediente**: el cierre histórico del capítulo
  es la absolución de todos los imputados por la Corte de Apelaciones de
  Concepción (verificada contra Catepillan 2019, p. 93) + la desarticulación.
  El folleto de 1908 termina en la sentencia; el sitio cuenta el final.
- **2026-07-11 · Cifras del proceso = VARIANTE**: los números divergen entre
  fuentes (≈80 Ampuero p. 66 · ≥54 Catepillan p. 92 · 9 condenados Catepillan
  p. 93 n. 29 · 12 corpus · penas divergentes). Se muestran todas con su
  fuente; ninguna se zanja.
- **2026-07-11 · Política de archivo de papers**: los papers académicos van a
  `fuentes/_raw/lecturas/` como `autor-año-titulo.pdf` + su `.txt` extraído.
  Si el PDF es un número de revista completo y pesado (caso Ampuero/Mapocho,
  ~20 MB), se versiona solo el `.txt` del artículo con cabecera de
  procedencia; el PDF queda referenciado, no versionado.
- **2026-07-11 · Discrepancias entre fuentes legítimas = material narrativo**:
  cuando dos o más fuentes REALES divergen (cifras, luz del macuñ, challanco,
  penas), se muestran todas con su fuente, en tono que invite a habitar la
  incertidumbre — jamás se zanjan ni se esconden. Un dato sin fuente que
  contradice a las fuentes es ERROR y se corrige (caso «Cavada» como autor de
  la redada: conflación descartada; es Martiniano Rodríguez ×3 fuentes).
- **2026-07-11 · `docs/propuestas/` = candidatas promovibles**: el lote manual
  de Lucas no está congelado; se PROMUEVE a fuente citable lo
  mitológico/histórico verificable que no choque con la academia; queda como
  referencia interna lo que guía al proyecto o no se pueda verificar. Lucas
  tiene la última palabra; ante duda, no promover y marcar «para decisión».
- **2026-07-11 · Reorden del descenso**: el Juicio de Ancud (Expediente) es el
  CIERRE del camino (XII, baja al lecho); el Camahueto va antes (XI).
  `n` sigue PROVISIONAL hasta CAMINO-DEL-MITO.
- **2026-07-11 · Umbral de entrada por acto**: campo opcional
  `umbral { img, bajada }` en el acto (`capitulos.js`); `camino.js` lo
  antepone en «El camino continúa» solo al CRUZAR hacia ese Libro. libro-8 lo
  usa (boca de la cueva + bajada verbatim del DEFINITIVO).
- **2026-07-11 · Prensa rastreable**: nada de prensa se cita sin respaldo en
  el repo. `fuentes/_raw/prensa/REGISTRO-PRENSA.md` separa descargado /
  localizable (cita completa + dónde) / discrepancias. No se piratea.

- **2026-09-01 · `main` es la rama de trabajo**: todo lo que sirve se
  consolida en `main` (que además es la rama desplegada). `v8-arquitectura`
  queda como rama histórica — no se borra, no se trabaja en ella. Cuando se
  tomó la decisión ambas apuntaban al mismo commit (`dd27bc7`): no hubo merge.
- **2026-09-01 · Carpetas regenerables fuera de git**: `deploy-netlify/`
  (copia del sitio para arrastrar a Netlify, 58 MB) y `docs/propuestas/`
  (bandeja de PDFs, 66 MB) van a `.gitignore`. Lo que se PROMUEVE de la
  bandeja se archiva con nombre canónico en `fuentes/_raw/lecturas/`.
- **2026-09-01 · Documentos de estado verificado en `docs/`**: las cifras de
  la obra se cuentan contra el repo, nunca se copian de documentación previa
  (el anexo de Chacao declaraba 5 capítulos cuando ya había 12). El documento
  vigente es `docs/ESTADO-VERIFICADO-2026-08.md` y prevalece sobre cualquier
  cifra anterior.

## Verificación antes de cerrar una intervención

Revisa como mínimo:

- portada;
- todas las páginas;
- enlaces relativos;
- búsqueda (sitio antiguo, mientras exista);
- filtros (sitio antiguo, mientras exista);
- vista rápida (sitio antiguo, mientras exista);
- menú móvil;
- consola del navegador;
- funcionamiento a 390 px;
- navegación por teclado;
- tecla Escape;
- ausencia de scroll horizontal;
- ausencia de contenido cultural inventado.
