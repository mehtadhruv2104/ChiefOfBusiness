# Bharat Estimator

Internal Progressive Web App for Bharat Trading / BSWI / Bharat Fabrico — steel weight
calculators, chain link estimation and fabrication quotation generation. No backend,
no login: all data lives on-device in IndexedDB and LocalStorage.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · idb (IndexedDB) · pdf-lib · vite-plugin-pwa

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  app/                 Router + root App component
  layouts/             Root layout (header + page outlet)
  pages/<module>/       One folder per route, colocated page-only components
  components/
    ui/                Reusable presentational primitives (Card, PageStub, ...)
    layout/            App chrome (Header, ...)
  features/            Module-specific logic (materials, chain-link, fabrico) — Phase 2+
  calculation-engine/  Pure weight/cost formulas, framework-agnostic — Phase 2+
  pdf/                 Quotation PDF generation (pdf-lib) — Phase 5
  lib/
    db/                IndexedDB schema + access (idb) — Phase 2+
    storage/           LocalStorage helpers (settings, prefs) — Phase 2+
    format/            Number/currency/unit formatting helpers
  data/                Standard material library (from the material master) — Phase 2
  constants/           Routes, module registry, static config
  types/               Shared TypeScript types
```

## Build phases

1. Architecture, routing, theme, PWA shell, home page — **done**
2. Bharat Trading (material library, weight/value calculator, unit converter)
3. BSWI Chain Link calculator
4. Bharat Fabrico (quotation builder + Settings)
5. PDF generator
6. Polish, performance, final testing

## PWA

Installable on Android/Windows/desktop, offline-capable app shell (Workbox `generateSW`,
precached on build). Regenerate icons from `public/icons/` if the brand mark changes.
