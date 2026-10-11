# Erth Environmental Services website

Live at **https://erthfc.com**. An Arabic website for an environmental consultancy in Buraydah, Qassim, built as freelance work (first version May to June 2025, redesigned September 2026).

## What it has
- Opens on an interactive **Three.js globe** with Saudi Arabia marked out. The country outlines are built from TopoJSON at build time (`npm run geo`), and the globe loads on demand.
- A fingerprint drawn from a mathematical field with marching squares (`src/print.js`), not by hand.
- Dark and light themes, right-to-left Arabic, a consultation request form, and links to the office on Google Maps and WhatsApp.
- Structured data for search.

## Stack
Plain JavaScript, Vite, Three.js. Deployed on Vercel from `main`.

## Run it
```bash
npm ci
npm run dev
```

Built by [Mahmoud Alshraky](https://alshraky.xyz).
