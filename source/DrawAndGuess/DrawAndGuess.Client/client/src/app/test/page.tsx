"use client";

import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useSignalRListener } from "@/lib/hooks/UseSignalRListener";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { connection, connectionState } = useSignalR();
  const [message, setMessage] = useState<string>("");

  useSignalRListener("ReceiveMessage", (msg: string) => {
    setMessage(msg);
  });

  const sendMessage = async () => {
    if (!connection) return;

    await connection.send("Testing");
  };

  // Use Effects for useSignalR

  useEffect(() => {
    console.log("Connection State: ", connectionState);
    console.log("Connection: ", connection);
  }, [connectionState, connection]);

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Test Page</h1>
      <p className="mt-4 text-lg">
        Status:{" "}
        <span className="font-semibold">{connection?.state || "Loading"}</span>
      </p>
      <div className="mt-8">
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Send Test Message
        </button>
      </div>
      <p>Besked: {message}</p>
    </div>
  );
}
