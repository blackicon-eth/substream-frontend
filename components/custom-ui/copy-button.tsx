import { useState } from "react";
import { Copy, Loader2, Check } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CopyButton({ text, className = "", size = "md" }: CopyButtonProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleCopy = async () => {
    if (isCopying) return;

    setIsCopying(true);

    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setHasCopied(true);
        setIsCopying(false);
        toast.success("Copied to clipboard!");
        // Wait 1000ms then reset
        setTimeout(() => {
          setHasCopied(false);
        }, 2000);
      }, 1000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      setIsCopying(false);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      disabled={isCopying}
      variant="ghost"
      size="sm"
      className={`${sizeClasses[size]} p-0 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait">
        {isCopying ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className={`${iconSizes[size]} animate-spin text-orange-500`} />
          </motion.div>
        ) : hasCopied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Check className={`${iconSizes[size]} text-green-500`} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Copy
              className={`${iconSizes[size]} text-gray-400 hover:text-orange-500 transition-colors`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
