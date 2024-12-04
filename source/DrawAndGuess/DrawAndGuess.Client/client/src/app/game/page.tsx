"use client";

import { useSignalR } from "@/lib/hooks/UseSignalR";

export default function Game() {
  const { connection } = useSignalR();

  return (
    <div>
      <h1>Game</h1>
      <p>Status: {connection?.state}</p>
    </div>
  );
}
