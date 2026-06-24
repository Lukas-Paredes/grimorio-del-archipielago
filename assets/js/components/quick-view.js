(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};
  var dialog;
  var previousFocus;

  function close() {
    if (!dialog || !dialog.open) {
      return;
    }
    dialog.close();
    document.body.classList.remove("dialog-open");
    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  function open(id) {
    var figure = G.getFigure(id);
    var world = figure ? G.getWorld(figure.worldId) : null;
    if (!figure || !dialog) {
      return;
    }
    previousFocus = document.activeElement;
    var returnUrl = G.returnUrlForPage();
    dialog.querySelector("[data-quick-content]").innerHTML = [
      '<div class="quick-view__layout">',
      G.illustrationPlaceholder(figure.illustrationId, "vertical", figure.name),
      '<div><div class="eyebrow">Vista rápida · ', G.escape(world ? "Mundo " + world.number : "Archivo"), '</div>',
      '<h2 id="quick-title">', G.escape(figure.name), '</h2>',
      G.seal(figure.status),
      '<p class="lead">', G.escape(figure.definition), '</p>',
      '<dl class="mini-facts"><div><dt>Naturaleza</dt><dd>', G.escape(figure.nature), '</dd></div>',
      '<div><dt>Ambientes</dt><dd>', G.escape(G.listText(figure.environments)), '</dd></div>',
      '<div><dt>Señales</dt><dd>', G.escape(G.listText(figure.signals)), '</dd></div></dl>',
      '<p><strong>Estado y pendiente:</strong> ', G.escape(figure.pending), '</p>',
      '<div class="actions"><a class="button" href="', G.pageUrl("figura.html", "?id=" + encodeURIComponent(figure.id) + "&return=" + encodeURIComponent(returnUrl)), '">Abrir ficha completa</a>',
      '<a class="text-link" href="', G.pageUrl("mundo.html", "?id=" + encodeURIComponent(figure.worldId)), '">Explorar su mundo</a></div>',
      '</div></div>'
    ].join("");
    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.querySelector("[data-close-dialog]").focus();
  }

  G.initQuickView = function () {
    dialog = document.querySelector("[data-quick-dialog]");
    if (!dialog) {
      document.body.insertAdjacentHTML("beforeend", '<dialog class="quick-view" data-quick-dialog aria-labelledby="quick-title"><button class="quick-view__close" type="button" data-close-dialog aria-label="Cerrar vista rápida">✕</button><div class="quick-view__content" data-quick-content></div></dialog>');
      dialog = document.querySelector("[data-quick-dialog]");
    }
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-quick-view]");
      if (trigger) {
        open(trigger.getAttribute("data-quick-view"));
      }
      if (event.target.closest("[data-close-dialog]")) {
        close();
      }
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        close();
      }
    });
    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && dialog.open) {
        event.preventDefault();
        close();
      }
    });
  };
}());
