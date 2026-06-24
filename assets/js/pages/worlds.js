(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    root.innerHTML = [
      '<section class="page-hero"><span class="chapter-index">Atlas curatorial</span><span class="eyebrow">Siete puertas abiertas</span><h1>Los siete mundos</h1>',
      '<p class="lead">Un orden editorial sugerido para recorrer contextos, ambientes y relaciones. Puedes abrirlos en cualquier orden.</p>',
      '<div class="curatorial-notice"><strong>Aclaración curatorial</strong><p>Los siete mundos son una organización curatorial de este proyecto para facilitar la consulta; no constituyen una clasificación tradicional oficial.</p></div></section>',
      '<section class="world-index" aria-label="Índice de los siete mundos">', G.worlds.map(function (world) { return G.worldCard(world); }).join(""), '</section>',
      '<section class="section split-panel"><div><h2>Ver relaciones entre mundos</h2><p>La continuidad narrativa pertenece al proyecto y se distingue de parentescos, oposiciones y asociaciones legendarias.</p><a class="text-link" href="', G.pageUrl("cosmologia.html"), '">Abrir Cosmología</a></div>',
      '<div><h2>Buscar por mundo</h2><p>El Bestiario puede abrirse filtrado sin bloquear las demás fichas.</p><a class="text-link" href="', G.pageUrl("bestiario.html"), '">Abrir el Bestiario</a></div></section>'
    ].join("");
  };
}());
