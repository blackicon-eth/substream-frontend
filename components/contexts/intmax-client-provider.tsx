import { IntMaxClient, Transaction } from "intmax2-client-sdk";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const IntmaxClientContext = createContext<IntmaxClientContextType | undefined>(undefined);

export type IntmaxClientContextType = {
  client: IntMaxClient | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  userTransfers: Promise<Transaction[]>;
  userDeposits: Promise<Transaction[]>;
};

export const useIntmaxClient = () => {
  const context = useContext(IntmaxClientContext);
  if (!context) {
    throw new Error("useIntmaxClient must be used within a IntmaxClientProvider");
  }
  return context;
};

export const IntmaxClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<IntMaxClient | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the client on mount
  useEffect(() => {
    const initializeClient = async () => {
      try {
        setLoading(true);
        setError(null);

        const newClient = await IntMaxClient.init({
          environment: "testnet",
        });

        setClient(newClient);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to initialize client";
        setError(errorMessage);
        console.error("IntMax Client initialization failed:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, []);

  // Login the user
  const login = useCallback(async () => {
    if (!client) {
      setError("Client not initialized");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await client.login();
      setIsLoggedIn(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  }, [client]);

  // Logout the user
  const logout = useCallback(async () => {
    if (!client) return;

    try {
      setLoading(true);
      await client.logout();
      setIsLoggedIn(false);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  }, [client]);

  // Get all the user's transfers
  const userTransfers = useMemo(async () => {
    if (!client?.address) return [];
    try {
      const transfers = await client.fetchTransfers({
        pageSize: 100,
        sortOrder: "desc",
        sortBy: "timestamp",
      });
      return transfers;
    } catch (err) {
      console.error("Failed to fetch transfers:", err);
      return [];
    }
  }, [client?.address]);

  // Get all the user's deposits
  const userDeposits = useMemo(async () => {
    if (!client?.address) return [];
    try {
      const deposits = await client.fetchDeposits({
        pageSize: 100,
        sortOrder: "desc",
        sortBy: "timestamp",
      });
      return deposits;
    } catch (err) {
      console.error("Failed to fetch deposits:", err);
      return [];
    }
  }, [client?.address]);

  const value = useMemo(
    () => ({
      client,
      isLoggedIn,
      loading,
      error,
      login,
      logout,
      userTransfers,
      userDeposits,
    }),
    [client, isLoggedIn, loading, error, login, logout, userTransfers, userDeposits]
  );

  return <IntmaxClientContext.Provider value={value}>{children}</IntmaxClientContext.Provider>;
};
