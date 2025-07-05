import { useAppKitAccount } from "@reown/appkit/react";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getEnsAvatar, getEnsName } from "@/lib/names/ens";
import { getBaseName } from "@/lib/names/base-names";
import { Address } from "viem";

export const NamesContext = createContext<NamesContextType | undefined>(undefined);

export type NamesContextType = {
  userNames: {
    ens: string;
    baseName: string;
    preferredName: string | undefined;
    isFetching: boolean;
    ensAvatar: string;
  };
};

export const useNames = () => {
  const context = useContext(NamesContext);
  if (!context) {
    throw new Error("useNames must be used within a NamesProvider");
  }
  return context;
};

export const NamesProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAppKitAccount();
  const [connectedUserEns, setConnectedUserEns] = useState<string>("");
  const [connectedUserBaseName, setConnectedUserBaseName] = useState<string>("");
  const [connectedUserEnsAvatar, setConnectedUserEnsAvatar] = useState<string>("");
  const [isFetchingUserNames, setIsFetchingUserNames] = useState(false);

  // Gets the Connected User ENS and Base Name from the address
  useEffect(() => {
    const fetchNames = async () => {
      if (!address) return;
      setIsFetchingUserNames(true);

      try {
        // Get the ENS domain from the address
        const ens = await getEnsName(address as Address);

        // Get the ENS avatar from the address
        const ensAvatar = ens ? await getEnsAvatar(ens) : "";

        // Get the Base Name from the address
        const baseName = await getBaseName(address as Address);

        setConnectedUserBaseName(baseName);
        setConnectedUserEns(ens);
        setConnectedUserEnsAvatar(ensAvatar);
      } catch (error) {
        console.error("Error getting ENS names");
      } finally {
        setIsFetchingUserNames(false);
      }
    };

    fetchNames();
  }, [address]);

  const connectedUserPreferredName = useMemo(() => {
    return connectedUserEns
      ? connectedUserEns
      : connectedUserBaseName
      ? connectedUserBaseName
      : undefined;
  }, [connectedUserEns, connectedUserBaseName]);

  const value = useMemo(
    () => ({
      userNames: {
        ens: connectedUserEns,
        baseName: connectedUserBaseName,
        preferredName: connectedUserPreferredName,
        isFetching: isFetchingUserNames,
        ensAvatar: connectedUserEnsAvatar,
      },
    }),
    [connectedUserEns, connectedUserBaseName, connectedUserEnsAvatar]
  );

  return <NamesContext.Provider value={value}>{children}</NamesContext.Provider>;
};
