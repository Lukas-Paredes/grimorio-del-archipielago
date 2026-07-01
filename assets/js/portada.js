/* ════════════════════════════════════════════════════════════════════════
   portada.js — Interacción de la portada-descenso (2D, liviano, sin deps).
   Parallax (los fondos se hunden más lento que el contenido), revelado por
   sección, sonda de profundidad (nodo activo + relleno) y toggle de bocina
   (previsto, sin audio). Respeta prefers-reduced-motion.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slice = function (n) { return Array.prototype.slice.call(n); };

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

  /* ── Sonda de profundidad: nodo activo según la sección visible ───────── */
  var nodos = slice(document.querySelectorAll(".sonda__nodo"));
  function setActive(id) {
    nodos.forEach(function (n) { n.classList.toggle("is-active", n.getAttribute("data-target") === id); });
  }
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { setActive(e.target.id); } });
    }, { threshold: 0.5 });
    slice(document.querySelectorAll(".capa")).forEach(function (c) { so.observe(c); });
  }

  /* ── Parallax de fondos + relleno de la sonda (profundidad) ───────────── */
  var players = slice(document.querySelectorAll("[data-parallax]")).map(function (el) {
    return { el: el, sec: el.closest(".capa"), speed: parseFloat(el.getAttribute("data-parallax")) };
  });
  var fill = document.querySelector(".sonda__fill");
  var ticking = false;
  function update() {
    var vh = window.innerHeight;
    players.forEach(function (p) {
      if (!p.sec) return;
      var r = p.sec.getBoundingClientRect();
      var fromCenter = (r.top + r.height / 2) - vh / 2;   // 0 cuando la sección está centrada
      p.el.style.transform = "translate3d(0," + (fromCenter * p.speed).toFixed(1) + "px,0)";
    });
    if (fill) {
      var max = document.documentElement.scrollHeight - vh;
      var prog = max > 0 ? Math.max(0, Math.min(1, window.pageYOffset / max)) : 0;
      fill.style.height = (prog * 100).toFixed(1) + "%";
    }
    ticking = false;
  }
  if (!reduce) {
    window.addEventListener("scroll", function () { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* ── Bocina (previsto, SIN cablear audio): solo alterna estado visual ─── */
  var boc = document.querySelector(".bocina");
  if (boc) {
    boc.addEventListener("click", function () {
      var on = boc.getAttribute("aria-pressed") === "true";
      boc.setAttribute("aria-pressed", on ? "false" : "true");
      boc.textContent = on ? "🔇" : "🔈";  // 🔇 / 🔈  (placeholder)
    });
  }
}());
