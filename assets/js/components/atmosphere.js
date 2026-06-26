(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  // Variantes de ambiente permitidas (worlds.js). Lista blanca: el sufijo de
  // clase solo puede tomar uno de estos valores, así no hay inyección posible.
  var VARIANTS = {
    "origin": 1,
    "sea-court": 1,
    "caleuche": 1,
    "forest": 1,
    "waters": 1,
    "recta": 1,
    "dead-roads": 1
  };

  // Capa atmosférica decorativa REUTILIZABLE. El estilo (niebla, haz, tinta,
  // viñeta) vive en assets/css/atmosphere.css; aquí solo se emite el marcado
  // que esa hoja compone. Es puramente ornamental: aria-hidden.
  //
  //   G.atmosphereLayer("caleuche")            -> ambiente del mundo
  //   G.atmosphereLayer("recta", { still: 1 }) -> sin deriva de niebla
  G.atmosphereLayer = function (variant, options) {
    options = options || {};
    var cls = "atmosphere";
    if (variant && VARIANTS[variant]) {
      cls += " atmosphere--" + variant;
    }
    if (options.still) {
      cls += " atmosphere--still";
    }
    return [
      '<div class="', cls, '" aria-hidden="true">',
      '<span class="atmosphere__beam"></span>',
      '<span class="atmosphere__fog"></span>',
      '<span class="atmosphere__fog atmosphere__fog--far"></span>',
      '<span class="atmosphere__ink"></span>',
      '<span class="atmosphere__vignette"></span>',
      '</div>'
    ].join("");
  };
}());
