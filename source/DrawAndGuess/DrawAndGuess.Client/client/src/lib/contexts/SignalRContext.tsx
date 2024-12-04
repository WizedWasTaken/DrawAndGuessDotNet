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

let connectionInstance: HubConnection | null = null; // Singleton instance
console.log(connectionInstance);

export const SignalRProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(
    connectionInstance
  );
  const [connectionState, setConnectionState] =
    useState<string>("Disconnected");

  useEffect(() => {
    if (connection) return; // Skip if connection already exists

    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Trace)
      .build();

    connectionInstance = newConnection; // Assign to singleton instance
    setConnection(newConnection);

    // Event handlers
    newConnection.onreconnecting(() => setConnectionState("Reconnecting"));
    newConnection.onreconnected(() => setConnectionState("Connected"));

    startConnection();

    // Cleanup connection on unmount
    return () => {
      // Only close if this is the last component using the connection
    };
  }, [url]); // Removed `connection` from dependency array

  const startConnection = async () => {
    if (!connection) return;

    try {
      await connection.start();
      setConnectionState("Connected");
      console.log("SignalR Connected");
    } catch (error: any) {
      setConnectionState("Disconnected");
      console.error("Error starting connection:", error.message);
    }
  };

  const stopConnection = async () => {
    if (!connection) return;

    try {
      await connection.stop();
      setConnectionState("Disconnected");
      console.log("SignalR Disconnected");
    } catch (error: any) {
      console.error("Error stopping connection:", error.message);
    }
  };

  return (
    <SignalRContext.Provider
      value={{ connection, startConnection, stopConnection, connectionState }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
