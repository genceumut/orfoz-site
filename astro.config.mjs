// @ts-check
import { defineConfig } from 'astro/config';

// Static output for Cloudflare Pages: build command `npm run build`, output directory `dist`.
export default defineConfig({
  output: 'static',
});
