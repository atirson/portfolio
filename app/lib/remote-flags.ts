import type { RemoteConfig, RemoteFeature } from 'feature-flow-js';

// Demo "remote" feature-flag payload. In a real setup this would come from a
// feature-flag service; here it's served by this Next.js app itself so it
// deploys and runs together with the rest of the site (see
// app/api/feature-flags/route.ts), instead of needing a separate process
// like the old server.js, which had no place to run on Vercel.
const REMOTE_FEATURES: RemoteFeature[] = [
  {
    key: 'hidden-bio',
    name: 'Hidden Bio',
    description:
      'Hidden bio in home page for example using ternary condition',
    defaultEnabled: false,
    createdAt: '2023-07-20T10:00:00Z',
    expiredAt: '2028-07-20T12:00:00Z',
  },
  {
    key: 'linktree-highlight-cta',
    name: 'Highlight Top Link (remote override)',
    description:
      'Declared locally with defaultEnabled: false (app/lib/flag.config.ts). This remote payload flips it to true, demonstrating a remote override of a local flag.',
    defaultEnabled: true,
    createdAt: '2026-08-10T09:00:00Z',
    expiredAt: '2027-08-10T09:00:00Z',
  },
  {
    key: 'linktree-new-badge',
    name: 'New Badge (remote-only)',
    description:
      'Not declared in flag.config.ts at all — exists purely from this remote payload, demonstrating a fully remote-managed flag.',
    defaultEnabled: true,
    createdAt: '2026-08-10T09:00:00Z',
    expiredAt: '2027-08-10T09:00:00Z',
  },
];

export async function getRemoteFeatureFlags(): Promise<RemoteConfig> {
  return { remoteFeature: REMOTE_FEATURES };
}
