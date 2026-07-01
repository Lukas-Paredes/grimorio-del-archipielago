# Manifiesto de imágenes — `assets/img/`

Cada imagen se sirve en **WebP** (lo que carga el navegador) + **PNG** de fallback.

- **Fondos CSS** → `image-set(url("../img/x.webp") …, url("../img/x.png") …)`. Ruta `../img/` (relativa al CSS en `assets/css/`).
- **`<img>` de hero** → `<picture><source srcset="assets/img/x.webp" type="image/webp"><img src="assets/img/x.png"></picture>`. Ruta `assets/img/` (relativa a la página en la raíz).

---

## FICHAS de criatura — NO TOCAR estas rutas (las fichas dependen de ellas)

Ya optimizadas (≤1800px, WebP + PNG).

| Archivo (`.webp` + `.png`) | Rol | Dimensiones |
|---|---|---|
| `caleuche` | FICHA **Caleuche** · hero (buque fantasma) | 1800×1005 |
| `fondo-mar` | FICHA **Caleuche** · fondo fijo (mar) | 1005×1800 |
| `fondo-abismo` | FICHA **Caleuche** · descenso | 1005×1800 |
| `fondo-lecho` | FICHA **Caleuche** · cierre (lecho) | 1800×1005 |
| `trauco` | FICHA **Trauco** · hero (bosque) | 1800×1005 |
| `trauco-descenso` | FICHA **Trauco** · descenso | 1005×1800 |
| `trauco-cierre` | FICHA **Trauco** · cierre | 1800×1005 |

---

## PORTADA-descenso — EN CONSTRUCCIÓN (crudos de Gemini, pendientes FASE 1)

Todas a 2752×1536 (o vertical), **con sello ✦ de Gemini abajo-derecha** (se cubre en FASE 1) y sin optimizar aún.

| Archivo | Rol | Dimensiones | Estado / nota |
|---|---|---|---|
| `portada-superficie.png` | PORTADA · **superficie** (Chiloé, palafitos, hora azul) | 2752×1536 | crudo · renombrado desde `superficie.png` |
| `portada-caleuche.png` | PORTADA · **capítulo Caleuche** (niebla + buque lejano) | 2752×1536 | crudo |
| `portada-columna.png` | PORTADA · **descenso/columna** (caída vertical al vacío) | 1536×2752 | crudo (vertical) |
| `portada-lecho.png` | PORTADA · **abismo/lecho** (pie de página) | 2752×1536 | crudo |
| `portada-niebla.png` | PORTADA · **transición atmosférica** (mar en niebla, funde entre secciones) | 2752×1536 | crudo · extra; ubicación final en FASE 2 |

---

## `_raw/`
Respaldo de los crudos originales de Gemini (antes de cubrir el sello y optimizar). Se llena en FASE 1.

---

_Convención de nombres para criaturas futuras:_ `<criatura>` (hero), `<criatura>-descenso`, `<criatura>-cierre` (+ fondo fijo opcional). Cada una en `.webp` + `.png`.
