import { Transaction, TransactionStatus, TransactionType } from "intmax2-client-sdk";

// ENS Resolvers
export const ENS_PUBLIC_RESOLVER_ADDRESS = "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63";
export const ENS_PUBLIC_RESOLVER_ADDRESS_2 = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

// Base Names Resolver
export const BASENAME_L2_RESOLVER_ADDRESS = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

// Mock transaction data based on INTMAX SDK examples
export const mockTransfers: Transaction[] = [
  {
    digest: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: Date.now() - 86400000, // 1 day ago
    amount: "0.001",
    tokenAddress: "ETH",
    status: TransactionStatus.Completed,
    from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    to: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    transfers: [],
    tokenIndex: 0,
    txType: TransactionType.Receive,
  },
  {
    digest: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    timestamp: Date.now() - 3600000, // 1 hour ago
    amount: "0.005",
    tokenAddress: "USDC",
    status: TransactionStatus.Rejected,
    from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    to: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    transfers: [],
    tokenIndex: 0,
    txType: TransactionType.Receive,
  },
];

export const mockDeposits: Transaction[] = [
  {
    digest: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    timestamp: Date.now() - 172800000, // 2 days ago
    amount: "0.01",
    tokenAddress: "ETH",
    status: TransactionStatus.NeedToClaim,
    from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    to: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    transfers: [],
    tokenIndex: 0,
    txType: TransactionType.Deposit,
  },
];
