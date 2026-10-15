# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page personal site for Avelino Almeida (avelino.almeida.pt). Content is in European Portuguese (`lang="pt-pt"`), and code comments are also in Portuguese — keep both conventions.

There is no build step, package manager, linter, or test suite. To preview, open `index.html` directly or serve the folder with any static server (e.g. `python -m http.server`).

## Architecture

- `index.html` — the entire page. Sections in order: `#preloader`, `#navbar`, `#hero`, `#about`, `#skills` (Bootstrap tabs), `#formacao`, `#contact`, `#footer`. CV PDFs (PT/EN) for the hero download buttons live in `assets/cv/`.

Site content must match the owner's 2026 CV: don't add technologies, numbers or claims that aren't in the CV.
- `assets/css/main.css` — all custom styling, organised in numbered blocks (variables, navigation, hero, about, skills, lazer, contact, footer, motion, responsive) that mirror the page sections. Colours and design tokens live as CSS custom properties in `:root`; reuse them rather than hardcoding values.
- `assets/js/main.js` — vanilla JS, no jQuery.
- External dependencies are loaded from CDNs in `index.html`: Bootstrap 5.3.3 (CSS + bundle JS), Font Awesome Free 6.5.2, Devicon 2.16.0, Google Fonts (Inter, Space Grotesk).

### Behaviour wired between HTML, CSS and JS

- **Scroll reveal**: elements with `reveal-up` / `reveal-left` / `reveal-right` start hidden in CSS and get `.visible` added by an IntersectionObserver. Elements inside `#hero` are excluded from the observer and are instead revealed on `window.load`, staggered by an inline `--d` custom property (ms delay).
- **Navbar**: gets `.scrolled` after 60px of scroll; anchor links use JS smooth scrolling offset by the navbar height; the mobile collapse (`#navMenu`) is closed via `bootstrap.Collapse` on link click.
- **Contact form** (`#contact-form`): submitted via `fetch` to the Web3Forms API (`https://api.web3forms.com/submit`) using the hidden `access_key` input; toggles `.btn-text`/`.btn-loading` inside `#submit-btn` and shows `#form-success` / `#form-error`.

### Hobbies page (`hobbies.html`)

Separate page (BTT, the 💯 Kedas team, the KTM bike), linked only from the footer of `index.html` so the main page stays professional. It loads `main.css` + `assets/css/hobbies.css` and runs `hobbies-data.js` → `hobbies.js` → `main.js` (all `defer`, order matters: `hobbies.js` must create the tour cards before `main.js` attaches the `reveal-*` observer).

- Content is meant to be updated over time by editing **only** `assets/js/hobbies-data.js` (`aventuras`, `voltas`, `galeria`). Totals (km, D+, count) are computed from it; the gallery section and its menu link hide themselves while `galeria` is empty.
- `fotos/` is a git-ignored inbox for original photos. Publish an optimised copy (max 1600 px, JPEG q80, EXIF orientation applied) to `assets/img/hobbies/AAAA-MM-DD-nome.jpg`. No Python/Node on this machine; resize with PowerShell `System.Drawing`.
- Tour data comes from the owner's Komoot profile (https://www.komoot.com/pt-pt/user/5501306045100); don't invent stats.

### Legacy files (not referenced by `index.html`)

Left over from the original template (credited in `_ReadMe.txt`): `assets/js/plugins.js` (bundled jQuery, ScrollReveal, Featherlight, SmoothScroll), `assets/css/plugins.css`, `assets/php/contact.php` (old PHP mail handler, superseded by Web3Forms), and the local `assets/fonts/` Font Awesome 4 files. Don't add new code to them; the live page uses only the CDN libraries plus `main.css`/`main.js`.
