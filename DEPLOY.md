# DEPLOY — publicar El Grimorio del Archipiélago

El sitio es **estático puro** (HTML + CSS + JS, sin build): cualquier hosting
estático lo sirve tal cual. Plan recomendado: **GitHub Pages (gratis) + dominio
propio `.cl` (NIC Chile)**. Costo total estimado: **~$11.000 CLP al año**
(solo el dominio; el hosting es gratis).

## 1 · Publicar en GitHub Pages (gratis, 10 minutos)

1. Mergear a `main` cuando el trabajo esté aprobado (hoy todo vive en
   `v8-arquitectura`; el merge lo decide Lucas).
2. En GitHub: **Settings → Pages → Build and deployment**:
   - Source: *Deploy from a branch*.
   - Branch: `main` · carpeta `/ (root)`. Guardar.
3. En 1–2 minutos el sitio queda en
   `https://lukas-paredes.github.io/grimorio-del-archipielago/`.
4. Verificar el camino completo en esa URL (las rutas son relativas: funciona
   bajo la subruta sin cambios).

## 2 · Dominio `.cl` (NIC Chile) — lo compra Lucas

1. Entrar a **nic.cl** y buscar el dominio (sugerencias, ver §4).
2. Registrarlo (cuenta NIC Chile + pago). Precio de referencia: **$9.950 CLP
   por 1 año** (verificar el vigente en nic.cl; hay descuento por 2+ años).
3. En el panel del dominio en NIC Chile, administrar DNS y crear:
   - 4 registros **A** para el dominio raíz (`@`) apuntando a GitHub Pages:
     `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
   - 1 registro **CNAME** para `www` → `lukas-paredes.github.io`
4. En el repo: renombrar `CNAME.placeholder` → **`CNAME`** (el contenido debe
   ser exactamente el dominio comprado, una línea, p. ej.
   `grimoriodelarchipielago.cl`), commit y push a la rama publicada.
5. En GitHub **Settings → Pages → Custom domain**: escribir el dominio,
   guardar, esperar el check DNS y activar **Enforce HTTPS**.
6. Si el dominio final difiere del placeholder
   (`grimoriodelarchipielago.cl`), actualizar: `sitemap.xml`, `robots.txt`,
   los `canonical`/`og:` de `index.html` y `lecho.html`, y la constante
   `SITE` de `herramientas/generar_fichas.py` (y regenerar las fichas).

## 3 · Alternativas de hosting (si no GitHub Pages)

| Opción | Costo | Nota |
|---|---|---|
| **GitHub Pages** | $0 | Recomendado: ya está el repo; HTTPS y CDN incluidos. |
| Cloudflare Pages | $0 | Igual de simple; DNS propio de Cloudflare (rápido en Chile). |
| Netlify | $0 (plan free) | Fácil, pero límites de ancho de banda en free. |
| Hosting chileno tradicional | ~$20.000–40.000 CLP/año | Solo si se exige factura local; innecesario técnicamente. |

## 4 · Sugerencias de dominio (verificar disponibilidad en nic.cl)

1. `grimoriodelarchipielago.cl` (el placeholder actual)
2. `grimoriochilote.cl`
3. `elgrimorio.cl`

## 5 · Checklist antes de publicar

- [ ] Camino completo navegable (inicio → capítulos → lecho → archivo).
- [ ] `python -m http.server 8000` local sin errores de consola.
- [ ] 390 px sin scroll horizontal; teclado y Escape funcionan.
- [ ] `CNAME` con el dominio real (no el placeholder).
- [ ] sitemap/robots/canonical con el dominio real.
