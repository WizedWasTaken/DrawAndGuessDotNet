"use client";

import React, { createContext, useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

type SignalRContextType = {
  connection: HubConnection | null;
  startConnection: () => Promise<void>;
  stopConnection: () => Promise<void>;
  connectionState: string;
};

export const SignalRContext = createContext<SignalRContextType | null>(null);

export const SignalRProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connectionState, setConnectionState] =
    useState<string>("Disconnected");

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    // Event handlers
    newConnection.onreconnecting(() => setConnectionState("Reconnecting"));
    newConnection.onreconnected(() => setConnectionState("Connected"));

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnectionState("Connected");
        console.log("SignalR Connected");
      } catch (error: any) {
        setConnectionState("Disconnected");
        console.error("Error starting connection:", error.message);
      }
    };

    const stopConnection = async () => {
      try {
        await newConnection.stop();
        setConnectionState("Disconnected");
        console.log("SignalR Disconnected");
      } catch (error: any) {
        console.error("Error stopping connection:", error.message);
      }
    };

    // Start the connection on mount
    startConnection();

    // Cleanup connection on unmount
    return () => {
      stopConnection();
    };
  }, [url]);

  return (
    <SignalRContext.Provider
      value={{
        connection,
        startConnection: () => connection?.start() || Promise.resolve(),
        stopConnection: () => connection?.stop() || Promise.resolve(),
        connectionState,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
