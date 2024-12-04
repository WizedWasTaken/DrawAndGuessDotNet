"use client";

import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useState, useEffect } from "react";

export default function Home() {
  const { connection } = useSignalR();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (message) => {
        setMessage(message);
      });

      return () => {
        connection.off("ReceiveMessage");
      };
    }
  }, [connection]);

  const sendMessage = async () => {
    if (!connection) return;

    await connection.send("Testing");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Home</h1>

      <p className="mt-4 text-lg">
        Status:{" "}
        <span className="font-semibold">{connection?.state || "Loading"}</span>
      </p>

      {/* TESTING */}
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
