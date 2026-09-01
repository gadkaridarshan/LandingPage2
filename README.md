# LandingPage2

A bare, unstyled single-page HTML document for a modern product launch. LandingPage2 ships a semantic **hero section**, a **features list**, and a validated **contact form** in plain HTML with progressive-enhancement JavaScript — **no build step required** and **no styling applied**.

The site is intentionally lightweight: a single `public/index.html` document and a pair of vanilla JS modules (`public/app.js` for the hero CTA smooth-scroll and `public/scripts/main.js` for the dynamic footer year and inline contact-form validation). Everything is plain static assets and can be hosted on any static-file server or CDN — no package manager, no `npm install`, no environment variables, and no external services required. The page renders as raw, browser-default HTML — no CSS, no background, no visual polish.

---

## Prerequisites

To run LandingPage2 locally you only need a static file server. Pick **one** of the following options:

- **Python 3.8+** (3.10+ recommended) with the built-in `http.server` module — the default, zero-install option on macOS and most Linux distributions.
- **Node.js 18+** with `npx` — an optional alternative if you prefer a Node-based static server (`npx serve` or `npx http-server`).

Additional requirements:

- A modern evergreen browser (Chrome, Firefox, Safari, or Edge) to view and interact with the page.
- A terminal with a POSIX-compatible shell (`bash`, `zsh`, or equivalent) to run the commands below.

No package manager, no `npm install` step, no environment variables, and no external services are required — the assets are plain HTML and JS served as static files. There is no stylesheet to load: the page is intentionally unstyled.

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

3. **Verify success — the page must show all three sections rendered as plain, unstyled HTML:**
   - **Hero section**: an eyebrow tag ("Built for teams that ship"), a headline ("Launch your next idea with a pixel-perfect landing page."), a subheadline, two text links (the CTAs), and a three-item list ("100% static", "A11y ready", "0 build steps"). No background, no gradient, no custom typography — only the browser's default styling.
   - **Features list**: a heading ("Everything you need to launch") followed by three list items (*Lightning fast*, *Layered design*, *Accessible by default*) rendered as a bulleted list, each with a heading and a paragraph. No grid, no card chrome, no icons are styled.
   - **Contact form**: a labelled form with Name, Email, and Message fields plus a "Send message" submit button, all using the browser's native form controls.

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
├── .vscode/
│   └── settings.json               # Editor preferences (Helix model selection)
├── .gitignore                      # Standard Git ignore rules
├── HelixCardInventory.md           # Helix board bookkeeping
├── HelixGrandProjectSummary.md     # Helix board bookkeeping
└── public/                         # Static site assets (serve this directory)
    ├── index.html                  # The single HTML document (unstyled)
    ├── app.js                      # Hero CTA smooth-scroll behaviour
    ├── styles.css                  # Empty entry stylesheet (kept for backwards compatibility)
    ├── styles/                     # Empty section stylesheets (kept for backwards compatibility)
    │   ├── base.css
    │   ├── hero.css
    │   ├── features.css
    │   └── contact.css
    └── scripts/
        └── main.js                 # Footer year + contact form validation
```

### Path notes:

- `public/index.html` — the only HTML document; loads both JS modules. No stylesheet is referenced.
- `public/app.js` — top-level module referenced by `index.html` for hero CTA behaviour.
- `public/scripts/main.js` — secondary module referenced by `index.html` for the footer year and contact form.
- `public/styles.css` and `public/styles/*.css` — intentionally empty. They are retained as zero-content files so existing references and the modular layout remain in place, but they do not load any CSS.
- `HelixCardInventory.md` and `HelixGrandProjectSummary.md` — Helix board bookkeeping; not served to the browser.

---

## What was built

This board delivered the three core sections of the landing page as plain, unstyled, semantically-correct HTML — then explicitly **stripped all styling back out** so the page renders as raw browser-default markup. The work was tracked across the following deliverables:

- **Hero section** (`public/index.html`) — eyebrow tag, headline, subheadline, two CTAs, and a three-item supporting list. Linked through to the Features section via smooth-scroll behaviour in `public/app.js`. Rendered with no custom typography, gradient, or background.
- **Features section** (`public/index.html`) — three feature items (*Lightning fast*, *Layered design*, *Accessible by default*) with inline SVG icons, each containing a heading and a short paragraph. Rendered as a default bulleted list rather than a styled grid.
- **Contact form section** (`public/index.html`) — labelled form with `name`, `email`, and `message` fields, proper input types and autocomplete attributes, `required` constraints, and a "Send message" submit button. Client-side validation lives in `public/scripts/main.js`, which also renders the dynamic footer year.
- **Remove landing page styling** — every CSS reference, inline `style` attribute, and class-based presentation hook was dropped from `index.html`. The previously-loaded `public/styles.css`, `public/styles/base.css`, `public/styles/hero.css`, `public/styles/features.css`, and `public/styles/contact.css` files are retained as empty placeholders so the modular layout stays intact, but they ship zero bytes of CSS. The page now renders with only the browser's native, unstyled defaults — no gradient, no background image, no custom typography.
- **Author complete project README** — this document, covering prerequisites, run steps, project structure, and a deliverables summary.

The end result is a portable, dependency-free static landing page: serve `public/` from any static-file server or CDN and it just works, with progressive-enhancement JS handling the smooth-scroll, footer year, and inline form validation.