(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var featuredIds = ["caleuche", "pincoya", "trauco", "camahueto", "invunche", "tenten", "animas-cucao"];
    root.innerHTML = [
      '<section class="hero hero--home"><div class="hero__copy">',
      '<span class="eyebrow">Plataforma educativa y archivo curatorial</span>',
      '<h1>El Grimorio del Archipiélago</h1>',
      '<p class="lead">Un Bestiario abierto para explorar seres, presencias y figuras de la tradición chilota, organizados en siete mundos editoriales y conectados con sus fuentes, variantes y preguntas pendientes.</p>',
      '<div class="hero__actions"><a class="button button--primary" href="bestiario.html">Explorar el Bestiario</a>',
      '<a class="button" href="mundos.html">Conocer los siete mundos</a>',
      '<a class="button" href="recta-provincia.html">Abrir el expediente de la Recta Provincia</a></div>',
      '</div><div class="hero__art">', G.illustrationPlaceholder("cover", "vertical", "Portada del Grimorio"), '</div></section>',
      '<section class="section section--doors" aria-labelledby="puertas-title"><div class="section-heading"><span class="eyebrow">Tres puertas principales</span><h2 id="puertas-title">Comienza por la consulta que necesites</h2></div>',
      '<div class="door-grid"><article class="door-card door-card--primary"><span class="door-card__index">01</span><h3>Bestiario del Archipiélago</h3><p>24 fichas con búsqueda, filtros, vista rápida y URL propia.</p><a class="button button--primary" href="bestiario.html">Explorar el Bestiario</a></article>',
      '<article class="door-card"><span class="door-card__index">02</span><h3>Los siete mundos</h3><p>Contextos abiertos de consulta. Su orden es editorial y nunca bloquea información.</p><a class="button" href="mundos.html">Conocer los siete mundos</a></article>',
      '<article class="door-card"><span class="door-card__index">03</span><h3>Recta Provincia</h3><p>Exposición especial que distingue historia documentada, tradición legendaria y cultura posterior.</p><a class="button" href="recta-provincia.html">Abrir el expediente</a></article></div></section>',
      '<section class="section" aria-labelledby="destacadas-title"><div class="section-heading"><span class="eyebrow">Una entrada por mundo</span><h2 id="destacadas-title">Figuras y conjuntos destacados</h2><p>La selección orienta; no establece una jerarquía patrimonial.</p></div>',
      '<div class="featured-strip">', featuredIds.map(function (id) { return G.figureCard(G.getFigure(id), { mode: "featured" }); }).join(""), '</div></section>',
      '<section class="section split-panel"><div><span class="eyebrow">Relaciones legibles</span><h2>Cosmología y relaciones</h2><p>Consulta vínculos de oposición, parentesco, territorio, comparación, asociación legendaria y continuidad narrativa. La lista textual es la vista principal.</p><a class="text-link" href="cosmologia.html">Explorar relaciones</a></div>',
      '<div><span class="eyebrow">Rigor curatorial</span><h2>Fuentes y metodología</h2><p>Conoce qué está respaldado por una referencia general, qué permanece pendiente y cómo se separan tradición, interpretación e historia documentada.</p><a class="text-link" href="metodologia.html">Consultar fuentes y metodología</a></div></section>',
      '<aside class="future-banner" aria-labelledby="future-title"><div><span class="seal seal--art">Fase futura</span><h2 id="future-title">Recorrido narrativo — Próximamente</h2><p>Una ruta opcional reutilizará mundos, fichas e ilustraciones. Nunca bloqueará la consulta educativa.</p></div><a class="button button--quiet" href="recorrido.html">Conocer el concepto</a></aside>'
    ].join("");
  };
}());
