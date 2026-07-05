# Manifiesto de imágenes — `assets/img/`

Cada imagen se sirve en **WebP** (lo que carga el navegador) + **PNG** de fallback.

- **Fondos CSS** → `image-set(url("../img/x.webp") …, url("../img/x.png") …)`. Ruta `../img/` (relativa al CSS en `assets/css/`).
- **`<img>` de hero** → `<picture><source srcset="assets/img/x.webp" type="image/webp"><img src="assets/img/x.png"></picture>`. Ruta `assets/img/` (relativa a la página en la raíz).

## REGLA DE ORO DE CALIDAD (auditoría 2026-07)

- **Fondos FULL-VIEWPORT** (`portada-*`, `fondo-*`, `<id>-descenso`, `<id>-cierre`):
  se sirven a **1800 px por el lado mayor, color pleno** — NUNCA grid-reduction
  ni cuantización de paleta. Pipeline: sello tapado + LANCZOS + WebP q90
  (`normalizar_img.py --slot fondo|portada|descenso|cierre`).
- **Heroes enmarcados** (`<id>-hero`): pipeline pixel real — grid 3 + 96 colores
  (calibrado con las anclas; 48 aplanaba el rayo del Trauco).
- **El criterio de aceptación es VISUAL a pantalla completa, no el peso.** Si una
  optimización se nota a simple vista, se revierte y se restaura desde `_raw/`.

---

## FICHAS de criatura — NO TOCAR estas rutas (las fichas dependen de ellas)

| Archivo (`.webp` + `.png`) | Rol | Dimensiones | Pipeline |
|---|---|---|---|
| `caleuche-hero` | FICHA **Caleuche** · hero (buque fantasma) | 600×335 | grid 3 · 96 col |
| `fondo-mar` | FICHA **Caleuche** · fondo fijo (mar) | 1005×1800 | full-viewport |
| `fondo-abismo` | FICHA **Caleuche** · descenso | 1005×1800 | full-viewport |
| `fondo-lecho` | FICHA **Caleuche** · cierre (lecho) | 1800×1005 | full-viewport |
| `trauco-hero` | FICHA **Trauco** · hero (bosque) | 600×335 | grid 3 · 96 col |
| `trauco-descenso` | FICHA **Trauco** · descenso | 1005×1800 | full-viewport |
| `trauco-cierre` | FICHA **Trauco** · cierre | 1800×1005 | full-viewport |

## PORTADA / CAMINO

Restauradas desde `_raw/` (auditoría 2026-07): 1800 px, color pleno, sello tapado.

| Archivo | Rol | Dimensiones |
|---|---|---|
| `portada-superficie` | INICIO · superficie (Chiloé, palafitos, farol) | 1800×1005 |
| `portada-caleuche` | INICIO · umbral del Capítulo I (niebla + buque lejano) | 1800×1005 |
| `portada-columna` | LECHO · caída vertical al vacío | 1005×1800 |
| `portada-lecho` | LECHO · abismo final (puertas al archivo) | 1800×1005 |
| `portada-niebla` | transición atmosférica (banda de niebla / velo entre páginas) | 1800×1005 |

---

## `_raw/` — crudos originales (NUNCA se borran)

Crudos de Gemini (2752 px, con sello ✦) + los 1800 px pre-normalización de los
heroes. Todo reproceso futuro sale de aquí. Inventario: `portada-*` (5),
`fondo-mar`, `fondo-lecho`, `trauco-descenso`, `trauco-cierre`,
`caleuche-hero` (1800) + `caleuche-hero-crudo` (2752),
`trauco-hero` (1800) + `trauco-hero-crudo` (2752).
Sin crudo conocido: `fondo-abismo` (mejor fuente = su PNG servido).

---

_Convención de nombres (`<id>-<slot>`):_ `<id>-hero`, `<id>-descenso`, `<id>-cierre`, `<id>-card` (+ `<id>-fondo` opcional). Cada una en `.webp` + `.png`. Las produce `herramientas/normalizar_img.py`; los fondos genéricos `fondo-*` y los `portada-*` conservan su nombre (no son por-criatura). Reservados a futuro: `<id>-relato-<n>`, `<id>-sprite` (ver HORIZONTE-RELATO.md).
