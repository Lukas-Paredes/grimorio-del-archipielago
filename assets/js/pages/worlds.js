(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    root.innerHTML = [
      '<section class="page-hero"><span class="chapter-index">Puerta II · Recorridos curatoriales</span><span class="eyebrow">Siete umbrales abiertos</span><h1>Los siete mundos</h1>',
      '<p class="lead">Los mundos son una forma editorial de recorrer el archivo. Agrupan figuras y relatos según atmósferas, fuerzas y espacios simbólicos, sin pretender fijar una clasificación tradicional única.</p>',
      '<div class="curatorial-notice curatorial-notice--elegant"><strong>Una propuesta de lectura</strong><p>Esta organización es editorial y curatorial. No corresponde a una clasificación tradicional oficial y puedes recorrerla en cualquier orden.</p></div></section>',
      '<section class="world-index" aria-label="Índice de los siete mundos">', G.worlds.map(function (world) { return G.worldCard(world); }).join(""), '</section>',
      '<section class="section split-panel"><div><h2>Leer conexiones</h2><p>La continuidad narrativa pertenece al proyecto y se distingue de parentescos, oposiciones y asociaciones legendarias.</p><a class="text-link" href="', G.pageUrl("cosmologia.html"), '">Consultar relaciones</a></div>',
      '<div><h2>Consultar figuras</h2><p>El Bestiario puede abrirse por mundo sin ocultar ni bloquear las demás fichas.</p><a class="text-link" href="', G.pageUrl("bestiario.html"), '">Volver al archivo de figuras</a></div></section>'
    ].join("");
  };
}());
