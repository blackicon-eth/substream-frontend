"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { Badge } from "@/components/shadcn-ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn-ui/pagination";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  Clock,
  Coins,
  CheckCircle,
  Cross,
} from "lucide-react";
import { useIntmaxClient } from "@/components/contexts/intmax-client-provider";
import { useAppKitAccount } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import { TransactionStatus, type Transaction } from "intmax2-client-sdk";

interface CombinedTransaction extends Transaction {
  type: "deposit" | "transfer";
}

const ITEMS_PER_PAGE = 2;

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<CombinedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { userTransfers, userDeposits, client } = useIntmaxClient();
  const { isConnected } = useAppKitAccount();
  const router = useRouter();

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  // Fetch and combine transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!client) return;

      setLoading(true);
      try {
        const [transfers, deposits] = await Promise.all([userTransfers, userDeposits]);

        const combinedTransactions: CombinedTransaction[] = [
          ...transfers.map((tx) => ({ ...tx, type: "transfer" as const })),
          ...deposits.map((tx) => ({ ...tx, type: "deposit" as const })),
        ];

        // Sort by timestamp (most recent first)
        combinedTransactions.sort((a, b) => {
          const timestampA = new Date(a.timestamp || 0).getTime();
          const timestampB = new Date(b.timestamp || 0).getTime();
          return timestampB - timestampA;
        });

        setTransactions(combinedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userTransfers, userDeposits, client]);

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  // Format timestamp
  const formatTimestamp = (timestamp: string | number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Format amount
  const formatAmount = (amount: string | number) => {
    const num = typeof amount === "string" ? Number.parseFloat(amount) : amount;
    return num.toFixed(6);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="pt-12 px-4 sm:px-6 pb-16 sm:pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Transaction History</h1>
          <p className="text-gray-300 text-lg">
            View all your deposits and transfers in chronological order
          </p>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center py-20"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                <span className="text-white text-lg">Loading transactions...</span>
              </div>
            </motion.div>
          ) : transactions.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-radial from-gray-800 to-black/10 border border-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Transactions Found</h3>
              <p className="text-gray-400">
                Your transaction history will appear here once you make your first deposit or
                transfer.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="transactions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Transactions List */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {currentTransactions.map((transaction, index) => (
                    <motion.div
                      key={`${transaction.type}-${transaction.timestamp}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      layout
                    >
                      <Card className="bg-gray-900/50 border-orange-500/20 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
                        <CardContent className="px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Transaction Type Icon */}
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  transaction.type === "transfer"
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-blue-500/10 text-blue-400"
                                }`}
                              >
                                {transaction.type === "transfer" ? (
                                  <ArrowDownLeft className="w-6 h-6" />
                                ) : (
                                  <ArrowUpRight className="w-6 h-6" />
                                )}
                              </div>

                              {/* Transaction Details */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-white font-semibold capitalize">
                                    {transaction.type}
                                  </h3>
                                  <Badge
                                    variant="outline"
                                    className={`${
                                      transaction.type === "transfer"
                                        ? "border-green-500/30 text-green-400"
                                        : "border-blue-500/30 text-blue-400"
                                    }`}
                                  >
                                    {transaction.type}
                                  </Badge>
                                </div>

                                {/* Timestamp */}
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    {transaction.timestamp
                                      ? formatTimestamp(transaction.timestamp)
                                      : "Unknown time"}
                                  </span>
                                </div>

                                {/* Transaction From/To */}
                                {transaction.from && (
                                  <div className="text-gray-500 text-xs mt-1 font-mono">
                                    From: {transaction.from.slice(0, 20)}...
                                  </div>
                                )}
                                {transaction.to && (
                                  <div className="text-gray-500 text-xs mt-1 font-mono">
                                    To: {transaction.to.slice(0, 20)}...
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Amount */}
                            <div className="text-right space-y-0.5">
                              <div className="text-white font-semibold text-lg">
                                {transaction.amount ? formatAmount(transaction.amount) : "N/A"}
                              </div>
                              <div className="flex items-center justify-end gap-3 text-gray-400 text-sm">
                                <div
                                  className={`flex justify-between items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                    transaction.status === TransactionStatus.Completed
                                      ? "bg-green-400/10"
                                      : transaction.status === TransactionStatus.Processing
                                      ? "bg-blue-400/10"
                                      : transaction.status === TransactionStatus.Rejected
                                      ? "bg-red-400/10"
                                      : transaction.status === TransactionStatus.ReadyToClaim
                                      ? "bg-orange-400/10"
                                      : transaction.status === TransactionStatus.NeedToClaim
                                      ? "bg-orange-400/10"
                                      : ""
                                  }`}
                                >
                                  {transaction.status === TransactionStatus.Completed ? (
                                    <>
                                      <CheckCircle className="w-[14px] h-[14px] text-green-400" />
                                      <span className="text-green-400">Completed</span>
                                    </>
                                  ) : transaction.status === TransactionStatus.Processing ? (
                                    <>
                                      <Loader2 className="w-[14px] h-[14px] text-blue-500 animate-spin" />
                                      <span className="text-blue-500">Processing</span>
                                    </>
                                  ) : transaction.status === TransactionStatus.Rejected ? (
                                    <>
                                      <Cross className="w-[14px] h-[14px] text-red-400" />
                                      <span className="text-red-400">Rejected</span>
                                    </>
                                  ) : transaction.status === TransactionStatus.ReadyToClaim ? (
                                    <>
                                      <Clock className="w-[14px] h-[14px] text-orange-500 animate-spin" />
                                      <span className="text-orange-500">Ready to Claim</span>
                                    </>
                                  ) : transaction.status === TransactionStatus.NeedToClaim ? (
                                    <>
                                      <Clock className="w-[14px] h-[14px] text-orange-500 animate-spin" />
                                      <span className="text-orange-500">Need to Claim</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-[14px] h-[14px] text-orange-500 animate-spin" />
                                      <span>Unknown</span>
                                    </>
                                  )}
                                </div>
                                <span className="text-gray-400 text-base">ETH</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex justify-center mt-8"
                >
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          className={`${
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "hover:bg-orange-500/10 hover:text-orange-400 cursor-pointer"
                          } text-white border-gray-700`}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className={`cursor-pointer ${
                              currentPage === page
                                ? "bg-orange-500 text-white border-orange-500"
                                : "text-white border-gray-700 hover:bg-orange-500/10 hover:text-orange-400"
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          className={`${
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "hover:bg-orange-500/10 hover:text-orange-400 cursor-pointer"
                          } text-white border-gray-700`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}

              {/* Transaction Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute top-[68px] right-4 z-10"
              >
                <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="hidden">
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="px-5">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{transactions.length}</div>
                        <div className="text-gray-400 text-xs">Total</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">
                          {transactions.filter((tx) => tx.type === "deposit").length}
                        </div>
                        <div className="text-gray-400 text-xs">Deposits</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-400">
                          {transactions.filter((tx) => tx.type === "transfer").length}
                        </div>
                        <div className="text-gray-400 text-xs">Transfers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
