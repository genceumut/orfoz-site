// Single source of truth for the brand. "Orfoz" is a codename — rename here and
// nowhere else. Components must read these values instead of hardcoding them.
export const site = {
  name: 'Orfoz',
  tagline: 'An ad engine for mobile apps',
  description:
    'Orfoz is a pre-launch ad engine for mobile apps. Each app defines what an ad looks like inside it, and ads are generated to fit that definition.',
  contactEmail: 'david@orfoz.co',
  year: 2026,
} as const;

export const mailto = (subject: string) =>
  `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;
