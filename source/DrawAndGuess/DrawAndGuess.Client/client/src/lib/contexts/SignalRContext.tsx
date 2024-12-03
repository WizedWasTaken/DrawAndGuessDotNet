"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

type SignalRContextType = {
  connection: HubConnection | null;
  startConnection: () => Promise<void>;
  stopConnection: () => Promise<void>;
};

export const SignalRContext = createContext<SignalRContextType | undefined>(
  undefined
);

export const SignalRProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection.state === "Connected") {
        newConnection.stop();
      }
    };
  }, [url]);

  const startConnection = async () => {
    if (!connection) return;

    try {
      await connection.start();
      console.log("SignalR Connected");
    } catch (error) {
      console.error("Error starting connection:", error);
    }
  };

  const stopConnection = async () => {
    if (!connection) return;

    try {
      await connection.stop();
      console.log("SignalR Disconnected");
    } catch (error) {
      console.error("Error stopping connection:", error);
    }
  };

  return (
    <SignalRContext.Provider
      value={{ connection, startConnection, stopConnection }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
