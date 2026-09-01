// helix: public/app.js
// LandingPage2 — minimal progressive enhancement for the hero CTA.
// @helix:story USER-755000

(function () {
    "use strict";

    const cta = document.getElementById("hero-cta");
    if (!cta) return;

    cta.addEventListener("click", function (event) {
        const href = cta.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
})();