"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useSignalRListener } from "@/lib/hooks/UseSignalRListener";
import { useEffect, useState } from "react";
import Changelog from "@/components/Changelog";
import { Button } from "./ui/button";

export default function TechnicalInformation() {
  const { connection } = useSignalR();

  const [userCount, setUserCount] = useState<number | null>(null);
  const [browserInfo, setBrowserInfo] = useState<string>("");
  const [screenResolution, setScreenResolution] = useState<string>("");

  useSignalRListener("userCountChanged", (userCount: number) => {
    console.log("User count changed", userCount);
    setUserCount(userCount);
  });

  const fetchUserCount = async () => {
    if (connection?.state === "Connected") {
      console.log("Sending GetConnectedCount");
      await connection.send("GetConnectedCount");
    }
  };

  useEffect(() => {
    fetchUserCount();

    // Get browser information
    const userAgent = navigator.userAgent;
    const browserName = navigator.appName;
    const fullVersion = navigator.appVersion;
    setBrowserInfo(`${browserName} ${fullVersion} (${userAgent})`);

    // Get screen resolution
    const width = window.screen.width;
    const height = window.screen.height;
    setScreenResolution(`${width}x${height}`);
  }, [connection]);

  return (
    <div className="fixed bottom-4 left-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={fetchUserCount}
            className="p-3 bg-zinc-800 text-zinc-100 rounded-full shadow-lg hover:bg-zinc-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            ℹ
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-100 max-h-3/4 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
          <DialogHeader>
            <DialogTitle>Informationer</DialogTitle>
            <div className="flex flex-col gap-3">
              <section className="flex flex-col mt-10 gap-6">
                <p>
                  Dette projekt er lavet af Noah A. Nielsen. Koden er
                  open-source og kan findes{" "}
                  <a
                    className="text-blue-400 underline"
                    href="https://github.com/WizedWasTaken/DrawAndGuessDotNet"
                  >
                    her.
                  </a>
                </p>
                <p>
                  Dette projekt er lavet med ASP.NET Core, SignalR, Next.js og
                  TypeScript.
                </p>
              </section>

              <Changelog />

              {connection?.state === "Connected" && (
                <section className="flex flex-col gap-3">
                  <h2 className="text-2xl font-bold pb-6">
                    Tekniske informationer
                  </h2>
                  <p>
                    Connection ID:{" "}
                    {connection?.connectionId || "Ingen connection"}
                  </p>
                  <p>
                    Connection State: {connection?.state || "Ingen connection"}
                  </p>
                  <p>
                    Antal brugere:{" "}
                    {userCount !== null ? userCount : "Ingen connection"}
                  </p>
                  <p>Browser Information: {browserInfo}</p>
                  <p>Screen Resolution: {screenResolution}</p>
                </section>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
