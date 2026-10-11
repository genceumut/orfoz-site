# orfoz-site

Two static sites on one domain, built with [Astro](https://astro.build) and served by a Cloudflare Worker:

| Path         | Site                                                                  | Visibility                 |
| ------------ | --------------------------------------------------------------------- | -------------------------- |
| `/`          | **Orfoz**, a small mobile app studio from İstanbul                    | Public                     |
| `/diegetic/` | **Diegetic**, a pre-launch ad engine where ads fit each app's schema | Private (HTTP Basic Auth)  |

No client-side framework and no backend beyond the small auth Worker. No secrets are committed.

## Where things live

- `src/config/studio.ts`: studio brand (name, domain, contact).
- `src/config/diegetic.ts`: Diegetic brand (name, contact).
- `src/data/apps.ts`: the studio's app list. Add, rename or remove apps here.
- `src/components/`: shared building blocks (header, footer, hero card, dark band, contact card).
  - `studio/` and `diegetic/` hold each site's sections.
- `src/styles/global.css`: the shared design system (tokens, type, light and dark mode).
- `worker/index.ts`: Basic Auth for `/diegetic`.
- `wrangler.jsonc`: Worker config. Only `/diegetic` paths run the Worker.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev       # http://localhost:4321 (no auth in dev; /diegetic is open)
```

To test the real Worker, including Basic Auth on `/diegetic`, copy `.env.example` to `.dev.vars` and fill in values. Then run:

```sh
npm run preview:worker   # builds, then serves via wrangler on http://localhost:8787
```

## Build

```sh
npm run build     # static output in dist/
```

## Deploy (Cloudflare Workers Builds)

The `orfoz-site` Worker is connected to this repo. Pushes to `main` build and deploy.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Secrets: on the Worker, open Settings → Variables and Secrets and add `DIEGETIC_USER` and `DIEGETIC_PASSWORD` as type *Secret*.
  - Without them, `/diegetic` returns 403.

## Renaming

Change brand names and contacts in `src/config/`. Components read from there.
