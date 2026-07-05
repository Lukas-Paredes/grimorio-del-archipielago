/* ════════════════════════════════════════════════════════════════════════
   portada.js — Atmósfera de las páginas del camino (inicio y lecho).
   · Revelado por sección · zonas de color (tiñen el documento)
   · parallax v2: scroll-driven CSS donde hay soporte (html.has-sda) y JS
     como fallback, transformando solo capas en pantalla.
   Los botones (Capítulos/Movimiento/Sonido) viven en camino.js, que al
   reanudar el movimiento dispara un evento scroll para re-sincronizar.
   Respeta prefers-reduced-motion y la clase .motion-off de <html>.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var html = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slice = function (n) { return Array.prototype.slice.call(n); };
  function paused() { return html.classList.contains("motion-off"); }

  // Mejora progresiva: parallax por CSS scroll-driven si el navegador puede.
  var hasSDA = !reduce && window.CSS && CSS.supports && CSS.supports("animation-timeline: view()");
  if (hasSDA) { html.classList.add("has-sda"); }

  /* ── Revelado por sección ─────────────────────────────────────────────── */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (n) { n.classList.add("is-visible"); });
  } else {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); ro.unobserve(e.target); } });
    }, { threshold: 0.16 });
    reveals.forEach(function (n) { ro.observe(n); });
  }

  /* ── Zonas de color (F2): el reino visible tiñe el documento ──────────── */
  var zonaSecs = slice(document.querySelectorAll("[data-zona]"));

  if ("IntersectionObserver" in window) {
    var zo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { html.setAttribute("data-zona", e.target.getAttribute("data-zona")); }
      });
    }, { threshold: 0.45 });
    zonaSecs.forEach(function (s) { zo.observe(s); });

    // Gate del parallax JS: solo transformar capas de secciones en pantalla.
    var go = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("is-onscreen", e.isIntersecting); });
    }, { rootMargin: "25% 0px" });
    slice(document.querySelectorAll(".capa")).forEach(function (c) { go.observe(c); });
  } else {
    slice(document.querySelectorAll(".capa")).forEach(function (c) { c.classList.add("is-onscreen"); });
  }

  /* ── Parallax JS (fallback) en un solo rAF ────────────────────────────── */
  var players = hasSDA ? [] : slice(document.querySelectorAll("[data-parallax]")).map(function (el) {
    return { el: el, sec: el.closest(".capa"), speed: parseFloat(el.getAttribute("data-parallax")) };
  });
  var ticking = false;
  function update() {
    var vh = window.innerHeight;
    if (!hasSDA && !reduce && !paused()) {
      players.forEach(function (p) {
        if (!p.sec || !p.sec.classList.contains("is-onscreen")) { return; }
        var r = p.sec.getBoundingClientRect();
        var fromCenter = (r.top + r.height / 2) - vh / 2;   // 0 cuando la sección está centrada
        p.el.style.transform = "translate3d(0," + (fromCenter * p.speed).toFixed(1) + "px,0)";
      });
    }
    ticking = false;
  }
  function onScroll() { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}());
