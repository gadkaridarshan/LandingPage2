# LandingPage2

A polished, accessible single-page marketing site for a modern product launch. LandingPage2 delivers a cohesive **hero section**, a responsive **features grid**, and a validated **contact form** in semantic HTML with progressive-enhancement JavaScript — **no build step required**.

The site is intentionally lightweight: a single `public/index.html` document, a small set of modular stylesheets under `public/styles/`, and a pair of vanilla JS modules (`public/app.js` for the hero CTA smooth-scroll and `public/scripts/main.js` for the dynamic footer year and inline contact-form validation). Everything is plain static assets and can be hosted on any static-file server or CDN — no package manager, no `npm install`, no environment variables, and no external services required.

---

## Prerequisites

To run LandingPage2 locally you only need a static file server. Pick **one** of the following options:

- **Python 3.8+** (3.10+ recommended) with the built-in `http.server` module — the default, zero-install option on macOS and most Linux distributions.
- **Node.js 18+** with `npx` — an optional alternative if you prefer a Node-based static server (`npx serve` or `npx http-server`).

Additional requirements:

- A modern evergreen browser (Chrome, Firefox, Safari, or Edge) to view and interact with the page.
- A terminal with a POSIX-compatible shell (`bash`, `zsh`, or equivalent) to run the commands below.

No package manager, no `npm install` step, no environment variables, and no external services are required — the assets are plain HTML, CSS, and JS served as static files.

---

## Running locally

Follow these steps to serve the site from the `public/` directory and verify it works end-to-end.

1. **Start a static file server in the `public/` directory.** From the repository root, choose **one** of the following commands.

   Using **Python 3** (recommended default):

   ```bash
   cd public
   python3 -m http.server 8000
   ```

   Using **Node.js with `serve`** (no global install required):

   ```bash
   npx serve public -l 8000
   ```

   Using **Node.js with `http-server`** (alternative):

   ```bash
   npx http-server public -p 8000 -c-1
   ```

2. **Open the site in your browser.** Navigate to:

   ```
   http://localhost:8000/
   ```

3. **Verify success — the page must show all three sections fully rendered:**
   - **Hero section**: an eyebrow tag ("Built for teams that ship"), a headline ("Launch your next idea with a pixel-perfect landing page."), a subheadline, two CTA buttons, and a three-item meta strip ("100% static", "A11y ready", "0 build steps").
   - **Features grid**: a three-card responsive grid titled "Everything you need to launch" with the cards *Lightning fast*, *Layered design*, and *Accessible by default*.
   - **Contact form**: a labelled form with Name, Email, and Message fields plus a "Send message" submit button.

4. **Verify the interactive behaviour:**
   - Click the primary hero CTA ("Explore features") — it should smooth-scroll down to the Features section (handled by `public/app.js`, with reduced-motion respected).
   - Scroll to the footer — the copyright year should reflect the current year (rendered dynamically by `public/scripts/main.js`).
   - Submit the contact form with empty fields — inline validation messages should appear under each field and a status line should prompt you to fix the errors (handled by `public/scripts/main.js`).
   - Submit the contact form with valid data — a "Thanks! Your message has been received." status should appear and the form should reset.

5. **Stop the server** when you're done by pressing `Ctrl + C` in the terminal.

---

## Project Structure

All site assets live under the `public/` directory and are served as plain static files. Top-level files outside `public/` are project documentation and tooling configuration only.

```text
LandingPage2/
├── README.md                       # This file — overview, prerequisites, run steps, structure
├── HelixCardInventory.md           # Helix board card inventory for this project
├── HelixGrandProjectSummary.md     # Cross-card summary of board progress
├── .gitignore                      # Git ignore rules
├── .vscode/
│   └── settings.json               # Editor / Helix model preferences
└── public/                         # All user-facing static assets (served as-is)
    ├── index.html                  # Single-page document: hero + features + contact + footer
    ├── app.js                      # Hero CTA smooth-scroll (respects prefers-reduced-motion)
    ├── styles.css                  # Base reset + design tokens (colors, spacing, type, radii)
    ├── styles/
    │   ├── base.css                # Global typography, layout primitives, footer styles
    │   ├── hero.css                # Hero gradient background, headline, CTAs, meta strip
    │   ├── features.css            # Features grid + feature-card hover/focus states
    │   └── contact.css             # Contact section background + form input styles
    └── scripts/
        └── main.js                 # Dynamic footer year + contact form validation/submit
```

**Path notes:**

- `public/index.html` — the only HTML document; loads all stylesheets and both JS modules.
- `public/styles.css` — top-level stylesheet (base/tokens entry point) referenced by `index.html`.
- `public/styles/*.css` — section-specific modular stylesheets (hero, features, contact, base).
- `public/app.js` — top-level module referenced by `index.html` for hero CTA behaviour.
- `public/scripts/main.js` — secondary module referenced by `index.html` for the footer year and contact form.
- `HelixCardInventory.md` and `HelixGrandProjectSummary.md` — Helix board bookkeeping; not served to the browser.

---

## What was built

This board delivered the three core sections of the landing page as a cohesive, accessible single-page site:

- **Landing hero section** — Polished gradient background (layered radial gradients over a deep navy base with floating blurred orbs and a masked grid texture), modern typography (Space Grotesk headline with a tri-tone gradient accent + Inter body copy), headline + subheadline + dual CTA layout, accessible contrast ratios, and a three-item meta strip reinforcing the static / a11y / no-build value proposition.
- **Features section grid** — Three responsive feature cards (*Lightning fast*, *Layered design*, *Accessible by default*) rendered as a CSS Grid that collapses gracefully on tablet and mobile breakpoints. Each card pairs a soft-tinted icon tile with a concise title and description, with hover and focus-within lift states that match the site's interaction language.
- **Contact form section** — Labelled Name, Email, and Message inputs with appropriate `type`, `autocomplete`, and `required` attributes, inline validation messages, a styled status line, and a "Send message" submit button that resets the form on success. The section uses the same gradient background family as the hero for visual continuity and is responsive across viewports.

Together with the modular `public/styles/` + `public/scripts/` structure and the `public/app.js` smooth-scroll behaviour, the result is a complete, dependency-free marketing landing page that can be hosted on any static-file server.