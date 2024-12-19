"use client";

// Imports
import React from "react";
import { DataTable } from "@/components/dataTable/data-table";
import { LobbyTableColumn } from "@/lib/Data-Table/Helper/columnDefinitions";
import { Lobby } from "@/entities/lobby"; // Ensure you have a Member type defined appropriately
import LobbiesTableTop from "@/app/lobbies/Components/lobbiesTableTop";
import { useSignalR } from "@/lib/SignalR/hooks/UseSignalR";
import { useSignalRListener } from "@/lib/SignalR/hooks/UseSignalRListener";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/Notify/Hooks/use-toast";
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

    if (lobby.players.length === 0) {
      setLobbies((prevLobbies) =>
        prevLobbies.filter((l) => l.lobbyId !== lobby.lobbyId)
      );
      return;
    }

    if (lobby.lobbyStatus === LobbyStatus.Ended) {
      setLobbies((prevLobbies) =>
        prevLobbies.map((l) =>
          l.lobbyId === lobby.lobbyId
            ? { ...l, lobbyStatus: LobbyStatus.Ended }
            : l
        )
      );
      return;
    }

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

          console.log("Lobbies:", currentLobbies);
          if (currentLobbies.length === 0) {
            toast({
              title: "Lobbies",
              description: "Der er ingen lobbies at vise.",
            });
          }
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
  }, [connection, connectionState, invoke]);

  if (!connection) {
    return;
  }

  // Function to create a new lobby
  const createLobby = async (lobby: Lobby) => {
    const tempLobby: Lobby = await invoke<Lobby>(
      "CreateLobby",
      lobby.title,
      session.data?.user
    );

    if (tempLobby) {
      router.push("lobby/" + tempLobby.lobbyId);
      return tempLobby;
    }

    throw new Error("Failed to create lobby");
  };

  const JoinLobby = async (lobby: Lobby) => {
    try {
      toast({
        title: "Lobby",
        description: "Finder lobbyen.",
      });
      const lobbyToJoin: Lobby = await invoke<Lobby>(
        "JoinLobby",
        lobby.lobbyId,
        session.data?.user
      );

      if (!lobbyToJoin) {
        throw new Error("Kunne ikke finde lobbyen");
      }

      if (lobby.lobbyStatus === LobbyStatus.InGame) {
        throw new Error("Du kan ikke tilslutte en lobby som er i et spil!");
      }

      if (lobby.lobbyStatus === LobbyStatus.Ended) {
        throw new Error("Spillet er slut.");
      }

      toast({
        title: "Lobby",
        description: "Fandt lobbyen.",
      });

      toast({
        title: "Lobby",
        description: "Sender dig til lobbyen.",
      });

      router.push("lobby/" + lobbyToJoin.lobbyId);
    } catch (error: any) {
      toast({
        title: "Lobby",
        description: error.message,
      });
    }
  };

  return (
    <>
      <LobbiesTableTop lobbies={lobbies} createNewLobby={createLobby} />
      <DataTable data={lobbies} columns={LobbyTableColumn(JoinLobby)} />
    </>
  );
}
