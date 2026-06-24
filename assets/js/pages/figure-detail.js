(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  function section(title, content, className) {
    return '<section class="dossier-section ' + (className || "") + '"><h2>' + G.escape(title) + "</h2>" + content + "</section>";
  }

  function relationshipList(figure) {
    var relations = (G.relationships || []).filter(function (rel) {
      return rel.from === figure.id || rel.to === figure.id;
    });
    if (!relations.length) {
      return '<p class="empty-state">No hay relaciones adicionales documentadas en la estructura actual.</p>';
    }
    return '<ul class="relationship-list">' + relations.map(function (rel) {
      var other = rel.from === figure.id ? rel.to : rel.from;
      var otherFigure = G.getFigure(other);
      var otherWorld = G.getWorld(other);
      var href = otherFigure
        ? G.pageUrl("figura.html", "?id=" + encodeURIComponent(other))
        : G.pageUrl("mundo.html", "?id=" + encodeURIComponent(other));
      return '<li><div>' + G.seal(rel.status, true) + '<strong>' + G.escape(rel.type) + '</strong><p>' + G.escape(rel.description) + '</p></div><a class="text-link" href="' + href + '">' + G.escape(otherFigure ? otherFigure.name : (otherWorld ? otherWorld.title : other)) + "</a></li>";
    }).join("") + "</ul>";
  }

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var params = G.params();
    var figure = G.getFigure(params.get("id"));
    if (!figure) {
      document.title = "Ficha no encontrada · El Grimorio del Archipiélago";
      root.innerHTML = '<section class="not-found"><span class="eyebrow">Archivo</span><h1>Ficha no encontrada</h1><p>El identificador de la URL no corresponde a una de las 24 fichas disponibles.</p><a class="button" href="' + G.pageUrl("bestiario.html") + '">Volver al Bestiario</a></section>';
      return;
    }
    var world = G.getWorld(figure.worldId);
    var returnUrl = params.get("return") || G.pageUrl("bestiario.html");
    var isRootReturn = /^\.\.\/index\.html(?:[?#].*)?$/.test(returnUrl);
    if (/^(?:[a-z]+:)?\/\//i.test(returnUrl) || (returnUrl.indexOf("..") !== -1 && !isRootReturn)) {
      returnUrl = G.pageUrl("bestiario.html");
    }
    document.title = figure.name + " · Bestiario del Archipiélago";
    root.innerHTML = [
      '<nav class="breadcrumbs" aria-label="Migas de pan"><a href="', G.homeUrl(), '">Inicio</a><span aria-hidden="true">/</span><a href="', G.pageUrl("bestiario.html"), '">Bestiario</a><span aria-hidden="true">/</span><span aria-current="page">', G.escape(figure.name), '</span></nav>',
      '<article class="dossier"><header class="dossier-hero"><div class="dossier-hero__copy"><a class="back-link" href="', G.escape(returnUrl), '">← Volver al resultado anterior</a>',
      '<span class="eyebrow">', G.escape(world ? "Mundo " + world.number + " · " + world.title : "Archivo"), '</span>',
      '<h1>', G.escape(figure.name), '</h1>',
      figure.alternativeNames.length ? '<p class="aliases">También: ' + G.escape(figure.alternativeNames.join(" · ")) + "</p>" : "",
      '<p class="lead">', G.escape(figure.definition), '</p>',
      '<div class="seal-row">', G.seal(figure.status), '<span class="tag">', G.escape(figure.nature), '</span></div>',
      '<a class="button button--quiet" href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(figure.worldId)), '">Explorar su mundo</a></div>',
      '<div class="dossier-hero__art">', G.illustrationPlaceholder(figure.illustrationId, "vertical", figure.name), '</div></header>',
      '<div class="dossier-facts"><div><span>Mundo</span><strong>', G.escape(world ? world.title : "No documentado"), '</strong></div>',
      '<div><span>Naturaleza</span><strong>', G.escape(figure.nature), '</strong></div>',
      '<div><span>Ambientes</span><strong>', G.escape(G.listText(figure.environments)), '</strong></div>',
      '<div><span>Territorio y circulación</span><strong>', G.escape(figure.territory), '</strong></div></div>',
      '<div class="dossier-grid"><div>',
      section("Relato", '<p>' + G.escape(figure.account) + "</p>"),
      section("Lo que cuenta la tradición", '<p>' + G.escape(figure.tradition) + "</p>"),
      section("Apariencia y representación", '<p>' + G.escape(figure.appearance) + '</p><p class="notice">La ilustración es una recreación artística y no se usa como prueba documental.</p>'),
      section("Señales", G.renderList(figure.signals)),
      section("Conducta", G.renderList(figure.behaviour, "No aplica o no está documentado en los archivos disponibles.")),
      section("Poderes atribuidos", G.renderList(figure.powers, "No aplica o no está documentado. Ninguna atribución se presenta como consejo.")),
      '</div><aside class="dossier-sidebar">',
      section("Fuentes y estado", G.sourceList(figure.sourceIds) + '<div class="pending-box"><strong>Contenido pendiente</strong><p>' + G.escape(figure.pending) + "</p></div>", "dossier-section--sources"),
      section("Datos respaldados", G.claimList(figure.evidenceIds)),
      '</aside></div>',
      section("Variantes", G.renderList(figure.variants)),
      section("Relaciones y figuras relacionadas", relationshipList(figure)),
      section("Interpretación del proyecto", G.renderList(figure.interpretations)),
      section("Cultura posterior", G.renderList(figure.culturalPresence, "Pendiente de investigación.")),
      '<footer class="dossier-footer"><a class="button" href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(figure.worldId)), '">Abrir Mundo ', G.escape(world ? world.number : ""), '</a><a class="text-link" href="', G.pageUrl("metodologia.html"), '">Consultar metodología y estados</a></footer>',
      '</article>'
    ].join("");
  };
}());
