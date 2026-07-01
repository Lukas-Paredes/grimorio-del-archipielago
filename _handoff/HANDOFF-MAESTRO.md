# HANDOFF MAESTRO — El Grimorio del Archipiélago

> Paquete para que otro Claude (potente) haga un **análisis de mejoras** del proyecto.
> Todo lo necesario está en esta carpeta `_handoff/`. Es un archivo denso: leelo entero
> antes de proponer nada. **No hay que ver las imágenes para entender el proyecto** — el
> ADN visual está descrito en palabras (sección 3 + la biblia de estilo del final).

---

## 0. Cómo usar este paquete / cómo se corre

- **Stack:** sitio **estático puro** — HTML + CSS + JavaScript clásico. **Sin** frameworks, npm, build, backend ni fetch como requisito. Namespace global `window.Grimorio`.
- **Correr:** `python -m http.server 8000` desde la raíz → `http://localhost:8000/`.
- **Rama de trabajo:** `v8-arquitectura` (NUNCA `main`; sin merge/push salvo pedido explícito).
- En `_handoff/` están: este maestro, el código y textos clave (copias), y 7 imágenes `.webp` representativas. Los originales del repo NO se tocaron.

---

## 1. QUÉ ES

**El Grimorio del Archipiélago** es un archivo cultural digital de la **mitología de Chiloé** (sur de Chile), con estética **dark fantasy pixel art**. Postulación al **fondo de cultura del MOP 2026**. Cubre **68 criaturas**.

**REGLA SAGRADA (cultural):** no se inventa nada. Ni relatos, ni fuentes, ni iconografía documental. Todo sale de **fuentes documentadas** (Cavada 1914; Núñez 2022, Servicio Nacional del Patrimonio Cultural; Molina; Cárdenas; García Barría; Memoria Chilena; recopilaciones isleñas). Se diferencia siempre entre: *tradición documentada · variante · interpretación curatorial · antecedente histórico · recreación artística · pendiente de verificación*. Las ilustraciones son **recreación artística** (no fijan iconografía oficial).

---

## 2. ARQUITECTURA REAL

**Hay DOS sistemas paralelos en el mismo repo:**

**(a) Sitio viejo — NO se toca.** `index-legacy.html` (era `index.html`, respaldado) + `pages/` (`bestiario.html`, `mundos.html`, `mundo.html`, `figura.html`, `recta-provincia.html`, `cosmologia.html`, `metodologia.html`, `recorrido.html`) + su CSS (`tokens/base/layout/components/pages/responsive.css`) y JS (`app.js`, `navigation.js`, `search.js`, `filters.js`, `data/*.js`, `components/*.js`, `pages/*.js`). Renderiza por JS desde archivos de datos (`window.Grimorio`). Es el archivo "clásico" del sitio.

**(b) Sistema nuevo (fichas + portada) — donde se está trabajando.** Reutiliza solo la paleta.

### La plantilla de ficha (config-driven)
- **`ficha.js` + `ficha.css`** son **genéricos** (el motor). No se editan por criatura.
- **Cada criatura = un `.html`** en la raíz que declara su config:
  - `window.FICHA = { raw, prosa, cierre }` en un `<script>` inline:
    - `raw` = el bloque `@ENTIDAD…@FIN` de esa criatura (copiado del `.txt` de datos).
    - `prosa` = los párrafos ricos del grimorio literario, ya limpios (sin cajas ASCII, sin bullets, sin `[→ url]`).
    - `cierre` = la frase final propia de la criatura.
  - Variables CSS de imagen (`--img-descenso`, `--img-cierre`, …) en un `<style>` inline.
  - El `<img>`/`<picture>` del hero.
- **`ficha.js` lee `window.FICHA`; si no existe, cae por defecto al Caleuche** → por eso `caleuche.html` funciona sin config (sus datos están embebidos como default en `ficha.js`). `trauco.html` es el **patrón a copiar** para criatura nueva: HTML idéntico + su `window.FICHA` + sus 3 variables de imagen + su `<img>` de hero + sus 3 imágenes. `ficha.js`/`ficha.css` no se vuelven a tocar.
- **Regla de la plantilla:** *campo ausente en el `@ENTIDAD` → su sección no se renderiza* (`toggleSection`). Sirve para las 68 tengan los campos que tengan.

### Estructura de una ficha (scroll vertical, 3 actos)
1. **HERO** — pantalla completa: ilustración de la criatura, bordes fundidos a negro, niebla animada, halo ámbar, marco-portal; nombre gigante (Jacquard) + alias + "▼ desciende".
2. **DESCENSO** — el cuerpo: el **fondo del mundo de la criatura queda fijo cubriendo TODO el contenido**, oscureciéndose de a poco hasta el negro antes del cierre. Encima, como placas de exhibición: **gancho** (epígrafe), **placa de datos** (marco dorado + agua abisal), **relato** (resumen + descripción rica del grimorio), **variantes** (tarjetas "cajón de archivo"), **nota del archivero** (interpretación), **[de dónde nació el mito]** (solo si el capítulo lo tiene), **vitrina** de criaturas relacionadas (tiles), **fuentes/enlaces**.
3. **CIERRE** — pantalla completa: el corazón del mundo (lecho/espesura/cámara) + la frase de cierre en ámbar.

### La portada-descenso (nueva, `index.html`)
Página de entrada como **caída vertical continua**: 4 capas-capítulo apiladas y fundidas (Superficie → Caleuche → Descenso → Abismo), con parallax (los fondos se hunden más lento), niebla, revelado por sección y una **"sonda de profundidad"** (nav vertical fija que marca profundidad y salta entre capas). El capítulo Caleuche tiene una **tarjeta-tráiler** que enlaza a `caleuche.html`; el Abismo enlaza al sitio viejo (`index-legacy.html` + `pages/`, solo destinos que existen). Estilo/JS en `portada.css` / `portada.js`.

### Datos
- **`El_Grimorio_Datos_Estructurados.txt`** = la BASE DE DATOS (68 entidades, bloques `@ENTIDAD…@FIN`, campos `CLAVE:: valor`, `VARIANTE:: Título | texto`, repetibles `FUENTE`/`ENLACE`; el esquema está documentado en la cabecera del archivo).
- **`El_Grimorio_del_Archipielago_DEFINITIVO.txt`** = el grimorio literario (40 capítulos, prosa rica). De acá salen los textos largos de las fichas (`prosa`).

### ⚠️ GOTCHA de rutas de imagen (crítico)
Las `url()` **dentro de CSS** se resuelven **relativo al archivo CSS** (`assets/css/`). Por eso las imágenes de fondo (y las variables `--img-*`) van con **`../img/…`**, NO `assets/img/…`. En cambio, un `<img>` dentro de un `.html` de la raíz va con **`assets/img/…`** (relativo a la página). Confundirlos = fondos rotos (pasó y se corrigió). Imágenes: **WebP** (lo que carga) + **PNG** de fallback; fondos CSS con `image-set(webp,png)`, heros con `<picture>`.

---

## 3. EL ENFOQUE ARTÍSTICO (descrito en detalle)

**ADN visual.** Paleta abismo: `#02060c → #050d18 → #081726 → #0e2433 → #15384a` (negros y azules profundos) + **UNA sola luz cálida ámbar** (`#f2b65a`, con `#e0a24a` y `#b9772b`) + **óxido siniestro** (`#a04a30`) + hueso para texto (`#ece4d2`). Tipografías: **Jacquard 24** (pixel gótica → nombres/títulos), **EB Garamond** (serif → cuerpo de lectura), **Pixelify Sans** (pixel → etiquetas/UI). **Pixel art HD con grid de pixel visible** — nada difuminado, realista ni 3D; "bestiario antiguo / grimorio". `image-rendering: pixelated`.

**La lógica de coherencia — UNA sola fuente de luz dorada por criatura:** cada criatura *es* o *tiene cerca* esa única luz cálida en medio de la oscuridad; todo lo demás en penumbra. Caleuche = barco iluminado por dentro; Pincoya = su pelo dorado irradia; Trauco = un rayo de luna dorada de un costado; Camahueto = su cuerno dorado; Invunche = una brasa/vela en la cueva. Esto es lo que hace que las ~200 imágenes parezcan "de la misma mano".

**Componentes de UI (CSS, no imágenes):** marcos ornamentados pixel dorados con **remaches 3D y esquinas cortadas** (onda UI de videojuego dark fantasy / Soulslike). Cajas de datos = **agua abisal azulada semitransparente + marco dorado**, estilo **placa de bronce / tablón hundido**. **NUNCA pergamino** ni textura de papel (se probó y se descartó). Nota del archivero = bloque anotado a mano con un clavito rojo.

**Cómo se ve cada tipo de imagen** (3 por criatura + 4 de portada):
- **HERO (16:9 apaisado):** la criatura en su ambiente, iluminada por su foco dorado. CON sujeto. Es la entrada/superficie.
- **DESCENSO (9:16 vertical):** el ambiente de la criatura hacia la profundidad, **SIN sujeto**, pensado para texto encima, se funde a negro abajo. El hundirse.
- **CIERRE (16:9 apaisado):** el fondo/corazón del mundo (lecho del mar, corazón del bosque, cámara de la cueva), **SIN sujeto**, con la frase de cierre. Cada criatura desciende a SU reino: mar→abismo/lecho, bosque→espesura/corazón, cueva→túnel/cámara, río→estero/poza.
- **Las 4 de portada** (se apilan como caída continua, funden arriba/abajo en azul-negro para empalmar sin costura): **1 Superficie** (Chiloé de noche — palafitos, iglesia de madera, botes, niebla, luz de farol); **2 Niebla del Caleuche** (canal en bruma, resplandor dorado del barco fantasma lejano); **3 Columna** (caída vertical al vacío, mar abierto — a propósito NO jardín de huiro, para diferenciarse del descenso de la Pincoya); **4 Lecho/abismo** (fondo en picada, sin tesoro de frente — a propósito distinto del cierre del Caleuche —, un punto de luz lejano).

*(La biblia de estilo completa, verbatim, está al final de este documento.)*

---

## 4. EL FLUJO DE TRABAJO (importante entenderlo)

1. **Claude (chat)** arma los prompts para Gemini con el ADN visual.
2. **Lucas** genera en **Gemini** (pixel art) y **elige la mejor de 2–3** variantes.
3. **Claude Code** implementa en el sitio, **criatura por criatura**.
4. **Sello de Gemini:** Gemini estampa una **estrella ✦ incrustada en la esquina inferior-derecha** del PNG (no sale por prompt). Se resuelve **al montar**: se tapa esa esquina con un **degradado radial a negro del propio diseño** (que se lea como penumbra natural, sin manchón/parche duro) o recorte leve. Por eso los prompts **siempre reservan esa esquina oscura y vacía**. (Método ya validado y automatizado con PIL: detección del sello por brillo + overlay radial smoothstep.)
- **Claude Design** existe pero **solo se usa si de verdad aporta**.

---

## 5. ESTADO ACTUAL

- **Criaturas LISTAS:** **Caleuche** y **Trauco** — fichas completas (datos del `@ENTIDAD` + prosa del grimorio + hero/descenso/cierre + imágenes optimizadas). `caleuche.html`, `trauco.html`.
- **En proceso:**
  - **Pincoya** — según Lucas, imágenes ya generadas, pero **aún NO integradas al repo ni ficha montada** (hoy no existe `pincoya.html` ni `assets/img/pincoya*`; un commit menciona "hero Pincoya" pero no está presente).
  - **Invunche** y **Camahueto** — prompts hechos; sin imágenes/ficha aún.
- **Portada-descenso:** recién montada (`index.html` + `portada.css` + `portada.js`); pendiente de pulido fino y verificación a 390px.
- **Imágenes:** inventario y roles en `assets/img/README.md` (manifiesto). Todas optimizadas a WebP + PNG fallback, ≤1800px. Reducción: ~35 MB → **0.46 MB** en WebP.
- **Git:** rama `v8-arquitectura`, último commit `75dfc61` ("Portada-descenso: 5 imágenes procesadas…"). Sin merge a `main`.

---

## 6. LA IDEA DEL RPG NARRATIVO (para que el análisis la considere)

Un **RPG narrativo por capítulos**, uno por criatura, tipo **Slay the Princess** pero con **disciplina cultural**: el contenido de la ficha va **embebido dentro del juego**; se juega **UN mito real** (los finales son **matices del mito documentado**, no inventos); el **molde es el Caleuche** primero. La plantilla config-driven (los `@ENTIDAD` + la prosa ya estructurados por criatura) es la materia prima natural para alimentar ese motor de juego. Vale evaluar cómo el sistema actual (datos + prosa + estructura hero/descenso/cierre) se presta —o no— a esa capa jugable sin romper la regla sagrada.

---

## 7. ÍNDICE DE ARCHIVOS CLAVE (los que están en este paquete)

| Archivo | Qué hace |
|---|---|
| `ficha.js` | Motor de ficha: lee `window.FICHA`/parsea el `@ENTIDAD`, renderiza secciones, oculta las vacías, hace parallax/revelado y rellena la frase de cierre. Trae el Caleuche como default. |
| `ficha.css` | Dirección de arte de las fichas: hero-portal, descenso (fondo fijo que oscurece), cierre, marcos dorados con remaches, `image-set()`, 390px, reduced-motion. |
| `caleuche.html` | Criatura 1 (usa los defaults del Caleuche embebidos en `ficha.js`). |
| `trauco.html` | Criatura 2 (declara su `window.FICHA` + imágenes). **El patrón a copiar para criatura nueva.** |
| `index-portada.html` | (copia de `index.html`) La **portada-descenso**: 4 capas (Superficie→Caleuche→Descenso→Abismo). |
| `portada.css` | Estilo de la portada (capas, sonda de profundidad, tarjeta-tráiler, costuras). |
| `portada.js` | Interacción de la portada (parallax, revelado, sonda, toggle de bocina previsto). |
| `El_Grimorio_Datos_Estructurados.txt` | **Base de datos** (68 `@ENTIDAD`; esquema en la cabecera). Fuente de todos los datos. |
| `El_Grimorio_del_Archipielago_DEFINITIVO.txt` | **Grimorio literario** (40 capítulos, prosa rica). Fuente de los textos largos. |
| `CLAUDE.md` | Reglas del proyecto: identidad, reglas culturales, arquitectura técnica, flujo git, criterios de diseño, checklist de verificación. |

*(No incluido en el paquete pero referido: `assets/img/README.md` = manifiesto de imágenes con roles y dimensiones.)*

---

## 8. IMÁGENES DE ESTE PAQUETE (7 curadas, ~0.34 MB, `.webp`)

Elegidas como las **más representativas del ADN** (no todas, no variaciones, no crudos):

| Imagen | Por qué está |
|---|---|
| `caleuche.webp` | **El patrón oro / ancla de estilo.** Hero 16:9: buque fantasma iluminado por dentro entre niebla. Toda imagen se pide "mismo estilo y nivel de detalle que esta". |
| `portada-superficie.webp` | Capa 1 de portada: Chiloé nocturno (palafitos, farol). Muestra el "arriba" del descenso. |
| `portada-caleuche.webp` | Capa 2: canal en niebla + resplandor del barco lejano. El "gancho" atmosférico. |
| `portada-columna.webp` | Capa 3 (9:16): caída vertical al vacío. Muestra el formato vertical y la sensación de hundirse. |
| `portada-lecho.webp` | Capa 4: abismo en picada con punto de luz lejano. El "fondo". |
| `trauco.webp` | Segunda criatura (hero 16:9): bosque = **otro reino** (verde) pero **mismo idioma visual** (luz ámbar en la oscuridad). Prueba la coherencia entre criaturas. |
| `trauco-descenso.webp` | Ejemplo del tipo **DESCENSO** (9:16, sin sujeto, se funde a negro): el ambiente de bosque pensado para texto encima. |

---
---

# APÉNDICE — DIRECCIÓN ARTÍSTICA COMPLETA (biblia de estilo del proyecto, verbatim)

ADN VISUAL (va en TODA imagen):
- Pixel art HD detallado, grid de pixel VISIBLE y nítido. NO difuminado, NO realista, NO 3D. Estilo "bestiario antiguo / grimorio".
- ANCLA DE ESTILO: el Caleuche es el patrón oro. Toda imagen se pide "mismo estilo y nivel de detalle que un buque fantasma pixel art iluminado por dentro entre niebla".

PALETA (estricta y limitada):
- Base: negros y azules abisales profundos — #02060c, #050d18, #081726, #0e2433, #15384a.
- LA CLAVE DE LA COHERENCIA: UNA SOLA fuente de luz cálida dorada-ámbar (#f2b65a, con #e0a24a y #b9772b) en medio de la oscuridad. Cada criatura ES o TIENE cerca esa única luz; el resto en penumbra. Ejemplos: Caleuche = barco iluminado por dentro; Pincoya = su pelo dorado irradia luz; Trauco = un rayo de luna dorada lo ilumina de un costado; Camahueto = su cuerno dorado; Invunche = una brasa/vela en la cueva.
- Acento siniestro: un toque de rojo óxido (#a04a30).
- Texto/hueso: #ece4d2.
- Atmósfera: niebla/bruma envolvente, iluminación dramática, mucha sombra, profundidad. Los bordes se funden en NEGRO absoluto.

ESTRUCTURA DE 3 IMÁGENES POR CRIATURA (la narrativa del "descenso"):
1. HERO (16:9 apaisado): la criatura en su ambiente, iluminada por su foco dorado. La entrada/superficie. CON sujeto.
2. DESCENSO (9:16 vertical): el ambiente de la criatura hacia la profundidad, SIN sujeto, pensado para poner texto encima, se funde a negro abajo. El hundirse.
3. CIERRE (16:9 apaisado): el fondo/corazón del mundo (lecho del mar, corazón del bosque, cámara de la cueva), SIN sujeto, con la frase de cierre. Cada criatura desciende a SU reino: mar→abismo/lecho, bosque→espesura/corazón, cueva→túnel/cámara, río→estero/poza.

PORTADA-DESCENSO (4 fondos que se apilan como una caída continua, funden arriba/abajo en azul-negro para empalmar sin costura):
1. Superficie: Chiloé de noche — palafitos, iglesia de madera, botes, niebla, luz de farol.
2. Niebla del Caleuche: canal en bruma, resplandor dorado del barco fantasma lejano.
3. Columna: caída vertical al vacío (mar abierto, NO jardín de huiro — se diferencia a propósito del descenso de la Pincoya).
4. Lecho/abismo: el fondo en picada, sin tesoro de frente (se diferencia a propósito del cierre del Caleuche), un punto de luz lejano.

MOLDE DE PROMPT PARA GEMINI (estructura fija con bloques):
"Pixel art dark fantasy, alta definición, estilo bestiario antiguo, mismo estilo y nivel de detalle que un buque fantasma pixel art iluminado por dentro entre niebla.
SUJETO: [criatura + descripción física según fuentes + qué hace] / o "ninguno, sin personaje" en descensos y cierres.
La ilumina UNA SOLA fuente de luz cálida dorada-ámbar: [de dónde viene la luz].
AMBIENTE: [lugar según su reino] de noche, con niebla, oscuridad profunda.
ESTILO (idéntico a la serie): pixeles definidos, grid visible (NO difuminado, NO realista, NO 3D). Paleta MUY oscura y limitada: negros y azules profundos, acentos dorado-ámbar (la luz) y un toque de rojo óxido.
BORDES: se oscurecen a negro por la propia luz (viñeta natural), SIN marco, SIN cenefa, SIN pergamino, a sangre (full-bleed). Esquina inferior derecha en sombra profunda y VACÍA (reservada para tapar la firma de Gemini).
FORMATO: [16:9 o 9:16]. SIN texto, SIN marcas de agua, SIN firmas."

MANEJO DEL SELLO DE GEMINI (siempre): Gemini estampa una estrella ✦ en la esquina inferior derecha, incrustada en el PNG. NO sale por prompt. Se resuelve al montar: se tapa esa esquina con un degradado radial a negro del propio diseño (que se lea como penumbra natural, sin manchón duro), o se recorta levemente si no queda limpio. Por eso los prompts SIEMPRE reservan esa esquina oscura y vacía.

COMPONENTES DE UI (CSS, NO imágenes): marcos ornamentados pixel dorados con remaches 3D y esquinas cortadas (onda UI de videojuego dark fantasy/Soulslike). Cajas de datos = agua abisal azulada semitransparente + marco dorado, estilo placa de bronce/tablón hundido. NUNCA pergamino ni textura de papel (ya se probó y se descartó). Nota del archivero = bloque anotado a mano con un clavito rojo.

REGLA DE ORO DE ARTE: la coherencia manda sobre la variedad. Las ~200 imágenes tienen que parecer de la MISMA mano y el MISMO mundo. Variación permitida = distinta atmósfera/reino por criatura (mar azul, bosque verde, cueva parda), pero SIEMPRE el mismo idioma visual: pixel art + una luz ámbar en la oscuridad + bordes a negro. Estilos distintos entre criaturas = NO (rompe el proyecto).
