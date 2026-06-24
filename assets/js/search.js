(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.normalize = function (value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  };

  G.figureSearchText = function (figure) {
    return G.normalize([
      figure.name,
      (figure.alternativeNames || []).join(" "),
      figure.nature,
      figure.definition,
      (figure.environments || []).join(" "),
      (figure.signals || []).join(" "),
      figure.territory
    ].join(" "));
  };
}());
