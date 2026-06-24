(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.figureCard = function (figure, options) {
    options = options || {};
    var world = G.getWorld(figure.worldId);
    var mode = options.mode || figure.classification;
    var href = G.pageUrl("figura.html", "?id=" + encodeURIComponent(figure.id));
    var returnUrl = options.returnUrl || "";
    if (returnUrl) {
      href += "&return=" + encodeURIComponent(returnUrl);
    }
    return [
      '<article class="figure-card figure-card--', G.escape(mode), '" data-figure-card data-name="', G.escape(figure.name.toLowerCase()), '">',
      G.illustrationPlaceholder(figure.illustrationId, "square", figure.name),
      '<div class="figure-card__body">',
      '<div class="figure-card__meta"><span>', G.escape(world ? "Mundo " + world.number : "Archivo"), '</span>', G.seal(figure.status, true), '</div>',
      '<h3><a href="', href, '">', G.escape(figure.name), '</a></h3>',
      '<p class="figure-card__nature">', G.escape(figure.nature), '</p>',
      '<p>', G.escape(figure.definition), '</p>',
      '<div class="figure-card__actions">',
      '<button class="button button--quiet" type="button" data-quick-view="', G.escape(figure.id), '">Vista rápida</button>',
      '<a class="text-link" href="', href, '">Abrir ficha completa</a>',
      '</div></div></article>'
    ].join("");
  };

  G.figureRow = function (figure) {
    var world = G.getWorld(figure.worldId);
    return '<li class="figure-row"><a href="' + G.pageUrl("figura.html", "?id=" + encodeURIComponent(figure.id)) + '"><strong>' +
      G.escape(figure.name) + '</strong><span>' + G.escape(figure.nature) + '</span><small>' +
      G.escape(world ? "Mundo " + world.number + " · " + world.shortTitle : "Archivo") + '</small></a>' +
      G.seal(figure.status, true) + "</li>";
  };
}());
