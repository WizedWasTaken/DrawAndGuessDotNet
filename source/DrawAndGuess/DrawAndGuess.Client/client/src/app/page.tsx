"use client";

import { useSignalRListener } from "@/lib/hooks/UseSignalRListener";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  useSignalRListener("ReceiveMessage", (msg: string) => {
    setMessage(msg);
  });

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1>
        <span className="font-bold">Besked:</span> {message || "Ingen besked."}
      </h1>
    </div>
  );
}
