/* ════════════════════════════════════════════════════════════════════════
   portada.js — Interacción de la portada-descenso (2D, liviano, sin deps).
   Parallax (los fondos se hunden más lento que el contenido), revelado por
   sección, sonda de profundidad (nodo activo + relleno), botón "marea"
   (pausa de movimiento, persistente) y bocina (persistente; audio en F5).
   Respeta prefers-reduced-motion y la clase .motion-off de <html>.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var html = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slice = function (n) { return Array.prototype.slice.call(n); };
  function paused() { return html.classList.contains("motion-off"); }

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
    nodos.forEach(function (n) {
      var on = n.getAttribute("data-target") === id;
      n.classList.toggle("is-active", on);
      if (on) { n.setAttribute("aria-current", "true"); }
      else { n.removeAttribute("aria-current"); }
    });
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
    if (!paused()) {                    // en pausa la CSS congela con transform:none !important
      players.forEach(function (p) {
        if (!p.sec) return;
        var r = p.sec.getBoundingClientRect();
        var fromCenter = (r.top + r.height / 2) - vh / 2;   // 0 cuando la sección está centrada
        p.el.style.transform = "translate3d(0," + (fromCenter * p.speed).toFixed(1) + "px,0)";
      });
    }
    if (fill) {                         // el relleno marca profundidad de scroll (no es "movimiento")
      var max = document.documentElement.scrollHeight - vh;
      var prog = max > 0 ? Math.max(0, Math.min(1, window.pageYOffset / max)) : 0;
      fill.style.height = (prog * 100).toFixed(1) + "%";
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
