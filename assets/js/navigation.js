(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.initNavigation = function () {
    var button = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".main-nav");
    if (!button || !nav) {
      return;
    }
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    });
  };
}());
