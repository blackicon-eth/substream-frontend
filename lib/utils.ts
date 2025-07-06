import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AlchemyRpcBaseUrls } from "./enums";
import { env } from "./env";
import { Chain, createPublicClient, http } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates an address to the given size keeping the 0x prefix
 * @param address - The address to truncate
 * @param size - The size of the truncated address
 * @returns The truncated address
 */
export const truncateAddress = (address: string, size: number = 4) => {
  return `${address.slice(0, size + 2)}...${address.slice(-size)}`;
};

/**
 * Gets a viem public client for a given chain
 * @param chain - The chain
 * @returns The viem public client
 */
export const getViemPublicClient = (chain: Chain) => {
  return createPublicClient({
    chain,
    transport: http(
      `${AlchemyRpcBaseUrls[chain.name.toLowerCase() as keyof typeof AlchemyRpcBaseUrls]}/${
        env.NEXT_PUBLIC_ALCHEMY_API_KEY
      }`
    ),
  });
};

/**
 * Formats a timestamp to a human readable string
 * @param timestamp - The timestamp to format
 * @returns The formatted timestamp
 */
export const formatTimestamp = (timestamp: string | number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

/**
 * Formats an amount to a human readable string
 * @param amount - The amount to format
 * @returns The formatted amount
 */
export const formatAmount = (amount: string | number) => {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  return num.toFixed(6);
};
