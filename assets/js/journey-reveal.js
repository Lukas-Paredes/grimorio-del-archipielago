(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  // Revelado al hacer scroll del pasillo: las presencias emergen de la penumbra.
  // El estado inicial "sumergido" y la transición viven en journey.css; aquí solo
  // se alternan las clases .is-armed (en el corredor) e .is-revealed (por pieza).
  //
  // CAÍDA SEGURA: si no hay IntersectionObserver o el usuario pide movimiento
  // reducido, NO se arma el estado oculto y todo queda visible por defecto. Así
  // el contenido nunca depende del JS para ser legible.
  //
  // Lo invoca journey.js al final de su render (cuando el .corridor ya existe).
  G.initJourneyReveal = function (root) {
    var scope = root || document;
    var corridor = scope.querySelector(".corridor");
    if (!corridor) {
      return;
    }

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof window.IntersectionObserver !== "function") {
      return; // todo visible, sin animación de emergencia
    }

    var targets = corridor.querySelectorAll(".sala__intro, .niche");
    if (!targets.length) {
      return;
    }

    corridor.classList.add("is-armed");

    var observer = new window.IntersectionObserver(function (entries, obs) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-revealed");
          obs.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    for (var j = 0; j < targets.length; j++) {
      observer.observe(targets[j]);
    }
  };
}());
