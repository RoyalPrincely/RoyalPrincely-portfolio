# Prince Hub — Portfolio

Prince's personal portfolio website. A simple, static site showcasing skills and a small interactive quiz. The revamp branch modernizes styles, keeps the quiz, and preserves configured search and analytics integrations.

## Stack
- Languages: HTML, CSS, JavaScript
- Static site — no build step required
- Integrations: AddSearch (search), Microsoft Clarity & Smartlook (analytics/session recording), optional Stackbit configuration present

## How to run locally
1. Clone the repository and checkout the revamp branch:
   git clone https://github.com/RoyalPrincely/RoyalPrincely-portfolio.git
   git checkout revamp/clean-portfolio
2. From the repo root, open `index.html` in a browser, or serve it with a simple server:
   - Python 3: python -m http.server 8000
   - Then open http://localhost:8000 in your browser

## Deploy
- GitHub Pages: enable Pages from the repository settings (serve from the root or the `gh-pages` branch).
- Keep your site verification files (google verification, etc.) in place if you need them for search-console or other services.

## What I changed in the revamp branch
- Modernized styles (styles.css)
- Cleaned index.html while preserving requested external scripts and widgets
- Sanitized quiz logic (script.js) — accessible and defensive
- Updated README with run/deploy instructions

## Notes & privacy
- This branch preserves analytics and third-party scripts exactly as requested. If you want to remove or replace any trackers later for privacy or performance reasons, I can prepare a privacy-respecting variant.
