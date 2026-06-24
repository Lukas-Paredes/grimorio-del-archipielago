(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.worldCard = function (world, options) {
    options = options || {};
    var names = world.figureIds.map(function (id) {
      var figure = G.getFigure(id);
      return figure ? figure.name : "";
    }).filter(Boolean);
    return [
      '<article class="world-card world-card--', G.escape(world.id), '">',
      '<div class="world-card__number" aria-hidden="true">', G.escape(world.number), '</div>',
      '<div class="world-card__content">',
      '<span class="eyebrow">Mundo ', G.escape(world.number), '</span>',
      '<h3><a href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(world.id)), '">', G.escape(world.title), '</a></h3>',
      '<p>', G.escape(world.introduction), '</p>',
      '<p class="world-card__figures"><strong>Figuras:</strong> ', G.escape(names.join(" · ")), '</p>',
      options.compact ? "" : G.illustrationPlaceholder(world.illustrationId, "panoramic", world.title),
      '<div class="world-card__actions"><a class="button button--quiet" href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(world.id)), '">Abrir este mundo</a>',
      '<a class="text-link" href="', G.pageUrl("bestiario.html", "?world=" + encodeURIComponent(world.id)), '">Ver sus fichas</a></div>',
      '</div></article>'
    ].join("");
  };
}());
