"use client";

// Imports
import React from "react";
import { DataTable } from "@/components/dataTable/data-table";
import { LobbyTableColumn } from "@/lib/columnDefinitions";
import { Lobby } from "@/entities/lobby"; // Ensure you have a Member type defined appropriately
import LobbiesTableTop from "@/components/dataTable/lobbiesTableTop";
import { Dialog } from "@/components/ui/dialog";
import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useSignalRListener } from "@/lib/hooks/UseSignalRListener";

/**
 * The LobbiesTable component
 * @returns The LobbiesTable component
 */
export function LobbiesTable() {
  const { connection, connectionState, invoke } = useSignalR();
  const [lobbies, setLobbies] = React.useState<Lobby[]>([]);

  // Listen for changes to the lobbies
  useSignalRListener("lobbyCreated", (lobby: Lobby) => {
    console.log("Lobby created:", lobby);
    setLobbies((prevLobbies) => [...prevLobbies, lobby]);
  });

  useSignalRListener("lobbyUpdated", (lobby: Lobby) => {
    console.log("Lobby updated:", lobby);
    setLobbies((prevLobbies) =>
      prevLobbies.map((l) => (l.lobbyId === lobby.lobbyId ? lobby : l))
    );
  });

  React.useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const currentLobbies = await invoke<Lobby[]>("GetCurrentLobbies");
        console.log("Current lobbies:", currentLobbies);
        if (currentLobbies) {
          setLobbies(currentLobbies);
        }
      } catch (error) {
        console.error("Error fetching lobbies:", error);
      }
    };

    if (connectionState === "Connected") {
      fetchLobbies();
    }

    return () => {
      connection?.off("GetCurrentLobbies");
    };
  }, [connectionState, invoke]);

  if (!connection) {
    return;
  }

  // Function to create a new lobby
  const createLobby = async (lobby: Lobby) => {
    const tempLobby: Lobby = await invoke<Lobby>("CreateLobby", lobby.title);

    if (tempLobby) {
      return tempLobby;
    }

    throw new Error("Failed to create lobby");
  };

  return (
    <>
      <LobbiesTableTop lobbies={lobbies} createNewLobby={createLobby} />
      <DataTable
        data={lobbies}
        columns={LobbyTableColumn()} // Ensure the column definitions are received as expected
      />
    </>
  );
}
