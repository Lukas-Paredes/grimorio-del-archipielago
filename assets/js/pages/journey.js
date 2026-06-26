(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.renderCurrentPage = function () {
    var root = document.querySelector("#page-root");
    var stops = [
      ["Abrir el archivo", "Comenzar con la portada y la aclaración curatorial del proyecto.", G.homeUrl() + "#archivo", "Disponible"],
      ["Elegir una presencia", "Entrar al Bestiario y abrir una ficha por nombre, señal, ambiente o mundo.", G.pageUrl("bestiario.html"), "Disponible"],
      ["Cruzar los siete mundos", "Leer los contextos curatoriales sin asumir que constituyen una clasificación tradicional oficial.", G.pageUrl("mundos.html"), "Disponible"],
      ["Entrar al expediente", "Distinguir historia documentada, tradición legendaria y cultura posterior en Recta Provincia.", G.pageUrl("recta-provincia.html"), "Disponible"],
      ["Seguir las relaciones", "Comparar vínculos de oposición, territorio, parentesco, asociación y continuidad editorial.", G.pageUrl("cosmologia.html"), "Disponible"],
      ["Revisar las fuentes", "Comprobar estados, vacíos documentales y agenda de investigación.", G.pageUrl("metodologia.html"), "Disponible"],
      ["Imaginar la mediación futura", "Folios, Guardianes, Fragmentos y una voz ficticia podrán sumarse sin bloquear la consulta abierta.", "", "Fase futura"]
    ];

    root.innerHTML = [
      '<section class="page-hero"><span class="chapter-index">Ruta opcional</span><span class="eyebrow">Siete paradas · consulta siempre abierta</span><h1>Recorrido sugerido</h1>',
      '<p class="lead">Una secuencia breve para quien prefiera entrar al archivo con orientación. Cada parada enlaza contenido ya disponible; la mediación narrativa más compleja permanece como fase futura.</p>',
      '<div class="curatorial-notice"><strong>La consulta siempre permanece abierta</strong><p>Puedes abandonar la ruta, cambiar el orden o ir directamente a cualquier ficha, mundo, fuente o relación.</p></div></section>',
      '<section class="journey-route" aria-label="Paradas del recorrido sugerido">',
      stops.map(function (stop) {
        return '<article class="journey-stop"><div><span class="journey-status">' + G.escape(stop[3]) + '</span><h2>' + G.escape(stop[0]) + '</h2><p>' + G.escape(stop[1]) +
          '</p></div>' +
          (stop[2] ? '<a class="button button--quiet" href="' + stop[2] + '">Abrir parada</a>' : '<span class="seal seal--art">Próximamente</span>') +
          '</article>';
      }).join(""),
      '</section><section class="section split-panel"><div><span class="eyebrow">Principio</span><h2>Reutilizar, no duplicar</h2><p>La experiencia futura se construirá sobre los mismos datos, relaciones, estados curatoriales e ilustraciones de la consulta pública.</p></div>',
      '<div><span class="eyebrow">Accesibilidad</span><h2>Equivalencia de lectura</h2><p>Teclado, texto alternativo, movimiento reducido y acceso directo seguirán siendo requisitos del recorrido.</p></div></section>'
    ].join("");
  };
}());
