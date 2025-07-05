"use client";

import { wagmiAdapter, projectId } from "@/lib/appkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { env } from "@/lib/env";
import { mainnet, sepolia } from "@reown/appkit/networks";

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: "Substream",
  description: "Substream is a platform for generating your intmax ens subdomain",
  url: env.NEXT_PUBLIC_URL,
  icons: [],
};

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, sepolia],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true,
    connectMethodsOrder: ["wallet"],
  },
});

function AppKitProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppKitProvider;
