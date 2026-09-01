/* Tiny enhancement: render the current year in the footer.
 * No build step, no dependencies. */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();