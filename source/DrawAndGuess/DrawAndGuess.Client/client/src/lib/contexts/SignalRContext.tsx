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

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined
);

export const SignalRProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connectionState, setConnectionState] =
    useState<string>("Disconnected");

  useEffect(() => {
    // Only create a new connection if there isn't one already
    if (connection) return; // Skip if connection already exists

    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Trace)
      .build();

    setConnection(newConnection);

    // Event handlers
    newConnection.onreconnecting(() => setConnectionState("Reconnecting"));
    newConnection.onreconnected(() => setConnectionState("Connected"));
    // newConnection.onclose((error) => {
    //   setConnectionState("Disconnected");
    //   if (error) {
    //     console.error("Connection closed with error:", error.message);
    //   } else {
    //     console.log("Connection closed.");
    //   }
    // });

    // Cleanup connection on unmount or url change
    return () => {};
  }, [url, connection]); // Add `connection` to dependency array to avoid creating a new connection if one already exists

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
