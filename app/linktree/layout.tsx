// app/linktree/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { Providers } from "./provider";
import { getRemoteFeatureFlags } from "@/app/lib/remote-flags";

const GA_TRACKING_ID = "G-Z36DMC9GRF";

// Calls the flag data directly instead of fetching app/api/feature-flags
// over HTTP — same data, no self-network-hop, and it works identically in
// dev and on Vercel without needing to know the deployment's own URL.
async function getRemoteFlags() {
  try {
    return await getRemoteFeatureFlags();
  } catch {
    return null;
  }
}

export default async function LinktreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const remote = await getRemoteFlags();

  return (
    <html lang="pt-BR" suppressHydrationWarning data-lt-installed="true">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body className="antialiased" cz-shortcut-listen="true">
        <Providers remote={remote}>
          {children}
        </Providers>
      </body>
    </html>
  );
}