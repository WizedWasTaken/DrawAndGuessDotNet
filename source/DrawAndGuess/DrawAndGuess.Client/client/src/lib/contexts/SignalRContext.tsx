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
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Trace)
      .build();

    setConnection(newConnection);

    newConnection.onreconnecting(() => setConnectionState("Reconnecting"));
    newConnection.onreconnected(() => setConnectionState("Connected"));
    newConnection.onclose((error) => {
      setConnectionState("Disconnected");
      if (error) {
        console.error("Connection closed with error:", error.message);
      } else {
        console.log("Connection closed.");
      }
    });

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
