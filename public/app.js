// helix: public/app.js
// Hero CTA smooth-scroll behavior with reduced-motion respect.
/* @helix:story USER-708000 */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function smoothScrollTo(target) {
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - 64;
    if (prefersReducedMotion) {
      window.scrollTo(0, top);
    } else {
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  function handleCtaClick(event) {
    var link = event.currentTarget;
    var hash = link.getAttribute("href") || "";
    if (hash.charAt(0) !== "#") return;
    var target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    smoothScrollTo(target);
    if (history.replaceState) {
      history.replaceState(null, "", hash);
    }
  }

  function init() {
    var ctas = document.querySelectorAll('[data-cta="hero-primary"], .hero__actions a[href^="#"]');
    Array.prototype.forEach.call(ctas, function (cta) {
      cta.addEventListener("click", handleCtaClick);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();