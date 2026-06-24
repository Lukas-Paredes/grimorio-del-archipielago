(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.initNavigation = function () {
    var button = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".main-nav");
    var header = document.querySelector("[data-header]");
    function updateHeader() {
      if (header) { header.classList.toggle("is-scrolled", window.scrollY > 24); }
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    if (!button || !nav) {
      return;
    }
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      }
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
