import { IntMaxClient } from "intmax2-client-sdk";
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

  const value = useMemo(
    () => ({
      client,
      isLoggedIn,
      loading,
      error,
      login,
      logout,
    }),
    [client, isLoggedIn, loading, error, login, logout]
  );

  return <IntmaxClientContext.Provider value={value}>{children}</IntmaxClientContext.Provider>;
};
