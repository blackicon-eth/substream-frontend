"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Loader2, Globe, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import Link from "next/link";
import ky from "ky";
import { toast } from "sonner";
import { useIntmaxClient } from "@/components/contexts/intmax-client-provider";

interface SubdomainResponse {
  newSubdomain: string;
}

export default function Home() {
  const [requestedSubdomain, setRequestedSubdomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newSubdomain, setNewSubdomain] = useState<string>();
  const { isLoggedIn } = useIntmaxClient();

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestedSubdomain.trim()) return;

    setIsLoading(true);

    try {
      const response = await ky
        .post("/api/create-subdomain", { json: { name: requestedSubdomain } })
        .json<SubdomainResponse>();

      setNewSubdomain(response.newSubdomain);
    } catch (error) {
      toast.error("Failed to create subdomain. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
            <CardContent className="px-8">
              {!newSubdomain && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Enter your desired name"
                          value={requestedSubdomain}
                          onChange={(e) => setRequestedSubdomain(e.target.value)}
                          className="bg-black/50 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 pr-32 h-12 text-lg"
                          disabled={isLoading}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          .substream.eth
                        </div>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || !requestedSubdomain.trim()}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium h-12 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                      style={{ width: "170px", minWidth: "170px", flexShrink: 0 }}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Globe className="w-5 h-5" />
                          Get Subdomain
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Result Display */}
              <AnimatePresence mode="wait">
                {newSubdomain && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    {newSubdomain ? (
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <h3 className="text-green-400 font-semibold">Success!</h3>
                        </div>
                        <p className="text-white mb-3">
                          Your subdomain has been created successfully:
                        </p>
                        <div className="bg-black/30 rounded-md p-3 mb-4">
                          <code className="text-orange-400 text-lg font-mono">
                            {newSubdomain}.substream.eth
                          </code>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <h3 className="text-red-400 font-semibold">Error</h3>
                        </div>
                        <p className="text-white mb-3">Something went wrong. Please try again.</p>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </motion.div>
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
