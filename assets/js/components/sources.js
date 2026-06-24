(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.sourceList = function (sourceIds) {
    var ids = sourceIds && sourceIds.length ? sourceIds : ["pending-bibliography"];
    return '<ul class="source-list">' + ids.map(function (id) {
      var source = G.getSource(id);
      if (!source) {
        return "";
      }
      var title = G.escape(source.title);
      var link = source.url
        ? '<a href="' + G.escape(source.url) + '" target="_blank" rel="noopener noreferrer">Consultar portal general <span class="sr-only">(abre en una pestaña nueva)</span></a>'
        : '<span class="muted">Sin enlace disponible</span>';
      return '<li><strong>' + title + '</strong><span>' + G.escape(source.type) + '</span><p>' + G.escape(source.note) + '</p>' + link + "</li>";
    }).join("") + "</ul>";
  };

  G.claimList = function (claimIds) {
    var ids = claimIds || [];
    if (!ids.length) {
      return '<p class="empty-state">No hay afirmaciones trazables adicionales en los archivos disponibles.</p>';
    }
    return '<ul class="claim-list">' + ids.map(function (id) {
      var claim = G.getClaim(id);
      if (!claim) {
        return "";
      }
      return '<li>' + G.seal(claim.type, true) + '<p>' + G.escape(claim.text) + '</p><span class="claim-status">Estado: ' + G.escape(G.sealLabel(claim.status)) + "</span></li>";
    }).join("") + "</ul>";
  };
}());
