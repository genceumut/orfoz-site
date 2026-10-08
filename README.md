# orfoz-site

Marketing site for **Orfoz** (codename), a pre-launch ad engine for mobile apps. Each app defines a schema
describing what an ad may look like inside it; advertisers submit their website, and ads are generated to fit
each app's schema and validated before they serve.

Static site built with [Astro](https://astro.build). No backend, no client-side framework, no secrets.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
```

## Build

```sh
npm run build     # outputs static files to dist/
npm run preview   # serves dist/ locally
```

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- Security headers live in `public/_headers`.

## Renaming

The brand name, tagline and contact email live in `src/config.ts`. Change them there; components read from it.
