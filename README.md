# orfoz-site

Two static sites on one domain, built with [Astro](https://astro.build) and served as static assets by a Cloudflare Worker:

| Path         | Site                                                                  | Visibility                                        |
| ------------ | --------------------------------------------------------------------- | ------------------------------------------------- |
| `/`          | **Orfoz**, a small mobile app studio from İstanbul                    | Public                                            |
| `/diegetic/` | **Diegetic**, a pre-launch ad engine where ads fit each app's schema | Unlisted: public URL, not linked, `noindex`       |

No client-side framework, no backend, no secrets. The studio site must never link to `/diegetic`.

## Where things live

- `src/config/studio.ts`: studio brand (name, domain, contact).
- `src/config/diegetic.ts`: Diegetic brand (name, contact).
- `src/data/apps.ts`: the studio's app list. Add, rename or remove apps here.
- `src/components/`: shared building blocks (header, footer, hero card, dark band, contact card).
  - `studio/` and `diegetic/` hold each site's sections.
- `src/styles/global.css`: the shared design system (tokens, type, light and dark mode).
- `wrangler.jsonc`: Worker config (static assets from `dist/`).

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev       # http://localhost:4321 and http://localhost:4321/diegetic/
```

## Build

```sh
npm run build     # static output in dist/
```

## Deploy (Cloudflare Workers Builds)

The `orfoz-site` Worker is connected to this repo. Pushes to `main` build and deploy.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

## Renaming

Change brand names and contacts in `src/config/`. Components read from there.
