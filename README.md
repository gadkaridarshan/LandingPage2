# LandingPage2

A polished, accessible single-page marketing site for a modern product launch. LandingPage2 delivers a cohesive hero section, a responsive features grid, and a validated contact form in semantic HTML with progressive-enhancement JavaScript — no build step required.

The site is intentionally lightweight: a single `public/index.html` document, a small set of modular stylesheets, and a pair of vanilla JS modules that wire up the hero CTA smooth-scroll, dynamic footer year, and inline contact-form validation. Everything is plain static assets and can be hosted on any static-file server or CDN — no package manager, no `npm install`, no environment variables, and no external services required.

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

   Using **Node.js** (no global install required):

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

All site assets live under the `public/` directory and are served as plain static files: