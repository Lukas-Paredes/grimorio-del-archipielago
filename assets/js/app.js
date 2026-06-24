(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.inPages = /(?:^|\/)pages\/[^/]*$/.test(window.location.pathname.replace(/\\/g, "/"));

  G.pageUrl = function (file, suffix) {
    return (G.inPages ? "" : "pages/") + file + (suffix || "");
  };

  G.homeUrl = function () {
    return G.inPages ? "../index.html" : "index.html";
  };

  G.assetUrl = function (path) {
    return (G.inPages ? "../assets/" : "assets/") + path;
  };

  G.returnUrlForPage = function () {
    var file = window.location.pathname.split("/").pop() || "index.html";
    return (G.inPages ? file : "../" + file) + window.location.search;
  };

  G.escape = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  G.listText = function (values, fallback) {
    return values && values.length ? values.join(" · ") : (fallback || "No documentado en los archivos disponibles.");
  };

  G.params = function () {
    return new URLSearchParams(window.location.search);
  };

  G.getFigure = function (id) {
    return (G.figures || []).find(function (item) { return item.id === id; });
  };

  G.getWorld = function (id) {
    return (G.worlds || []).find(function (item) { return item.id === id; });
  };

  G.getSource = function (id) {
    return (G.sources || []).find(function (item) { return item.id === id; });
  };

  G.getClaim = function (id) {
    return (G.claims || []).find(function (item) { return item.id === id; });
  };

  G.getIllustration = function (id) {
    return (G.illustrations || []).find(function (item) { return item.id === id; });
  };

  G.illustrationPlaceholder = function (id, ratio, context) {
    var item = G.getIllustration(id);
    if (!item) {
      return '<figure class="art-placeholder art-placeholder--' + G.escape(ratio || "panoramic") + '"><div class="art-placeholder__field" role="img" aria-label="Espacio editorial para ilustración"><span aria-hidden="true">✦</span></div><figcaption>Espacio de ilustración con crédito y licencia por incorporar.</figcaption></figure>';
    }
    var label = item.alt || ("Espacio editorial para " + (context || item.title));
    return [
      '<figure class="art-placeholder art-placeholder--', G.escape(ratio || item.ratio || "panoramic"), '" data-illustration="', G.escape(item.id), '">',
      '<div class="art-placeholder__field" role="img" aria-label="', G.escape(label), '">',
      '<span class="art-placeholder__sigil" aria-hidden="true">', G.escape((item.title || "G").charAt(0)), '</span>',
      '<span class="art-placeholder__title">', G.escape(item.title), '</span>',
      '</div><figcaption><strong>Recreación artística encargada</strong><span>Crédito y licencia por incorporar · formatos panorámico, vertical y cuadrado previstos.</span></figcaption>',
      '</figure>'
    ].join("");
  };

  G.renderList = function (items, emptyText) {
    if (!items || !items.length) {
      return '<p class="empty-state">' + G.escape(emptyText || "No documentado en los archivos disponibles.") + "</p>";
    }
    return "<ul>" + items.map(function (item) { return "<li>" + G.escape(item) + "</li>"; }).join("") + "</ul>";
  };

  G.entityName = function (id) {
    var figure = G.getFigure(id);
    var world = G.getWorld(id);
    return figure ? figure.name : (world ? world.title : id);
  };

  G.init = function () {
    if (G.renderHeader) { G.renderHeader(); }
    if (G.renderFooter) { G.renderFooter(); }
    if (G.initNavigation) { G.initNavigation(); }
    if (G.initQuickView) { G.initQuickView(); }
    if (G.renderCurrentPage) { G.renderCurrentPage(); }
  };

  document.addEventListener("DOMContentLoaded", G.init);
}());
