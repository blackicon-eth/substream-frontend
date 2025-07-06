import { motion } from "framer-motion";
import { Input } from "../shadcn-ui/input";
import { Button } from "../shadcn-ui/button";
import { Globe, Loader2 } from "lucide-react";
import { useIntmaxClient } from "../contexts/intmax-client-provider";
import { toast } from "sonner";
import ky from "ky";
import { useState } from "react";
import { useRegisteredUser } from "../contexts/user-provider";
import { useAppKitAccount } from "@reown/appkit/react";

interface SubdomainFormProps {
  setNewSubdomain: (subdomain: string) => void;
}

export default function SubdomainForm({ setNewSubdomain }: SubdomainFormProps) {
  const [requestedSubdomain, setRequestedSubdomain] = useState("");
  const [isCreatingSubdomain, setIsCreatingSubdomain] = useState(false);
  const { isLoggedIn, login, client } = useIntmaxClient();
  const { refetchUser } = useRegisteredUser();
  const { address } = useAppKitAccount();

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedSubdomain.trim()) return;

    setIsCreatingSubdomain(true);

    if (!isLoggedIn) {
      await login();
    }

    try {
      // Call the TEE to register the subdomain
      await ky.post(`/api/register`, {
        json: { subname: requestedSubdomain, intmax_address: client?.address },
      });

      setNewSubdomain(`${requestedSubdomain}.stealthmax.eth`);

      // Update the user with the subdomain in the database
      await ky
        .put("/api/user/update", {
          json: { evmAddress: address, subdomain: `${requestedSubdomain}.stealthmax.eth` },
        })
        .json();
      refetchUser();
    } catch (error) {
      toast.error("Failed to create subdomain. Please try again.");
    } finally {
      setIsCreatingSubdomain(false);
    }
  };

  // Whether the button is disabled
  const isButtonDisabled = isCreatingSubdomain || !requestedSubdomain.trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
                disabled={isCreatingSubdomain}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                .stealthmax.eth
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isButtonDisabled}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium h-12 transition-all duration-200 hover:scale-103 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
            style={{ width: "170px", minWidth: "170px", flexShrink: 0 }}
          >
            {isCreatingSubdomain ? (
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
    </motion.div>
  );
}
