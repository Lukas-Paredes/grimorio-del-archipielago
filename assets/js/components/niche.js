(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  // Clasificaciones válidas (figures.js). Lista blanca para el sufijo de clase
  // de profundidad; cualquier otro valor cae a "archive" (lo más sumergido).
  var DEPTHS = {
    "principal": 1,
    "secondary": 1,
    "comparison": 1,
    "archive": 1
  };

  // Una HORNACINA: la figura sugerida entre la penumbra. Reutiliza el sistema de
  // placeholder de ilustración (sigilo, sin fijar iconografía documental), el
  // sello cultural (G.seal) y el diálogo de consulta breve (data-quick-view, que
  // ya gestiona foco/Escape/scroll-lock). Solo usa campos existentes de la
  // figura y los escapa; NO inventa contenido cultural.
  //
  //   G.figureNiche(figure, { ratio: "vertical" })            -> principal, nítida y grande
  //   G.figureNiche(figure, { ratio: "square", compact: 1 })  -> secundaria, sumergida
  G.figureNiche = function (figure, options) {
    if (!figure) {
      return "";
    }
    options = options || {};
    var depth = DEPTHS[figure.classification] ? figure.classification : "archive";
    var ratio = options.ratio || "square";
    var line = options.compact ? "" :
      '<p class="niche__line">' + G.escape(figure.definition || figure.nature) + "</p>";

    return [
      '<article class="niche niche--', depth, '">',
      '<div class="niche__art">', G.illustrationPlaceholder(figure.illustrationId, ratio, figure.name), "</div>",
      '<div class="niche__body">',
      '<h3 class="niche__name">', G.escape(figure.name), "</h3>",
      G.seal(figure.status),
      line,
      '<button class="button button--quiet niche__emerge" type="button" data-quick-view="', G.escape(figure.id),
      '" aria-label="Consulta breve: ', G.escape(figure.name), '">Consulta breve</button>',
      "</div></article>"
    ].join("");
  };
}());
