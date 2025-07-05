"use client";

import AppKitProvider from "@/components/contexts/appkit-provider";
import { NamesProvider } from "@/components/contexts/names-provider";

export default function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  return (
    <AppKitProvider cookies={cookies}>
      <NamesProvider>{children}</NamesProvider>
    </AppKitProvider>
  );
}
