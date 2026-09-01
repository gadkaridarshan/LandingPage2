/* helix: public/app.js */
/* Wires up hero CTA smooth-scroll behavior on top of the static markup. */

(function smoothScrollCTAs() {
  "use strict";

  // Respect users who prefer reduced motion — let the browser handle anchors natively.
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("click", function onCtaClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    if (prefersReducedMotion) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Move keyboard focus for accessibility after the scroll settles.
    if (typeof target.setAttribute === "function") {
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      // Defer focus slightly so smooth scroll doesn't fight the focus jump.
      window.setTimeout(function () {
        target.focus({ preventScroll: true });
      }, prefersReducedMotion ? 0 : 350);
    }
  });
})();