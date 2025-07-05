"use client";

import { NavigationProvider } from "@/components/contexts/navigation-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NavigationProvider>{children}</NavigationProvider>;
}
