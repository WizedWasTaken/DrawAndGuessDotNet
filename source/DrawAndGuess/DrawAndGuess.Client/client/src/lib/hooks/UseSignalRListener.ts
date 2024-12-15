import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useEffect } from "react";

export const useSignalRListener = (
  event: string,
  handler: (...args: any[]) => void
) => {
  const { connection } = useSignalR();

  useEffect(() => {
    if (!connection) return;

    connection.on(event, handler);

    return () => {
      connection.off(event, handler);
    };
  }, [connection, event, handler]);
};
