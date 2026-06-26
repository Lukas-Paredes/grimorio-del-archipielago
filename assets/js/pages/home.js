(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var featuredIds = ["caleuche", "pincoya", "trauco", "invunche"];
    var doors = [
      ["01", "Bestiario", "Las figuras", "Reúne personajes, presencias y seres del imaginario chilote y archipelágico. Cada ficha permite consultar descripción, variantes, relaciones y estado de documentación.", "bestiario.html", "Consultar figuras"],
      ["02", "Mundos curatoriales", "Las capas del relato", "Una forma editorial de recorrer el archivo por atmósferas, fuerzas y espacios simbólicos. No pretende fijar una clasificación tradicional única.", "mundos.html", "Recorrer los mundos"],
      ["03", "Recta Provincia", "El expediente", "Una zona especial para antecedentes, relatos, interpretaciones y fuentes vinculadas a una de las memorias más complejas del imaginario chilote.", "recta-provincia.html", "Abrir expediente"],
      ["04", "Cosmología y relaciones", "El mapa interpretativo", "Propone conexiones entre figuras, mundos y fuerzas narrativas. Es una herramienta de recorrido y comparación, no una doctrina cerrada.", "cosmologia.html", "Leer relaciones"],
      ["05", "Fuentes y metodología", "La trazabilidad", "Explica qué está documentado, qué es variante, qué corresponde a interpretación curatorial y qué continúa pendiente.", "metodologia.html", "Revisar fuentes"]
    ];

    root.innerHTML = [
      '<section class="home-intro"><div class="home-intro__copy">',
      '<span class="eyebrow">Archivo digital · Imaginario del archipiélago</span>',
      '<h1>El Grimorio del Archipiélago</h1>',
      '<p class="lead">El Grimorio reúne figuras, relatos, territorios simbólicos y fuentes para recorrer el imaginario cultural de Chiloé y su entorno insular.</p>',
      '<div class="hero__actions"><a class="button button--primary" href="#puertas">Comenzar el recorrido</a><a class="button" href="', G.pageUrl("bestiario.html"), '">Abrir el archivo</a></div>',
      '<p class="home-intro__note">Consulta pública · 24 fichas · 7 mundos curatoriales · fuentes y estados visibles</p>',
      '</div></section>',

      '<section id="puertas" class="home-chapter home-chapter--paper archive-opening"><div class="home-chapter__intro"><div><span class="chapter-index">El archivo se abre</span>',
      '<h2>Cinco puertas para leer un mismo imaginario</h2></div><div><p class="lead">El Grimorio es un archivo navegable de relatos, figuras, memorias, variantes y fuentes. Puedes seguir el recorrido sugerido o entrar directamente por la consulta que necesites.</p>',
      '<p class="curatorial-line">Esta organización es editorial y curatorial: pone en relación materiales del archivo sin presentarse como clasificación tradicional oficial ni como validación comunitaria, académica o institucional.</p></div></div>',
      '<ol class="archive-doors" aria-label="Cinco puertas de entrada al Grimorio">', doors.map(function (door, index) {
        return '<li class="archive-door archive-door--' + (index + 1) + '"><span class="archive-door__number">' + door[0] +
          '</span><div class="archive-door__title"><span class="eyebrow">' + door[2] + '</span><h3>' + door[1] +
          '</h3></div><p>' + door[3] + '</p><a class="text-link" href="' + G.pageUrl(door[4]) + '">' + door[5] + ' →</a></li>';
      }).join(""), '</ol></section>',

      '<section class="home-chapter home-chapter--light home-bestiary"><div class="home-chapter__intro"><div><span class="chapter-index">Puerta I · Bestiario</span><h2>Figuras del relato y la memoria cultural</h2></div>',
      '<p>El Bestiario no es una colección de monstruos. Es un índice de figuras del imaginario chilote y archipelágico, con fichas consultables que separan relato, interpretación y fuente.</p></div>',
      '<div class="featured-editorial">', featuredIds.map(function (id) { return G.figureCard(G.getFigure(id), { mode: "featured" }); }).join(""), '</div>',
      '<div class="actions section"><a class="button button--primary" href="', G.pageUrl("bestiario.html"), '">Consultar las 24 figuras</a></div></section>',

      '<section class="home-chapter home-worlds"><div class="home-chapter__intro"><div><span class="chapter-index">Puerta II · Mundos curatoriales</span><h2>Capas para recorrer el archivo</h2></div>',
      '<p>Los mundos agrupan figuras y relatos según atmósferas, fuerzas y espacios simbólicos. El orden orienta la lectura sin convertirla en una clasificación única o cerrada.</p></div>',
      '<div class="world-passages">', G.worlds.map(function (world) {
        return '<a class="world-passage" href="' + G.pageUrl("mundo.html", "?id=" + encodeURIComponent(world.id)) + '"><span class="world-passage__number">' +
          G.escape(world.number) + '</span><span><strong>' + G.escape(world.title) + '</strong><small>' + G.escape(world.introduction) +
          '</small></span><span aria-hidden="true">Recorrer →</span></a>';
      }).join(""), '</div></section>',

      '<section class="home-dark"><div class="recta-teaser"><div><span class="chapter-index">Puerta III · Expediente especial</span><h2>Recta Provincia</h2>',
      '<p class="lead">La Recta Provincia se presenta como un expediente histórico-documental: una zona del Grimorio dedicada a antecedentes, relatos, interpretaciones y fuentes, siempre distinguiendo lo documentado de lo legendario.</p>',
      '<div class="actions"><a class="button" href="', G.pageUrl("recta-provincia.html"), '">Abrir el expediente</a></div></div>',
      '<div class="recta-teaser__file"><span class="seal seal--history">Historia documentada</span><h3>Advertencias de interpretación</h3><p>No se reconstruyen fechas, cargos, personas ni procedimientos sin fuentes específicas. Los vacíos documentales permanecen visibles.</p></div></div></section>',

      '<section class="home-chapter home-chapter--paper trust-section"><div class="trust-section__relations"><span class="chapter-index">Puerta IV · Relaciones</span><h2>Un mapa, no un dogma</h2>',
      '<p class="lead">La cosmología del Grimorio propone una lectura de relaciones entre mar, tierra, bosque, noche, comunidad, muerte y navegación. Es una herramienta de recorrido, no una doctrina cerrada.</p>',
      '<a class="button button--quiet" href="', G.pageUrl("cosmologia.html"), '">Consultar el mapa de relaciones</a></div>',
      '<div class="trust-section__sources"><span class="chapter-index">Puerta V · Fuentes y metodología</span><h2>Cómo se construye este archivo</h2>',
      '<p>El Grimorio distingue entre tradición documentada, variantes locales, interpretación curatorial y recreación visual. Su propósito no es cerrar los relatos, sino hacer visibles su riqueza, sus fuentes y sus límites.</p>',
      '<ul class="trust-list"><li><strong>Documentado</strong><span>Cuenta con una referencia registrada.</span></li><li><strong>Variante</strong><span>Reconoce que los relatos cambian entre versiones.</span></li><li><strong>Interpretación</strong><span>Declara las decisiones curatoriales del proyecto.</span></li><li><strong>Pendiente</strong><span>Señala lo que todavía no tiene fuente específica.</span></li></ul>',
      '<a class="button button--primary" href="', G.pageUrl("metodologia.html"), '">Revisar fuentes y criterios</a></div></section>',

      '<section class="home-chapter home-chapter--light archive-status"><div class="home-chapter__intro"><div><span class="chapter-index">Estado del archivo</span><h2>Abierto, consultable y todavía en desarrollo</h2></div>',
      '<p>Las páginas, fichas, mundos, relaciones y estados curatoriales ya pueden consultarse. La bibliografía específica, la revisión patrimonial especializada y las ilustraciones profesionales continúan pendientes.</p></div>',
      '<div class="home-final"><article><span class="eyebrow">Disponible</span><h3>Consulta pública</h3><p>Bestiario, mundos, expediente, relaciones y fuentes accesibles sin desbloqueos.</p><a class="text-link" href="', G.pageUrl("bestiario.html"), '">Abrir el archivo →</a></article>',
      '<article><span class="eyebrow">Orientación</span><h3>Recorrido sugerido</h3><p>Una secuencia opcional para atravesar las distintas capas del Grimorio.</p><a class="text-link" href="', G.pageUrl("recorrido.html"), '">Comenzar recorrido →</a></article>',
      '<article><span class="eyebrow">En desarrollo</span><h3>Investigación y visualidad</h3><p>Las ausencias se mantienen visibles como pendientes, sin completar datos por inferencia.</p><a class="text-link" href="', G.pageUrl("metodologia.html", "#agenda"), '">Consultar agenda →</a></article></div></section>'
    ].join("");
  };
}());
