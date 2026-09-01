// helix: public/app.js
// @helix:story [USER-675000]
//
// Hero CTA smooth-scroll helper. Behaviour only — no styling.
// Respects prefers-reduced-motion: when set, jumps instantly to the target.

(function () {
  'use strict';

  function getTarget(el) {
    var href = el.getAttribute('href');
    if (!href || href.charAt(0) !== '#' || href.length < 2) return null;
    var id = href.slice(1);
    try {
      return document.getElementById(id);
    } catch (_) {
      return null;
    }
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function scrollTo(el) {
    if (prefersReducedMotion()) {
      el.scrollIntoView();
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Move keyboard focus for accessibility, without re-triggering the scroll.
    try {
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    } catch (_) {
      /* focus is a progressive enhancement */
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[data-scroll]');
    if (!link) return;
    var target = getTarget(link);
    if (!target) return;
    event.preventDefault();
    scrollTo(target);
    // Update the URL hash without the browser's jump.
    var href = link.getAttribute('href');
    if (href && history && history.pushState) {
      history.pushState(null, '', href);
    }
  });
})();