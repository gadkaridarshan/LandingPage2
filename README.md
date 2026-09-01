# LandingPage2

A polished, accessible single-page marketing site for a modern product launch. LandingPage2 delivers a cohesive hero section, a responsive features grid, and a validated contact form in semantic HTML with progressive-enhancement JavaScript — no build step required.

The site is intentionally lightweight: a single `public/index.html` document, a small set of modular stylesheets, and a pair of vanilla JS modules that wire up the CTA smooth-scroll, dynamic footer year, and inline contact-form validation. Everything is plain static assets and can be hosted on any static-file server or CDN.

## Prerequisites

- A modern evergreen browser (Chrome, Firefox, Safari, or Edge) to view and interact with the page.
- **Python 3.8+** with the built-in `http.server` module — used as the default local static file server. Python 3.10+ is recommended.
- **Node.js 18+** with `npx` — optional alternative for running `npx serve` or `npx http-server` if you prefer a Node-based server.
- A terminal with a POSIX-compatible shell (`bash`, `zsh`, or equivalent) to run the commands below.
- No package manager, no `npm install` step, no environment variables, and no external services are required — the assets are plain HTML, CSS, and JS served as static files.

## Running locally

1. From the repository root, start a static file server in the `public/` directory using Python 3:

   ```bash
   cd public
   python3 -m http.server 8000
   ```

   Alternatively, with Node.js (no global install required):
   ```bash
   npx serve public -l 8000
   ```
2. Open the site in your browser:

   ```
   http://localhost:8000/
   ```
3. Verify success — the page loads with the hero, features grid, and contact form fully rendered, the footer copyright shows the current year (rendered by `public/scripts/main.js`), and the hero CTA smooth-scrolls to the features section (handled by `public/app.js`).

## Project Structure
