"use client";

import AppKitProvider from "@/components/contexts/appkit-provider";
import { IntmaxClientProvider } from "@/components/contexts/intmax-client-provider";
import { NamesProvider } from "@/components/contexts/names-provider";
import { UserProvider } from "@/components/contexts/user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppKitProvider cookies={cookies}>
        <IntmaxClientProvider>
          <UserProvider>
            <NamesProvider>{children}</NamesProvider>
          </UserProvider>
        </IntmaxClientProvider>
      </AppKitProvider>
    </QueryClientProvider>
  );
}
