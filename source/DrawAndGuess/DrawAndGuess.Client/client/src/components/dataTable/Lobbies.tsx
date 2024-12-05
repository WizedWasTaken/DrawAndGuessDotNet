// Use client directive for Next.js
"use client";

// Imports
import React, { Dispatch, SetStateAction } from "react";
import { DataTable } from "@/components/dataTable/data-table";
import { LobbyTableColumn } from "@/lib/columnDefinitions";
import { Lobby } from "@/entities/lobby"; // Ensure you have a Member type defined appropriately
import LobbiesTableTop from "@/components/dataTable/lobbiesTableTop";
import { Dialog } from "@/components/ui/dialog";

/**
 * The LobbiesTable component
 * @returns The LobbiesTable component
 */
export function LobbiesTable() {
  const [lobbies, setLobbies] = React.useState<Lobby[]>([]);

  React.useEffect(() => {
    // Call SignalR to fetch all lobbies
  }, []);

  // Function to create a new member
  const createLobby = () => {
    // Create a new lobby and add it to the state

    return new Lobby();
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
