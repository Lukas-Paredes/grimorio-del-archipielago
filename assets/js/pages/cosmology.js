(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};
  var root;
  var activeType = "all";

  function renderRelations() {
    var items = G.relationships.filter(function (rel) { return activeType === "all" || rel.type === activeType; });
    root.querySelector("[data-relation-count]").textContent = items.length + (items.length === 1 ? " relación" : " relaciones");
    root.querySelector("[data-relation-list]").innerHTML = items.map(function (rel) {
      var fromFigure = G.getFigure(rel.from);
      var toFigure = G.getFigure(rel.to);
      var fromHref = fromFigure ? "figura.html?id=" + rel.from : "mundo.html?id=" + rel.from;
      var toHref = toFigure ? "figura.html?id=" + rel.to : "mundo.html?id=" + rel.to;
      return '<article class="relation-card"><div class="relation-card__meta">' + G.seal(rel.status, true) + '<span class="tag">' + G.escape(rel.type) + '</span></div>' +
        '<h3><a href="' + fromHref + '">' + G.escape(G.entityName(rel.from)) + '</a><span aria-hidden="true"> ↔ </span><a href="' + toHref + '">' + G.escape(G.entityName(rel.to)) + '</a></h3>' +
        '<p>' + G.escape(rel.description) + '</p><small>Estado: ' + G.escape(G.sealLabel(rel.status)) + "</small></article>";
    }).join("");
  }

  G.renderCurrentPage = function () {
    root = document.querySelector("#page-root");
    var types = G.uniqueSorted(G.relationships.map(function (rel) { return rel.type; }));
    root.innerHTML = [
      '<section class="page-hero"><span class="eyebrow">Vista textual accesible</span><h1>Cosmología y relaciones</h1>',
      '<p class="lead">Esta vista muestra cómo se conectan figuras y mundos. La red es curatorial: no constituye una cosmología tradicional oficial.</p>',
      '<div class="curatorial-notice"><strong>Cómo leerla</strong><p>Parentesco y asociación legendaria pueden estar pendientes; oposición y territorio describen relaciones existentes; comparación y continuidad narrativa pueden ser herramientas del proyecto.</p></div></section>',
      '<section class="cosmos-worlds" aria-labelledby="worlds-title"><div class="section-heading"><h2 id="worlds-title">Siete mundos</h2></div><div class="cosmos-ring">',
      G.worlds.map(function (world) { return '<a class="cosmos-node" href="mundo.html?id=' + encodeURIComponent(world.id) + '"><span>Mundo ' + world.number + '</span><strong>' + G.escape(world.shortTitle) + "</strong></a>"; }).join(""),
      '</div></section>',
      '<section class="section" aria-labelledby="relations-title"><div class="relation-toolbar"><div><h2 id="relations-title">Relaciones entre figuras y mundos</h2><p data-relation-count aria-live="polite"></p></div>',
      '<label class="filter"><span>Tipo de vínculo</span><select data-relation-filter><option value="all">Todos los tipos</option>',
      types.map(function (type) { return '<option value="' + G.escape(type) + '">' + G.escape(type) + "</option>"; }).join(""), '</select></label></div>',
      '<div class="relation-list" data-relation-list></div></section>'
    ].join("");
    root.querySelector("[data-relation-filter]").addEventListener("change", function (event) {
      activeType = event.target.value;
      renderRelations();
    });
    renderRelations();
  };
}());
