// Use client directive for Next.js
"use client";

// Imports
import React, { Dispatch, SetStateAction } from "react";
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
  const [lobbies, setLobbies] = React.useState<Lobby[]>([]);

  const { connection } = useSignalR();

  if (!connection) {
    return <Dialog>Connection not established</Dialog>;
  }

  // Listen for changes to the lobbies
  useSignalRListener("lobbyCreated", (lobby: Lobby) => {
    console.log("Lobby created:", lobby);
    setLobbies([...lobbies, lobby]);
  });

  useSignalRListener("lobbyUpdated", (lobby: Lobby) => {
    console.log("Lobby updated:", lobby);
    setLobbies(lobbies.map((l) => (l.lobbyId === lobby.lobbyId ? lobby : l)));
  });

  React.useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const currentLobbies = await connection?.invoke<Lobby[]>(
          "GetCurrentLobbies"
        );
        console.log("Current lobbies:", currentLobbies);
        setLobbies(currentLobbies);
      } catch (error) {
        console.error("Error fetching lobbies:", error);
      }
    };

    fetchLobbies();

    return () => {
      connection.off("GetCurrentLobbies");
    };
  }, [connection]);

  // Function to create a new member
  const createLobby = async (lobby: Lobby) => {
    // Add the new lobby to the list of lobbies
    setLobbies([...lobbies, lobby]);

    const tempLobby: Lobby = await connection.invoke<Lobby>(
      "CreateLobby",
      lobby
    );

    if (tempLobby == lobby) {
      return tempLobby;
    }

    return lobby;
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
