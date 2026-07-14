/* ════════════════════════════════════════════════════════════════════════
   camino.js — El CHROME del camino del mito (todas las páginas del sistema
   nuevo: inicio, capítulos, lecho, 404). Sin frameworks, sin módulos ES.

   · Botonera fija con TEXTO (accesibilidad 40-70): Capítulos · Movimiento ·
     Sonido. Es el ÚNICO dueño de la pausa de movimiento (grimorio:motion) y
     del estado de audio (grimorio:audio; audio real llega después, apagado).
   · Carta de capítulos (<dialog>): capítulos publicados del camino + el resto
     de las 68 entidades del archivo, selladas (sin enlaces muertos).
   · En las páginas de capítulo (body[data-entity]): bloque «El camino
     continúa» tras el cierre, con el próximo capítulo (gancho VERBATIM del
     @ENTIDAD desde capitulos.js; si existe `puente` citado, se usa ese).
   · Transición de bruma entre páginas (pausable; reduced-motion la anula).
     La entrada la pinta CSS solo (html.bruma-in::after) — sin JS no se tapa.
   Requiere: assets/js/data/capitulos.js + assets/js/data/indice.js cargados.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var html = document.documentElement;
  var G = window.Grimorio || {};
  var P = G.portada || { actos: [], capitulos: [], fin: null };
  var INDICE = G.indice || [];
  // Tiempos de la bruma: afinables en config.js (FASE 3); defaults idénticos.
  var BRUMA = (G.config && G.config.bruma) || {};
  var BRUMA_SALIDA = BRUMA.salidaMs || 420;
  var BRUMA_ENTRADA = BRUMA.entradaMs || 1400;
  var BRUMA_SEGURIDAD = BRUMA.seguridadMs || 3000;
  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
               "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function paused() { return html.classList.contains("motion-off"); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  /* La plomada de sonda (cosecha 2026-07-05) reemplaza el ▼ genérico:
     es el instrumento náutico del descenso, no un glifo de teclado. */
  function plomada() {
    var img = document.createElement("img");
    img.className = "camino-plomada";
    img.src = "assets/img/indicador-plomada.png";
    img.alt = "";
    img.width = 19; img.height = 48;
    img.setAttribute("aria-hidden", "true");
    return img;
  }

  var publicados = P.capitulos.filter(function (c) { return c.estado === "publicado"; })
                              .sort(function (a, b) { return a.n - b.n; });

  /* ── 1 · Botonera fija (Capítulos · Movimiento · Sonido) ───────────────── */
  var botonera = el("div", "camino-botonera");
  var bCarta = el("button", "camino-btn camino-btn--carta");
  bCarta.type = "button";
  bCarta.innerHTML = '<span aria-hidden="true">☰</span> Capítulos';
  bCarta.setAttribute("aria-haspopup", "dialog");

  // Mapa (mandato 2026-07-13): el acceso queda listo y visible; la capa
  // geográfica real se monta cuando la investigación esté verificada.
  var bMapa = el("button", "camino-btn camino-btn--mapa");
  bMapa.type = "button";
  bMapa.innerHTML = '<span aria-hidden="true">🧭</span> Mapa';
  bMapa.setAttribute("aria-haspopup", "dialog");

  // Fuentes (mandato 2026-07-13): la cara pública del sistema bibliográfico.
  var bFuentes = el("button", "camino-btn camino-btn--fuentes");
  bFuentes.type = "button";
  bFuentes.innerHTML = '<span aria-hidden="true">✒</span> Fuentes';
  bFuentes.setAttribute("aria-haspopup", "dialog");

  var bMarea = el("button", "camino-btn camino-btn--marea");
  bMarea.type = "button";
  function reflectMarea() {
    var off = paused();
    bMarea.setAttribute("aria-pressed", off ? "true" : "false");
    bMarea.innerHTML = off ? '<span aria-hidden="true">⏸</span> En pausa'
                           : '<span aria-hidden="true">🌊</span> Movimiento';
    bMarea.title = off ? "El movimiento está en pausa — clic para reanudar"
                       : "Pausar todo el movimiento (niebla, luces, motas)";
  }
  bMarea.addEventListener("click", function () {
    var off = html.classList.toggle("motion-off");
    store("grimorio:motion", off ? "off" : "on");
    reflectMarea();
    if (!off) { window.dispatchEvent(new Event("scroll")); }  // re-sincroniza parallax JS
  });

  // Grupo Sonido: el botón (on/off) + el slider de volumen maestro.
  var grupoSon = el("div", "camino-sonido");
  var bSon = el("button", "camino-btn camino-btn--bocina");
  bSon.type = "button";

  var slider = document.createElement("input");
  slider.type = "range"; slider.min = "0"; slider.max = "100"; slider.step = "1";
  slider.className = "camino-vol";
  slider.setAttribute("aria-label", "Volumen del sonido");
  var volIni = (G.sonido && G.sonido.volumenActual) ? G.sonido.volumenActual()
             : (function () { var v = read("grimorio:volumen"); var f = v === null ? 0.72 : parseFloat(v); return isNaN(f) ? 0.72 : f; }());
  slider.value = String(Math.round(volIni * 100));
  slider.addEventListener("input", function () {
    if (G.sonido && G.sonido.volumen) { G.sonido.volumen(slider.value / 100); }  // curva v² y persistencia en sonido.js
  });

  function reflectSon() {
    var on = bSon.getAttribute("aria-pressed") === "true";
    bSon.innerHTML = on ? '<span aria-hidden="true">🔈</span> Sonido'
                        : '<span aria-hidden="true">🔇</span> Sonido';
    bSon.title = on ? "Apagar el sonido (música + atmósfera)"
                    : "Encender el sonido (música + atmósfera; apagado por defecto)";
    grupoSon.classList.toggle("abierto", on);   // móvil: el slider se despliega al encender
  }
  bSon.setAttribute("aria-pressed", read("grimorio:audio") === "on" ? "true" : "false");
  bSon.addEventListener("click", function () {
    var on = bSon.getAttribute("aria-pressed") === "true";
    bSon.setAttribute("aria-pressed", on ? "false" : "true");
    store("grimorio:audio", on ? "off" : "on");
    // El AudioManager (sonido.js) es el ÚNICO camino de encendido; nunca autoplay.
    // Un solo botón controla TODO: atmósfera procedural + música.
    if (G.sonido) { G.sonido.set(!on); }
    reflectSon();
  });
  grupoSon.appendChild(bSon);
  grupoSon.appendChild(slider);

  reflectMarea(); reflectSon();
  botonera.appendChild(bCarta);
  botonera.appendChild(bMapa);
  botonera.appendChild(bFuentes);
  botonera.appendChild(bMarea);
  botonera.appendChild(grupoSon);
  // Al INICIO del body: primera parada del tabulador (accesibilidad teclado).
  document.body.insertBefore(botonera, document.body.firstChild);

  /* ── 2 · Carta de capítulos (<dialog>) ─────────────────────────────────── */
  function seccionNombre(slug) {
    var s = slug.replace(/^\d+-/, "").replace(/-/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  var carta = document.createElement("dialog");
  carta.className = "carta";
  carta.setAttribute("aria-label", "Capítulos del camino y archivo del Grimorio");
  // La entidad de la página actual (si es un capítulo): su placa se marca
  // «estás aquí» — el lector siempre sabe en qué parada del descenso está.
  var entidadCarta = document.body.getAttribute("data-entity");

  var cerrar = el("button", "camino-btn carta__cerrar");
  cerrar.type = "button";
  cerrar.innerHTML = '<span aria-hidden="true">✕</span> Cerrar';
  cerrar.addEventListener("click", function () { carta.close(); });
  carta.appendChild(cerrar);

  carta.appendChild(el("h2", "carta__titulo", "El camino del mito"));

  P.actos.forEach(function (acto) {
    var caps = P.capitulos.filter(function (c) { return c.acto === acto.id; })
                          .sort(function (a, b) { return (a.n || 0) - (b.n || 0); });
    if (!caps.length) { return; }
    var g = el("section", "carta__grupo");
    g.appendChild(el("h3", "carta__acto", acto.numeral + " · " + acto.titulo));
    var grid = el("div", "carta__grid");
    caps.forEach(function (cap) {
      if (cap.estado === "publicado") {
        /* Placa VISUAL (mandato 2026-07-13): la imagen del capítulo bajo velo
           abisal — el índice se recorre a golpe de vista y se salta directo
           a cualquier parada. El descenso lineal no se toca. */
        var esActual = cap.id === entidadCarta;
        var a = el("a", "carta__placa carta__placa--visual" + (esActual ? " carta__placa--actual" : ""));
        a.href = cap.href;
        a.setAttribute("data-transicion", "");
        if (esActual) { a.setAttribute("aria-current", "page"); }
        if (cap.img) {
          var fondo = el("span", "carta__fondo");
          var fpic = document.createElement("picture");
          var fsrc = document.createElement("source");
          fsrc.srcset = "assets/img/" + cap.img + ".webp";
          fsrc.type = "image/webp";
          var fimg = document.createElement("img");
          fimg.src = "assets/img/" + cap.img + ".png";
          fimg.alt = ""; fimg.loading = "lazy"; fimg.decoding = "async";
          fpic.appendChild(fsrc); fpic.appendChild(fimg);
          fondo.appendChild(fpic);
          a.appendChild(fondo);
          a.appendChild(el("span", "carta__velo"));
        }
        var ftxt = el("span", "carta__texto");
        ftxt.appendChild(el("span", "carta__num", "Capítulo " + (ROMAN[cap.n - 1] || cap.n)));
        ftxt.appendChild(el("strong", "carta__nombre", cap.nombre));
        ftxt.appendChild(el("span", "carta__estado", esActual ? "estás aquí" : "leer capítulo"));
        a.appendChild(ftxt);
        grid.appendChild(a);
      } else {
        var d = el("div", "carta__placa carta__placa--sellada");
        d.setAttribute("aria-disabled", "true");
        d.appendChild(el("strong", "carta__nombre", cap.nombre));
        d.appendChild(el("span", "carta__estado", "capítulo sellado"));
        grid.appendChild(d);
      }
    });
    g.appendChild(grid);
    carta.appendChild(g);
  });

  // El resto del archipiélago: las 68 del índice, selladas (sin enlaces muertos).
  var idsCamino = {};
  P.capitulos.forEach(function (c) { idsCamino[c.id] = true; });
  var porSeccion = {};
  INDICE.forEach(function (e) {
    if (idsCamino[e.id]) { return; }
    (porSeccion[e.seccion] = porSeccion[e.seccion] || []).push(e);
  });
  var slugs = Object.keys(porSeccion).sort();
  if (slugs.length) {
    var resto = el("section", "carta__grupo");
    resto.appendChild(el("h3", "carta__acto", "El resto del archipiélago — capítulos por abrir"));
    slugs.forEach(function (slug) {
      resto.appendChild(el("h4", "carta__seccion", seccionNombre(slug)));
      var grid = el("div", "carta__grid carta__grid--selladas");
      porSeccion[slug].forEach(function (e) {
        var d = el("div", "carta__placa carta__placa--sellada");
        d.setAttribute("aria-disabled", "true");
        d.appendChild(el("strong", "carta__nombre", e.nombre));
        d.appendChild(el("span", "carta__estado", "sellado"));
        grid.appendChild(d);
      });
      resto.appendChild(grid);
    });
    carta.appendChild(resto);
  }

  var pie = el("footer", "carta__pie");
  [["index.html", "Inicio del camino"],
   ["lecho.html", "El lecho — puertas del archivo"],
   ["index-legacy.html", "Archivo completo (consulta)"],
   ["pages/metodologia.html", "Fuentes y método"]].forEach(function (par) {
    var a = el("a", "camino-btn", par[1]);
    a.href = par[0];
    pie.appendChild(a);
  });
  carta.appendChild(pie);
  document.body.appendChild(carta);

  var invocador = null;
  function abrirCarta() {
    invocador = document.activeElement;
    carta.showModal();
    cerrar.focus();
  }
  bCarta.addEventListener("click", abrirCarta);
  carta.addEventListener("close", function () {
    if (location.hash === "#capitulos") {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    }
    if (invocador && invocador.focus) { invocador.focus(); }
  });
  carta.addEventListener("click", function (e) {   // click en el backdrop = cerrar
    if (e.target === carta) { carta.close(); }
  });
  document.querySelectorAll("[data-abrir-carta]").forEach(function (b) {
    b.addEventListener("click", abrirCarta);
  });
  if (location.hash === "#capitulos") { abrirCarta(); }

  /* ── 2b · Mapa del archipiélago (mandato 2026-07-13) ─────────────────────
     La silueta es geometría REAL (DPA/SUBDERE → mapa-datos.js, generado por
     herramientas/generar_mapa.py); el estilo es del Grimorio. El dato se
     carga PEREZOSO al abrir el panel por primera vez (script clásico
     inyectado, sin fetch); si falla, queda el texto de espera. */
  var mapa = document.createElement("dialog");
  mapa.className = "carta carta--mapa";
  mapa.setAttribute("aria-label", "Mapa del archipiélago");
  var mapaCerrar = el("button", "camino-btn carta__cerrar");
  mapaCerrar.type = "button";
  mapaCerrar.innerHTML = '<span aria-hidden="true">✕</span> Cerrar';
  mapaCerrar.addEventListener("click", function () { mapa.close(); });
  mapa.appendChild(mapaCerrar);
  mapa.appendChild(el("h2", "carta__titulo", "Mapa del archipiélago"));
  mapa.appendChild(el("p", "carta--mapa__texto",
    "Los lugares reales que nombran los relatos. La forma del archipiélago " +
    "proviene de datos geográficos oficiales; toca un punto para leer su papel en el mito."));
  var mapaLienzo = el("div", "mapa-lienzo");
  var mapaEspera = el("p", "camino-modo-sellado", "Cargando la carta del archipiélago…");
  mapaLienzo.appendChild(mapaEspera);
  mapa.appendChild(mapaLienzo);
  var mapaInfo = el("div", "mapa-info");
  mapaInfo.setAttribute("aria-live", "polite");
  mapa.appendChild(mapaInfo);
  var mapaPie = el("p", "mapa-pie");
  mapa.appendChild(mapaPie);
  document.body.appendChild(mapa);

  var SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) { n.setAttribute(k, attrs[k]); }
    return n;
  }
  var MAPA_INTRO = "Siete distritos en clave, la capital de la Recta Provincia y la sede del juicio de 1880.";
  function infoIntro() {
    mapaInfo.textContent = "";
    mapaInfo.appendChild(el("p", "mapa-info__rol", MAPA_INTRO));
  }
  function limpiarSeleccion() {
    var sel = mapa.querySelector(".mapa-punto--activo");
    if (sel) { sel.classList.remove("mapa-punto--activo"); }
    infoIntro();
  }
  function infoPunto(p) {
    mapaInfo.textContent = "";
    mapaInfo.appendChild(el("p", "mapa-info__nombre", p.nombre + " — " + p.clave));
    mapaInfo.appendChild(el("p", "mapa-info__rol", p.rol));
    /* Micro-relato VERBATIM del corpus (verificado por generar_mapa.py). */
    if (p.relato) {
      var bq = el("blockquote", "mapa-info__relato", p.relato);
      if (p.relatoFuente) { bq.appendChild(el("footer", "camino-cita", p.relatoFuente)); }
      mapaInfo.appendChild(bq);
    }
    mapaInfo.appendChild(el("p", "mapa-info__fuente", "Fuente: " + p.fuente));
    var acciones = el("div", "mapa-info__acciones");
    if (p.href) {
      var ir = el("a", "camino-btn camino-btn--primario", "Ir a la ficha completa ");
      ir.href = p.href;
      ir.setAttribute("data-transicion", "");
      ir.appendChild(plomada());
      acciones.appendChild(ir);
    }
    var volver = el("button", "camino-btn", "Volver al mapa");
    volver.type = "button";
    volver.addEventListener("click", limpiarSeleccion);
    acciones.appendChild(volver);
    mapaInfo.appendChild(acciones);
    // En móvil el panel queda bajo el lienzo: acercarlo sin sacudir la vista.
    if (!reduce && !paused() && mapaInfo.scrollIntoView) {
      mapaInfo.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }
  function pintarMapa() {
    var M = G.mapaChiloe || (window.Grimorio && window.Grimorio.mapaChiloe);
    if (!M || mapa.querySelector("svg")) { return; }
    var svg = svgEl("svg", { viewBox: M.viewBox, role: "img" });
    svg.setAttribute("aria-label",
      "Silueta del archipiélago de Chiloé con los lugares del relato marcados");
    // Tierra: los anillos reales, fill+stroke del mismo tono (sella los bordes
    // comunales internos); el resplandor del contorno lo da el filtro del grupo.
    var defs = svgEl("defs", {});
    var filtro = svgEl("filter", { id: "mapa-brillo", x: "-8%", y: "-8%", width: "116%", height: "116%" });
    var sombra = svgEl("feDropShadow", { dx: "0", dy: "0", stdDeviation: "4", "flood-color": "#f2b65a", "flood-opacity": "0.22" });
    filtro.appendChild(sombra);
    defs.appendChild(filtro);
    svg.appendChild(defs);
    var tierra = svgEl("g", { "class": "mapa-tierra", filter: "url(#mapa-brillo)" });
    M.islas.forEach(function (d) { tierra.appendChild(svgEl("path", { d: d })); });
    svg.appendChild(tierra);
    /* Atmósfera (fase 4): bancos de bruma que derivan sobre el mar interior —
       el mismo aliento del descenso. Pausables (motion-off / reduced-motion). */
    var gradBruma = svgEl("radialGradient", { id: "mapa-bruma-grad" });
    gradBruma.appendChild(svgEl("stop", { offset: "0%", "stop-color": "#9fb6bd", "stop-opacity": "0.09" }));
    gradBruma.appendChild(svgEl("stop", { offset: "100%", "stop-color": "#9fb6bd", "stop-opacity": "0" }));
    defs.appendChild(gradBruma);
    var brumaMar = svgEl("g", { "class": "mapa-bruma" });
    brumaMar.appendChild(svgEl("ellipse", { "class": "mapa-bruma__velo", cx: "170", cy: "250", rx: "260", ry: "140", fill: "url(#mapa-bruma-grad)" }));
    brumaMar.appendChild(svgEl("ellipse", { "class": "mapa-bruma__velo mapa-bruma__velo--b", cx: "470", cy: "620", rx: "300", ry: "170", fill: "url(#mapa-bruma-grad)" }));
    svg.appendChild(brumaMar);
    var capa = svgEl("g", { "class": "mapa-puntos" });
    M.puntos.forEach(function (p) {
      /* Jerarquía (mandato 2026-07-13): los dos puntos clave —Quicaví (la
         capital/cueva) y Ancud (el juicio)— van `peso: "mayor"` en los datos:
         más grandes y con más brillo; el resto, discretos. */
      var mayor = p.peso === "mayor";
      var g = svgEl("g", { "class": "mapa-punto" + (mayor ? " mapa-punto--mayor" : ""), tabindex: "0", role: "button" });
      g.setAttribute("aria-label", p.nombre + " — " + p.clave);
      g.appendChild(svgEl("circle", { "class": "mapa-punto__halo", cx: p.x, cy: p.y, r: mayor ? "16" : "8" }));
      g.appendChild(svgEl("circle", { "class": "mapa-punto__nucleo", cx: p.x, cy: p.y, r: mayor ? "6" : "3.2" }));
      var et = svgEl("text", { "class": "mapa-etiqueta", x: p.x + 12, y: p.y + 4 });
      et.textContent = p.nombre;
      g.appendChild(et);
      function elegir() {
        var sel = capa.querySelector(".mapa-punto--activo");
        if (sel) { sel.classList.remove("mapa-punto--activo"); }
        g.classList.add("mapa-punto--activo");
        infoPunto(p);
      }
      g.addEventListener("click", elegir);
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elegir(); }
      });
      capa.appendChild(g);
    });
    svg.appendChild(capa);
    mapaLienzo.removeChild(mapaEspera);
    mapaLienzo.appendChild(svg);
    infoIntro();
    mapaPie.textContent = M.procedencia +
      " El mapa en clave varió entre las declaraciones de 1880 (Hernández 2013): " +
      "aquí se muestra la versión del corpus; las variantes viven en las fichas. " +
      "Otros lugares del relato (las cascadas de la iniciación, la cueva de Colo) " +
      "esperan verificación de fuentes.";
  }
  var mapaCargando = false;
  function cargarMapa() {
    if (G.mapaChiloe || (window.Grimorio && window.Grimorio.mapaChiloe)) { pintarMapa(); return; }
    if (mapaCargando) { return; }
    mapaCargando = true;
    var s = document.createElement("script");
    s.src = "assets/js/data/mapa-datos.js";
    s.onload = pintarMapa;
    s.onerror = function () {
      mapaEspera.textContent = "La carta del archipiélago no pudo cargarse.";
    };
    document.head.appendChild(s);
  }
  var invocadorMapa = null;
  bMapa.addEventListener("click", function () {
    invocadorMapa = document.activeElement;
    cargarMapa();
    mapa.showModal();
    mapaCerrar.focus();
  });
  mapa.addEventListener("close", function () {
    if (invocadorMapa && invocadorMapa.focus) { invocadorMapa.focus(); }
  });
  mapa.addEventListener("click", function (e) {   // click en el backdrop = cerrar
    if (e.target === mapa) { mapa.close(); }
  });

  /* ── 2c · Fuentes del Grimorio (mandato 2026-07-13) ──────────────────────
     La cara pública del sistema bibliográfico. Los datos vienen GENERADOS
     desde fuentes/bibliografia/fuentes.yaml (fuentes-datos.js, carga perezosa
     al abrir). Enlace al original SOLO para fuentes de acceso abierto —
     nada se aloja aquí para descarga. */
  var fuentesDlg = document.createElement("dialog");
  fuentesDlg.className = "carta carta--fuentes";
  fuentesDlg.setAttribute("aria-label", "Fuentes del Grimorio");
  var fuentesCerrar = el("button", "camino-btn carta__cerrar");
  fuentesCerrar.type = "button";
  fuentesCerrar.innerHTML = '<span aria-hidden="true">✕</span> Cerrar';
  fuentesCerrar.addEventListener("click", function () { fuentesDlg.close(); });
  fuentesDlg.appendChild(fuentesCerrar);
  fuentesDlg.appendChild(el("h2", "carta__titulo", "Fuentes del Grimorio"));
  fuentesDlg.appendChild(el("p", "carta--fuentes__intro",
    "Todo lo que este archivo afirma remonta a una fuente. Las de acceso " +
    "abierto enlazan a su original oficial; las demás se citan con dónde " +
    "consultarlas — aquí no se aloja ningún documento para descarga."));
  var fuentesCuerpo = el("div", "carta--fuentes__cuerpo");
  var fuentesEspera = el("p", "camino-modo-sellado", "Cargando la biblioteca…");
  fuentesCuerpo.appendChild(fuentesEspera);
  fuentesDlg.appendChild(fuentesCuerpo);
  var fuentesPie = el("footer", "carta__pie");
  var irMetodo = el("a", "camino-btn", "Fuentes y método");
  irMetodo.href = "pages/metodologia.html";
  fuentesPie.appendChild(irMetodo);
  fuentesDlg.appendChild(fuentesPie);
  document.body.appendChild(fuentesDlg);

  var ESTADO_FUENTE = {
    repo: "📥 en el archivo del proyecto",
    online: "🔗 disponible en línea",
    conseguir: "📄 por conseguir — consulta en biblioteca",
    perdida: "∅ número perdido"
  };
  /* Conexión fuente↔entidad (fase 2 del mandato): los temas de `respalda`
     se pintan como enlaces a la ficha si la entidad está publicada; si está
     sellada, su nombre verbatim del índice; los temas transversales llevan
     etiqueta curatorial de interfaz (no es contenido cultural). */
  var TEMAS_UI = {
    "absolucion": "La absolución (1881)",
    "gobernador": "El intendente y la redada",
    "decreto-intendente": "El decreto del intendente",
    "cifras-del-proceso": "Las cifras del proceso",
    "machi-calcu": "Machi y calcu",
    "los-azotes": "Los azotes (prensa de 1880)",
    "origen-moraleda": "El origen: Moraleda y la Chilpilla",
    "museo-ancud": "Museo Regional de Ancud",
    "mapa-archipielago": "El mapa del archipiélago"
  };
  var nombrePorId = {}, hrefPorId = {};
  INDICE.forEach(function (e) { nombrePorId[e.id] = e.nombre; });
  publicados.forEach(function (c) { nombrePorId[c.id] = c.nombre; hrefPorId[c.id] = c.href; });
  function chipTema(t) {
    var nombre = nombrePorId[t] || TEMAS_UI[t] || t;
    if (hrefPorId[t]) {
      var a = el("a", "fuente__tema", nombre);
      a.href = hrefPorId[t];
      a.setAttribute("data-transicion", "");
      return a;
    }
    return el("span", "fuente__tema fuente__tema--sellado", nombre);
  }
  function pintarItemFuente(f) {
    var it = el("article", "fuente");
    var cita = el("p", "fuente__cita");
    var quien = (f.autor ? f.autor : "") + (f.anio ? " (" + f.anio + ")" : "");
    if (quien) { cita.appendChild(el("strong", null, quien + " — ")); }
    cita.appendChild(document.createTextNode(f.titulo || ""));
    it.appendChild(cita);
    if (f.publicacion) { it.appendChild(el("p", "fuente__pub", f.publicacion)); }
    it.appendChild(el("p", "fuente__estado", ESTADO_FUENTE[f.estado] || f.estado));
    if (f.respalda && f.respalda.length) {
      var resp = el("p", "fuente__respalda");
      resp.appendChild(el("span", "fuente__respalda-k", "Respalda: "));
      f.respalda.forEach(function (t, i) {
        if (i) { resp.appendChild(document.createTextNode(" · ")); }
        resp.appendChild(chipTema(t));
      });
      it.appendChild(resp);
    }
    if (f.url) {
      var leer = el("a", "camino-btn fuente__leer", "Leer en el original →");
      leer.href = f.url;
      leer.target = "_blank";
      leer.rel = "noopener";
      it.appendChild(leer);
    }
    return it;
  }
  function pintarFuentes() {
    var D = G.fuentesPublicas || (window.Grimorio && window.Grimorio.fuentesPublicas);
    if (!D || fuentesCuerpo.querySelector(".fuente")) { return; }
    fuentesCuerpo.removeChild(fuentesEspera);
    // Ficha → fuentes: en páginas de capítulo, primero lo que respalda ESTA entidad.
    var entAqui = document.body.getAttribute("data-entity");
    if (entAqui) {
      var deAqui = D.fuentes.filter(function (f) {
        return (f.respalda || []).indexOf(entAqui) !== -1;
      });
      if (deAqui.length) {
        var sec0 = el("section", "carta__grupo carta__grupo--capitulo");
        sec0.appendChild(el("h3", "carta__acto",
          "Fuentes de este capítulo — " + (nombrePorId[entAqui] || entAqui)));
        var cont0 = el("div", "fuentes-lista");
        deAqui.forEach(function (f) { cont0.appendChild(pintarItemFuente(f)); });
        sec0.appendChild(cont0);
        fuentesCuerpo.appendChild(sec0);
      }
    }
    D.grupos.forEach(function (gr) {
      var lista = D.fuentes.filter(function (f) { return f.grupo === gr.id; });
      if (!lista.length) { return; }
      var sec = el("section", "carta__grupo");
      sec.appendChild(el("h3", "carta__acto", gr.titulo));
      var cont = el("div", "fuentes-lista");
      lista.forEach(function (f) { cont.appendChild(pintarItemFuente(f)); });
      sec.appendChild(cont);
      fuentesCuerpo.appendChild(sec);
    });
  }
  var fuentesCargando = false;
  function cargarFuentes() {
    if (G.fuentesPublicas || (window.Grimorio && window.Grimorio.fuentesPublicas)) { pintarFuentes(); return; }
    if (fuentesCargando) { return; }
    fuentesCargando = true;
    var s = document.createElement("script");
    s.src = "assets/js/data/fuentes-datos.js";
    s.onload = pintarFuentes;
    s.onerror = function () {
      fuentesEspera.textContent = "La biblioteca no pudo cargarse.";
    };
    document.head.appendChild(s);
  }
  var invocadorFuentes = null;
  bFuentes.addEventListener("click", function () {
    invocadorFuentes = document.activeElement;
    cargarFuentes();
    fuentesDlg.showModal();
    fuentesCerrar.focus();
  });
  fuentesDlg.addEventListener("close", function () {
    if (invocadorFuentes && invocadorFuentes.focus) { invocadorFuentes.focus(); }
  });
  fuentesDlg.addEventListener("click", function (e) {  // backdrop = cerrar
    if (e.target === fuentesDlg) { fuentesDlg.close(); }
  });

  /* ── 3 · Página de capítulo: posición + «El camino continúa» ───────────── */
  var entidad = document.body.getAttribute("data-entity");
  var actual = null;
  publicados.forEach(function (c, i) { if (c.id === entidad) { actual = { cap: c, i: i }; } });

  if (actual) {
    // Posición en el hero (Camino del mito · Capítulo N)
    var copy = document.querySelector(".hero__copy");
    if (copy) {
      var pos = el("p", "camino-cap", "Camino del mito · Capítulo " + (ROMAN[actual.cap.n - 1] || actual.cap.n));
      copy.insertBefore(pos, copy.firstChild);
    }

    // Bloque siguiente tras el cierre
    var main = document.querySelector("main") || document.body;
    var sig = el("nav", "camino-siguiente");
    sig.setAttribute("aria-label", "Continuar el camino");
    sig.appendChild(el("p", "camino-siguiente__kicker", "El camino continúa"));

    var prox = publicados[actual.i + 1] || null;

    /* UMBRAL DE ENTRADA de acto (mandato 2026-07-11, aditivo y reversible):
       si el próximo capítulo pertenece a OTRO Libro y ese Libro declara
       `umbral` en capitulos.js, se antepone su portada (imagen + numeral +
       título + bajada VERBATIM) — la puerta grande por la que se entra al
       Libro. Sin `umbral` en el acto, nada cambia. */
    if (prox && actual.cap.acto !== prox.acto) {
      var actoProx = null;
      P.actos.forEach(function (a) { if (a.id === prox.acto) { actoProx = a; } });
      if (actoProx && actoProx.umbral && actoProx.umbral.img) {
        var um = el("div", "camino-umbral");
        var pic = document.createElement("picture");
        var srcW = document.createElement("source");
        srcW.srcset = "assets/img/" + actoProx.umbral.img + ".webp";
        srcW.type = "image/webp";
        var img = document.createElement("img");
        img.src = "assets/img/" + actoProx.umbral.img + ".png";
        img.alt = "";
        img.decoding = "async";
        pic.appendChild(srcW); pic.appendChild(img);
        um.appendChild(pic);
        um.appendChild(el("span", "camino-umbral__velo"));
        var umTxt = el("div", "camino-umbral__texto");
        umTxt.appendChild(el("p", "camino-umbral__numeral", actoProx.numeral));
        umTxt.appendChild(el("p", "camino-umbral__titulo", actoProx.titulo));
        if (actoProx.umbral.bajada) {
          umTxt.appendChild(el("p", "camino-umbral__bajada", actoProx.umbral.bajada));
        }
        um.appendChild(umTxt);
        sig.appendChild(um);
      }
    }

    if (prox && prox.puente && prox.puente.texto) {
      var bq = el("blockquote", "camino-siguiente__puente", prox.puente.texto);
      if (prox.puente.fuente) { bq.appendChild(el("footer", "camino-cita", prox.puente.fuente)); }
      sig.appendChild(bq);
    }
    if (prox) {
      sig.appendChild(el("p", "camino-siguiente__prox",
        "Capítulo " + (ROMAN[prox.n - 1] || prox.n) + " · " + prox.nombre));
      if (prox.gancho) { sig.appendChild(el("blockquote", "camino-siguiente__gancho", prox.gancho)); }
      var go = el("a", "camino-btn camino-btn--primario");
      go.href = prox.href;
      go.setAttribute("data-transicion", "");
      go.textContent = "Siguiente capítulo ";
      go.appendChild(plomada());
      sig.appendChild(go);
    } else if (P.fin) {
      sig.appendChild(el("p", "camino-siguiente__prox", P.fin.nombre));
      if (P.fin.frase) { sig.appendChild(el("p", "camino-siguiente__gancho", P.fin.frase)); }
      var fin = el("a", "camino-btn camino-btn--primario");
      fin.href = P.fin.href;
      fin.setAttribute("data-transicion", "");
      fin.textContent = "Descender al lecho ";
      fin.appendChild(plomada());
      sig.appendChild(fin);
    }
    var extra = el("div", "camino-siguiente__extra");
    var todos = el("button", "camino-btn", "Todos los capítulos");
    todos.type = "button";
    todos.addEventListener("click", abrirCarta);
    extra.appendChild(todos);
    var inicio = el("a", "camino-btn", "Inicio del camino");
    inicio.href = "index.html";
    extra.appendChild(inicio);
    sig.appendChild(extra);
    // Gancho previsto de la capa futura (HORIZONTE-RELATO.md). No se construye aún.
    sig.appendChild(el("p", "camino-modo-sellado", "Relato interactivo de este capítulo — próximamente."));
    main.appendChild(sig);
  }

  /* ── 4 · Bruma entre páginas (pausable; reduced-motion = navegación seca) ─ */
  // Entrada: html.bruma-in la puso el script del <head>; CSS la desvanece sola.
  if (html.classList.contains("bruma-in")) {
    try { sessionStorage.removeItem("grimorio:bruma"); } catch (e) {}
    window.setTimeout(function () { html.classList.remove("bruma-in"); }, BRUMA_ENTRADA);
  }
  // Salida: velo que se cierra antes de navegar.
  var bruma = el("div", "bruma");
  bruma.setAttribute("aria-hidden", "true");
  document.body.appendChild(bruma);
  // CRÍTICO: al volver con el botón «atrás» (bfcache) la página se restaura
  // TAL CUAL quedó — con el velo de salida aún activo tapando los clics.
  // pageshow corre en toda carga y restauración: se limpia SIEMPRE.
  window.addEventListener("pageshow", function () {
    html.classList.remove("bruma-in");
    bruma.classList.remove("is-activa");
  });
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-transicion]") : null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) { return; }
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") { return; }
    e.preventDefault();
    if (carta.open) { carta.close(); }
    if (mapa.open) { mapa.close(); }
    if (fuentesDlg.open) { fuentesDlg.close(); }
    try { sessionStorage.setItem("grimorio:bruma", "1"); } catch (er) {}
    if (reduce || paused()) { location.href = href; return; }
    bruma.classList.add("is-activa");
    window.setTimeout(function () { location.href = href; }, BRUMA_SALIDA);
    // Red de seguridad: si algo bloquea la navegación, el velo se levanta solo.
    window.setTimeout(function () { bruma.classList.remove("is-activa"); }, BRUMA_SEGURIDAD);
  });
}());
