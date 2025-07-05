import { ReactNode } from "react";
import Header from "@/components/custom-ui/header";
import { usePathname } from "next/navigation";

const disabledPaths = ["/test"];

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  if (disabledPaths.includes(pathname)) return <>{children}</>;

  // The padding top and bottom are hardcoded here because the header and footer are fixed
  return (
    <div className="pt-[66px] sm:pt-[80px] min-h-screen bg-background text-white transition-all duration-300">
      <Header />
      {children}
    </div>
  );
};
