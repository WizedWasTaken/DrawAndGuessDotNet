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
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/hooks/use-toast";
import { LobbyStatus } from "@/entities/lobby-status";
import { useSession } from "next-auth/react";

/**
 * The LobbiesTable component
 * @returns The LobbiesTable component
 */
export function LobbiesTable() {
  const { connection, connectionState, invoke } = useSignalR();
  const [lobbies, setLobbies] = React.useState<Lobby[]>([]);
  const router = useRouter();
  const session = useSession();

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

  const JoinLobby = async (lobby: Lobby) => {
    try {
      toast({
        title: "Lobby",
        description: "Finder lobbyen."
      })
      const lobbyToJoin: Lobby = await invoke<Lobby>("JoinLobby", lobby.lobbyId, session);

      if (!lobbyToJoin) {
        throw new Error("Kunne ikke finde lobbyen");
      }

      if (lobby.lobbyStatus === LobbyStatus.InGame) {
        throw new Error("Du kan ikke tilslutte en lobby som er i et spil!")
      }

      if (lobby.lobbyStatus === LobbyStatus.Ended) {
        throw new Error("Spillet er slut.")
      }

      toast({
        title: "Lobby",
        description: "Fandt lobbyen."
      })

      toast({
        title: "Lobby",
        description: "Sender dig til lobbyen."
      })

      router.push("lobby/" + lobbyToJoin.lobbyId)
    } catch (error: any) {
      toast({
        title: "Lobby",
        description: error.message
      })
    }
  };

  return (
    <>
      <LobbiesTableTop lobbies={lobbies} createNewLobby={createLobby} />
      <DataTable data={lobbies} columns={LobbyTableColumn(JoinLobby)} />
    </>
  );
}
