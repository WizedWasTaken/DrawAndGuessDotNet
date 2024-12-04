"use client";

import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useSignalRListener } from "@/lib/hooks/UseSignalRListener";
import { useEffect, useState } from "react";

export default function Home() {
  const { connection, startConnection, stopConnection, connectionState } =
    useSignalR();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      <div className="space-x-4">
        <button
          onClick={startConnection}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Start Connection
        </button>
        <button
          onClick={stopConnection}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Stop Connection
        </button>
      </div>
      <p className="mt-4 text-lg">
        Status: <span className="font-semibold">{connectionState}</span>
      </p>
      <p className="mt-4 text-lg">
        Connection ID:{" "}
        <span className="font-semibold">
          {connection?.connectionId || "N/A"}
        </span>
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
