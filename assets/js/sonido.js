/* ════════════════════════════════════════════════════════════════════════
   sonido.js — Atmósferas PROCEDURALES por reino (mandato sonido-por-capítulo,
   2026-07). Web Audio puro: cero archivos, cero copyright, sin frameworks.

   Arquitectura:
   · UN AudioContext. Cadena maestra: patch → lowpass de PROFUNDIDAD → master.
   · Cada reino es un PATCH: un grafo de nodos que se CONSTRUYE al entrar al
     capítulo y se DESTRUYE al salir (nunca suenan ocho patches en paralelo).
   · Cambio de capítulo/zona = CROSSFADE (config: crossfadeS, 2–4 s): el patch
     entrante sube de 0 a su nivel; el saliente baja a 0 y se desarma después.
   · El low-pass global ligado a la profundidad del scroll se SUMA por encima
     de cualquier patch (más hondo = todo más apagado).
   · Las recetas viven en RECETAS (perillas nombradas); config.js puede
     sobreescribir cualquier perilla por reino (audio.atmosferas.<reino>).
   · La atmósfera de cada capítulo se declara en capitulos.js (campo
     `atmosfera`); si falta, se deriva de la zona del acto. Data-driven:
     un capítulo nuevo elige atmósfera sin tocar este archivo.

   Reglas conservadas (D-07 + mandato FASE 1):
   · APAGADO por defecto; solo lo enciende el botón «Sonido» (camino.js).
   · Persistencia en localStorage "grimorio:audio"; reanudación por gesto.
   · Jamás autoplay; jamás necesario para entender el contenido.

   SLOT FUTURO (regla 7): cuando exista audio real con derechos (p. ej. el
   acordeón chilote del Caleuche), REEMPLAZA a la capa procedural que lo
   insinúa (en "niebla", la capa `fiesta`), no se le suma.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  window.Grimorio = window.Grimorio || {};
  var G = window.Grimorio;

  var ctx = null;          // AudioContext (se crea recién al encender)
  var master = null;       // ganancia maestra (fades globales)
  var lowpass = null;      // filtro de profundidad (scroll)
  var patch = null;        // el patch VIVO (uno solo a la vez)
  var encendido = false;
  var ruidoBuf = null;

  // Afinables en config.js (FASE 3); estos son los defaults si no existe.
  var CONF = (G.config && G.config.audio) || {};
  var VOL_ATM = CONF.volumen || 0.35;          // nivel de la ATMÓSFERA procedural (bus propio)
  var VOL_MUS = CONF.volumenMusica || 0.62;    // nivel de la MÚSICA (bus propio, bajo la atmósfera)
  var NIVEL_DEF = CONF.volumenMaestroDefault || 0.72;  // slider inicial si no hay preferencia
  var MUS_AJUSTE = CONF.musica || {};          // multiplicador de nivel por pista
  var CAL = CONF.caleuche || {};               // ciclo intermitente del Caleuche
  var FADE = CONF.crossfadeS || 3.0;           // crossfade entre atmósferas (s)
  var LP = CONF.lowpass || {};
  var LP_ARRIBA = LP.arribaHz || 6000;
  var LP_FONDO = LP.fondoHz || 550;
  var LP_CURVA = LP.curva || 1.4;

  // Buses (creados en construirBase) + estado de la capa de música.
  var atmBus = null, musicaBus = null;
  var musEl = null, musSrc = null, musGain = null, musId = null, calTimers = [];
  var nivel = NIVEL_DEF;                        // volumen maestro del usuario [0..1]
  function curva(v) { return v * v; }           // curva perceptual: ganancia = valor²

  /* ── RECETAS por reino: perillas nombradas (ganancias 0–1, Hz, segundos).
     Sobreescribibles una a una desde config.js → audio.atmosferas.<reino>. ── */
  var RECETAS = {
    /* Inicio: mar y viento — olas que van y vienen. */
    superficie:   { olas: 0.50, olasHz: 600, olasVaivenHz: 0.08,
                    viento: 0.35, vientoHz: 420, vientoVaivenHz: 0.05 },
    /* Caleuche: el mismo mar pero lejano, tras la bruma; y cada tanto,
       casi subliminal, la insinuación de una fiesta a bordo. */
    niebla:       { olas: 0.25, olasHz: 400, olasVaivenHz: 0.07,
                    viento: 0.12, vientoHz: 380, vientoVaivenHz: 0.05,
                    fiesta: 0.035, fiestaHz: 98, fiestaVibratoHz: 0.3,
                    fiestaCadaS: 30, fiestaDuraS: 8 },
    /* Pincoya: subacuático — denso, envolvente, con burbujeo escaso. */
    "mar-adentro": { olas: 0.55, olasHz: 300, olasVaivenHz: 0.06,
                    burbuja: 0.12, burbujaCadaS: 8 },
    /* Trauco: nada de mar. El bosque respira, no ruge. */
    bosque:       { hojas: 0.30, hojasHz: 1400, hojasVaivenHz: 0.13,
                    hojasRafagaHz: 0.31, crujido: 0.10, crujidoCadaS: 28 },
    /* Fiura (cuando exista): la espesura, más cerrada y húmeda. */
    espesura:     { hojas: 0.20, hojasHz: 1050, hojasVaivenHz: 0.11,
                    hojasRafagaHz: 0.27, crujido: 0.08, crujidoCadaS: 35,
                    goteo: 0.08, goteoCadaS: 20 },
    /* Invunche: silencio con cuerpo. La ausencia de sonido ES el sonido. */
    cueva:        { drone: 0.05, droneHz: 58, goteo: 0.09, goteoCadaS: 12,
                    eco: 0.35, ecoS: 0.45 },
    /* Camahueto: lluvia, viento racheado y un trueno lejano muy ocasional. */
    tormenta:     { lluvia: 0.16, lluviaHz: 3200,
                    viento: 0.28, vientoHz: 480, rachaHz: 0.30, rachaJitterHz: 0.83,
                    trueno: 0.12, truenoCadaS: 45 },
    /* Lecho: el fondo del mundo — drone gravísimo, pulso lentísimo. */
    abismo:       { drone: 0.06, droneHz: 41, dronePulsoHz: 0.03,
                    ahogoHz: 220, marea: 0.08, mareaHz: 240, mareaVaivenHz: 0.04 }
  };
  // Zona del acto → atmósfera por defecto (si el capítulo no la declara).
  var POR_ZONA = { mar: "mar-adentro", bosque: "bosque", cueva: "cueva",
                   "cerro-rio": "tormenta" };
  // html[data-zona] de la portada → atmósfera.
  var POR_ZONA_PORTADA = { superficie: "superficie", mar: "niebla",
                           bosque: "bosque", abismo: "abismo" };

  function receta(nombre) {
    var base = RECETAS[nombre] || RECETAS.superficie;
    var extra = (CONF.atmosferas && CONF.atmosferas[nombre]) || null;
    if (!extra) { return base; }
    var r = {};
    Object.keys(base).forEach(function (k) { r[k] = base[k]; });
    Object.keys(extra).forEach(function (k) { r[k] = extra[k]; });
    return r;
  }

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ── Atmósfera de esta página ───────────────────────────────────────── */
  function atmosferaDePagina() {
    var entidad = document.body.getAttribute("data-entity");
    if (entidad && G.portada) {
      var cap = null;
      (G.portada.capitulos || []).forEach(function (c) { if (c.id === entidad) { cap = c; } });
      if (cap) {
        if (cap.atmosfera && RECETAS[cap.atmosfera]) { return cap.atmosfera; }
        var acto = null;
        (G.portada.actos || []).forEach(function (a) { if (a.id === cap.acto) { acto = a; } });
        if (acto && POR_ZONA[acto.zona]) { return POR_ZONA[acto.zona]; }
      }
      return "mar-adentro";
    }
    if (document.body.getAttribute("data-camino") === "lecho") { return "abismo"; }
    var z = document.documentElement.getAttribute("data-zona");
    return POR_ZONA_PORTADA[z] || "superficie";
  }

  /* ── Base del contexto ──────────────────────────────────────────────── */
  function construirBase() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = LP_ARRIBA;
    lowpass.Q.value = 0.4;
    lowpass.connect(master); master.connect(ctx.destination);
    // Dos buses bajo el low-pass de profundidad: la atmósfera y, más abajo, la música.
    atmBus = ctx.createGain(); atmBus.gain.value = VOL_ATM; atmBus.connect(lowpass);
    musicaBus = ctx.createGain(); musicaBus.gain.value = VOL_MUS; musicaBus.connect(lowpass);
    var seg = 2, n = ctx.sampleRate * seg;
    ruidoBuf = ctx.createBuffer(1, n, ctx.sampleRate);
    var d = ruidoBuf.getChannelData(0);
    for (var i = 0; i < n; i++) { d[i] = Math.random() * 2 - 1; }
    escucharProfundidad();
  }

  /* ── Utilería de patches ────────────────────────────────────────────── */
  function Patch(nombre) {
    this.nombre = nombre;
    this.bus = ctx.createGain();
    this.bus.gain.value = 0;
    this.bus.connect(atmBus);
    this.timers = [];
    this.vivo = true;
  }
  Patch.prototype.timer = function (fn, medioS) {
    // programa fn de forma recurrente, 0.6x–1.5x alrededor del promedio
    var self = this;
    function paso() {
      if (!self.vivo || !encendido) { return; }
      fn();
      var ms = medioS * 1000 * (0.6 + Math.random() * 0.9);
      self.timers.push(window.setTimeout(paso, ms));
    }
    this.timers.push(window.setTimeout(paso, medioS * 1000 * (0.3 + Math.random() * 0.7)));
  };
  Patch.prototype.destruir = function () {
    this.vivo = false;
    this.timers.forEach(function (t) { window.clearTimeout(t); });
    try { this.bus.disconnect(); } catch (e) {}
  };

  function ruido(p) {
    var src = ctx.createBufferSource();
    src.buffer = ruidoBuf; src.loop = true;
    src.start();
    return src;
  }
  function lfoEn(param, hz, prof) {
    var o = ctx.createOscillator();
    o.frequency.value = hz;
    var g = ctx.createGain();
    g.gain.value = prof;
    o.connect(g); g.connect(param); o.start();
  }
  /* Capa continua: ruido → filtro → ganancia (con vaivén) → bus. */
  function capaRuido(p, tipo, hz, q, nivel, vaivenHz, vaivenProf, extraLfoHz, extraProf) {
    var f = ctx.createBiquadFilter();
    f.type = tipo; f.frequency.value = hz; f.Q.value = q;
    var g = ctx.createGain();
    g.gain.value = nivel;
    ruido(p).connect(f); f.connect(g); g.connect(p.bus);
    if (vaivenHz) { lfoEn(g.gain, vaivenHz, vaivenProf); }
    if (extraLfoHz) { lfoEn(g.gain, extraLfoHz, extraProf); }
    return { filtro: f, gain: g };
  }
  /* Evento corto de ruido filtrado (crujido, trueno, burbuja). */
  function rafaga(p, destino, tipo, hz, q, nivel, ataqueS, caidaS) {
    var t = ctx.currentTime;
    var src = ctx.createBufferSource();
    src.buffer = ruidoBuf;
    var f = ctx.createBiquadFilter();
    f.type = tipo; f.frequency.value = hz; f.Q.value = q;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(nivel, 0.0002), t + ataqueS);
    g.gain.exponentialRampToValueAtTime(0.0001, t + ataqueS + caidaS);
    src.connect(f); f.connect(g); g.connect(destino);
    src.start(t); src.stop(t + ataqueS + caidaS + 0.1);
  }
  /* Ping senoidal corto (goteo). */
  function ping(p, destino, hz, nivel, caidaS) {
    var t = ctx.currentTime;
    var o = ctx.createOscillator();
    o.type = "sine"; o.frequency.value = hz;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(nivel, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + caidaS);
    o.connect(g); g.connect(destino);
    o.start(t); o.stop(t + caidaS + 0.1);
  }
  function droneDoble(p, hz, nivel, batidoHz) {
    var g = ctx.createGain();
    g.gain.value = nivel;
    [hz, hz + (batidoHz || 0.6)].forEach(function (f) {
      var o = ctx.createOscillator();
      o.type = "sine"; o.frequency.value = f;
      var og = ctx.createGain(); og.gain.value = 0.5;
      o.connect(og); og.connect(g); o.start();
    });
    g.connect(p.bus);
    return g;
  }

  /* ── Los ocho patches ───────────────────────────────────────────────── */
  var PATCHES = {
    superficie: function (p, r) {
      capaRuido(p, "lowpass", r.olasHz, 0.6, r.olas, r.olasVaivenHz, r.olas * 0.35);
      capaRuido(p, "bandpass", r.vientoHz, 0.5, r.viento, r.vientoVaivenHz, r.viento * 0.3);
    },
    niebla: function (p, r) {
      capaRuido(p, "lowpass", r.olasHz, 0.6, r.olas, r.olasVaivenHz, r.olas * 0.35);
      capaRuido(p, "bandpass", r.vientoHz, 0.5, r.viento, r.vientoVaivenHz, r.viento * 0.3);
      // La fiesta lejana del buque: un solo tono grave con vibrato lento que
      // se insinúa y se va. SLOT del futuro audio real (lo reemplazará).
      var o = ctx.createOscillator();
      o.type = "sine"; o.frequency.value = r.fiestaHz;
      lfoEn(o.frequency, r.fiestaVibratoHz, 3);
      var g = ctx.createGain(); g.gain.value = 0.0001;
      o.connect(g); g.connect(p.bus); o.start();
      p.timer(function () {
        var t = ctx.currentTime, dura = r.fiestaDuraS * (0.7 + Math.random() * 0.6);
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(r.fiesta, t + dura * 0.4);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dura);
      }, r.fiestaCadaS);
    },
    "mar-adentro": function (p, r) {
      capaRuido(p, "lowpass", r.olasHz, 0.7, r.olas, r.olasVaivenHz, r.olas * 0.3);
      p.timer(function () {
        rafaga(p, p.bus, "bandpass", 700 + Math.random() * 700, 6,
               r.burbuja, 0.03, 0.12 + Math.random() * 0.25);
      }, r.burbujaCadaS);
    },
    bosque: function (p, r) {
      var hojas = capaRuido(p, "bandpass", r.hojasHz, 0.8, r.hojas,
                            r.hojasVaivenHz, r.hojas * 0.4, r.hojasRafagaHz, r.hojas * 0.25);
      lfoEn(hojas.filtro.frequency, 0.07, 350);   // el follaje se mueve (800–2500 aprox)
      p.timer(function () {
        rafaga(p, p.bus, "lowpass", 300, 1.2, r.crujido, 0.015, 0.05 + Math.random() * 0.05);
      }, r.crujidoCadaS);
    },
    espesura: function (p, r) {
      var hojas = capaRuido(p, "bandpass", r.hojasHz, 0.8, r.hojas,
                            r.hojasVaivenHz, r.hojas * 0.4, r.hojasRafagaHz, r.hojas * 0.25);
      lfoEn(hojas.filtro.frequency, 0.06, 260);
      p.timer(function () {
        rafaga(p, p.bus, "lowpass", 280, 1.2, r.crujido, 0.015, 0.06);
      }, r.crujidoCadaS);
      p.timer(function () {
        ping(p, p.bus, 600 + Math.random() * 300, r.goteo, 0.25);
      }, r.goteoCadaS);
    },
    cueva: function (p, r) {
      droneDoble(p, r.droneHz, r.drone, 0.7);
      // Eco barato: delay con retroalimentación filtrada, solo para el goteo.
      var eco = ctx.createDelay(1.0);
      eco.delayTime.value = r.ecoS;
      var fb = ctx.createGain(); fb.gain.value = r.eco;
      var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1500;
      eco.connect(lp); lp.connect(fb); fb.connect(eco);
      eco.connect(p.bus);
      p.timer(function () {
        var entrada = ctx.createGain(); entrada.gain.value = 1;
        entrada.connect(p.bus); entrada.connect(eco);
        ping(p, entrada, 800 + Math.random() * 500, r.goteo, 0.2);
      }, r.goteoCadaS);
    },
    tormenta: function (p, r) {
      capaRuido(p, "bandpass", r.lluviaHz, 0.35, r.lluvia, 0.2, r.lluvia * 0.15);
      capaRuido(p, "bandpass", r.vientoHz, 0.6, r.viento,
                r.rachaHz, r.viento * 0.55, r.rachaJitterHz, r.viento * 0.25);
      p.timer(function () {
        rafaga(p, p.bus, "lowpass", 120, 0.8, r.trueno, 0.15, 3 + Math.random() * 3);
      }, r.truenoCadaS);
    },
    abismo: function (p, r) {
      var d = droneDoble(p, r.droneHz, r.drone, 0.4);
      lfoEn(d.gain, r.dronePulsoHz, r.drone * 0.5);   // pulso lentísimo
      capaRuido(p, "lowpass", r.mareaHz, 0.8, r.marea, r.mareaVaivenHz, r.marea * 0.4);
    }
  };

  /* ── Cambio de atmósfera con crossfade ──────────────────────────────── */
  function activarAtmosfera(nombre) {
    if (!ctx) { return; }
    if (patch && patch.nombre === nombre && patch.vivo) { return; }
    var t = ctx.currentTime;
    var saliente = patch;
    if (saliente) {
      saliente.bus.gain.setTargetAtTime(0, t, FADE / 3);
      window.setTimeout(function () { saliente.destruir(); }, FADE * 2500);
    }
    patch = new Patch(nombre);
    PATCHES[nombre](patch, receta(nombre));
    patch.bus.gain.setTargetAtTime(1, t, FADE / 3);   // el crossfade entrante
  }

  /* ── Low-pass con la profundidad del descenso ───────────────────────── */
  var tick = false;
  function profundidad() {
    tick = false;
    if (!ctx || !encendido) { return; }
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var pr = Math.min(1, Math.max(0, window.scrollY / max));
    var hz = LP_ARRIBA - Math.pow(pr, LP_CURVA) * (LP_ARRIBA - LP_FONDO);
    lowpass.frequency.setTargetAtTime(hz, ctx.currentTime, 0.25);
  }
  function escucharProfundidad() {
    window.addEventListener("scroll", function () {
      if (!tick) { tick = true; window.requestAnimationFrame(profundidad); }
    }, { passive: true });
  }

  /* ── Música por capítulo: capa por DEBAJO de la atmósfera ─────────────
     <audio> en streaming (memoria acotada, ideal móvil) ruteado por Web Audio.
     El Caleuche es INTERMITENTE y suena «a lo lejos» (low-pass + eco). ───── */
  var puedeOgg = null;
  function formatoMusica() {
    if (puedeOgg === null) {
      var a = document.createElement("audio");
      puedeOgg = !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"'));
    }
    return puedeOgg ? "ogg" : "mp3";
  }
  function urlMusica(id) { return "assets/audio/musica-" + id + "." + formatoMusica(); }
  function ajuste(id) { var a = MUS_AJUSTE[id]; return (typeof a === "number") ? a : 1; }

  function musicaDePagina() {
    var ent = document.body.getAttribute("data-entity");
    if (ent && G.portada) {
      var cap = null;
      (G.portada.capitulos || []).forEach(function (c) { if (c.id === ent) { cap = c; } });
      return (cap && cap.musica) || null;
    }
    if (document.body.getAttribute("data-camino") === "inicio" && G.portada) {
      return G.portada.musicaInicio || null;
    }
    return null;   // lecho, sitio viejo… = solo atmósfera, sin error
  }
  function proximaMusica() {   // la del capítulo siguiente (para prefetch)
    var ent = document.body.getAttribute("data-entity");
    if (!ent || !G.portada) { return null; }
    var pub = (G.portada.capitulos || []).filter(function (c) { return c.estado === "publicado"; })
                .sort(function (a, b) { return a.n - b.n; });
    for (var i = 0; i < pub.length; i++) {
      if (pub[i].id === ent) { return (pub[i + 1] && pub[i + 1].musica) || null; }
    }
    return null;
  }
  function reproducir() {
    if (!musEl) { return; }
    var p = musEl.play();
    if (p && p.catch) { p.catch(function () {}); }   // el gesto ya lo retoma reanudarConGesto
  }
  function destruirMusica() {
    calTimers.forEach(function (t) { window.clearTimeout(t); });
    calTimers = [];
    if (musEl) { try { musEl.pause(); } catch (e) {} }
    if (musSrc) { try { musSrc.disconnect(); } catch (e) {} }
    if (musGain) { try { musGain.disconnect(); } catch (e) {} }
    musEl = musSrc = musGain = null; musId = null;
  }
  function prefetchProxima() {
    var prox = proximaMusica();
    if (!prox || document.querySelector('link[data-mus="' + prox + '"]')) { return; }
    var l = document.createElement("link");
    l.rel = "prefetch"; l.href = urlMusica(prox);
    l.setAttribute("as", "audio"); l.setAttribute("data-mus", prox);
    document.head.appendChild(l);
  }
  function cicloCaleuche() {   // aparece 4–6s · suena 40–60s · se va · calla 30–50s · vuelve
    if (!encendido || musId !== "caleuche" || !musGain || !ctx) { return; }
    var t = ctx.currentTime;
    var fi = CAL.fadeInS || 5, fo = CAL.fadeOutS || 6;
    var son = (CAL.sonarMinS || 40) + Math.random() * ((CAL.sonarMaxS || 60) - (CAL.sonarMinS || 40));
    var sil = (CAL.silencioMinS || 30) + Math.random() * ((CAL.silencioMaxS || 50) - (CAL.silencioMinS || 30));
    var pico = Math.max(0.02, ajuste("caleuche"));
    musGain.gain.cancelScheduledValues(t);
    musGain.gain.setValueAtTime(Math.max(0.0001, musGain.gain.value), t);
    musGain.gain.exponentialRampToValueAtTime(pico, t + fi);                // emerge entre la niebla
    musGain.gain.setValueAtTime(pico, t + fi + son);
    musGain.gain.exponentialRampToValueAtTime(0.0001, t + fi + son + fo);   // y se aleja
    calTimers.push(window.setTimeout(cicloCaleuche, (fi + son + fo + sil) * 1000));
  }
  function cargarMusica(id) {
    if (!ctx || id === musId) { return; }
    destruirMusica();
    if (!id) { return; }
    musId = id;
    musEl = new Audio();
    musEl.src = urlMusica(id);
    musEl.loop = true; musEl.preload = "auto";
    musSrc = ctx.createMediaElementSource(musEl);
    musGain = ctx.createGain(); musGain.gain.value = 0.0001;
    if (id === "caleuche") {
      var dist = ctx.createBiquadFilter(); dist.type = "lowpass";
      dist.frequency.value = CAL.distanciaHz || 1200; dist.Q.value = 0.6;
      var delay = ctx.createDelay(0.6); delay.delayTime.value = CAL.reverbS || 0.16;
      var fb = ctx.createGain(); fb.gain.value = CAL.reverb || 0.32;
      var wet = ctx.createBiquadFilter(); wet.type = "lowpass"; wet.frequency.value = 1400;
      musSrc.connect(dist);
      dist.connect(musGain);                                                    // seco (ya lejano)
      dist.connect(delay); delay.connect(wet); wet.connect(fb); fb.connect(delay); wet.connect(musGain);  // eco
      musGain.connect(musicaBus);
      calTimers.push(window.setTimeout(cicloCaleuche, 1500 + Math.random() * 2500));  // 1ª aparición
    } else {
      musSrc.connect(musGain); musGain.connect(musicaBus);
      var t = ctx.currentTime;
      musGain.gain.setValueAtTime(0.0001, t);
      musGain.gain.exponentialRampToValueAtTime(Math.max(0.02, ajuste(id)), t + 2.4);  // fade-in suave
    }
    reproducir();
    prefetchProxima();
  }
  function setVolumen(v) {
    v = Math.min(1, Math.max(0, Number(v) || 0));
    nivel = v;
    store("grimorio:volumen", String(v));
    if (ctx && encendido) { master.gain.setTargetAtTime(curva(v), ctx.currentTime, 0.08); }
  }

  /* ── Encendido / apagado ────────────────────────────────────────────── */
  function reanudarConGesto() {
    function unaVez() {
      document.removeEventListener("pointerdown", unaVez);
      document.removeEventListener("keydown", unaVez);
      if (ctx && encendido) { ctx.resume(); reproducir(); }
    }
    document.addEventListener("pointerdown", unaVez, { once: true });
    document.addEventListener("keydown", unaVez, { once: true });
  }

  function set(on) {
    encendido = !!on;
    store("grimorio:audio", on ? "on" : "off");
    if (on) {
      if (!ctx) { construirBase(); }
      if (ctx.state === "suspended") {
        ctx.resume().then(null, function () {});
        window.setTimeout(function () {
          if (ctx.state === "suspended") { reanudarConGesto(); }
        }, 120);
      }
      activarAtmosfera(atmosferaDePagina());
      cargarMusica(musicaDePagina());
      master.gain.setTargetAtTime(curva(nivel), ctx.currentTime, FADE / 2);  // fade-in (volumen del usuario)
      profundidad();
    } else if (ctx) {
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);        // fade-out: apaga TODO (atmósfera + música)
      if (patch) {
        var viejo = patch;
        window.setTimeout(function () { viejo.destruir(); }, 900);
        patch = null;
      }
      window.setTimeout(destruirMusica, 900);
    }
  }

  /* ── La portada cambia de zona al descender (html[data-zona]) ───────── */
  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (encendido && !document.body.getAttribute("data-entity") &&
          document.body.getAttribute("data-camino") !== "lecho") {
        var z = document.documentElement.getAttribute("data-zona");
        var atm = POR_ZONA_PORTADA[z];
        if (atm && patch && atm !== patch.nombre) { activarAtmosfera(atm); }
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-zona"] });
  }

  /* ── Crossfade de salida con la bruma (y regreso por bfcache) ───────── */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-transicion]") : null;
    if (a && encendido && ctx) { master.gain.setTargetAtTime(0, ctx.currentTime, 0.14); }
  });
  window.addEventListener("pageshow", function () {
    if (encendido && ctx) {
      if (ctx.state === "suspended") { ctx.resume().then(null, function () {}); }
      activarAtmosfera(atmosferaDePagina());   // por si el bfcache trae otra página
      cargarMusica(musicaDePagina());          // música de la página restaurada
      reproducir();                            // el <audio> quedó en pausa al salir
      master.gain.setTargetAtTime(curva(nivel), ctx.currentTime, FADE / 2);
    }
  });
  window.addEventListener("pagehide", function () {
    if (musEl) { try { musEl.pause(); } catch (e) {} }
    if (ctx && ctx.state === "running") { try { ctx.suspend(); } catch (e) {} }
  });

  var analizador = null;
  G.sonido = {
    set: set,
    activo: function () { return encendido; },
    volumen: setVolumen,                          // slider maestro (curva perceptual)
    volumenActual: function () { return nivel; },
    estado: function () {   // para QA/diagnóstico en consola
      return { contexto: ctx ? ctx.state : "sin-contexto",
               atmosfera: patch ? patch.nombre : null,
               musica: musId,
               musNivel: musGain ? +musGain.gain.value.toFixed(3) : null,
               musSonando: musEl ? !musEl.paused : null,
               volumen: nivel,
               lowpassHz: lowpass ? Math.round(lowpass.frequency.value) : null };
    },
    analizar: function () { // para QA: energía por bandas de la salida real
      if (!ctx || !master) { return null; }
      if (!analizador) {
        analizador = ctx.createAnalyser();
        analizador.fftSize = 2048;
        master.connect(analizador);
      }
      var datos = new Uint8Array(analizador.frequencyBinCount);
      analizador.getByteFrequencyData(datos);
      var hzBin = ctx.sampleRate / analizador.fftSize;
      function banda(a, b) {
        var i0 = Math.floor(a / hzBin), i1 = Math.min(datos.length, Math.ceil(b / hzBin));
        var s = 0;
        for (var i = i0; i < i1; i++) { s += datos[i]; }
        return Math.round(s / Math.max(1, i1 - i0));
      }
      return { grave: banda(20, 200), medio: banda(200, 1200), agudo: banda(1200, 6000) };
    }
  };

  /* Volumen del usuario guardado (separado del on/off). */
  (function () {
    var v = read("grimorio:volumen");
    var f = v === null ? NaN : parseFloat(v);
    if (!isNaN(f)) { nivel = Math.min(1, Math.max(0, f)); }
  }());

  /* Persistencia: si el visitante dejó el sonido encendido, se retoma
     (con gesto del navegador si hace falta). Jamás se enciende solo. */
  if (read("grimorio:audio") === "on") { set(true); }
}());
