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
      '<div><span class="eyebrow">Archivo abierto</span><strong>El Grimorio del Archipiélago</strong><p>Plataforma educativa y curatorial en desarrollo. No cuenta todavía con validación territorial, institucional o comunitaria.</p></div>',
      '<div><strong>Explorar</strong><a href="', G.pageUrl("bestiario.html"), '">Bestiario</a><a href="', G.pageUrl("mundos.html"), '">Siete mundos</a><a href="', G.pageUrl("recta-provincia.html"), '">Recta Provincia</a><a href="', G.pageUrl("recorrido.html"), '">Recorrido sugerido</a></div>',
      '<div><strong>Trazabilidad</strong><a href="', G.pageUrl("metodologia.html", "#fuentes"), '">Fuentes disponibles</a><a href="', G.pageUrl("metodologia.html", "#agenda"), '">Agenda de investigación</a><a href="', G.pageUrl("metodologia.html", "#creditos"), '">Créditos y licencias</a></div>',
      '</div><p class="site-footer__note">Arquitectura V8 · revisión visual y funcional del 24 de junio de 2026.</p></footer>'
    ].join("");
  };
}());
