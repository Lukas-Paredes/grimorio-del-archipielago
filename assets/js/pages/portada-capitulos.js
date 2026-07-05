/* ════════════════════════════════════════════════════════════════════════
   portada-capitulos.js — El UMBRAL del camino en la página de inicio.
   Renderiza dentro de #umbral-capitulo SOLO el primer capítulo publicado del
   camino (window.Grimorio.portada, orden por `n`): kicker del Libro (verbatim)
   + tarjeta-placa + ventana clickeable + botón grande de entrada.
   Si el orden del camino cambia en capitulos.js, el umbral cambia solo.
   Sin frameworks ni módulos ES. Corre antes que camino.js/portada.js (defer).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var P = (window.Grimorio || {}).portada;
  var host = document.getElementById("umbral-capitulo");
  if (!P || !host) { return; }

  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  var pub = P.capitulos.filter(function (c) { return c.estado === "publicado"; })
                       .sort(function (a, b) { return a.n - b.n; });
  var cap = pub[0];
  if (!cap) { return; }
  var acto = null;
  P.actos.forEach(function (a) { if (a.id === cap.acto) { acto = a; } });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }
  function setVars(node, map) {
    for (var k in map) { if (map[k] != null) { node.style.setProperty(k, map[k]); } }
  }

  // Fondo del umbral: la imagen del capítulo (lazy no: es la segunda pantalla).
  var bg = el("div", "capa__bg capa__bg--img");
  bg.setAttribute("data-parallax", "0.14");
  bg.setAttribute("aria-hidden", "true");
  var pic = document.createElement("picture");
  var srcW = document.createElement("source");
  srcW.srcset = "assets/img/" + cap.img + ".webp";
  srcW.type = "image/webp";
  var img = document.createElement("img");
  img.className = "capa__img";
  img.src = "assets/img/" + cap.img + ".png";
  img.decoding = "async";
  img.alt = "";
  pic.appendChild(srcW); pic.appendChild(img);
  bg.appendChild(pic);
  host.appendChild(bg);

  var veil = el("div", "capa__veil");
  veil.setAttribute("aria-hidden", "true");
  host.appendChild(veil);

  if (cap.brillo) {
    var br = el("span", "brillo brillo--" + (cap.brillo.tipo || "latido"));
    br.setAttribute("aria-hidden", "true");
    setVars(br, { "--brillo-x": cap.brillo.x, "--brillo-y": cap.brillo.y,
                  "--brillo-rx": cap.brillo.rx, "--brillo-ry": cap.brillo.ry,
                  "--brillo-a": cap.brillo.a });
    host.appendChild(br);
  }

  var fog = el("div", "fog");
  fog.setAttribute("aria-hidden", "true");
  fog.appendChild(el("span")); fog.appendChild(el("span"));
  host.appendChild(fog);

  if (cap.ventana) {
    var win = el("a", "ventana");
    win.href = cap.href;
    win.setAttribute("data-transicion", "");
    win.setAttribute("aria-label", cap.verbo + " " + cap.nombre);
    setVars(win, { "--v-left": cap.ventana.left, "--v-top": cap.ventana.top,
                   "--v-w": cap.ventana.w, "--v-h": cap.ventana.h });
    if (cap.ventanaMovil) {
      setVars(win, { "--vm-left": cap.ventanaMovil.left, "--vm-top": cap.ventanaMovil.top,
                     "--vm-w": cap.ventanaMovil.w, "--vm-h": cap.ventanaMovil.h });
    }
    host.appendChild(win);
  }

  var content = el("div", "capa__content reveal");
  if (acto) {
    var kicker = el("p", "umbral__libro", acto.numeral + " · " + acto.titulo);
    content.appendChild(kicker);
  }
  var card = el("article", "trailer");
  ["tl", "tr", "bl", "br"].forEach(function (p) {
    var r = el("span", "rivet " + p);
    r.setAttribute("aria-hidden", "true");
    card.appendChild(r);
  });
  var panel = el("div", "trailer__panel");
  panel.appendChild(el("p", "cap-num", "Aquí empieza el camino · Capítulo " + (ROMAN[cap.n - 1] || cap.n)));
  var h2 = el("h2", null, cap.nombre);
  h2.id = "umbral-nombre";
  panel.appendChild(h2);
  if (cap.alias) { panel.appendChild(el("p", "alias", cap.alias)); }
  if (cap.gancho) { panel.appendChild(el("blockquote", "gancho", cap.gancho)); }
  if (cap.tags && cap.tags.length) {
    var ul = el("ul", "tags");
    cap.tags.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    panel.appendChild(ul);
  }
  if (cap.teaser) { panel.appendChild(el("p", "teaser", cap.teaser)); }
  var cta = el("a", "cta cta--grande");
  cta.href = cap.href;
  cta.setAttribute("data-transicion", "");
  cta.appendChild(document.createTextNode(cap.verbo + " "));
  // Plomada de sonda (cosecha 2026-07-05) en lugar del ▼ genérico.
  var chev = document.createElement("img");
  chev.className = "cta__plomada";
  chev.src = "assets/img/indicador-plomada.png";
  chev.alt = "";
  chev.width = 19; chev.height = 48;
  chev.setAttribute("aria-hidden", "true");
  cta.appendChild(chev);
  panel.appendChild(cta);
  card.appendChild(panel);
  content.appendChild(card);
  host.appendChild(content);
  host.setAttribute("aria-labelledby", "umbral-nombre");
}());
