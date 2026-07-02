/* ════════════════════════════════════════════════════════════════════════
   portada-capitulos.js — Render data-driven del descenso (F1).
   Lee window.Grimorio.portada (assets/js/data/capitulos.js) y monta, entre
   la Superficie y la Columna, la secuencia actos→capítulos: separador de
   acto, módulo-capítulo publicado (fondo <img> lazy + tarjeta-placa +
   ventana clickeable) y placas selladas. También genera los nodos de la
   sonda (Superficie + capítulos publicados + Abismo).
   Superficie, Columna y Lecho quedan estáticos en el HTML.
   Sin frameworks, sin módulos ES; corre antes que portada.js (defer, orden).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var P = (window.Grimorio || {}).portada;
  var host = document.getElementById("descenso-capitulos");
  if (!P || !host) { return; }

  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }
  function setVars(node, map) {
    for (var k in map) { if (map[k] != null) { node.style.setProperty(k, map[k]); } }
  }

  /* ── Módulo-capítulo publicado (generaliza el tráiler del Caleuche) ────── */
  function buildCapitulo(cap, zona) {
    var sec = el("section", "capa capa--capitulo" + (cap.n % 2 === 0 ? " capa--par" : ""));
    sec.id = cap.id;
    sec.setAttribute("data-zona", zona);
    sec.setAttribute("aria-labelledby", "cap-" + cap.id + "-nombre");

    // Fondo: <img> lazy (mejor que background: lazy nativo + prioridad controlable)
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
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = "";
    pic.appendChild(srcW);
    pic.appendChild(img);
    bg.appendChild(pic);
    sec.appendChild(bg);

    var veil = el("div", "capa__veil");
    veil.setAttribute("aria-hidden", "true");
    sec.appendChild(veil);

    // Luz que respira a lo lejos (F2): bajo la niebla, pausable
    if (cap.brillo) {
      var br = el("span", "brillo brillo--" + (cap.brillo.tipo || "latido"));
      br.setAttribute("aria-hidden", "true");
      setVars(br, {
        "--brillo-x": cap.brillo.x, "--brillo-y": cap.brillo.y,
        "--brillo-rx": cap.brillo.rx, "--brillo-ry": cap.brillo.ry,
        "--brillo-a": cap.brillo.a
      });
      sec.appendChild(br);
    }

    var fog = el("div", "fog");
    fog.setAttribute("aria-hidden", "true");
    fog.appendChild(el("span"));
    fog.appendChild(el("span"));
    sec.appendChild(fog);

    // Ventana clickeable sobre la criatura (mismo destino que la CTA)
    if (cap.ventana) {
      var win = el("a", "ventana");
      win.href = cap.href;
      win.setAttribute("aria-label", cap.verbo + " " + cap.nombre);
      setVars(win, {
        "--v-left": cap.ventana.left, "--v-top": cap.ventana.top,
        "--v-w": cap.ventana.w, "--v-h": cap.ventana.h
      });
      if (cap.ventanaMovil) {
        setVars(win, {
          "--vm-left": cap.ventanaMovil.left, "--vm-top": cap.ventanaMovil.top,
          "--vm-w": cap.ventanaMovil.w, "--vm-h": cap.ventanaMovil.h
        });
      }
      sec.appendChild(win);
    }

    // Tarjeta-placa (reusa .trailer tal cual; lado alternado por paridad en CSS)
    var content = el("div", "capa__content reveal");
    var card = el("article", "trailer");
    ["tl", "tr", "bl", "br"].forEach(function (p) {
      var r = el("span", "rivet " + p);
      r.setAttribute("aria-hidden", "true");
      card.appendChild(r);
    });
    var panel = el("div", "trailer__panel");
    panel.appendChild(el("p", "cap-num", "Capítulo " + (ROMAN[cap.n - 1] || cap.n)));
    var h2 = el("h2", null, cap.nombre);
    h2.id = "cap-" + cap.id + "-nombre";
    panel.appendChild(h2);
    if (cap.alias) { panel.appendChild(el("p", "alias", cap.alias)); }
    if (cap.gancho) {
      var q = el("blockquote", "gancho", cap.gancho);
      panel.appendChild(q);
    }
    if (cap.tags && cap.tags.length) {
      var ul = el("ul", "tags");
      cap.tags.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      panel.appendChild(ul);
    }
    if (cap.teaser) { panel.appendChild(el("p", "teaser", cap.teaser)); }
    var cta = el("a", "cta");
    cta.href = cap.href;
    cta.appendChild(document.createTextNode(cap.verbo + " "));
    var chev = el("span", null, "▼");
    chev.setAttribute("aria-hidden", "true");
    cta.appendChild(chev);
    panel.appendChild(cta);
    card.appendChild(panel);
    content.appendChild(card);
    sec.appendChild(content);
    return sec;
  }

  /* ── Placa sellada: pieza compacta dentro de su acto (no una pantalla) ─── */
  function buildSellada(cap) {
    var d = el("div", "sellada");
    d.setAttribute("aria-disabled", "true");
    d.appendChild(el("span", "sellada__sigilo", (cap.nombre || "·").replace(/^(El|La|Los|Las)\s+/i, "").charAt(0)));
    d.appendChild(el("span", "sellada__nombre", cap.nombre));
    d.appendChild(el("span", "sellada__tag", "capítulo sellado"));
    return d;
  }

  /* ── Actos → capítulos, en el orden del array (curatorial) ─────────────── */
  P.actos.forEach(function (acto) {
    var sec = el("section", "acto reveal");
    sec.id = acto.id;
    sec.setAttribute("data-zona", acto.zona);
    sec.setAttribute("aria-label", acto.numeral + " · " + acto.titulo);
    sec.appendChild(el("p", "acto__numeral", acto.numeral));
    sec.appendChild(el("h2", "acto__titulo", acto.titulo));
    var selladas = null;
    host.appendChild(sec);
    P.capitulos.forEach(function (cap) {
      if (cap.acto !== acto.id) { return; }
      if (cap.estado === "publicado") {
        host.appendChild(buildCapitulo(cap, acto.zona));
      } else {
        if (!selladas) { selladas = el("div", "acto__selladas"); sec.appendChild(selladas); }
        selladas.appendChild(buildSellada(cap));
      }
    });
  });

  /* ── Sonda: Superficie + capítulos publicados + Abismo ─────────────────── */
  var sonda = document.querySelector(".sonda");
  if (sonda) {
    var nodos = [{ id: "superficie", label: "Superficie" }];
    P.capitulos.forEach(function (cap) {
      if (cap.estado === "publicado") { nodos.push({ id: cap.id, label: cap.labelSonda || cap.nombre }); }
    });
    nodos.push({ id: "abismo", label: "Abismo" });
    // (Con >8 nodos en móvil habrá que compactar la sonda; se decide al verlo.)
    nodos.forEach(function (n, i) {
      var a = el("a", "sonda__nodo" + (i === 0 ? " is-active" : ""));
      a.href = "#" + n.id;
      a.setAttribute("data-target", n.id);
      a.setAttribute("aria-label", n.label);
      a.appendChild(el("span", "sonda__label", n.label));
      sonda.appendChild(a);
    });
  }

  // La cue de la superficie desciende al primer acto renderizado.
  var cue = document.querySelector(".capa--superficie .cue");
  if (cue && P.actos.length) { cue.href = "#" + P.actos[0].id; }
}());
