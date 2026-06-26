(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderFooter = function () {
    var mount = document.querySelector("[data-site-footer]");
    if (!mount) {
      return;
    }
    mount.innerHTML = [
      '<footer class="site-footer"><div class="site-footer__grid">',
      '<div><span class="eyebrow">Archivo digital abierto</span><strong>El Grimorio del Archipiélago</strong><p>Proyecto de difusión cultural y puesta en valor del imaginario del archipiélago. No cuenta todavía con validación territorial, institucional o comunitaria.</p></div>',
      '<div><strong>Puertas de entrada</strong><a href="', G.pageUrl("bestiario.html"), '">Bestiario</a><a href="', G.pageUrl("mundos.html"), '">Mundos curatoriales</a><a href="', G.pageUrl("recta-provincia.html"), '">Recta Provincia</a><a href="', G.pageUrl("cosmologia.html"), '">Relaciones</a></div>',
      '<div><strong>Fuentes y recorrido</strong><a href="', G.pageUrl("metodologia.html", "#fuentes"), '">Fuentes disponibles</a><a href="', G.pageUrl("metodologia.html", "#agenda"), '">Agenda de investigación</a><a href="', G.pageUrl("recorrido.html"), '">Recorrido sugerido</a></div>',
      '</div><p class="site-footer__note">Arquitectura V8 · revisión conceptual y narrativa del 25 de junio de 2026.</p></footer>'
    ].join("");
  };
}());
