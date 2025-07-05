import { useIntmaxClient } from "@/components/contexts/intmax-client-provider";
import { useEffect } from "react";

export default function Transfers() {
  const { client } = useIntmaxClient();

  useEffect(() => {
    console.log("client", client.);
  }, [client]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-black p-10">
      <h1>Transfers</h1>
    </div>
  );
}
