import { mailtoLink } from './mailto';

// Brand config for the private /diegetic section (the ad-engine site). "Diegetic" may
// change; rename it here and nowhere else. Components read these values.
export const brand = {
  name: 'Diegetic',
  tagline: 'An ad engine for mobile apps',
  description:
    'Diegetic is a pre-launch ad engine for mobile apps. Each app defines what an ad looks like inside it, and ads are generated to fit that definition.',
  contactEmail: 'gence@orfoz.co',
  home: '/diegetic/',
  year: 2026,
} as const;

export const mailto = (subject: string) => mailtoLink(brand.contactEmail, subject);
