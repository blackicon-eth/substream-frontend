"use client";

import type React from "react";

import { useState } from "react";
import { Globe, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import Link from "next/link";
import SubdomainForm from "@/components/custom-ui/subdomain-form";
import CopyButton from "@/components/custom-ui/copy-button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Button } from "@/components/shadcn-ui/button";
import { useRegisteredUser } from "@/components/contexts/user-provider";

export default function Home() {
  const [newSubdomain, setNewSubdomain] = useState<string>();
  const { isConnected } = useAppKitAccount();
  const { user, isLoadingUser } = useRegisteredUser();
  const { open } = useAppKit();

  return (
    <div className="pt-12 px-4 sm:px-0 pb-16 sm:pb-0">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Get Your Personal
            <span className="text-orange-500 block">Subdomain</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your unique{" "}
            <Link href="https://ens.domains" target="_blank" className="text-orange-500 underline">
              <img src="/logos/ens.svg" alt="ENS" className="inline-block w-5 h-5 pr-1 mb-1" />
              ENS
            </Link>{" "}
            subdomain and use it to receive money straight into your{" "}
            <Link href="https://intmax.io" target="_blank" className="text-orange-500 underline">
              <img src="/logos/intmax_text.png" alt="Intmax" className="inline-block h-6" />
            </Link>
            account.
          </p>
        </motion.div>

        {/* Subdomain Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm overflow-hidden w-full">
            <CardContent className="flex justify-center items-center px-8 w-full">
              <AnimatePresence mode="wait">
                {isLoadingUser ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center items-center"
                  >
                    <Loader2 className="w-7 h-7 text-orange-500 animate-spin" />
                  </motion.div>
                ) : !isConnected ? (
                  <motion.div
                    key="not-connected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 transition-all duration-200 hover:scale-102 w-full cursor-pointer"
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
                      Connect Wallet
                    </Button>
                  </motion.div>
                ) : newSubdomain ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 w-full"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className="text-green-400 font-semibold">Success!</h3>
                    </div>
                    <p className="text-white mb-3">Your subdomain has been created successfully:</p>
                    <div className="relative bg-black/30 rounded-md p-3 mb-4 flex items-center justify-center">
                      <code className="text-orange-400 text-lg font-mono">{newSubdomain}</code>
                      <CopyButton text={`${newSubdomain}`} size="md" className="absolute right-3" />
                    </div>
                  </motion.div>
                ) : !isLoadingUser && !newSubdomain && user?.subdomain ? (
                  <motion.div
                    key="existing-subdomain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 w-full"
                  >
                    <p className="text-white mb-3">Your claimed subdomain is:</p>
                    <div className="relative bg-black/30 rounded-md p-3 mb-4 flex items-center justify-center">
                      <code className="text-orange-400 text-lg font-mono">{user.subdomain}</code>
                      <CopyButton text={user.subdomain} size="md" className="absolute right-3" />
                    </div>
                  </motion.div>
                ) : (
                  <SubdomainForm key="form" setNewSubdomain={setNewSubdomain} />
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Setup</h3>
            <p className="text-gray-400">
              Get your subdomain up and running in seconds with our automated system.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">
              Built with security in mind, ensuring your subdomain is always accessible.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Full Control</h3>
            <p className="text-gray-400">
              Manage your subdomain settings and configurations with complete control.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
