// The studio's app list. Add, rename, reorder or remove apps here; the page renders
// from this file. Text in [BRACKETS] is a placeholder still to be filled in.

export type AppStatus = 'In development' | 'Idea';

// Featured apps name the live mock to show beside them. Each key maps to a
// component in src/components/studio/mocks/.
export type AppMock = 'yarun' | 'cay';

export interface StudioApp {
  /** Stable id, used for anchors. Lowercase, no spaces. */
  id: string;
  name: string;
  /** Optional short slogan shown under the name. */
  tagline?: string;
  /** One-line description. */
  description: string;
  platform: string;
  status: AppStatus;
  price: string;
  /** Featured apps only: a few plain points about how the app works. */
  points?: string[];
  /** Featured apps only: which live mock to render. */
  mock?: AppMock;
}

export const apps: StudioApp[] = [
  {
    id: 'yarun',
    name: 'Yarun',
    tagline: 'Plan only tomorrow',
    description: 'A day planner that plans the next day, and nothing further ahead.',
    platform: 'iOS first',
    status: 'In development',
    price: 'One-time purchase, with a free tier · details [TBD]',
    points: [
      'Plans only the next day.',
      'You pick an evening cutoff hour. After it, the app flips to planning tomorrow.',
      'Pin blocks to a fixed time; untimed blocks flow in the gaps between them.',
      'Reuse blocks from your own library, each with a duration.',
      'One notification in the whole app.',
    ],
    mock: 'yarun',
  },
  {
    id: 'cay',
    name: 'Çay',
    description: 'Keep track of the small favors you owe people, counted in glasses of çay (Turkish tea).',
    platform: 'iOS first',
    status: 'In development',
    price: '[TBD]',
    points: [
      'Each person gets a card with a row of tea glasses, one for every favor you owe them.',
      'Paying one back is a press-and-hold that drains a glass.',
      'Fully personal: nothing is shared with anyone. Syncs through your iCloud.',
    ],
    mock: 'cay',
  },
  {
    id: 'nereye-koydum',
    name: 'Nereye Koydum?',
    description: 'Remember where you stored the things you rarely use.',
    platform: '[PLATFORM]',
    status: 'Idea',
    price: '[PRICE]',
  },
  {
    id: 'roommate',
    name: '[Roommate app]',
    description: 'A shared-house app with who’s home, shared expenses and chores in one place.',
    platform: '[PLATFORM]',
    status: 'Idea',
    price: '[PRICE]',
  },
  {
    id: 'spearfishing',
    name: '[Spearfishing app]',
    description: 'A logbook for spearfishers to archive dives and catches.',
    platform: '[PLATFORM]',
    status: 'Idea',
    price: '[PRICE]',
  },
];
