"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/shadcn-ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/shadcn-ui/sheet";
import Link from "next/link";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 bg-black border-b border-orange-500/20 w-full z-50 sm:px-6 px-2 h-[66px] sm:h-[80px]">
      <div className="flex items-center justify-between h-16 sm:h-20">
        {/* Mobile: Hamburger Menu */}
        <div className="sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="flex items-center justify-center">
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-black border-orange-500/20 w-80">
              <SheetTitle className="hidden">Substream</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between py-4 pl-4 border-b border-orange-500/20">
                  <div className="text-2xl font-bold text-white">
                    <span className="text-orange-500">Sub</span>stream
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-orange-500 hover:bg-orange-500/10"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 py-6 pl-4">
                  <ul className="space-y-4">
                    {navigationLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="block text-lg font-medium text-white hover:text-orange-500 transition-colors duration-200 py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
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
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white hover:text-orange-500 transition-colors duration-200 font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button - Right side on both mobile and desktop */}
        <div className="flex items-center">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 transition-all duration-200 hover:scale-105">
            Connect
          </Button>
        </div>
      </div>
    </header>
  );
}
