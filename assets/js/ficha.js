/* ════════════════════════════════════════════════════════════════════════
   ficha.js — Plantilla de ficha de criatura.
   Parsea el bloque @ENTIDAD del esquema documentado en
   contenido/El_Grimorio_Datos_Estructurados.txt y lo pinta en la cáscara.
   El bloque va embebido (sin fetch) para que la página sea robusta en
   localhost y en file://. La MISMA función parseEntidad() sirve para las 68.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Config por página: window.FICHA = { raw, prosa, cierre } declarado en el
     HTML de cada criatura (ver trauco.html). Sin config se usan los valores por
     defecto de abajo (el Caleuche), de modo que caleuche.html funcione sin
     tocarlo. Las imágenes se eligen por variables CSS (--img-fondo/descenso/
     cierre) en el propio HTML, más el <img> del hero. ──────────────────────── */
  var CFG = window.FICHA || {};

  // Default: bloque @ENTIDAD del Caleuche (VERBATIM del archivo de datos).
  var RAW = CFG.raw || [
    "@ENTIDAD",
    "ID:: caleuche",
    "NOMBRE:: El Caleuche",
    "ALIAS:: El Marino; Buque de Arte; Barco de los Brujos; Barcoiche",
    "SECCION:: 03-barcos-y-almas",
    "CATEGORIA:: barco-fantasma",
    "REINO:: mar",
    "ORIGEN:: mestizo",
    "ALCANCE:: chilota",
    "CONDICION:: malefico",
    "JERARQUIA:: —",
    'ETIMOLOGIA:: mapudungun "kalewtun" (transformar) + "che" (gente) = "gente transformada"',
    "GANCHO:: Hay noches en que la niebla se cierra sobre el canal y ves luces donde no debería haberlas. Los que suben a su cubierta no vuelven a bajar.",
    "RESUMEN:: Buque fantasma que navega de noche entre la niebla, iluminado y con música, tripulado por brujos y las almas de los ahogados.",
    "DESCRIPCION:: Barco que navega los mares del sur envuelto en niebla, apareciendo y desapareciendo sin rastro. De noche se ilumina con luces intensas y resuena música y bailes. Lo tripulan brujos poderosos y las almas de los náufragos. Navega bajo el agua y jamás de día. Cuando lo persiguen, se transforma en roca, tronco o alga, y sus tripulantes en lobos marinos o aves.",
    "VARIANTE:: De los ahogados | Recoge a todos los que mueren en el agua, que le sirve de mansión eterna. La Pincoya, el Pincoy y la Sirena llevan los cuerpos; al pisar la cubierta, los muertos reviven como tripulantes.",
    "VARIANTE:: De los marineros | Tienen una sola pierna (la otra doblada sobre la espalda) y son desmemoriados, para no revelar el secreto del barco.",
    "VARIANTE:: Del contrabando | Los brujos del barco comercian; cuando un comerciante se enriquece de pronto, dicen que hizo pacto con el Caleuche.",
    "VARIANTE:: Del peligro de mirarlo | Quien lo mira puede quedar con la boca torcida o la cabeza vuelta hacia atrás por brujería; el barco siente el aliento de los hombres.",
    "INTERPRETACION:: Mito de tránsito, junto a Tempilcahue: habla del destino de las almas. Es el rostro del mar mismo, fuente de vida y de muerte para un pueblo que de él depende.",
    "RELACIONES:: pincoya; pincoy; sirena-chilota; tempilcahue; recta-provincia; caballo-marino",
    "FUENTE:: Cavada (1914)",
    "FUENTE:: Memoria Chilena",
    "ENLACE:: https://www.marcachile.cl/en/mitos-y-leyendas-chilenas/",
    "@FIN"
  ].join("\n");

  /* ── Prosa del grimorio literario (DEFINITIVO.txt, cap. "VII · EL CALEUCHE").
     Enriquece SOLO 3 zonas; NO duplica gancho, datos, variantes ni fuentes
     (esos ya vienen de la base de datos). Limpia: sin cajas ASCII, sin bullets,
     sin enlaces sueltos. Para otra criatura: reemplazar por su prosa (o {}). ── */
  var PROSA = CFG.prosa || {
    // "LO QUE SE SABE CON CERTEZA" → reemplaza la descripción del relato.
    descripcion: [
      "El Caleuche es un barco que navega los mares del sur envuelto en niebla, apareciendo y desapareciendo sin dejar rastro. De noche se ilumina con luces intensas —algunos dicen que con velas rojizas— y en su cubierta resuena música festiva y se celebran grandiosos bailes. Lo tripulan brujos poderosos y las almas de los náufragos ahogados.",
      "Tiene el don de navegar bajo el agua, sumergiéndose y emergiendo cuando le place. Jamás navega de día. Y cuando alguien lo persigue para darle caza, se transforma —en roca, en tronco de árbol, en simple alga— para pasar inadvertido y escapar; y sus tripulantes se vuelven lobos marinos o aves."
    ],
    // "LO QUE DICEN LOS QUE ESTUDIAN" → enriquece la nota del archivero.
    interpretacion: "Se le cuenta entre los «mitos de tránsito», junto al barquero Tempilcahue: relatos que hablan del viaje de las almas y del destino de los muertos. El Caleuche es, en el fondo, el rostro del mar mismo —fuente de vida y de muerte para un pueblo que de él depende para vivir, y en él teme morir.",
    // "DE DÓNDE PUDO NACER EL MITO" → sección nueva.
    origenMito: [
      "Los estudiosos han propuesto varios orígenes para el Caleuche, y todos dicen algo del cruce de mundos que es Chiloé. Aunque su nombre viene del mapudungun «kalewtun» (transformar) más «che» (gente) —«gente transformada»— el mito mismo podría ser una adaptación de la leyenda europea del Barco Fantasma o el Holandés Errante, condenado a navegar para siempre con tripulación de espectros. Otros lo atribuyen a hechos reales: la desaparición de un barco holandés (El Calanche), las desapariciones de expediciones españolas en el estrecho de Magallanes, o la llegada de corsarios holandeses a Chiloé. Y hay una explicación más terrena: que el mito del barco brujo se inventó para encubrir las operaciones de contrabando que de verdad se hacían en estas islas. Probablemente todas estas aguas confluyen en el Caleuche."
    ]
  };

  /* ── PARSER fiel al esquema ──────────────────────────────────────────────
     · Bloque entre @ENTIDAD y @FIN.  · Campo "CLAVE:: valor" (sep. ":: ").
     · Valor multilínea hasta la próxima "CLAVE:: " o @FIN.
     · Repetibles: VARIANTE (Título | texto), FUENTE, ENLACE.
     · Líneas que empiezan con "#" = comentarios (ignoradas). ───────────── */
  function parseEntidad(raw) {
    var lines = raw.split(/\r?\n/);
    var single = {};
    var repeat = { VARIANTE: [], FUENTE: [], ENLACE: [] };
    var key = null, buf = [];
    var isField = function (l) { return /^[A-Z]+:: /.test(l); };
    function flush() {
      if (key === null) return;
      var val = buf.join("\n").trim();
      if (repeat[key]) repeat[key].push(val); else single[key] = val;
      key = null; buf = [];
    }
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i], t = line.trim();
      if (t === "@ENTIDAD" || t === "@FIN") { flush(); continue; }
      if (t.charAt(0) === "#") continue;
      if (isField(line)) {
        flush();
        var p = line.indexOf(":: ");
        key = line.slice(0, p);
        buf = [line.slice(p + 3)];
      } else if (key !== null) {
        buf.push(line);
      }
    }
    flush();
    return {
      id: single.ID || "",
      nombre: single.NOMBRE || "",
      alias: (single.ALIAS || "").split("; ").filter(Boolean),
      seccion: single.SECCION || "",
      categoria: single.CATEGORIA || "",
      reino: single.REINO || "",
      origen: single.ORIGEN || "",
      alcance: single.ALCANCE || "",
      condicion: single.CONDICION || "",
      jerarquia: single.JERARQUIA || "",
      etimologia: single.ETIMOLOGIA || "",
      gancho: single.GANCHO || "",
      resumen: single.RESUMEN || "",
      descripcion: single.DESCRIPCION || "",
      interpretacion: single.INTERPRETACION || "",
      defensa: single.DEFENSA || "",
      desarrollo: single.DESARROLLO || "",
      relaciones: (single.RELACIONES || "").split("; ").filter(Boolean),
      variantes: repeat.VARIANTE.map(function (v) {
        var i2 = v.indexOf(" | ");
        return i2 === -1 ? { titulo: "", texto: v.trim() }
                         : { titulo: v.slice(0, i2).trim(), texto: v.slice(i2 + 3).trim() };
      }),
      fuentes: repeat.FUENTE.slice(),
      enlaces: repeat.ENLACE.slice()
    };
  }

  /* ── Etiquetas legibles del vocabulario controlado (solo formato) ──────── */
  var LABELS = {
    malefico: "Maléfico", benefico: "Benéfico", ambiguo: "Ambiguo", primigenio: "Primigenio", doliente: "Doliente",
    prehispanico: "Prehispánico", mestizo: "Mestizo", colonial: "Colonial",
    mar: "Mar", bosque: "Bosque", "cerro-rio": "Cerro y río", casa: "Casa", aire: "Aire",
    subsuelo: "Subsuelo", almas: "Almas", lugar: "Lugar",
    chilota: "Chilota", "chilota-raiz-mapuche": "Chilota (raíz mapuche)"
  };
  function titleCase(s) { return s.replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  function label(v) { return v === "—" || v === "" ? (v || "—") : (LABELS[v] || titleCase(v)); }
  function prettySeccion(s) { return titleCase(s.replace(/^\d+-/, "")); }
  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  /* ── Helpers DOM ──────────────────────────────────────────────────────── */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function set(id, text) { var n = document.getElementById(id); if (n) n.textContent = text; }
  function addRivets(frame) {
    ["tl", "tr", "bl", "br"].forEach(function (p) { frame.appendChild(el("span", "rivet " + p)); });
  }
  function toggleSection(id, hasData) {
    var n = document.getElementById(id);
    if (n) { n.hidden = !hasData; }
  }

  /* ── Render ───────────────────────────────────────────────────────────── */
  function render(d) {
    document.title = d.nombre + " · El Grimorio del Archipiélago";
    set("hero-cat", "Bestiario · " + prettySeccion(d.seccion));
    set("hero-name", d.nombre);
    set("hero-alias", d.alias.join("  ·  "));
    set("gancho", d.gancho);
    set("resumen", d.resumen);
    set("interpretacion", PROSA.interpretacion || d.interpretacion);

    // Descripción (en su propio <p> para la capitular)
    var desc = document.getElementById("descripcion");
    if (desc) {
      desc.innerHTML = "";
      var cuerpo = (PROSA.descripcion && PROSA.descripcion.length) ? PROSA.descripcion
                 : (d.descripcion ? [d.descripcion] : []);
      cuerpo.forEach(function (t) { desc.appendChild(el("p", null, t)); });
    }
    var resEl = document.getElementById("resumen"); if (resEl) { resEl.hidden = !d.resumen; }

    // "De dónde nació el mito" (prosa del grimorio literario)
    var origen = document.getElementById("origen-mito");
    if (origen) {
      origen.innerHTML = "";
      (PROSA.origenMito || []).forEach(function (t) { origen.appendChild(el("p", null, t)); });
    }

    // Datos de bestiario: TODOS los campos presentes (orden fijo; cada fila solo si hay valor).
    var datos = document.getElementById("datos");
    var datoRows = [
      { k: "Reino", v: d.reino && label(d.reino) },
      { k: "Categoría", v: d.categoria && titleCase(d.categoria) },
      { k: "Condición", v: d.condicion && label(d.condicion) },
      { k: "Origen", v: d.origen && label(d.origen) },
      { k: "Alcance", v: d.alcance && label(d.alcance) },
      { k: "Jerarquía", v: d.jerarquia },
      { k: "Etimología", v: d.etimologia, wide: true }
    ].filter(function (row) { return row.v; });
    datoRows.forEach(function (row) {
      var box = el("div", row.wide ? "wide" : null);
      box.appendChild(el("dt", null, row.k));
      box.appendChild(el("dd", row.wide ? "etim" : null, row.v));
      datos.appendChild(box);
    });

    // Variantes: cajones de archivo
    var vbox = document.getElementById("variantes");
    d.variantes.forEach(function (va, i) {
      var card = el("article", "cajon reveal");
      card.appendChild(el("span", "cajon__tab"));
      var frame = el("div", "frame");
      var panel = el("div", "frame__panel");
      var h3 = el("h3");
      h3.appendChild(el("span", "num", ROMAN[i] || String(i + 1)));
      h3.appendChild(document.createTextNode(va.titulo));
      panel.appendChild(h3);
      panel.appendChild(el("p", null, va.texto));
      frame.appendChild(panel);
      card.appendChild(frame);
      vbox.appendChild(card);
    });

    // Vitrina: otras piezas. Si window.FICHA.publicadas incluye el id, la pieza
    // enlaza a su ficha; si no, queda "ficha pendiente" (link muerto). (Excepción E2.)
    var vit = document.getElementById("vitrina");
    var pubs = CFG.publicadas || [];
    d.relaciones.forEach(function (id) {
      var name = titleCase(id);
      var publicada = pubs.indexOf(id) !== -1;
      var a = el("a", "pieza");
      if (publicada) {
        a.href = id + ".html";
        a.setAttribute("title", "Abrir ficha: " + name);
      } else {
        a.href = "#"; a.setAttribute("data-id", id);
        a.setAttribute("title", "Ficha pendiente: " + name);
        a.addEventListener("click", function (e) { e.preventDefault(); });
      }
      var frame = el("div", "frame");
      var art = el("div", "pieza__art pixel");
      art.appendChild(el("span", "pieza__sigil", name.charAt(0)));
      frame.appendChild(art);
      a.appendChild(frame);
      a.appendChild(el("span", "pieza__name", name));
      a.appendChild(el("span", "pieza__tag", publicada ? "ficha" : "ficha pendiente"));
      vit.appendChild(a);
    });

    // Pie: fuentes y enlaces
    var pie = document.getElementById("pie");
    if (d.fuentes.length) {
      pie.appendChild(el("dt", null, "Fuentes"));
      var ulF = el("ul");
      d.fuentes.forEach(function (f) { ulF.appendChild(el("li", null, f)); });
      pie.appendChild(ulF);
    }
    if (d.enlaces.length) {
      pie.appendChild(el("dt", null, "Enlaces"));
      var ulE = el("ul");
      d.enlaces.forEach(function (u) {
        var li = el("li"), a = el("a", null, u);
        a.href = u; a.target = "_blank"; a.rel = "noopener noreferrer";
        li.appendChild(a); ulE.appendChild(li);
      });
      pie.appendChild(ulE);
    }

    // Defensa y Desarrollo (solo si la entidad los trae)
    set("defensa", d.defensa);
    if (d.desarrollo) { set("desarrollo", "Desarrollo documental: " + d.desarrollo); }

    // Ocultar las secciones sin datos (plantilla: sirve igual para las 68).
    toggleSection("sec-gancho", !!d.gancho);
    toggleSection("sec-datos", datoRows.length > 0);
    toggleSection("sec-relato", !!(d.resumen || d.descripcion || (PROSA.descripcion && PROSA.descripcion.length)));
    toggleSection("sec-variantes", d.variantes.length > 0);
    toggleSection("sec-defensa", !!d.defensa);
    toggleSection("sec-interp", !!(d.interpretacion || PROSA.interpretacion));
    toggleSection("sec-origen", !!(PROSA.origenMito && PROSA.origenMito.length));
    toggleSection("sec-desarrollo", !!d.desarrollo);
    toggleSection("sec-vitrina", d.relaciones.length > 0);
    toggleSection("pie", !!(d.fuentes.length || d.enlaces.length));

    // Frase de cierre: la declara la página (window.FICHA.cierre). Si el HTML ya
    // trae una escrita (p. ej. el Caleuche), se respeta y no se pisa.
    var frase = document.querySelector(".cierre__phrase");
    if (frase && CFG.cierre && !frase.textContent.trim()) { frase.textContent = CFG.cierre; }

    // Remaches en placas y cajones (no en las piezas de la vitrina)
    document.querySelectorAll(".frame--plaque, .cajon .frame").forEach(addRivets);
  }

  /* ── Interacciones (respetan prefers-reduced-motion) ──────────────────── */
  function wire() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Revelado al scroll
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-visible"); });
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      items.forEach(function (n) { obs.observe(n); });
    }

    // Parallax (fondo y niebla más lentos que el contenido).
    // Capas con data-rel hacen parallax RELATIVO a ese ancestro (p.ej. el abismo,
    // anclado al entrar al descenso) en vez de al scroll absoluto de la página.
    if (!reduce) {
      // El fondo del descenso (.descenso-bg) queda fuera: ahora cubre todo el
      // descenso con la imagen fija (background-attachment: fixed), sin transform.
      var layers = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]:not(.descenso-bg)"))
        .map(function (l) {
          var relId = l.getAttribute("data-rel");
          return {
            el: l,
            speed: parseFloat(l.getAttribute("data-parallax")),
            rel: relId ? document.getElementById(relId) : null,
            relTop: 0
          };
        });
      function measure() {
        layers.forEach(function (L) { L.relTop = L.rel ? L.rel.offsetTop : 0; });
      }
      var ticking = false;
      function update() {
        if (document.documentElement.classList.contains("motion-off")) { ticking = false; return; }
        var y = window.pageYOffset;
        layers.forEach(function (L) {
          var base = L.rel ? Math.max(0, y - L.relTop) : y;
          L.el.style.transform = "translate3d(0," + (base * L.speed).toFixed(1) + "px,0)";
        });
        ticking = false;
      }
      measure();
      window.addEventListener("scroll", function () {
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
      }, { passive: true });
      window.addEventListener("resize", function () { measure(); update(); }, { passive: true });
      update();
    }
  }

  function init() {
    try {
      render(parseEntidad(RAW));
    } catch (e) {
      if (window.console) { console.error("ficha: error al renderizar", e); }
    }
    wire();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
