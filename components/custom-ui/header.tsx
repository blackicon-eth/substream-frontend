"use client";

import { useState, useEffect } from "react";
import { Loader2, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/shadcn-ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/shadcn-ui/sheet";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { truncateAddress } from "@/lib/utils";
import { useNames } from "../contexts/names-provider";

const navigationLinks = [
  { name: "Subdomain", href: "/", disabledIfDisconnected: false },
  { name: "Transactions", href: "/transactions", disabledIfDisconnected: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, address, status } = useAppKitAccount();
  const { open } = useAppKit();
  const { userNames } = useNames();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to home page when wallet disconnects
  useEffect(() => {
    if (!isConnected && pathname !== "/") {
      router.push("/");
    }
  }, [isConnected, pathname, router]);

  return (
    <header className="sticky top-0 bg-gradient-to-b from-black to-black/10 border-b border-orange-500/70 w-full z-50 sm:px-6 px-2 h-[66px] sm:h-[80px]">
      <div className="flex items-center justify-between h-16 sm:h-20 w-full">
        {/* Mobile: Hamburger Menu */}
        <div className="sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="flex items-center justify-center">
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-radial from-black to-black/90 border-orange-500/20 w-80"
            >
              <SheetTitle>
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between py-4 pl-4 border-b border-orange-500/20">
                  <div className="text-2xl font-bold text-white">
                    <span className="text-orange-500">Sub</span>stream
                  </div>
                </div>
              </SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Navigation Links */}
                <nav className="flex-1 py-1 pl-4">
                  <ul className="space-y-4">
                    {navigationLinks.map((link, index) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            className={`block text-lg font-medium transition-colors duration-200 py-2 ${
                              isActive ? "text-orange-500" : "text-white hover:text-orange-500"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - Center on mobile, Left on desktop */}
        <div className="flex justify-start w-full sm:w-auto pl-3 sm:pl-0">
          <Link
            href="/"
            className="flex items-center justify-center text-2xl sm:text-3xl font-bold text-white gap-3"
          >
            <img src="/images/logo.png" alt="Substream" className="sm:w-11 sm:h-11 w-10 h-10" />
            <p className="text-white -mb-[2px] hidden sm:block">
              <span className="text-orange-500">Sub</span>stream
            </p>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden sm:flex flex-1 justify-center">
          <ul className="flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 font-medium relative group ${
                      link.disabledIfDisconnected && !isConnected
                        ? "opacity-50 cursor-default text-white"
                        : isActive
                        ? "text-orange-500"
                        : "text-white hover:text-orange-500"
                    }`}
                    onClick={(e) => {
                      if (link.disabledIfDisconnected && !isConnected) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-200 ${
                        link.disabledIfDisconnected && !isConnected
                          ? "opacity-0 w-0 group-hover:w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button - Right side on both mobile and desktop */}

        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 transition-all duration-200 hover:scale-104 overflow-hidden"
          onClick={() => {
            if (isConnected) {
              open({
                view: "Account",
              });
            } else {
              open({ view: "Connect" });
            }
          }}
        >
          <AnimatePresence mode="wait">
            {!isConnected || status === "connecting" || status === "reconnecting" ? (
              <motion.div
                key="connect"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
              >
                Connect
              </motion.div>
            ) : userNames.isFetching ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>
            ) : userNames.ens ? (
              <motion.div
                key={userNames.ens}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                {userNames.ens}
                <img
                  src={userNames.ensAvatar}
                  alt="ENS"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-cover rounded-full"
                />
              </motion.div>
            ) : isConnected && address ? (
              <motion.div
                key={address}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                {truncateAddress(address)}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Button>
      </div>
    </header>
  );
}
