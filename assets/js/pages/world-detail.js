(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  function relationList(world) {
    var figureLookup = {};
    world.figureIds.forEach(function (id) { figureLookup[id] = true; });
    var relations = G.relationships.filter(function (rel) {
      return rel.from === world.id || rel.to === world.id || figureLookup[rel.from] || figureLookup[rel.to];
    });
    return '<ul class="relationship-list">' + relations.map(function (rel) {
      return '<li><div>' + G.seal(rel.status, true) + '<strong>' + G.escape(rel.type) + '</strong><p>' + G.escape(rel.description) + '</p></div><span>' + G.escape(G.entityName(rel.from)) + " ↔ " + G.escape(G.entityName(rel.to)) + "</span></li>";
    }).join("") + "</ul>";
  }

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var world = G.getWorld(G.params().get("id"));
    if (!world) {
      root.innerHTML = '<section class="not-found"><h1>Mundo no encontrado</h1><p>El identificador no corresponde a uno de los siete mundos.</p><a class="button" href="' + G.pageUrl("mundos.html") + '">Volver al índice</a></section>';
      return;
    }
    document.title = "Mundo " + world.number + " · " + world.title;
    var worldIndex = G.worlds.indexOf(world);
    var previousWorld = G.worlds[(worldIndex - 1 + G.worlds.length) % G.worlds.length];
    var nextWorld = G.worlds[(worldIndex + 1) % G.worlds.length];
    var principal = world.principalIds.map(G.getFigure).filter(Boolean);
    var secondary = world.secondaryIds.map(G.getFigure).filter(Boolean);
    var variants = G.variants.filter(function (item) { return item.worldId === world.id; });
    root.innerHTML = [
      '<nav class="breadcrumbs" aria-label="Migas de pan"><a href="', G.homeUrl(), '">Inicio</a><span>/</span><a href="', G.pageUrl("mundos.html"), '">Siete mundos</a><span>/</span><span aria-current="page">Mundo ', G.escape(world.number), '</span></nav>',
      '<header class="world-hero"><div><span class="eyebrow">Mundo ', G.escape(world.number), ' · Organización curatorial</span><h1>', G.escape(world.title), '</h1><p class="lead">', G.escape(world.introduction), '</p>',
      G.seal(world.status), '<div class="actions"><a class="button" href="', G.pageUrl("bestiario.html", "?world=" + encodeURIComponent(world.id)), '">Ver todas las fichas de este mundo</a>',
      world.id === "recta" ? '<a class="button button--quiet" href="' + G.pageUrl("recta-provincia.html") + '">Abrir exposición especial</a>' : "", '</div></div>',
      G.illustrationPlaceholder(world.illustrationId, "panoramic", world.title), '</header>',
      '<section class="section"><div class="section-heading"><span class="eyebrow">Jerarquía editorial</span><h2>Figuras principales</h2></div><div class="figure-grid">', principal.map(function (f) { return G.figureCard(f); }).join(""), '</div></section>',
      secondary.length ? '<section class="section"><div class="section-heading"><h2>Figuras secundarias, comparaciones o archivo</h2></div><div class="figure-grid">' + secondary.map(function (f) { return G.figureCard(f); }).join("") + "</div></section>" : "",
      '<section class="world-context-grid"><article><h2>Ambientes</h2>', G.renderList(world.environments), '</article><article><h2>Señales</h2>', G.renderList(world.signals), '</article><article><h2>Idea educativa</h2><p>', G.escape(world.idea), '</p></article></section>',
      '<section class="section"><div class="section-heading"><h2>Relaciones</h2><p>Los estados indican si el vínculo es provisional, pendiente o una construcción interpretativa.</p></div>', relationList(world), '</section>',
      '<section class="section"><div class="section-heading"><h2>Variantes y preguntas abiertas</h2></div><div class="note-grid">',
      variants.map(function (item) { return '<article class="note-card">' + G.seal(item.status, true) + '<h3>' + G.escape(item.title) + '</h3><p>' + G.escape(item.text) + "</p></article>"; }).join(""),
      '<article class="note-card note-card--pending"><h3>Pendiente del mundo</h3><p>', G.escape(world.pending), '</p></article></div></section>',
      '<section class="section section--sources"><div class="section-heading"><h2>Fuentes y estado</h2></div>', G.sourceList(world.sourceIds), '</section>',
      '<nav class="dossier-siblings" aria-label="Mundos anterior y siguiente"><a href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(previousWorld.id)), '"><small>← Mundo ', G.escape(previousWorld.number), '</small><strong>', G.escape(previousWorld.shortTitle), '</strong></a>',
      '<a href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(nextWorld.id)), '"><small>Mundo ', G.escape(nextWorld.number), ' →</small><strong>', G.escape(nextWorld.shortTitle), '</strong></a></nav>',
      '<nav class="context-nav" aria-label="Navegación de mundos"><a href="', G.pageUrl("mundos.html"), '">← Índice de mundos</a><a href="', G.pageUrl("bestiario.html", "?world=" + encodeURIComponent(world.id)), '">Bestiario filtrado →</a></nav>'
    ].join("");
  };
}());
