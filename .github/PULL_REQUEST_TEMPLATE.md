Title: Revamp: clean portfolio, preserve integrations

This PR modernizes the portfolio site while preserving the integrations you requested (AddSearch, Stackbit, analytics, verification files, and all remote scripts). It updates styling, improves the quiz JS for accessibility and robustness, and updates the README with run & deploy instructions.

Summary of changes:
- styles.css: modernized responsive styles and layout
- index.html: cleaned markup, re-organized sections, kept all remote scripts/widgets as requested
- script.js: sanitized quiz logic with DOM guards and keyboard support
- README.md: updated with run / deploy instructions

Notes:
- I preserved all remote scripts and verification files per instructions. If you later want a privacy-focused variant, I can prepare one.

How to test:
- Checkout the revamp/clean-portfolio branch and open index.html or run a simple static server.
- Verify quiz behavior and that external scripts are still requested in Network tab.

Ready to merge after review.