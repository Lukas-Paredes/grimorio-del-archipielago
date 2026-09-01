# 10 · SISTEMA VISUAL Y ARTE

**El Grimorio del Archipiélago** · generado 2026-08-31 midiendo los archivos
reales de `assets/img/` y leyendo `assets/css/ficha.css`, `assets/img/README.md` y
`herramientas/normalizar_img.py`. Commit `dd27bc7`.

> Documento de referencia para dirección de arte. Todas las medidas de la sección
> 5 fueron leídas de los archivos, no copiadas de documentación previa.

---

## 1 · LA DIRECCIÓN EN UNA FRASE

**Editorial marítima, gótico insular, archivo cultural, museo nocturno.**
Mar, niebla, bosque, bronce y óxido. Pixel art dark fantasy de alta densidad.

Y una regla que gobierna todo lo demás:

> **UNA sola luz cálida por escena, sobre una paleta abisal.**

El farol del palafito en la superficie. Las luces del buque fantasma. El cabello
de la Pincoya, que es la única luz de su playa. La vela en la boca de la cueva del
Invunche. El cuerno dorado del Camahueto en plena tormenta.

Esa regla se aplicó sin excepción, y tiene consecuencias verificables: durante el
desarrollo **se descartaron partículas ambientales de color ámbar** precisamente
porque habrían sembrado múltiples luces cálidas en pantalla. La disciplina llega
a ese nivel de detalle.

Su función es doble: dirige la mirada al corazón narrativo de cada imagen, y
garantiza que la pieza número sesenta y ocho pertenezca al mismo mundo que la
primera.

---

## 2 · PALETA

Definida en `assets/css/ficha.css` (`:root`). **Es la paleta operativa del
sistema vigente.**

### Mar abisal — la gradación del descenso

| Muestra | Hex | Token | Rol |
|---|---|---|---|
| ⬛ | `#02060c` | `--abyss` | **Abismo.** Fondo base del sistema; el punto más profundo del descenso |
| ⬛ | `#050d18` | `--abyss-2` | Abismo secundario; transición |
| ⬛ | `#081726` | `--deep` | **Profundo.** Zona de mar abierto; fondos de capítulos marinos |
| ⬛ | `#0e2433` | `--sea` | Mar intermedio |
| 🟦 | `#15384a` | `--sea-2` | **Mar.** Límite superior de la gradación; superficies iluminadas por la luna |
| ⬜ | `#9fb6bd` | `--foam` | **Espuma.** Texto secundario, atribuciones, metadatos |

### Luz ámbar — la única fuente cálida

| Muestra | Hex | Token | Rol |
|---|---|---|---|
| 🟨 | `#f2b65a` | `--amber` | **Ámbar.** LA luz. Faroles, velas, oro, bronce; jerarquía y acción |
| 🟨 | `#e0a24a` | `--amber-soft` | Estados secundarios de la luz cálida |
| 🟧 | `#b9772b` | `--amber-deep` | **Bronce** de marcos, placas y botones |
| — | `rgba(242,182,90,0.42)` | `--amber-line` | Líneas y filetes de bronce |
| — | `rgba(242,182,90,0.28)` | `--amber-glow` | Halo, resplandor, latido |

### Óxido — el único acento no ámbar

| Muestra | Hex | Token | Rol |
|---|---|---|---|
| 🟥 | `#a04a30` | `--rust` | **Óxido.** Notas del archivero, advertencias, pin del papel clavado |
| 🟥 | `#6e3120` | `--rust-deep` | Óxido profundo; sombra del anterior |

### Tinta sobre placa

| Muestra | Hex | Token | Rol |
|---|---|---|---|
| ⬜ | `#ece4d2` | `--bone` | **Hueso.** Texto principal sobre fondo abisal (contraste verificado AA) |
| ⬜ | `#aab0ad` | `--bone-soft` | Tinta secundaria |

**⚠️ Aviso para quien abra el repositorio:** existe un segundo `:root` en
`assets/css/tokens.css` con una paleta completamente distinta —papel, musgo,
cobre, Iowan Old Style—. **Esa es la paleta del sitio ANTIGUO** (`index-legacy.html`
+ `pages/`), que no se toca ni se modifica. Para el sistema vigente, la paleta es
la de arriba.

---

## 3 · TIPOGRAFÍAS

Tres familias, todas de licencia libre (Google Fonts) y **auto-alojadas** en
`assets/fonts/` como `.woff2`. Cero dependencia de CDN.

| Familia | Rol | Dónde se usa | Token |
|---|---|---|---|
| **Jacquard 24** | Display | Nombres de entidades y títulos mayores. Evoca la letra gótica de los grimorios sin sacrificar legibilidad de pantalla | `--font-display` |
| **EB Garamond** | Cuerpo de lectura | Toda la prosa documental. Serif clásica de alta legibilidad, en cuerpo generoso. Incluye la itálica | `--font-body` |
| **Pixelify Sans** | Interfaz | Botones, etiquetas, datos de bestiario, microtexto. El registro «píxel» de la capa interactiva | `--font-pixel` |

**8 archivos** en total: cada familia en `latin` y `latin-ext`, más la itálica de
EB Garamond.

**Cuerpo mínimo efectivo: 17 px en teléfono**, ~19 px en escritorio. No baja de
ahí. Los textos de interfaz llevan **etiqueta legible, no solo icono**
(«Capítulos», «Mapa», «Fuentes», «Movimiento», «Sonido») — decisión tomada
pensando en el público de 40 a 70 años.

---

## 4 · REGLAS CERRADAS

Estas no se re-discuten. Están en la constitución del proyecto (`CLAUDE.md`) y
verificadas en el código.

### De superficie

- ❌ **Nunca pergamino ni textura de papel** en el sistema nuevo. Las superficies
  son **placas de bronce y agua abisal**. *(Verificado: la única aparición de la
  palabra «pergamino» en el CSS vigente es un comentario que enuncia la
  prohibición.)*
- ❌ Sin tarjetas repetidas, sin exceso de bordes redondeados, sin exceso de
  sombras.
- ❌ Sin estética genérica de inteligencia artificial, sin apariencia SaaS, sin
  elementos visuales sin función cultural.
- ✅ Los marcos llevan **esquina cortada** (`--cut: 9px`, vía `clip-path`
  poligonal), no radio. Es el gesto de placa metálica, no de tarjeta.

### De píxel

- ✅ `image-rendering: pixelated` **global** sobre `img` — declarado en
  `ficha.css:58` y `portada.css:57`, más 6 aplicaciones puntuales.
- ✅ **Grilla visible, sin antialiasing.** Los heroes enmarcados pasan por
  reducción de grilla 3 y cuantización a 96 colores.
- ⚠️ **Los fondos a pantalla completa NO pasan por grilla ni cuantización.** Es la
  «regla de oro» de la auditoría de julio de 2026: los slots full-viewport
  (`portada-*`, `fondo-*`, `descenso`, `cierre`) se sirven a **1800 px por el lado
  mayor, color pleno**, solo con sello tapado + LANCZOS + WebP q90.
  **El criterio de aceptación es visual a pantalla completa, no el peso.** Si una
  optimización se nota a simple vista, se revierte y se restaura desde `_raw/`.

### De movimiento y accesibilidad

- ✅ Botón **«Movimiento»** que pausa **toda** animación: niebla, luces, motas,
  parallax, revelado progresivo.
- ✅ `prefers-reduced-motion` respetado en **6 hojas de CSS**
  (`atmosphere`, `camino`, `ficha`, `journey`, `portada`, `responsive`) **y 4
  archivos de JS** (`camino`, `ficha`, `journey-reveal`, `portada`). Con la
  preferencia activa, todo se muestra estático y completo — nunca oculto.
- ✅ **Sonido apagado por defecto**, jamás autoplay. Se enciende solo con el botón
  y la preferencia se recuerda.
- ✅ Objetivos táctiles de **44 px o más**. Verificado a **390 px** sin scroll
  horizontal.
- ✅ Recorrido completo por teclado; la botonera es la primera parada del
  tabulador; los diálogos cierran con **Escape**.

### De honestidad patrimonial

- ✅ Toda pieza visual se rotula como **recreación artística contemporánea**.
  Ninguna imagen se presenta como iconografía tradicional documentada.
- ✅ Las ilustraciones fueron **generadas con herramientas de IA bajo dirección de
  arte humana**; el material de origen y su procesamiento quedan archivados en
  `assets/img/_raw/`, que **nunca se borra**.
- ✅ Esquina inferior derecha **despejada** en la composición: ahí va el sello ✦
  del generador, que el normalizador detecta y funde a negro con degradado
  radial. Si la composición mete información ahí, se pierde.

---

## 5 · EL PIPELINE DE IMÁGENES

### Flujo

```
Gemini genera (prompts con el ADN)
        ↓
crudo a assets/img/_raw/     ← SE CONSERVA SIEMPRE, nunca se borra
        ↓
herramientas/normalizar_img.py --id <id> --slot <slot>
        ↓  (tapa el sello ✦ · redimensiona · según slot: grilla+paleta o color pleno)
par assets/img/<id>-<slot>.webp + .png
        ↓
el generador de fichas los cablea POR NOMBRE (no hay rutas a mano)
```

**Convención de nombres:** `<id>-<slot>`. Cada pieza en **`.webp` (lo que carga el
navegador) + `.png` (fallback del `<picture>`)**.

- Fondos CSS → `image-set(url("../img/x.webp"), url("../img/x.png"))`, ruta
  relativa al CSS.
- `<img>` de hero → `<picture><source srcset="assets/img/x.webp" type="image/webp"><img src="assets/img/x.png"></picture>`, ruta relativa a la página en la raíz.

### Los cinco slots

| Slot | Proporción | Medida real en uso | Pipeline | Rol |
|---|---|---|---|---|
| **`hero`** | **16:9** | **917 × 512** | grilla 3 · 96 colores | Portal de entrada del capítulo. Pieza enmarcada. *Aviso del normalizador si el WebP supera 60 KB* |
| **`lamina`** | **2:3 retrato** | **565 × 842** | *(ver aviso abajo)* | Alternativa al hero: se cuelga **enmarcada** sobre el fondo abisal en vez de cubrir el portal. Clase `hero--lamina`. Introducida en el capítulo Recta Provincia (2026-07-10) |
| **`descenso`** | **9:16 vertical** | **1005 × 1800** | full-viewport, color pleno | Fondo del cuerpo del capítulo; se funde a negro al bajar. **Es el slot que sirve el descenso en teléfono** |
| **`cierre`** | **16:9** | **1800 × 1005** | full-viewport, color pleno | Pantalla final del capítulo, sobre el fondo marino |
| **`card`** | **1:1** | *sin producir* | — | Miniatura. **El slot existe en el pipeline y está vacío en todo el proyecto** |

Slots auxiliares sin proporción fija: `portada` (umbrales del camino), `fondo`
(fondos genéricos compartidos), `ui` (elementos de interfaz).

**Reservados a futuro** (no producir aún): `<id>-relato-<n>` para escenas del
relato interactivo, `<id>-sprite` para la viñeta caminable.

### ⚠️ Aviso: `lamina` no está en el normalizador

`herramientas/normalizar_img.py` define sus slots así:

```python
SLOTS = {"hero": (16,9), "descenso": (9,16), "cierre": (16,9), "card": (1,1),
         "portada": None, "fondo": None, "ui": None}
```

**`lamina` no aparece.** El generador de fichas sí la conoce
(`generar_fichas.py:37`) y el CSS también (`ficha.css:802`), pero
`--slot lamina` sería rechazado por el normalizador. Las 7 láminas existentes
están todas a **565 × 842** y son consistentes entre sí, pero se produjeron por
otra vía. **Conviene agregar `"lamina": (2,3)` al diccionario** antes de encargar
más piezas de ese tipo.

---

## 6 · INVENTARIO DE LAS 41 PIEZAS

**41 piezas únicas · 80 archivos · 39 pares WebP+PNG completos.**
Peso servido (WebP): **2,4 MB**. Peso del fallback (PNG): **39 MB**.
Crudos en `_raw/`: **40 archivos, 205 MB** — nunca se publican.

### Piezas por criatura (19)

| Criatura | Slot | Medida | Proporción | WebP | PNG |
|---|---|---|---|---|---|
| **Caleuche** | hero | 917 × 512 | 16:9 | 57,0 KB | 565,8 KB |
| **Pincoya** | hero | 917 × 512 | 16:9 | 63,8 KB | 563,4 KB |
| **Pincoya** | descenso | 1005 × 1800 | 9:16 | 96,4 KB | 1638,4 KB |
| **Pincoya** | cierre | 1800 × 1005 | 16:9 | 86,3 KB | 1689,1 KB |
| **Trauco** | hero | 917 × 512 | 16:9 | 77,2 KB | 562,1 KB |
| **Trauco** | descenso | 1005 × 1800 | 9:16 | 101,0 KB | 1684,1 KB |
| **Trauco** | cierre | 1800 × 1005 | 16:9 | 149,9 KB | 1986,9 KB |
| **Invunche** | hero | 917 × 512 | 16:9 | 71,0 KB | 519,9 KB |
| **Invunche** | descenso | 1005 × 1800 | 9:16 | 111,2 KB | 1747,7 KB |
| **Invunche** | cierre | 1800 × 1005 | 16:9 | 84,7 KB | 1648,0 KB |
| **Camahueto** | hero | 917 × 512 | 16:9 | 50,2 KB | 556,8 KB |
| **Camahueto** | descenso | 1005 × 1800 | 9:16 | 161,6 KB | 1827,4 KB |
| **Camahueto** | cierre | ⚠️ **1376 × 768** | 16:9 | 54,2 KB | 967,0 KB |
| **Recta Provincia** | hero | ⚠️ 1800 × 1005 | 16:9 | 154,2 KB | 1881,7 KB |
| **Juicio de 1880** | hero | ⚠️ 1800 × 1005 | 16:9 | 72,2 KB | 1659,4 KB |
| **Brujo chilote** | lamina | 565 × 842 | 2:3 | 54,2 KB | 252,5 KB |
| **Cueva de Quicaví** | lamina | 565 × 842 | 2:3 | 47,2 KB | 246,0 KB |
| **Macuñ** | lamina | 565 × 842 | 2:3 | 18,6 KB | 186,7 KB |
| **Challanco** | lamina | 565 × 842 | 2:3 | 29,5 KB | 231,9 KB |
| **Voladora** | lamina | 565 × 842 | 2:3 | 16,5 KB | 208,3 KB |
| **Iniciación** | lamina | 565 × 842 | 2:3 | 44,0 KB | 218,1 KB |

**Dos anomalías de resolución detectadas al medir:**

1. **`camahueto-cierre` está a 1376 × 768**, la mitad de la resolución del resto de
   los `cierre` (1800 × 1005). Ya está anotado como defecto conocido en
   `herramientas/pendientes.md`. **Se ve peor que sus pares a pantalla completa.**
2. **`recta-provincia-hero` y `juicio-1880-hero` están a 1800 × 1005**, mientras
   los otros cinco heroes están a 917 × 512. No es un error —esas dos páginas usan
   el hero como fondo a sangre completa, no como pieza enmarcada— pero significa
   que **«hero» cubre hoy dos usos distintos** con pipelines distintos. Vale
   documentarlo antes de encargar más.

### Piezas de sistema y ambiente (20)

| Pieza | Medida | Proporción | Rol | WebP |
|---|---|---|---|---|
| `portada-superficie` | 1800 × 1005 | 16:9 | INICIO · la superficie: palafitos, niebla baja, el farol | 55,0 KB |
| `portada-caleuche` | 1800 × 1005 | 16:9 | Umbral del Capítulo I: buque lejano entre la niebla | 20,8 KB |
| `portada-pincoya` | 1800 × 1005 | 16:9 | Umbral del capítulo de la Pincoya | 59,9 KB |
| `portada-trauco` | 1800 × 1005 | 16:9 | Umbral del capítulo del Trauco | 152,9 KB |
| `portada-columna` | 1005 × 1800 | 9:16 | LECHO · la caída vertical al vacío | 64,3 KB |
| `portada-lecho` | 1800 × 1005 | 16:9 | LECHO · el abismo final, puertas al archivo | 32,1 KB |
| `portada-niebla` | 1800 × 1005 | 16:9 | Transición atmosférica entre páginas (la bruma) | 29,1 KB |
| `fondo-mar` | 1005 × 1800 | 9:16 | Fondo fijo del Caleuche | 33,8 KB |
| `fondo-abismo` | 1005 × 1800 | 9:16 | Descenso del Caleuche | 53,4 KB |
| `fondo-lecho` | 1800 × 1005 | 16:9 | Cierre del Caleuche | 118,1 KB |
| `cueva-vacia` | 565 × 842 | 2:3 | Escena del Expediente | 39,2 KB |
| `archivo-ardiendo` | 565 × 842 | 2:3 | Escena del Expediente (los originales quemados) | 67,8 KB |
| `recogida` | 565 × 842 | 2:3 | Escena | 19,5 KB |
| `indicador-plomada` | 19 × 48 | — | La plomada de sonda: el instrumento náutico que marca el avance | 1,7 KB |
| `motas-sprite` | 512 × 512 | 1:1 | Hoja de sprites del sedimento | 23,4 KB |
| `mota-ambar` | 16 × 16 | 1:1 | Mota de sedimento ámbar | 0,6 KB |
| `mota-gris` | 12 × 12 | 1:1 | Mota de sedimento gris | 0,5 KB |
| `mota-gris-chica` | 8 × 8 | 1:1 | Mota de sedimento gris pequeña | 0,3 KB |
| `motas-capa-1` | — | — | ⚠️ Capa de sedimento — **solo PNG** | — |
| `motas-capa-2` | — | — | ⚠️ Capa de sedimento — **solo PNG** | — |

---

## 7 · QUÉ FALTA

En orden de impacto real sobre lo que hoy se ve.

### 1 · Los 8 `descenso` que faltan — el hueco más grave

De las **12 fichas publicadas, solo 4** tienen `descenso` propio: Pincoya, Trauco,
Invunche, Camahueto (el Caleuche usa el genérico `fondo-abismo`).

**Faltan:** Cueva de Quicaví · Recta Provincia · Brujo chilote · Macuñ ·
Challanco · Voladora · Juicio de 1880 · *(y el Caleuche, si se le quiere uno propio)*.

**Por qué importa más que el resto:** el `descenso` (9:16) es **el fondo del cuerpo
del capítulo en teléfono**. Ocho de doce capítulos se leen hoy en móvil sin
ilustración de fondo propia. Es el slot que más se ve y el que más falta.

Todas las que faltan son del **Libro Octavo (la Recta Provincia)** — el bloque
completo. Según `MAPA-PROYECTO.md`, **los prompts ya están listos**; falta
generarlas.

### 2 · Los 8 `cierre` que faltan

Mismas ocho fichas. El `cierre` (16:9) es la pantalla final de cada capítulo. Sin
ella, el capítulo termina sin su remate visual.

### 3 · Las 13 `card` — el slot vacío

**Ninguna criatura del proyecto tiene `card`.** El slot está definido en el
pipeline, en el generador y en la documentación, y no existe ni una sola pieza
1:1 producida. Es el candidato natural si en algún momento se quiere una vista de
índice o miniaturas en la carta de capítulos.

### 4 · Los umbrales de portada de Invunche y Camahueto

Hoy usan **el hero como provisional**. Existen umbrales propios para Caleuche,
Pincoya y Trauco (`portada-caleuche`, `portada-pincoya`, `portada-trauco`).
Faltan `portada-invunche` y `portada-camahueto`. Anotado en
`herramientas/pendientes.md`.

### 5 · Las dos motas sin par WebP

`motas-capa-1.png` y `motas-capa-2.png` son **las dos únicas piezas del proyecto
sin versión WebP**. Se sirven como PNG a todos los visitantes, en todos los
navegadores. Arreglo: pasarlas por `normalizar_img.py`.

### 6 · `camahueto-cierre` a media resolución

1376 × 768 contra los 1800 × 1005 de sus pares. Regenerar desde el crudo.

### 7 · La Fiura

Los crudos están en `assets/img/_raw/` **sin normalizar ni montar**. Es la
siguiente criatura en la fila según la hoja de ruta (completar el reino del
bosque junto con el Ruende).

### 8 · Deuda estructural: `lamina` fuera del normalizador

Ver el aviso de la sección 5. Agregar `"lamina": (2,3)` a `SLOTS` en
`normalizar_img.py`.

---

## 8 · RESUMEN PARA ENCARGO

Si hay que encargar arte mañana, el orden es:

| Prioridad | Encargo | Cantidad | Formato |
|---|---|---|---|
| **1** | `descenso` del bloque Recta Provincia | 7 piezas | 9:16 · 1005 × 1800 · color pleno |
| **2** | `cierre` del bloque Recta Provincia | 7 piezas | 16:9 · 1800 × 1005 · color pleno |
| **3** | `portada-invunche` · `portada-camahueto` | 2 piezas | 16:9 · 1800 × 1005 |
| **4** | Fiura completa (hero o lámina + descenso + cierre) | 3 piezas | según slot |
| **5** | Regenerar `camahueto-cierre` a 1800 px | 1 pieza | 16:9 · 1800 × 1005 |
| **6** | `card` de las 12 publicadas | 12 piezas | 1:1 · medida por fijar |

**Restricciones que valen para toda pieza encargada:**
paleta abisal `#02060c` → `#15384a` · **una sola** luz cálida `#f2b65a` ·
óxido `#a04a30` como único acento no ámbar · pixel art de grilla visible, sin
antialiasing · **esquina inferior derecha despejada** · sin pergamino, sin papel ·
crédito, licencia, versión y texto alternativo obligatorios · rotulada como
**recreación artística**.
