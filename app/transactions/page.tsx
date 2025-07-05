import { useIntmaxClient } from "@/components/contexts/intmax-client-provider";
import { useEffect } from "react";

export default function Transactions() {
  const { client } = useIntmaxClient();

  useEffect(() => {
    console.log("client", client?.address);
  }, [client]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-black p-10">
      <h1>Transactions</h1>
    </div>
  );
}
