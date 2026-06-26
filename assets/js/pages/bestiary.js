(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};
  var state;
  var root;
  var labels = {
    principal: ["Figuras principales", "Entradas con desarrollo suficiente y función central en su mundo."],
    secondary: ["Figuras secundarias", "Fichas propias cuyo contexto depende actualmente de una red o figura principal."],
    comparison: ["Variantes o comparaciones", "Entradas conservadas para contrastar funciones, ambientes o circulación."],
    archive: ["Archivo pendiente", "Fichas visibles con delimitación o fuentes todavía insuficientes."]
  };

  function option(value, label, selected) {
    return '<option value="' + G.escape(value) + '"' + (selected === value ? " selected" : "") + ">" + G.escape(label) + "</option>";
  }

  function matches(figure) {
    if (state.q && G.figureSearchText(figure).indexOf(G.normalize(state.q)) === -1) { return false; }
    if (state.world !== "all" && figure.worldId !== state.world) { return false; }
    if (state.nature !== "all" && figure.nature !== state.nature) { return false; }
    if (state.environment !== "all" && figure.environments.indexOf(state.environment) === -1) { return false; }
    if (state.status !== "all" && figure.status !== state.status) { return false; }
    if (state.classification !== "all" && figure.classification !== state.classification) { return false; }
    if (state.letter !== "all" && G.normalize(figure.name).charAt(0).toUpperCase() !== state.letter) { return false; }
    return true;
  }

  function renderResults() {
    var results = G.figures.filter(matches);
    var returnUrl = "bestiario.html" + location.search;
    var resultRoot = root.querySelector("[data-results]");
    var groups = ["principal", "secondary", "comparison", "archive"].map(function (classification) {
      var figures = results.filter(function (item) { return item.classification === classification; });
      if (!figures.length) { return ""; }
      return '<section class="bestiary-group bestiary-group--' + classification + '"><div class="group-heading"><div><span class="eyebrow">' +
        figures.length + (figures.length === 1 ? " ficha" : " fichas") + '</span><h2>' + labels[classification][0] + '</h2><p>' +
        labels[classification][1] + '</p></div></div><div class="figure-grid">' +
        figures.map(function (item) { return G.figureCard(item, { returnUrl: returnUrl }); }).join("") + "</div></section>";
    }).join("");
    resultRoot.innerHTML = groups || '<div class="empty-state empty-state--large"><h2>Sin resultados</h2><p>No encontramos una ficha con esta combinación de consulta y filtros.</p><button class="button" type="button" data-clear-filters>Limpiar filtros</button></div>';
    root.querySelector("[data-result-count]").textContent = results.length + (results.length === 1 ? " resultado" : " resultados");
  }

  function syncState() {
    G.updateQuery(state);
    renderResults();
  }

  function bind() {
    root.addEventListener("input", function (event) {
      if (event.target.matches("[data-filter]")) {
        state[event.target.getAttribute("data-filter")] = event.target.value;
        syncState();
      }
    });
    root.addEventListener("change", function (event) {
      if (event.target.matches("[data-filter]")) {
        state[event.target.getAttribute("data-filter")] = event.target.value;
        syncState();
      }
    });
    root.addEventListener("click", function (event) {
      var letter = event.target.closest("[data-letter]");
      if (letter) {
        state.letter = letter.getAttribute("data-letter");
        root.querySelectorAll("[data-letter]").forEach(function (button) {
          button.setAttribute("aria-pressed", String(button === letter));
        });
        syncState();
      }
      if (event.target.closest("[data-clear-filters]")) {
        state = { q: "", world: "all", nature: "all", environment: "all", status: "all", classification: "all", letter: "all" };
        G.updateQuery(state);
        G.renderCurrentPage();
      }
    });
  }

  G.renderCurrentPage = function () {
    root = document.querySelector("#page-root");
    var params = G.params();
    state = {
      q: params.get("q") || "",
      world: params.get("world") || "all",
      nature: params.get("nature") || "all",
      environment: params.get("environment") || "all",
      status: params.get("status") || "all",
      classification: params.get("classification") || "all",
      letter: params.get("letter") || "all"
    };
    var natures = G.uniqueSorted(G.figures.map(function (item) { return item.nature; }));
    var environments = G.uniqueSorted([].concat.apply([], G.figures.map(function (item) { return item.environments; })));
    var letters = G.uniqueSorted(G.figures.map(function (item) { return G.normalize(item.name).charAt(0).toUpperCase(); }));

    root.innerHTML = [
      '<section class="page-hero page-hero--bestiary"><span class="chapter-index">Puerta I · Archivo de figuras</span><span class="eyebrow">24 fichas · consulta pública</span><h1>Bestiario del Archipiélago</h1>',
      '<p class="subtitle">Figuras del relato y la memoria cultural</p>',
      '<p class="lead">El Bestiario reúne personajes, presencias y seres del imaginario chilote y archipelágico. No son criaturas coleccionables: cada ficha permite consultar descripción, variantes, relaciones, fuentes y estado de documentación.</p>',
      '<div class="archive-definition"><strong>Cómo leer este archivo</strong><p>Las fichas distinguen relato, interpretación curatorial y fuente. Las categorías organizan la consulta sin fijar una versión única de cada figura.</p></div></section>',
      '<section class="search-panel" aria-labelledby="search-title"><div class="search-panel__top"><div><span class="eyebrow">Herramientas de consulta</span><h2 id="search-title">Buscar dentro del Bestiario</h2><p data-result-count aria-live="polite"></p></div>',
      '<button class="button button--quiet" type="button" data-clear-filters>Limpiar filtros</button></div>',
      '<div class="filter-grid"><label class="filter filter--wide"><span>Buscar</span><input type="search" value="', G.escape(state.q), '" data-filter="q" placeholder="Ej.: Caleuche, niebla, sendero"></label>',
      '<label class="filter"><span>Mundo</span><select data-filter="world">', option("all", "Todos los mundos", state.world),
      G.worlds.map(function (world) { return option(world.id, "Mundo " + world.number + " · " + world.shortTitle, state.world); }).join(""), '</select></label>',
      '<label class="filter"><span>Naturaleza</span><select data-filter="nature">', option("all", "Todas", state.nature), natures.map(function (value) { return option(value, value, state.nature); }).join(""), '</select></label>',
      '<label class="filter"><span>Ambiente</span><select data-filter="environment">', option("all", "Todos", state.environment), environments.map(function (value) { return option(value, value, state.environment); }).join(""), '</select></label>',
      '<label class="filter"><span>Estado curatorial</span><select data-filter="status">', option("all", "Todos", state.status), option("provisional", "Provisional", state.status), option("pending", "Pendiente", state.status), '</select></label>',
      '<label class="filter"><span>Jerarquía editorial</span><select data-filter="classification">', option("all", "Todas", state.classification), option("principal", "Figuras principales", state.classification), option("secondary", "Figuras secundarias", state.classification), option("comparison", "Variantes o comparaciones", state.classification), option("archive", "Archivo pendiente", state.classification), '</select></label></div>',
      '<div class="alphabet" aria-label="Índice alfabético"><button type="button" data-letter="all" aria-pressed="', String(state.letter === "all"), '">Todas</button>',
      letters.map(function (letter) { return '<button type="button" data-letter="' + letter + '" aria-pressed="' + String(state.letter === letter) + '">' + letter + "</button>"; }).join(""), '</div></section>',
      '<div data-results></div>'
    ].join("");
    renderResults();
    bind();
  };
}());
