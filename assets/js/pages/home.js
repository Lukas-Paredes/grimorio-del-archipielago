(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var featuredIds = ["caleuche", "pincoya", "trauco", "invunche"];
    root.innerHTML = [
      '<section class="home-intro"><div class="home-intro__copy">',
      '<span class="eyebrow">Archivo curatorial · Archipiélago de Chiloé</span>',
      '<h1>El Grimorio del Archipiélago</h1>',
      '<p class="lead">Un archivo abierto para recorrer seres, presencias y figuras de la tradición chilota entre aguas, montes, umbrales y memorias.</p>',
      '<div class="hero__actions"><a class="button button--primary" href="#archivo">Abrir el Grimorio</a><a class="button" href="', G.pageUrl("bestiario.html"), '">Ir al Bestiario</a></div>',
      '<p class="home-intro__note">24 fichas · 7 mundos curatoriales · fuentes y estados visibles</p>',
      '</div></section>',

      '<section id="archivo" class="home-chapter home-chapter--paper"><div class="home-chapter__intro"><div><span class="chapter-index">Capítulo I · El territorio</span>',
      '<h2>Una lectura insular, no una frontera fija</h2></div><p class="lead">El proyecto se concentra en Chiloé y conserva visibles sus límites: algunas figuras circulan más allá del archipiélago y requieren todavía una delimitación documental más precisa.</p></div>',
      '<div class="territory-note"><div><span class="eyebrow">Organización editorial</span><h3>Siete mundos para orientarse</h3><p>Agua, monte, tormenta, umbral, poder y memoria funcionan aquí como puertas de consulta. No constituyen una clasificación tradicional oficial.</p><a class="text-link" href="', G.pageUrl("mundos.html"), '">Leer la aclaración y recorrer los mundos</a></div>',
      '<div><span class="eyebrow">Consulta abierta</span><h3>Un archivo antes que un juego</h3><p>Todas las fichas, relaciones y fuentes están disponibles desde el inicio. El recorrido sugerido acompaña la lectura, pero no bloquea contenido.</p><a class="text-link" href="', G.pageUrl("metodologia.html"), '">Conocer el método curatorial</a></div></div></section>',

      '<section class="home-chapter home-chapter--light"><div class="home-chapter__intro"><div><span class="chapter-index">Capítulo II · Figuras del archivo</span><h2>Entrar por una presencia</h2></div>',
      '<p>Esta selección abre distintas zonas del archivo sin establecer una jerarquía patrimonial. Cada ficha conserva su estado, sus fuentes y lo que aún falta investigar.</p></div>',
      '<div class="featured-editorial">', featuredIds.map(function (id) { return G.figureCard(G.getFigure(id), { mode: "featured" }); }).join(""), '</div>',
      '<div class="actions section"><a class="button button--primary" href="', G.pageUrl("bestiario.html"), '">Explorar las 24 fichas</a></div></section>',

      '<section class="home-chapter home-worlds"><div class="home-chapter__intro"><div><span class="chapter-index">Capítulo III · Los siete mundos</span><h2>Un itinerario entre ambientes y señales</h2></div>',
      '<p>El orden propone una secuencia, pero cada mundo permanece abierto. La continuidad es una herramienta narrativa del proyecto, no una cosmología oficial.</p></div>',
      '<div class="world-passages">', G.worlds.map(function (world) {
        return '<a class="world-passage" href="' + G.pageUrl("mundo.html", "?id=" + encodeURIComponent(world.id)) + '"><span class="world-passage__number">' +
          G.escape(world.number) + '</span><span><strong>' + G.escape(world.title) + '</strong><small>' + G.escape(world.introduction) +
          '</small></span><span aria-hidden="true">Abrir →</span></a>';
      }).join(""), '</div></section>',

      '<section class="home-dark"><div class="recta-teaser"><div><span class="chapter-index">Capítulo IV · Expediente especial</span><h2>Recta Provincia</h2>',
      '<p class="lead">Una sala nocturna que separa historia documentada, tradición legendaria y cultura posterior. Donde faltan expedientes, la ausencia se declara.</p>',
      '<div class="actions"><a class="button" href="', G.pageUrl("recta-provincia.html"), '">Abrir el expediente</a><a class="text-link" href="', G.pageUrl("mundo.html", "?id=recta"), '">Consultar el Mundo VI</a></div></div>',
      '<div class="recta-teaser__file"><span class="seal seal--history">Historia documentada</span><h3>Precisión antes que espectáculo</h3><p>No se reconstruyen fechas, cargos, personas ni procedimientos sin fuentes específicas. El diseño de expediente es una recreación editorial declarada.</p></div></div></section>',

      '<section class="home-chapter home-chapter--paper"><div class="voices-grid"><div><span class="chapter-index">Capítulo V · Voces y fuentes</span><h2>Leer también los silencios</h2>',
      '<p>Cada afirmación debe poder distinguir entre tradición, variante, interpretación, historia documentada y representación artística.</p></div>',
      '<div><blockquote>Lo no documentado permanece abierto: no se completa por intuición, no se disfraza de certeza y no desaparece de la interfaz.</blockquote>',
      '<div class="actions section"><a class="button" href="', G.pageUrl("metodologia.html", "#fuentes"), '">Consultar fuentes</a><a class="button button--quiet" href="', G.pageUrl("cosmologia.html"), '">Explorar relaciones</a></div></div></div></section>',

      '<section class="home-chapter home-chapter--light"><div class="home-final">',
      '<article><span class="eyebrow">Consulta</span><h3>Bestiario</h3><p>Búsqueda, filtros, vista rápida y fichas completas.</p><a class="text-link" href="', G.pageUrl("bestiario.html"), '">Abrir archivo →</a></article>',
      '<article><span class="eyebrow">Contexto</span><h3>Cosmología y relaciones</h3><p>Vínculos legibles entre figuras y mundos, con estados visibles.</p><a class="text-link" href="', G.pageUrl("cosmologia.html"), '">Ver relaciones →</a></article>',
      '<article><span class="eyebrow">Ruta opcional</span><h3>Recorrido sugerido</h3><p>Una secuencia breve que enlaza contenido ya disponible y señala lo futuro.</p><a class="text-link" href="', G.pageUrl("recorrido.html"), '">Comenzar recorrido →</a></article>',
      '</div></section>'
    ].join("");
  };
}());
