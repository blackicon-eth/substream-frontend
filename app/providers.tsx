"use client";

import AppKitProvider from "@/components/contexts/appkit-provider";
import { NavigationProvider } from "@/components/contexts/navigation-provider";

export default function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  return (
    <AppKitProvider cookies={cookies}>
      <NavigationProvider>{children}</NavigationProvider>
    </AppKitProvider>
  );
}
