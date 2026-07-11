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

  var cerrar = el("button", "camino-btn carta__cerrar");
  cerrar.type = "button";
  cerrar.innerHTML = '<span aria-hidden="true">✕</span> Cerrar';
  cerrar.addEventListener("click", function () { carta.close(); });
  carta.appendChild(cerrar);

  carta.appendChild(el("h2", "carta__titulo", "El camino del mito"));

  P.actos.forEach(function (acto) {
    var caps = P.capitulos.filter(function (c) { return c.acto === acto.id; });
    if (!caps.length) { return; }
    var g = el("section", "carta__grupo");
    g.appendChild(el("h3", "carta__acto", acto.numeral + " · " + acto.titulo));
    var grid = el("div", "carta__grid");
    caps.forEach(function (cap) {
      if (cap.estado === "publicado") {
        var a = el("a", "carta__placa");
        a.href = cap.href;
        a.setAttribute("data-transicion", "");
        a.appendChild(el("span", "carta__num", "Capítulo " + (ROMAN[cap.n - 1] || cap.n)));
        a.appendChild(el("strong", "carta__nombre", cap.nombre));
        a.appendChild(el("span", "carta__estado", "leer capítulo"));
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
    try { sessionStorage.setItem("grimorio:bruma", "1"); } catch (er) {}
    if (reduce || paused()) { location.href = href; return; }
    bruma.classList.add("is-activa");
    window.setTimeout(function () { location.href = href; }, BRUMA_SALIDA);
    // Red de seguridad: si algo bloquea la navegación, el velo se levanta solo.
    window.setTimeout(function () { bruma.classList.remove("is-activa"); }, BRUMA_SEGURIDAD);
  });
}());
