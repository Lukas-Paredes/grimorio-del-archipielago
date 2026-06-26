(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  // Umbral de entrada. Reutiliza el aviso curatorial existente (organización
  // editorial, no clasificación oficial) y la nota de consulta abierta. Sin
  // texto cultural nuevo: estos textos ya viven en el archivo (home.js / journey).
  function umbral() {
    return [
      '<section class="corridor__umbral">',
      '<span class="chapter-index">Recorrido</span>',
      "<h1>Recorrido sugerido</h1>",
      '<p class="curatorial-line">Esta organización es editorial y curatorial: pone en relación materiales del archivo sin presentarse como clasificación tradicional oficial ni como validación comunitaria, académica o institucional.</p>',
      '<div class="curatorial-notice"><strong>La consulta siempre permanece abierta</strong><p>Puedes abandonar la ruta, cambiar el orden o ir directamente a cualquier ficha, mundo, fuente o relación.</p></div>',
      "</section>"
    ].join("");
  }

  // Cámara sellada: puerta al expediente independiente de Recta Provincia.
  // La línea descriptiva es la que ya usaba el recorrido para esa parada.
  function expediente() {
    return [
      '<aside class="corridor__expediente">',
      '<span class="chapter-index">Expediente</span>',
      "<h3>Recta Provincia</h3>",
      "<p>Distinguir historia documentada, tradición legendaria y cultura posterior en Recta Provincia.</p>",
      '<a class="button button--quiet" href="', G.pageUrl("recta-provincia.html"), '">Abrir el expediente</a>',
      "</aside>"
    ].join("");
  }

  // Una sala = un mundo (worlds.js). Encabezado con datos del mundo + dos zonas
  // de hornacinas: principales (nítidas y grandes) y sumergidas (secundarias,
  // de comparación y de archivo). La densidad varía según el mundo (1 a 6).
  function sala(world) {
    var figures = (world.figureIds || [])
      .map(function (id) { return G.getFigure(id); })
      .filter(Boolean);

    var principal = [];
    var submerged = [];
    figures.forEach(function (figure) {
      if (figure.classification === "principal") {
        principal.push(G.figureNiche(figure, { ratio: "vertical" }));
      } else {
        submerged.push(G.figureNiche(figure, { ratio: "square", compact: 1 }));
      }
    });

    var tags = (world.environments || []).concat(world.signals || []);
    var signals = tags.length
      ? '<ul class="sala__signals">' + tags.map(function (tag) {
          return '<li class="tag">' + G.escape(tag) + "</li>";
        }).join("") + "</ul>"
      : "";

    var zones = "";
    if (principal.length) {
      zones += '<div class="sala__zone sala__zone--principal">' + principal.join("") + "</div>";
    }
    if (submerged.length) {
      zones += '<div class="sala__zone sala__zone--submerged">' + submerged.join("") + "</div>";
    }

    return [
      '<section class="corridor__sala" data-world="', G.escape(world.id), '">',
      G.atmosphereLayer(world.id),
      '<div class="sala__inner">',
      '<header class="sala__intro">',
      '<span class="chapter-index">Mundo ', G.escape(world.number), " · ", G.escape(world.shortTitle), "</span>",
      '<h2 class="sala__title">', G.escape(world.title), "</h2>",
      G.seal(world.status),
      '<p class="lead sala__lead">', G.escape(world.introduction), "</p>",
      world.idea ? '<p class="sala__idea">' + G.escape(world.idea) + "</p>" : "",
      signals,
      "</header>",
      zones,
      world.id === "recta" ? expediente() : "",
      "</div>",
      "</section>"
    ].join("");
  }

  // Umbral de salida: reabsorbe los enlaces de orientación del recorrido previo
  // (mismas etiquetas) y conserva la nota de accesibilidad. Sin texto nuevo.
  function salida() {
    var links = [
      ["Elegir una presencia", G.pageUrl("bestiario.html")],
      ["Cruzar los siete mundos", G.pageUrl("mundos.html")],
      ["Entrar al expediente", G.pageUrl("recta-provincia.html")],
      ["Seguir las relaciones", G.pageUrl("cosmologia.html")],
      ["Revisar las fuentes", G.pageUrl("metodologia.html")],
      ["Abrir el archivo", G.homeUrl()]
    ];
    return [
      '<section class="corridor__salida">',
      '<span class="chapter-index">Seguir explorando</span>',
      '<div class="actions">',
      links.map(function (link) {
        return '<a class="button button--quiet" href="' + link[1] + '">' + G.escape(link[0]) + "</a>";
      }).join(""),
      "</div>",
      '<p class="muted">Teclado, texto alternativo, movimiento reducido y acceso directo seguirán siendo requisitos del recorrido.</p>',
      "</section>"
    ].join("");
  }

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    if (!root) {
      return;
    }
    var worlds = G.worlds || [];

    var salas = worlds.map(function (world) { return sala(world); }).join("");

    root.innerHTML = [
      '<div class="corridor">',
      umbral(),
      salas,
      salida(),
      "</div>"
    ].join("");

    if (G.initJourneyReveal) {
      G.initJourneyReveal();
    }
  };
}());
