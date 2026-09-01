# LandingPage2 — Launchpad landing page

A polished, dependency-free, single-page product landing site. LandingPage2 ships three production sections — a **hero**, a **features grid**, and a **contact form** — built with semantic HTML, modern CSS (custom properties + responsive grid + media queries), and a small amount of vanilla JavaScript for progressive enhancement. There is **no build step**, no package manager, no environment variables, and no external services to configure.

The site is intentionally lightweight. Every asset is plain static and lives under the `public/` directory, so it can be hosted on any static-file server or CDN: drop the folder on a host and it works.

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

3. **Verify the hero section.** You should see:
   - An eyebrow tag reading **"New · Launchpad v1.0"** in a pill.
   - A large display headline: **"Ship a landing page that converts in an afternoon."** with "converts" highlighted.
   - A subheading paragraph below the headline.
   - Two call-to-action buttons side-by-side: a primary **"Get started — it's free"** and a ghost **"See the features"**.
   - A three-item highlight row: **Zero build step · Accessible by default · Drop-in for any static host**.
   - A layered background with a faint grid mask and three soft purple/cyan glows.

4. **Verify the features section** (scroll down or click **"See the features"**). You should see:
   - A section eyebrow **"Features"** and the heading **"Everything you need to launch — nothing you don't."**
   - A 3-column responsive grid of six feature cards, each with an icon tile, a title, and a description:
     - Ship in minutes
     - Pixel-perfect design
     - Accessible by default
     - Responsive everywhere
     - Production-ready
     - Easy to customize
   - The grid collapses to 2 columns around 960px and to a single column below 640px.

5. **Verify the contact section** (scroll down or click the **"Get started"** CTA). You should see:
   - A heading **"Let's build something people want."** with a short subheading.
   - A form with **Name**, **Email**, and **Message** fields plus a **"Send message"** primary button.
   - Each field shows a focus ring; required fields block empty submission and show inline validation messages.
   - A polite live region under the button reports success or error status.

6. **Verify the interactive behaviour:**
   - Click the primary hero CTA ("Get started — it's free") — it smooth-scrolls to the Contact section.
   - Click the ghost CTA ("See the features") — it smooth-scrolls to the Features section.
   - Scroll to the footer — the copyright year should reflect the current year.
   - Submit the contact form with empty fields — inline validation messages appear under each field and the status line prompts you to fix the errors.
   - Submit the contact form with valid data — a "Thanks! Your message has been received." status appears and the form resets.

7. **Stop the server** when you're done by pressing `Ctrl + C` in the terminal.

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
    ├── index.html                  # The single HTML document — wires all CSS + JS
    ├── app.js                      # Hero CTA smooth-scroll behaviour (vanilla JS)
    ├── styles.css                  # Empty entry stylesheet (kept for backwards compatibility)
    ├── styles/                     # Section stylesheets — design tokens + section styles
    │   ├── base.css                # Design tokens, reset, typography, layout primitives
    │   ├── hero.css                # Hero section (background, headline, CTAs)
    │   ├── features.css            # Features grid + feature cards
    │   └── contact.css             # Contact section + form styling
    └── scripts/
        └── main.js                 # Footer year + contact form validation
```

### Path notes:

- `public/index.html` — the only HTML document; loads Inter + Sora from Google Fonts, then the four section stylesheets, then the two JS modules (`scripts/main.js` first, `app.js` second, both `defer`).
- `public/styles/base.css` — defines CSS custom properties for colors, type, spacing, radius, and shadows, plus a small reset and `.container` layout primitive used by every section.
- `public/styles/hero.css` — hero background grid + glows, eyebrow pill, headline, subheading, CTAs, and bullets.
- `public/styles/features.css` — features header and the responsive 3 / 2 / 1-column feature-card grid.
- `public/styles/contact.css` — contact section layout, fields, inputs, focus states, submit button, and the live status region.
- `public/app.js` — top-level module referenced by `index.html` for hero CTA smooth-scroll behaviour (respects `prefers-reduced-motion`).
- `public/scripts/main.js` — secondary module referenced by `index.html` for the dynamic footer year and inline contact-form validation.
- `public/styles.css` — intentionally empty placeholder kept so the legacy reference path resolves.
- `HelixCardInventory.md` and `HelixGrandProjectSummary.md` — Helix board bookkeeping; not served to the browser.

---

## What was built

This board delivered the three core sections of the landing page as a complete, styled, responsive, accessible product site. The work was tracked across the following deliverables:

- **Hero section** (`public/index.html` + `public/styles/hero.css`) — eyebrow pill, display headline with an accent span, subheading, primary and ghost CTAs, and a three-item highlight row. Backed by a layered background made of a radial-masked grid plus three soft brand/cyan glows. The CTAs smooth-scroll to the Features and Contact sections via `public/app.js`, with `prefers-reduced-motion` respected.
- **Features grid** (`public/index.html` + `public/styles/features.css`) — a six-card responsive grid (3 columns → 2 columns at ≤960px → 1 column at ≤640px). Each card has an icon tile, a title, and a short description, rendered with a subtle gradient surface, border, and lift-on-hover/focus shadow that reveals an accent glow.
- **Contact form section** (`public/index.html` + `public/styles/contact.css`) — labelled form with Name, Email, and Message fields, proper input types and autocomplete attributes, `required` constraints, focus styles, and a primary "Send message" button. Inline validation and the live status region are handled by `public/scripts/main.js`, which also renders the dynamic footer year.
- **Design system foundation** (`public/styles/base.css`) — a single source of truth for colors, typography (Inter + Sora), spacing, radius, shadows, and the `.container` layout primitive used by every section. Rebranding the whole site is a matter of swapping a handful of CSS custom properties.
- **Author complete project README** — this document, covering prerequisites, run steps, project structure, and a deliverables summary.

The end result is a portable, dependency-free static landing page: serve `public/` from any static-file server or CDN and it just works, with progressive-enhancement JS handling smooth-scroll, the footer year, and inline form validation, and with all styling living in plain, editable CSS.