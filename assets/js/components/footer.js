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
      '<div><strong>El Grimorio del Archipiélago</strong><p>Plataforma educativa en desarrollo. Sin validación territorial, institucional o comunitaria realizada.</p></div>',
      '<div><strong>Consulta abierta</strong><a href="bestiario.html">Bestiario</a><a href="mundos.html">Siete mundos</a><a href="recta-provincia.html">Recta Provincia</a></div>',
      '<div><strong>Trazabilidad</strong><a href="metodologia.html#fuentes">Fuentes disponibles</a><a href="metodologia.html#agenda">Agenda de investigación</a><a href="metodologia.html#creditos">Créditos y licencias</a></div>',
      '</div><p class="site-footer__note">Última revisión de arquitectura: 24 de junio de 2026.</p></footer>'
    ].join("");
  };
}());
