import { mailtoLink } from './mailto';

// Brand config for the studio site at /. Components read these values; the app
// list lives separately in src/data/apps.ts.
export const brand = {
  name: 'Orfoz',
  domain: 'orfoz.co',
  url: 'https://orfoz.co/',
  contactEmail: 'gence@orfoz.co',
  tagline: 'Small, useful apps from İstanbul',
  description:
    'Orfoz is a small, independent mobile app studio in İstanbul. We make cheap, useful apps that each do one everyday job well.',
  year: 2026,
} as const;

export const mailto = (subject: string) => mailtoLink(brand.contactEmail, subject);
