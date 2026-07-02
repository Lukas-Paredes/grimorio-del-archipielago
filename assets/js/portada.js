/* ════════════════════════════════════════════════════════════════════════
   portada.js — Interacción de la portada-descenso (2D, liviano, sin deps).
   Corre DESPUÉS de portada-capitulos.js (defer, en orden): las secciones de
   capítulo y los nodos de la sonda ya existen.
   · Revelado por sección · sonda (activo + fill + brazas) · zonas de color
   · parallax v2: scroll-driven CSS donde hay soporte (html.has-sda) y JS
     como fallback, transformando solo capas en pantalla
   · marea (pausa persistente) · bocina (persistente; audio en F5).
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

  /* ── Sonda: nodo activo según la sección visible ──────────────────────── */
  var nodos = slice(document.querySelectorAll(".sonda__nodo"));
  function setActive(id) {
    nodos.forEach(function (n) {
      var on = n.getAttribute("data-target") === id;
      n.classList.toggle("is-active", on);
      if (on) { n.setAttribute("aria-current", "true"); }
      else { n.removeAttribute("aria-current"); }
    });
  }

  /* ── Zonas de color (F2): el reino visible tiñe el documento ──────────── */
  var zonaSecs = slice(document.querySelectorAll("[data-zona]"));

  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { setActive(e.target.id); } });
    }, { threshold: 0.5 });
    slice(document.querySelectorAll(".capa")).forEach(function (c) { so.observe(c); });

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

  /* ── Parallax JS (fallback) + fill + brazas en un solo rAF ────────────── */
  var players = hasSDA ? [] : slice(document.querySelectorAll("[data-parallax]")).map(function (el) {
    return { el: el, sec: el.closest(".capa"), speed: parseFloat(el.getAttribute("data-parallax")) };
  });
  var fill = document.querySelector(".sonda__fill");
  var brazas = document.querySelector(".sonda__brazas");
  var BRAZAS_MAX = 68;                 // profundidad simbólica: una braza por entidad
  var lastBz = -1;
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
    var max = document.documentElement.scrollHeight - vh;
    var prog = max > 0 ? Math.max(0, Math.min(1, window.pageYOffset / max)) : 0;
    if (fill) { fill.style.height = (prog * 100).toFixed(1) + "%"; }
    if (brazas) {
      var bz = Math.round(prog * BRAZAS_MAX);
      if (bz !== lastBz) { lastBz = bz; brazas.textContent = bz + " brazas"; }
    }
    ticking = false;
  }
  function onScroll() { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  /* ── Marea: pausa/reanuda el movimiento; persiste en grimorio:motion ──── */
  var marea = document.querySelector(".marea");
  function reflectMarea() {
    if (!marea) return;
    var off = paused();
    marea.setAttribute("aria-pressed", off ? "true" : "false");
    marea.textContent = off ? "⏸" : "🌊";
    marea.title = off ? "Movimiento en pausa — clic para reanudar"
                      : "Movimiento activo — clic para pausar";
  }
  if (marea) {
    reflectMarea();
    marea.addEventListener("click", function () {
      var off = html.classList.toggle("motion-off");
      try { localStorage.setItem("grimorio:motion", off ? "off" : "on"); } catch (e) {}
      reflectMarea();
      if (!off) { update(); }           // al reanudar, re-sincroniza posiciones
    });
  }

  /* ── Bocina: estado persistente (grimorio:audio). Audio real en F5. ───── */
  var boc = document.querySelector(".bocina");
  function reflectBocina() {
    if (!boc) return;
    boc.textContent = boc.getAttribute("aria-pressed") === "true" ? "🔈" : "🔇";
  }
  if (boc) {
    try { if (localStorage.getItem("grimorio:audio") === "on") { boc.setAttribute("aria-pressed", "true"); } } catch (e) {}
    reflectBocina();
    boc.addEventListener("click", function () {
      var on = boc.getAttribute("aria-pressed") === "true";
      boc.setAttribute("aria-pressed", on ? "false" : "true");
      try { localStorage.setItem("grimorio:audio", on ? "off" : "on"); } catch (e) {}
      reflectBocina();
    });
  }
}());
