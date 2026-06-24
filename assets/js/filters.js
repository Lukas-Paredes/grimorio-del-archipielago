(function () {
  "use strict";

  var G = window.Grimorio = window.Grimorio || {};

  G.uniqueSorted = function (values) {
    var seen = {};
    return values.filter(function (value) {
      var key = G.normalize(value);
      if (!value || seen[key]) {
        return false;
      }
      seen[key] = true;
      return true;
    }).sort(function (a, b) { return a.localeCompare(b, "es"); });
  };

  G.updateQuery = function (state) {
    var params = new URLSearchParams();
    Object.keys(state).forEach(function (key) {
      if (state[key] && state[key] !== "all") {
        params.set(key, state[key]);
      }
    });
    var query = params.toString();
    history.replaceState(null, "", location.pathname + (query ? "?" + query : ""));
  };
}());
