(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};
  var labels = {
    provisional: "Referencia general · Provisional",
    pending: "Sin fuente concreta · Pendiente",
    documented: "Estado documentado del proyecto",
    tradition: "Tradición",
    variant: "Variante",
    interpretation: "Interpretación curatorial",
    history: "Historia documentada",
    art: "Recreación artística",
    project: "Estado del proyecto"
  };

  G.seal = function (status, compact) {
    var safe = G.escape(status || "pending");
    var label = labels[status] || status || labels.pending;
    return '<span class="seal seal--' + safe + (compact ? " seal--compact" : "") + '">' + G.escape(label) + "</span>";
  };

  G.sealLabel = function (status) {
    return labels[status] || status || labels.pending;
  };
}());
