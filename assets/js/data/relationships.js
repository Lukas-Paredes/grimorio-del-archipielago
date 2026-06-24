(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.relationships = [
    { from: "tenten", to: "caicai", type: "oposición", description: "Tierra elevada y agua ascendente organizan el relato cosmogónico.", status: "provisional", sourceIds: ["memoria-chilena"] },
    { from: "origin", to: "sea-court", type: "continuidad narrativa", description: "El territorio transformado queda rodeado por un mar con orden propio.", status: "interpretation", sourceIds: [] },
    { from: "millalobo", to: "huenchula", type: "parentesco", description: "Parentesco variable dentro de repertorios de la corte marina.", status: "pending", sourceIds: [] },
    { from: "millalobo", to: "pincoya", type: "parentesco", description: "Relación de corte o parentesco según versiones.", status: "pending", sourceIds: [] },
    { from: "pincoya", to: "pincoy", type: "parentesco", description: "Relación marina cuya formulación exacta requiere contraste.", status: "pending", sourceIds: [] },
    { from: "sirena", to: "caleuche", type: "comparación", description: "Canto y aparición marina se comparan sin afirmar una relación universal.", status: "interpretation", sourceIds: [] },
    { from: "caballo-marino", to: "caleuche", type: "asociación legendaria", description: "Desplazamiento extraordinario compartido en algunas versiones.", status: "pending", sourceIds: [] },
    { from: "sea-court", to: "caleuche", type: "continuidad narrativa", description: "Fuera del orden de la corte aparecen luces y una nave incierta.", status: "interpretation", sourceIds: [] },
    { from: "caleuche", to: "brujo", type: "asociación legendaria", description: "Vínculo presente sólo en algunas versiones.", status: "pending", sourceIds: [] },
    { from: "caleuche", to: "forest", type: "continuidad narrativa", description: "La orientación por luces da paso a la orientación por cantos y senderos.", status: "interpretation", sourceIds: [] },
    { from: "trauco", to: "fiura", type: "comparación", description: "Presencias del monte con descripciones, género y funciones diferentes.", status: "provisional", sourceIds: [] },
    { from: "chucao", to: "raiquen", type: "comparación", description: "Aves o nombres asociados a lecturas culturales del canto.", status: "pending", sourceIds: [] },
    { from: "trauco", to: "chucao", type: "territorio", description: "Comparten el monte como paisaje narrativo, no la misma naturaleza.", status: "interpretation", sourceIds: [] },
    { from: "forest", to: "waters", type: "continuidad narrativa", description: "Las señales del suelo conducen hacia barro, esteros y mallines.", status: "interpretation", sourceIds: [] },
    { from: "camahueto", to: "cuchivilu", type: "comparación", description: "Figuras distintas unidas por aguas interiores y rastros ambientales.", status: "interpretation", sourceIds: [] },
    { from: "cuchivilu", to: "cuero-agua", type: "comparación", description: "Estero y barro se contrastan con agua quieta y superficie.", status: "interpretation", sourceIds: [] },
    { from: "waters", to: "recta", type: "continuidad narrativa", description: "El surco del paisaje conduce a sistemas legendarios de secreto.", status: "interpretation", sourceIds: [] },
    { from: "brujo", to: "voladora", type: "asociación legendaria", description: "Mensajería dentro de una organización legendaria.", status: "pending", sourceIds: [] },
    { from: "brujo", to: "invunche", type: "asociación legendaria", description: "Custodia y acceso al secreto según relatos.", status: "pending", sourceIds: [] },
    { from: "voladora", to: "invunche", type: "comparación", description: "Comunicación y custodia cumplen funciones diferentes.", status: "interpretation", sourceIds: [] },
    { from: "recta", to: "dead-roads", type: "continuidad narrativa", description: "Después del secreto, la lectura atiende ausencias, muertos y memoria.", status: "interpretation", sourceIds: [] },
    { from: "animas-cucao", to: "condena", type: "comparación", description: "Memoria colectiva de costa y aparición individual de camino.", status: "interpretation", sourceIds: [] },
    { from: "dead-roads", to: "origin", type: "continuidad narrativa", description: "La organización editorial cierra un ciclo entre memoria y origen.", status: "interpretation", sourceIds: [] }
  ];
}());
