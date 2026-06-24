(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    root.innerHTML = [
      '<section class="page-hero"><span class="eyebrow">Fuentes, estados y criterios</span><h1>Fuentes y metodología</h1>',
      '<p class="lead">Cómo se organiza el contenido, qué límites tienen las fuentes disponibles y qué investigación falta antes de presentar afirmaciones más precisas.</p></section>',
      '<nav class="local-nav" aria-label="Índice de metodología"><a href="#proposito">Propósito</a><a href="#sellos">Sellos</a><a href="#fuentes">Fuentes</a><a href="#estados">Estados curatoriales</a><a href="#agenda">Agenda</a><a href="#creditos">Créditos y licencias</a><a href="#correcciones">Correcciones</a></nav>',
      '<section id="proposito" class="method-section"><span class="eyebrow">Propósito y alcance</span><h2>Una plataforma educativa en desarrollo</h2>',
      '<p>El proyecto organiza 24 fichas existentes para facilitar consulta, comparación y trazabilidad. Su alcance se concentra en el Archipiélago de Chiloé, pero algunas entradas poseen circulación regional aún no delimitada.</p>',
      '<p>Los siete mundos son una organización curatorial del proyecto. No representan una clasificación tradicional oficial ni una validación comunitaria, institucional o académica.</p></section>',
      '<section id="sellos" class="method-section"><span class="eyebrow">Lectura visible</span><h2>Sellos y tipos de contenido</h2><div class="seal-guide">',
      '<div>', G.seal("tradition"), '<p>Síntesis de lo que cuentan los repertorios disponibles.</p></div>',
      '<div>', G.seal("variant"), '<p>Motivo o atributo que cambia entre versiones.</p></div>',
      '<div>', G.seal("interpretation"), '<p>Decisión educativa o relacional del proyecto.</p></div>',
      '<div>', G.seal("history"), '<p>Plano documental que requiere referencias verificables.</p></div>',
      '<div>', G.seal("art"), '<p>Representación creada para la interfaz; no funciona como evidencia.</p></div>',
      '<div>', G.seal("pending"), '<p>Contenido sin fuente concreta disponible.</p></div></div></section>',
      '<section id="fuentes" class="method-section"><span class="eyebrow">Trazabilidad</span><h2>Fuentes disponibles</h2>', G.sourceList(G.sources.map(function (source) { return source.id; })), '</section>',
      '<section id="estados" class="method-section"><span class="eyebrow">Estado de revisión</span><h2>Estados curatoriales</h2><div class="note-grid">',
      '<article class="note-card">', G.seal("provisional"), '<h3>Provisional</h3><p>Existe una referencia general heredada, pero falta entrada, edición o página.</p></article>',
      '<article class="note-card">', G.seal("pending"), '<h3>Pendiente</h3><p>No existe una referencia concreta en los archivos disponibles.</p></article>',
      '<article class="note-card">', G.seal("documented"), '<h3>Documentado en el proyecto</h3><p>Describe una decisión comprobable de la interfaz, no validación patrimonial.</p></article></div></section>',
      '<section id="agenda" class="method-section"><span class="eyebrow">Investigación futura</span><h2>Agenda prioritaria</h2><ol class="agenda-list">',
      '<li>Incorporar ediciones y páginas para Tentén, Caicai, Millalobo, Pincoya, Caleuche, Trauco, Camahueto e Invunche.</li>',
      '<li>Documentar genealogías variables de la Corte del Mar e historia de Huenchula.</li>',
      '<li>Revisar críticamente los relatos de Trauco y Fiura asociados a violencia o sexualidad.</li>',
      '<li>Delimitar circulación chilota de Raiquén, Piuchén, Cuero del Agua y Chonchón / Tuetué.</li>',
      '<li>Incorporar expedientes verificables para la historia de la Recta Provincia.</li>',
      '<li>Diseñar un protocolo de consentimiento, atribución y retiro para testimonios locales.</li>',
      '<li>Investigar cultura posterior, literatura e imagen contemporánea de las 24 figuras.</li>',
      '<li>Confirmar crédito, licencia y criterios de representación de las diez ilustraciones.</li>',
      '</ol></section>',
      '<section id="creditos" class="method-section"><span class="eyebrow">Publicación responsable</span><h2>Créditos y licencias</h2>',
      '<p>Los archivos disponibles no confirman instituciones colaboradoras, personas responsables, ilustradores ni licencias finales. La interfaz reserva esos campos y evita incorporar logos o avales no confirmados.</p>',
      '<p>Las diez piezas visuales permanecen como encargos definidos. Sus placeholders indican recreación artística y no fijan apariencias patrimoniales.</p></section>',
      '<section id="correcciones" class="method-section"><span class="eyebrow">Correcciones futuras</span><h2>Canal y protocolo pendientes</h2>',
      '<p>Aún no existe un canal público confirmado para reportar errores. Antes de habilitarlo deben definirse responsables, trazabilidad, tiempos de respuesta y procedimientos de retiro o corrección.</p>',
      '<p>Esta versión no incorpora testimonios territoriales sin autorización.</p></section>'
    ].join("");
  };
}());
