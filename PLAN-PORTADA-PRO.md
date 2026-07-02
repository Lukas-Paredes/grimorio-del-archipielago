# PLAN — PORTADA-DESCENSO PRO ("La Sonda")

> Plan por fases para Claude Code. **El Grimorio del Archipiélago.**
> Objetivo: llevar la portada-descenso (`index.html` + `portada.css` + `portada.js`)
> a nivel pro — inmersiva, por capítulos, escalable a 68 criaturas — sin traicionar
> el ADN ni el rendimiento móvil.

---

## 0. Restricciones heredadas (NO negociables)

- Respetar `CLAUDE.md` completo: HTML estático + CSS modular + JS clásico; sin
  frameworks, sin npm, sin build, sin módulos ES, sin `fetch()` estructural.
  Namespace `window.Grimorio`. Rutas relativas. Abre con `python -m http.server 8000`.
- Trabajar solo en la rama actual (`v8-arquitectura`). `git status` antes,
  `git diff --stat` después. Sin commit/push/merge salvo pedido expreso.
- Regla sagrada cultural: no inventar relatos, nombres, fuentes ni iconografía.
  Todo texto de capítulo sale del `@ENTIDAD` de `El_Grimorio_Datos_Estructurados.txt`
  o del grimorio literario. Los títulos de actos son los Libros del grimorio
  (Libro Primero · De cómo se hizo el mundo, etc.) — copiarlos verbatim.
- ADN visual: paleta abismo (#02060c→#15384a) + UNA luz ámbar (#f2b65a/#e0a24a/#b9772b)
  + óxido #a04a30 + hueso #ece4d2. Pixel art, bordes a negro, placas de bronce,
  NUNCA pergamino. Jacquard 24 / Pixelify Sans / EB Garamond.
- `prefers-reduced-motion` = cero movimiento. Todo lo que se mueve o suena se
  puede pausar y la preferencia persiste. Teclado + Escape funcionan. 390 px sin
  scroll horizontal. Consola limpia.
- GOTCHA de rutas: `url()` dentro de CSS se resuelve relativo a `assets/css/`
  → fondos con `../img/...`. Un `<img>` en un HTML de raíz → `assets/img/...`.

## Presupuesto de rendimiento (medir en cada fase)

- HTML + CSS + JS de la portada: **< 90 KB gzip total**.
- Imágenes en el viewport inicial: **≤ 150 KB** (hero de superficie preloaded).
  Resto de fondos: lazy (ver F1).
- LCP < 2,5 s con throttling "Fast 3G / CPU 4×" (DevTools). CLS < 0,05.
- Sin long tasks > 50 ms durante scroll continuo.
- Lighthouse móvil: Performance ≥ 90, Accessibility ≥ 95.

---

## F0 · Cimientos (rendimiento, control, accesibilidad)

**Tareas**
1. **Tipografías self-host**: descargar los woff2 (Jacquard 24; Pixelify Sans
   400–700; EB Garamond 400/500/600 + itálica 400) a `assets/fonts/`. `@font-face`
   con `font-display: swap`. `<link rel="preload" as="font" crossorigin>` para
   Jacquard (la marca) y EB Garamond regular. Eliminar los `<link>` a
   fonts.googleapis.com de TODAS las páginas (portada y fichas).
2. **Preload del LCP**: `<link rel="preload" as="image">` del fondo de superficie
   (webp) en `index.html`.
3. **Botón de pausa de movimiento ("marea")**: junto a la bocina, mismo estilo
   circular. Comportamiento:
   - Alterna clase `motion-off` en `<html>`.
   - CSS: `.motion-off *, .motion-off *::before, .motion-off *::after {
     animation-play-state: paused !important; }` y `.motion-off { scroll-behavior: auto; }`.
   - `portada.js`: el loop de parallax consulta un flag y no transforma si está en pausa.
   - Persistir en `localStorage` clave `grimorio:motion` (`"on"`/`"off"`). Leerla
     al cargar ANTES del primer frame (script inline mínimo en `<head>` para
     evitar flash de movimiento).
   - Si `prefers-reduced-motion: reduce` → arranca en pausa y el botón se muestra
     en estado pausado (el usuario puede reactivar si quiere).
   - `aria-pressed` correcto + `title` descriptivo.
4. **Bocina**: dejarla cableada al mismo patrón de persistencia
   (`grimorio:audio`), aunque el audio real llegue en F5.
5. **Sonda accesible**: área táctil de cada nodo ≥ 44×44 px (padding, no tamaño
   visual), `aria-current="true"` en el nodo activo, y `:focus-visible` con
   outline ámbar (2 px) en TODOS los interactivos de la portada.

**Verificación**
- Sin requests a googleapis/gstatic. Fuentes visibles offline (server local sin red).
- Recargar con la pausa activa → nada se mueve desde el primer frame.
- Tab recorre bocina → marea → sonda → CTA en orden lógico con foco visible.
- Lighthouse móvil ≥ 90 / LCP < 2,5 s (Fast 3G, CPU 4×). Consola limpia. 390 px OK.

---

## F1 · Modelo de capítulos + render data-driven

**Modelo** — crear `assets/js/data/capitulos.js` (datos embebidos, sin fetch):

```js
window.Grimorio = window.Grimorio || {};
window.Grimorio.portada = {
  actos: [
    // Los Libros del grimorio literario, verbatim. Solo se listan los que ya
    // tienen capítulos (publicados o sellados); agregar actos después es gratis.
    { id: "libro-3", numeral: "Libro Tercero", titulo: "Los barcos y el paso de las almas", zona: "mar" },
    { id: "libro-4", numeral: "Libro Cuarto",  titulo: "Los señores del bosque",            zona: "bosque" }
  ],
  capitulos: [
    {
      id: "caleuche",              // = ID del @ENTIDAD = archivo = prefijo de imágenes
      n: 1,                        // orden curatorial del descenso
      acto: "libro-3",
      nombre: "El Caleuche",
      alias: "el buque de arte",
      gancho: "Se oye música y risas sobre el agua, y luces donde no debería haberlas. Los que suben a su cubierta no vuelven a bajar.",
      tags: ["Mar", "Barco fantasma", "Chilota"],
      teaser: "Cuatro relatos lo explican. Ninguno del todo.",
      verbo: "Abordar",            // CTA por reino: Abordar / Adentrarse / Descender…
      href: "caleuche.html",
      estado: "publicado",         // "publicado" | "sellado"
      img: "portada-caleuche",     // base → ../img/portada-caleuche.webp/.png
      ventana: { left: "8%", top: "26%", w: "42%", h: "40%" } // zona clickeable
    },
    { id: "trauco", n: 2, acto: "libro-4", nombre: "El Trauco", alias: "el señor del bosque",
      gancho: "…(del @ENTIDAD, verbatim)…", tags: ["Bosque", "Chilota"],
      teaser: "…", verbo: "Adentrarse", href: "trauco.html",
      estado: "publicado", img: "portada-trauco", ventana: { left: "52%", top: "22%", w: "36%", h: "44%" } },
    { id: "pincoya", n: 3, acto: "libro-2-pendiente", nombre: "La Pincoya",
      estado: "sellado" }          // sellado: solo placa mínima, sin href
  ]
};
```

**Tareas**
1. Nuevo `assets/js/pages/portada-capitulos.js` (o extender `portada.js`):
   renderiza, entre Superficie y Lecho, la secuencia actos→capítulos desde los
   datos. Superficie y Lecho quedan estáticos en el HTML.
2. **Separador de acto**: sección corta (~55svh), fondo transparente sobre la
   zona de color (F2), numeral en Pixelify + título en Jacquard + regla ámbar.
3. **Módulo-capítulo publicado** (generaliza el tráiler actual del Caleuche):
   - Sección ~100svh. Fondo: `<img class="capa__img" loading="lazy"
     decoding="async" alt="">` con `<picture>` webp/png (mejor que background:
     lazy nativo + prioridad controlable). `object-fit: cover` + velo actual.
   - Tarjeta-placa (reusar `.trailer` tal cual): nº romano del capítulo, nombre,
     alias, gancho (blockquote), tags, teaser, CTA con el `verbo`.
   - `.ventana` (renombrar/generalizar `.buque-link`): `<a>` posicionada con las
     coords del dato, `aria-label="{verbo} {nombre}"`, halo ámbar en
     hover/focus-visible (box-shadow, ya existe el patrón).
   - Alternar lado de la tarjeta (izq/der) por paridad para ritmo visual.
4. **Placa sellada**: elemento compacto dentro de su acto (no una pantalla):
   marco bronce apagado + sigilo (inicial en Jacquard) + nombre + "capítulo
   sellado" en Pixelify. Sin link; `aria-disabled="true"`.
5. **Sonda generada de los datos**: un nodo por capítulo publicado (+ Superficie
   y Lecho). Con >8 nodos en móvil: mostrar solo primera/última + activa, o
   reducir a línea de progreso + etiqueta del capítulo actual (decidir al verlo).
6. `content-visibility: auto` + `contain-intrinsic-size: auto 100svh` en las
   secciones de capítulo (evita costo de layout fuera de pantalla).
7. Los textos de capítulo se copian VERBATIM del `@ENTIDAD` correspondiente.
   Comentario en `capitulos.js` recordándolo.

**Verificación**
- Agregar un capítulo de prueba en `capitulos.js` → aparece su sección, su nodo
  de sonda y (F3) su placa en la carta, sin tocar HTML/CSS. Borrar el objeto lo
  quita todo.
- Fondos de capítulos NO se descargan hasta acercarse (Network panel).
- 390 px: tarjeta centrada, ventana sigue sobre la criatura, sin scroll-x.
- Teclado: se llega a cada CTA y cada ventana; Escape no rompe nada. Consola limpia.

---

## F2 · La atmósfera del descenso

**Tareas**
1. **Zonas de color continuas**: `<html data-zona="superficie|mar|bosque|abismo">`
   seteado por IntersectionObserver al cruzar actos. CSS: la zona define
   `--zona-bg` y un tinte de niebla; `body { background: var(--zona-bg);
   transition: background-color 1.2s var(--ease); }`. Las costuras de imágenes ya
   funden a negro; esto cose los huecos entre capítulos cuando son pocos.
2. **Motas de sedimento**: UNA capa fija (`.motas`, `position: fixed`,
   `z-index` bajo, `pointer-events: none`) con 2 `radial-gradient` de 1–2 px
   repetidos (`background-repeat`, tile ~280 px) y deriva lenta por `transform`
   (keyframes ~90 s). Opacidad ≤ 0.18. Se pausa con `motion-off` y desaparece
   con reduced-motion. CSS puro, cero JS.
3. **Parallax v2**:
   - Gate: IntersectionObserver marca `is-onscreen` en cada `.capa`; el loop rAF
     solo transforma capas visibles.
   - Mejora progresiva: bajo `@supports (animation-timeline: view())`, mover el
     parallax de fondos a CSS scroll-driven (`animation-timeline: view();
     animation-range: cover`) y desactivar el JS para esas capas (clase
     `has-sda` en `<html>` puesta por un test de soporte de 3 líneas). El JS
     actual queda como fallback (Firefox y navegadores viejos).
4. **Scroll-snap**: `scroll-snap-type: y proximity` en el contenedor +
   `scroll-snap-align: start` en actos y capítulos. PROBAR en un Android real de
   gama media; si molesta al leer o marea, eliminar (guardarlo detrás de una
   clase para poder apagarlo en 1 línea).
5. **Profundímetro en brazas**: junto al fill de la sonda, una cifra pequeña en
   Pixelify que interpola 0 → N brazas con el progreso (mapa lineal; N simbólico,
   p. ej. 68). Actualizada en el mismo rAF del fill; `aria-hidden="true"`
   (decorativa).

**Verificación**
- Grabación de Performance durante scroll completo: sin long tasks > 50 ms;
  scripting por frame ~0 en navegadores con scroll-driven CSS.
- La transición de color se percibe continua (superficie azulada → abismo negro).
- Reduced-motion: sin motas, sin parallax, sin snap raro, colores estáticos correctos.
- Pausa (marea): motas y niebla congeladas, parallax quieto, scroll normal.

---

## F3 · Carta de navegación (selección de capítulos)

**Tareas**
1. `<dialog id="carta" class="carta">` en `index.html`; abrir con `showModal()`
   desde: (a) botón fijo (ícono de ancla, junto a bocina/marea), (b) enlace en el
   Lecho, (c) `location.hash === "#carta"` al cargar (deep-link; al cerrar,
   limpiar el hash).
2. Contenido renderizado desde `window.Grimorio.portada`: grupos por acto
   (numeral + título del Libro) y grid de placas:
   - **Publicada**: `<a>` con miniatura `<id>-card` (webp/png, `loading="lazy"`;
     si no existe aún, fallback al sigilo) + nº romano + nombre.
   - **Sellada**: placa apagada, sigilo + "sellado", sin link.
3. Estilo: fondo `rgba(2,6,12,0.92)` + niebla sutil; placas = `.frame` bronce
   existente; grid `repeat(auto-fill, minmax(9.5rem, 1fr))`; el scroll interno
   es del dialog.
4. Accesibilidad: `showModal()` ya da foco atrapado + Escape. Botón cerrar (✕)
   visible y primero en el orden de foco; `aria-label="Carta de navegación —
   capítulos del archipiélago"`. Al cerrar, devolver el foco al botón que abrió.
5. Cerrar también al click en el backdrop (`::backdrop`).

**Verificación**
- 68 placas de prueba: el dialog scrollea fluido en móvil, la portada no crece.
- Escape cierra; Tab no escapa del dialog; foco vuelve al invocador.
- `index.html#carta` abre la carta directo. 390 px: 2 columnas de placas.

---

## F4 · La sumersión + micro-interacciones

**Tareas**
1. **View Transitions cross-document** (mejora progresiva, cero JS):
   en `portada.css` y `ficha.css`:
   ```css
   @view-transition { navigation: auto; }
   ::view-transition-old(root) { animation: 0.55s var(--ease) both vt-hundir; }
   ::view-transition-new(root) { animation: 0.55s var(--ease) both vt-emerger; }
   @keyframes vt-hundir  { to { opacity: 0; transform: scale(1.04); filter: brightness(0.2); } }
   @keyframes vt-emerger { from { opacity: 0; transform: scale(0.985); } }
   @media (prefers-reduced-motion: reduce) { ::view-transition-old(root),
     ::view-transition-new(root) { animation: none; } }
   ```
   Donde no hay soporte (Firefox): navegación normal, sin costo. `motion-off`
   también la anula.
2. **Halo de ventana**: pulso lento del glow (reusar `@keyframes lantern`) solo
   en hover/focus-visible; en táctil, primer tap = navegar (el halo es bonus,
   no requisito).
3. Micro-detalle de la placa: brillo sutil de remaches al hover (ya hay patrón
   en fichas; unificar).

**Verificación**
- Chrome/Safari: abordar desde la portada "traga" hacia la ficha sin flash
  blanco; volver atrás emerge. Firefox: navegación normal sin errores.
- Reduced-motion y marea en pausa: sin animación de transición.

---

## F5 · Difusión, audio opcional y cierre

**Tareas**
1. **Metadatos por página** (portada y fichas): `og:title`, `og:description`,
   `og:image` (1200×630, generar por plantilla), `og:locale=es_CL`,
   `twitter:card=summary_large_image`, `<link rel="canonical">`.
2. **JSON-LD**: portada = `WebSite` + `CollectionPage`; ficha = `Article`/
   `CreativeWork` con `about`, `isPartOf`, y fuentes en `citation`.
3. `sitemap.xml` + `robots.txt` + set de favicons (SVG ya existe; añadir PNG 192/512
   + `apple-touch-icon` + `theme-color: #02060c`).
4. **Audio (opcional, solo si hay assets)**: un loop ambiente 45–60 s sin costura
   (agua + madera), OGG + M4A, ≤ 350 KB total, `<audio loop preload="none">`.
   La bocina lo inicia tras gesto con fade de volumen 0→0.4 en 2 s; estado
   persistido (`grimorio:audio`); nunca autoplay. Extra fino (si sobra tiempo):
   segundo loop "abismo" y crossfade por profundidad de scroll.
5. **Pasada final del checklist de CLAUDE.md**: portada, todas las páginas,
   enlaces relativos, menú/carta, consola, 390 px, teclado, Escape, sin scroll-x,
   sin contenido cultural inventado. + Lighthouse móvil ≥ 90 documentado.

**Verificación**
- Compartir el link en WhatsApp/Telegram muestra imagen + título + descripción.
- Validar JSON-LD (Rich Results Test) sin errores.
- Audio: jamás suena sin gesto; recargar respeta la preferencia.

---

## Qué NO hacer (decisiones ya tomadas — no reabrir)

- Sin Lenis ni scroll hijacking (táctil manda). Sin GSAP/ScrollTrigger, AOS,
  Swiper ni ninguna librería runtime. Sin WebGL/Three, sin canvas de partículas,
  sin video de fondo, sin cursor custom, sin scroll horizontal.
- No animar `filter: blur()` ni `box-shadow` en loops (caro en móvil); la niebla
  sigue siendo gradientes + transform.
- No convertir fondos de capítulo en background-image CSS (perderían lazy).
- No tocar `ficha.js`/`ficha.css` salvo F0 (fuentes) y F4 (view transitions).
- No inventar títulos, ganchos ni nombres: todo texto viene del `@ENTIDAD` o de
  los Libros del grimorio, verbatim.
