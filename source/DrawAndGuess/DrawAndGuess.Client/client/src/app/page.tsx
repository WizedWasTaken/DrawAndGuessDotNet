"use client";

import { useSignalR } from "@/lib/hooks/UseSignalR";

export default function Home() {
  const { connection, startConnection, stopConnection } = useSignalR();
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
        Status: <span className="font-semibold">{connection?.state}</span>
      </p>
    </div>
  );
}
