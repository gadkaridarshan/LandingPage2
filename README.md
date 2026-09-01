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
   - An eyebrow tag reading **"Now in private beta"** in a pill.
   - A large display headline: **"Ship launches that actually convert"** with "actually convert" highlighted.
   - A subheading paragraph below the headline.
   - Two call-to-action buttons side-by-side: a primary **"Request early access"** and a ghost **"See what's inside"**.
   - A meta line **"No credit card · 2-minute setup"** beneath the CTAs.
   - A layered background with a faint grid mask and three soft purple/cyan glows.
   - A stylised product preview card on the right (title bar with traffic-light dots + faux dashboard panels).

4. **Verify the features section** (scroll down or click **"See what's inside"**). You should see:
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
   - A heading **"Let's talk about your launch"** with a short subheading.
   - A form with **Name**, **Email**, and **Message** fields plus a **"Send message"** primary button.
   - Each field shows a focus ring; required fields block empty submission and show inline validation messages.
   - A polite live region under the button reports success or error status.

6. **Verify the interactive behaviour:**
   - Click the primary hero CTA ("Request early access") — it smooth-scrolls to the Contact section.
   - Click the ghost CTA ("See what's inside") — it smooth-scrolls to the Features section.
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
        └── main.js                 # Contact form validation + progressive enhancements
```

### Path notes:

- `public/index.html` — the only HTML document; links every stylesheet and script. Contains the skip link, site header, hero, features grid, contact form, and footer.
- `public/styles/base.css` — design tokens (colors, spacing, radii), reset, typography, and shared layout primitives (`.container`, `.btn`, `.visually-hidden`).
- `public/styles/hero.css` — hero section: layered background, grid, glows, headline, CTAs, visual card, and the responsive breakpoint.
- `public/styles/features.css` — features section: 3-column responsive grid, feature card styling, hover states, and collapse breakpoints.
- `public/styles/contact.css` — contact section: form layout, input/textarea/button styling, focus rings, validation states, and background treatment.
- `public/app.js` — hero CTA smooth-scroll behaviour.
- `public/scripts/main.js` — contact form client-side validation and submit handling.

### Hosting notes

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, or a plain Nginx/Apache server. Upload the contents of `public/` (or point your host at that directory) and the site is live — no build, no rewrites, no environment configuration required.

---

## What was built

This board delivered a complete, production-quality three-section landing page plus a restored design system:

- **Hero section** — a layered, gradient-and-grid background with three soft glows, an eyebrow tag, a display headline with an accent span, a subheading, primary and ghost CTAs, a meta line, and a stylised product preview card. Fully responsive across desktop, tablet, and mobile breakpoints.
- **Features section grid** — a 3-column responsive grid of six icon/title/description feature cards, visually aligned with the hero CTA and contact form styling. The grid collapses gracefully to 2 columns around 960px and to a single column below 640px.
- **Contact form section** — name, email, and message fields with proper input types, `autocomplete` and `required` attributes, inline client-side validation, a submit button, and a polite live region for success/error status. Styling matches the hero and features sections.
- **Design tokens and layout primitives** — a single source of truth in `base.css` for color, spacing, radius, typography, and shared classes (`.container`, `.btn`, `.visually-hidden`) so every section uses consistent design language.
- **Accessibility baseline** — semantic landmarks, labelled controls, focus rings, reduced-motion media query, skip link, and ARIA live regions for form status.
- **Project documentation** — this README, with prerequisites, run steps, verification checklist, and a full project structure map.