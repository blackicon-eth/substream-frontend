import { Transaction, TransactionStatus, TransactionType } from "intmax2-client-sdk";

// ENS Resolvers
export const ENS_PUBLIC_RESOLVER_ADDRESS = "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63";
export const ENS_PUBLIC_RESOLVER_ADDRESS_2 = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

// Base Names Resolver
export const BASENAME_L2_RESOLVER_ADDRESS = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

// Mock transaction data based on INTMAX SDK examples
export const mockTransfers: Transaction[] = [
  {
    digest: "0x8a7b3c9d2e1f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    timestamp: Date.now() - 180000, // 3 minutes ago
    amount: "0.001",
    tokenAddress: "ETH",
    status: TransactionStatus.Processing,
    from: "T5YpaxZnKfT8s7DdFqGbCZqRjPWGvpB1nEktXNdR9uj6d6aPRLsXnHmb3vQpM9RwTu6VTVKjJjPX8ySZnvGoUjzefyc4m9",
    to: "T8BSmuBQihR5yMaWhbujyVQ6Miagw6uwLUhXraQ5HqYfeUeaJK3AusPXze33b1HG1eCubAUTqy5cHWnGHWtengcdKgr2iWp",
    transfers: [],
    tokenIndex: 0,
    txType: TransactionType.Receive,
  },
];

export const mockDeposits: Transaction[] = [
  // {
  //   digest: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
  //   timestamp: Date.now() - 172800000, // 2 days ago
  //   amount: "0.01",
  //   tokenAddress: "ETH",
  //   status: TransactionStatus.Completed,
  //   from: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  //   to: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  //   transfers: [],
  //   tokenIndex: 0,
  //   txType: TransactionType.Deposit,
  // },
];
