'use client';

import { FeatureFlowProvider } from 'feature-flow-js/react';
import { flowConfig } from '@/app/lib/flag.config';
import { RemoteConfig } from 'feature-flow-js';

interface ProvidersProps {
  remote: RemoteConfig | null;
  children: React.ReactNode;
}

export function Providers({ remote, children }: ProvidersProps) {
  return (
    <FeatureFlowProvider
      config={flowConfig}
      context={{ user: { id: 'u1', role: 'member', plano: 'free', segmento: 'default' } }}
      remoteResponse={remote}
    >
      {children}
    </FeatureFlowProvider>
  );
}