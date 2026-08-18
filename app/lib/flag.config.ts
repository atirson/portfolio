import type { FeatureFlowConfig } from 'feature-flow-js';

interface IUser {
  id: string;
  plano: 'free' | 'pro';
  segmento: string;
  role?: 'admin' | 'member';
}

const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const flowConfig: FeatureFlowConfig<IUser> = {
  environment: ENV || 'dev',
  environments: {
    dev:  { label: 'DEV',  color: '#3b82f6' },
    hml:  { label: 'HML',  color: '#f59e0b' },
    prod: { label: 'PROD', color: '#10b981' },
  },
  featuresByEnv: {
    dev: [
      {
        key: 'hidden-socials',
        name: 'Hidden Socials',
        description: 'Hidden socials medias in home page for example using Feature Gate',
        defaultEnabled: true,
        createdAt: '2026-08-01T10:00:00Z',
        expiredAt: '2027-08-01T12:00:00Z',
      },
      {
        key: 'linktree-highlight-cta',
        name: 'Highlight Top Link',
        description: 'Local + remote demo: local default is off, remote (see app/lib/remote-flags.ts) turns it on.',
        defaultEnabled: false,
        createdAt: '2026-08-10T09:00:00Z',
        expiredAt: '2027-08-10T09:00:00Z',
      },
    ],
    prod: [
      {
        key: 'hidden-socials',
        name: 'Hidden Socials',
        description: 'Hidden socials medias in home page for example using Feature Gate',
        defaultEnabled: true,
        createdAt: '2026-08-01T10:00:00Z',
        expiredAt: '2027-08-01T12:00:00Z',
      },
      {
        key: 'linktree-highlight-cta',
        name: 'Highlight Top Link',
        description: 'Local + remote demo: local default is off, remote (see app/lib/remote-flags.ts) turns it on.',
        defaultEnabled: false,
        createdAt: '2026-08-10T09:00:00Z',
        expiredAt: '2027-08-10T09:00:00Z',
      },
    ],
  },
  ui: { position: 'bottom-right', theme: 'dark', hiddenInEnvironments: ['prod'] },
};