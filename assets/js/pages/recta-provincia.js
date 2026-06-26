(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var figureIds = ["brujo", "voladora", "invunche", "chonchon", "basilisco"];
    root.innerHTML = [
      '<section class="recta-hero"><div><span class="chapter-index">Puerta III · Expediente especial</span><span class="eyebrow">Archivo histórico-documental</span><h1>Recta Provincia</h1>',
      '<p class="lead">Una zona del Grimorio dedicada a antecedentes, relatos, interpretaciones y fuentes vinculadas a una de las memorias más complejas del imaginario chilote.</p>',
      '<p class="recta-hero__premise">El expediente mantiene separados el plano histórico documentado, la organización legendaria, las figuras asociadas y las recreaciones posteriores.</p>',
      '<div class="record-legend"><span>', G.seal("history"), '</span><span>', G.seal("tradition"), '</span><span>', G.seal("art"), '</span></div>',
      '<div class="actions"><a class="button" href="#historia">Abrir expediente</a><a class="button button--quiet" href="#fuentes">Revisar fuentes</a></div></div>',
      G.illustrationPlaceholder("recta", "vertical", "Recta Provincia"), '</section>',
      '<nav class="local-nav" aria-label="Índice de la exposición"><a href="#historia">Historia documentada</a><a href="#organizacion">Organización legendaria</a><a href="#figuras">Figuras asociadas</a><a href="#lugares">Lugares y conceptos</a><a href="#cultura">Cultura posterior</a><a href="#fuentes">Fuentes</a><a href="#pendientes">Pendientes</a></nav>',
      '<section id="historia" class="record-section"><div class="record-section__label">', G.seal("history"), '</div><div><h2>1. Historia documentada</h2>',
      '<p>Los archivos de base reconocen la existencia de un plano histórico asociado a procesos y documentación sobre la Recta Provincia. No contienen expedientes, fechas, nombres de personas, cargos ni páginas suficientes para desarrollar una cronología pública.</p>',
      '<p>Esta sección registra esa existencia y su vacío documental. No reconstruye procesos ni atribuye acciones a personas concretas.</p></div></section>',
      '<section id="organizacion" class="record-section"><div class="record-section__label">', G.seal("tradition"), '</div><div><h2>2. Organización legendaria</h2>',
      '<p>Tribunales, jerarquías, jurisdicciones, mensajería, custodia y poder secreto pertenecen aquí al registro legendario. El archivo no los presenta automáticamente como estructura histórica comprobada.</p>',
      '<p>Las funciones asociadas a Voladora e Invunche permiten comparar comunicación y custodia sin fijar cargos, lugares o procedimientos.</p></div></section>',
      '<section id="figuras" class="section"><div class="section-heading"><span class="eyebrow">Fichas conectadas</span><h2>3. Figuras asociadas</h2><p>Las comparaciones regionales permanecen visibles con menor peso y estado pendiente.</p></div><div class="figure-grid">',
      figureIds.map(function (id) { return G.figureCard(G.getFigure(id)); }).join(""), '</div></section>',
      '<section id="lugares" class="record-section"><div class="record-section__label">', G.seal("pending"), '</div><div><h2>4. Lugares y conceptos</h2>',
      '<dl class="concept-list"><div><dt>Quicaví</dt><dd>Nombre presente en los archivos como referencia histórica y legendaria. No se usa como punto cartográfico exacto.</dd></div>',
      '<div><dt>Cueva y umbral</dt><dd>Ambientes narrativos asociados a custodia en relatos del Invunche; no localizaciones verificadas.</dd></div>',
      '<div><dt>Tribunal y jurisdicción</dt><dd>Conceptos del registro legendario mientras no exista documentación específica para cada atributo.</dd></div></dl></div></section>',
      '<section id="cultura" class="record-section"><div class="record-section__label">', G.seal("art"), '</div><div><h2>5. Cultura posterior</h2>',
      '<p>Literatura, divulgación e imágenes contemporáneas reinterpretan la Recta Provincia. El diseño de este expediente pertenece a esa capa de recreación y no simula un documento histórico.</p>',
      '<p>El alcance de la cultura posterior continúa pendiente de fuentes específicas.</p></div></section>',
      '<section id="fuentes" class="section section--sources"><div class="section-heading"><h2>6. Fuentes</h2><p>La referencia disponible es general y no autoriza precisión documental.</p></div>', G.sourceList(["memoria-chilena", "pending-bibliography"]), G.claimList(["cl-recta-1", "cl-recta-2", "cl-recta-3", "cl-recta-4"]), '</section>',
      '<section id="pendientes" class="pending-panel"><span class="eyebrow">Agenda de investigación</span><h2>7. Pendientes de investigación</h2><ul>',
      '<li>Expedientes, fechas, personas y páginas verificables.</li><li>Vocabulario histórico y alcance de cada concepto.</li><li>Relación exacta de Chonchón / Tuetué y Basilisco con la Recta Provincia.</li><li>Uso territorial del nombre Quicaví y cualquier futura cartografía.</li><li>Fuentes específicas para funciones y transformaciones de Voladora e Invunche.</li>',
      '</ul></section>'
    ].join("");
  };
}());
