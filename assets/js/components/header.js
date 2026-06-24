(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};
  var links = [
    ["home", "Inicio", "home"],
    ["bestiario.html", "Bestiario", "bestiary"],
    ["mundos.html", "Mundos", "worlds"],
    ["recta-provincia.html", "Recta", "recta"],
    ["cosmologia.html", "Cosmología", "cosmology"],
    ["metodologia.html", "Método", "methodology"],
    ["recorrido.html", "Recorrido", "journey"]
  ];

  G.renderHeader = function () {
    var mount = document.querySelector("[data-site-header]");
    if (!mount) {
      return;
    }
    var page = document.body.getAttribute("data-page") || "";
    mount.innerHTML = [
      '<a class="skip-link" href="#contenido">Saltar al contenido</a>',
      '<header class="site-header" data-header><div class="site-header__inner">',
      '<a class="brand" href="', G.homeUrl(), '" aria-label="El Grimorio del Archipiélago, inicio">',
      '<span class="brand__mark" aria-hidden="true"><span>G</span></span><span>El Grimorio<small>del Archipiélago</small></span></a>',
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span aria-hidden="true">☰</span> Menú</button>',
      '<nav id="main-nav" class="main-nav" aria-label="Navegación principal"><ul>',
      links.map(function (link) {
        var current = page === link[2] ? ' aria-current="page"' : "";
        var href = link[0] === "home" ? G.homeUrl() : G.pageUrl(link[0]);
        return '<li><a href="' + href + '"' + current + ">" + link[1] + "</a></li>";
      }).join(""),
      '</ul></nav>',
      '<form class="header-search" action="', G.pageUrl("bestiario.html"), '" method="get" role="search">',
      '<label class="sr-only" for="global-search">Buscar en el Bestiario</label>',
      '<input id="global-search" name="q" type="search" placeholder="Buscar en el archivo">',
      '<button type="submit" aria-label="Buscar">Ir</button></form>',
      '</div></header>'
    ].join("");
  };
}());
