"use client";

import { useSignalR } from "@/lib/hooks/UseSignalR";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const { connection } = useSignalR();
  return (
    <footer className="flex p-5 text-lg justify-between items-center relative">
      <section>
        {/* <p className="text-sm">
          Connection ID: {connection?.connectionId || "N/A"}
        </p>
        <p className="text-sm">
          Connection State: {connection?.state || "N/A"}
        </p> */}
      </section>
      <section className="absolute font-bold inset-0 flex items-center justify-center">
        Made with ❤ by Noah Nielsen
      </section>
      <section className="z-10">
        <a href="https://github.com/WizedWasTaken/DrawAndGuessDotNet">
          <Github />
        </a>
      </section>
    </footer>
  );
}
