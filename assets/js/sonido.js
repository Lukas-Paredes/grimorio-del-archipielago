/* ════════════════════════════════════════════════════════════════════════
   sonido.js — Audio ambiente PROCEDURAL del camino del mito (FASE 1,
   mandato 2026-07). Sin archivos de audio, sin frameworks: Web Audio API.

   Principios (D-07 + mandato):
   · APAGADO por defecto. Solo lo enciende el botón «Sonido» de la botonera
     (camino.js llama a window.Grimorio.sonido.set). Nunca autoplay.
   · Persistencia en localStorage "grimorio:audio". Si quedó "on" de otra
     página, se intenta reanudar; si el navegador exige gesto, se reanuda
     con el primer clic/tecla (una sola vez).
   · Cada página tiene su MEZCLA por zona (mar, bosque, cueva, cerro-rio,
     superficie, abismo, lecho): capas de ruido filtrado y drones, con
     CROSSFADE suave entre mezclas (setTargetAtTime).
   · LOW-PASS maestro ligado a la profundidad del scroll: en la superficie
     el sonido es claro; al descender se ahoga, como bajo el agua.
   · Al navegar con transición de bruma, el sonido se desvanece (fade-out)
     antes de partir; la página siguiente vuelve a entrar en fade-in.
   Todo es contenido ambiental sin información cultural: no requiere
   alternativa textual (no hay habla ni datos, solo atmósfera).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  window.Grimorio = window.Grimorio || {};
  var G = window.Grimorio;

  var ctx = null;          // AudioContext (se crea recién al encender)
  var master = null;       // ganancia maestra (fades globales)
  var lowpass = null;      // filtro de profundidad
  var capas = {};          // nombre -> { gain, base } (base = nivel de mezcla)
  var encendido = false;
  var zonaActual = null;
  var goteoTimer = null;

  var VOL = 0.35;          // volumen maestro: presencia discreta, museo nocturno
  var FADE = 1.6;          // crossfade entre mezclas (s)

  /* Mezclas por zona: nivel 0..1 de cada capa. */
  var MEZCLAS = {
    superficie:  { viento: 0.50, agua: 0.35, drone: 0.00, hojas: 0.00, rio: 0.00, goteo: 0 },
    mar:         { viento: 0.20, agua: 0.50, drone: 0.28, hojas: 0.00, rio: 0.00, goteo: 0 },
    bosque:      { viento: 0.30, agua: 0.08, drone: 0.14, hojas: 0.45, rio: 0.00, goteo: 0 },
    cueva:       { viento: 0.00, agua: 0.05, drone: 0.50, hojas: 0.00, rio: 0.00, goteo: 1 },
    "cerro-rio": { viento: 0.25, agua: 0.10, drone: 0.10, hojas: 0.10, rio: 0.55, goteo: 0 },
    abismo:      { viento: 0.00, agua: 0.18, drone: 0.55, hojas: 0.00, rio: 0.00, goteo: 0 },
    lecho:       { viento: 0.00, agua: 0.15, drone: 0.60, hojas: 0.00, rio: 0.00, goteo: 0 }
  };

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ── Zona de esta página ────────────────────────────────────────────── */
  function zonaDePagina() {
    var entidad = document.body.getAttribute("data-entity");
    if (entidad && G.portada) {
      var cap = null;
      (G.portada.capitulos || []).forEach(function (c) { if (c.id === entidad) { cap = c; } });
      if (cap) {
        var acto = null;
        (G.portada.actos || []).forEach(function (a) { if (a.id === cap.acto) { acto = a; } });
        if (acto && acto.zona && MEZCLAS[acto.zona]) { return acto.zona; }
      }
      return "mar";
    }
    if (document.body.getAttribute("data-camino") === "lecho") { return "lecho"; }
    // Portada-descenso: la zona viva la marca html[data-zona] (portada.js).
    var z = document.documentElement.getAttribute("data-zona");
    return (z && MEZCLAS[z]) ? z : "superficie";
  }

  /* ── Construcción del grafo (una sola vez, al encender) ─────────────── */
  function ruidoBuffer(c) {
    var seg = 2, n = c.sampleRate * seg;
    var buf = c.createBuffer(1, n, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) { d[i] = Math.random() * 2 - 1; }
    return buf;
  }

  function capaRuido(buf, tipoFiltro, freq, q, lfoHz, lfoProf) {
    var src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    var f = ctx.createBiquadFilter();
    f.type = tipoFiltro; f.frequency.value = freq; f.Q.value = q;
    var g = ctx.createGain();
    g.gain.value = 0;
    src.connect(f); f.connect(g); g.connect(lowpass);
    // LFO de amplitud: respiración lenta de la capa (olas, ráfagas).
    if (lfoHz) {
      var lfo = ctx.createOscillator();
      lfo.frequency.value = lfoHz;
      var prof = ctx.createGain();
      prof.gain.value = lfoProf;         // ±prof alrededor del nivel base
      lfo.connect(prof); prof.connect(g.gain);
      lfo.start();
    }
    src.start();
    return { gain: g, base: 1 };
  }

  function construir() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 6000;
    lowpass.Q.value = 0.4;
    lowpass.connect(master); master.connect(ctx.destination);

    var buf = ruidoBuffer(ctx);
    capas.agua   = capaRuido(buf, "lowpass",  700, 0.6, 0.08, 0.16);  // mar de fondo
    capas.viento = capaRuido(buf, "bandpass", 420, 0.5, 0.05, 0.10);  // viento ancho
    capas.hojas  = capaRuido(buf, "highpass", 1800, 0.7, 0.35, 0.10); // follaje
    capas.rio    = capaRuido(buf, "bandpass", 1200, 0.8, 0.60, 0.08); // agua que corre

    // Drone abisal: dos ondas graves apenas desafinadas (batido lento).
    var dg = ctx.createGain(); dg.gain.value = 0; dg.connect(lowpass);
    [55, 55.6].forEach(function (hz) {
      var o = ctx.createOscillator();
      o.type = "sine"; o.frequency.value = hz;
      var og = ctx.createGain(); og.gain.value = 0.5;
      o.connect(og); og.connect(dg); o.start();
    });
    capas.drone = { gain: dg, base: 1 };

    escucharProfundidad();
  }

  /* ── Goteo de cueva: pings escasos, agenda propia ───────────────────── */
  function goteo() {
    if (!encendido || !ctx || zonaActual !== "cueva") { goteoTimer = null; return; }
    var t = ctx.currentTime;
    var o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = 850 + Math.random() * 550;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g); g.connect(lowpass);
    o.start(t); o.stop(t + 0.3);
    goteoTimer = window.setTimeout(goteo, 900 + Math.random() * 3200);
  }

  /* ── Mezcla por zona con crossfade ──────────────────────────────────── */
  function aplicarMezcla(zona) {
    if (!ctx) { return; }
    zonaActual = zona;
    var mezcla = MEZCLAS[zona] || MEZCLAS.mar;
    var t = ctx.currentTime;
    Object.keys(capas).forEach(function (k) {
      var nivel = (mezcla[k] || 0) * (k === "drone" ? 0.28 : 0.5);
      capas[k].gain.gain.setTargetAtTime(nivel, t, FADE / 3);
    });
    if (mezcla.goteo && !goteoTimer) { goteoTimer = window.setTimeout(goteo, 800); }
  }

  /* ── Low-pass con la profundidad del descenso ───────────────────────── */
  var tick = false;
  function profundidad() {
    tick = false;
    if (!ctx || !encendido) { return; }
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var p = Math.min(1, Math.max(0, window.scrollY / max));   // 0 arriba → 1 abajo
    // Claridad en superficie (6 kHz) → ahogado en el fondo (550 Hz).
    var hz = 6000 - Math.pow(p, 1.4) * 5450;
    lowpass.frequency.setTargetAtTime(hz, ctx.currentTime, 0.25);
  }
  function escucharProfundidad() {
    window.addEventListener("scroll", function () {
      if (!tick) { tick = true; window.requestAnimationFrame(profundidad); }
    }, { passive: true });
  }

  /* ── Encendido / apagado ────────────────────────────────────────────── */
  function reanudarConGesto() {
    function unaVez() {
      document.removeEventListener("pointerdown", unaVez);
      document.removeEventListener("keydown", unaVez);
      if (ctx && encendido) { ctx.resume(); }
    }
    document.addEventListener("pointerdown", unaVez, { once: true });
    document.addEventListener("keydown", unaVez, { once: true });
  }

  function set(on) {
    encendido = !!on;
    store("grimorio:audio", on ? "on" : "off");
    if (on) {
      if (!ctx) { construir(); }
      if (ctx.state === "suspended") {
        ctx.resume().then(null, function () {});
        window.setTimeout(function () {
          if (ctx.state === "suspended") { reanudarConGesto(); }
        }, 120);
      }
      aplicarMezcla(zonaDePagina());
      master.gain.setTargetAtTime(VOL, ctx.currentTime, FADE / 2);  // fade-in
      profundidad();
    } else if (ctx) {
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);        // fade-out
      if (goteoTimer) { window.clearTimeout(goteoTimer); goteoTimer = null; }
    }
  }

  /* ── La portada cambia de zona al descender (html[data-zona]) ───────── */
  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (encendido && !document.body.getAttribute("data-entity")) {
        var z = document.documentElement.getAttribute("data-zona");
        if (z && MEZCLAS[z] && z !== zonaActual) { aplicarMezcla(z); }
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
      master.gain.setTargetAtTime(VOL, ctx.currentTime, FADE / 2);
    }
  });
  window.addEventListener("pagehide", function () {
    if (ctx && ctx.state === "running") { try { ctx.suspend(); } catch (e) {} }
  });

  G.sonido = {
    set: set,
    activo: function () { return encendido; },
    estado: function () {   // para QA/diagnóstico en consola
      return { contexto: ctx ? ctx.state : "sin-contexto", zona: zonaActual,
               lowpassHz: lowpass ? Math.round(lowpass.frequency.value) : null };
    }
  };

  /* Persistencia: si el visitante dejó el sonido encendido, se retoma
     (con gesto del navegador si hace falta). Jamás se enciende solo. */
  if (read("grimorio:audio") === "on") { set(true); }
}());
