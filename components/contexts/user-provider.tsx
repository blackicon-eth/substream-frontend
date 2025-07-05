import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { User } from "@/lib/db/schemas/db.schema";
import { useIntmaxClient } from "./intmax-client-provider";
import { useAppKitAccount } from "@reown/appkit/react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import ky from "ky";

const UserProviderContext = createContext<
  | {
      user: User | undefined;
      isLoadingUser: boolean;
      userError: Error | null;
      refetchUser: () => Promise<QueryObserverResult<User | undefined, Error>>;
    }
  | undefined
>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const useRegisteredUser = () => {
  const context = useContext(UserProviderContext);
  if (!context) {
    throw new Error("useRegisteredUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { client } = useIntmaxClient();
  const { isConnected, address } = useAppKitAccount();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", address],
    queryFn: () => {
      return ky.get<User>(`/api/user?address=${address}`).json();
    },
    refetchOnWindowFocus: false,
    enabled: isConnected && !!address,
    retry: false,
  });

  // If the query has finished and the user is not here, create a new user
  useEffect(() => {
    const createUser = async () => {
      if (!isLoadingUser && !user && address && isConnected) {
        await ky.post("/api/user/create", { json: { address } }).json();
        refetchUser();
      }
    };

    createUser();
  }, [isLoadingUser, user, address, refetchUser, isConnected]);

  // If the client.address is full we need to update the user if the user's intmax address is empty
  useEffect(() => {
    const updateUser = async () => {
      if (isConnected && address && user && !user.intmaxAddress && client?.address) {
        await ky
          .put("/api/user/update", { json: { evmAddress: address, intmaxAddress: client.address } })
          .json();
        refetchUser();
      }
    };

    updateUser();
  }, [isConnected, address, user, client?.address]);

  const value = useMemo(
    () => ({ user, isLoadingUser, userError, refetchUser }),
    [user, isLoadingUser, userError, refetchUser]
  );

  return <UserProviderContext.Provider value={value}>{children}</UserProviderContext.Provider>;
};
