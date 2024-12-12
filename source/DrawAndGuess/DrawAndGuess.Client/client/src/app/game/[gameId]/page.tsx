"use client";

// Hooks

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSignalR } from "@/lib/hooks/UseSignalR";
import { toast } from "@/lib/hooks/use-toast";

// UI

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Entities

import { Lobby } from "@/entities/lobby";

export default function LobbyPage() {
  // Hooks
  const connection = useSignalR();
  const router = useRouter();
  const { data: session } = useSession();

  // Params
  const { gameId } = useParams();

  // State
  const [lobby, setLobby] = useState<Lobby | undefined>();

  useEffect(() => {
    const fetchLobbyData = async () => {
      const lobbyData = await connection?.invoke<Lobby>(
        "GetCurrentLobby",
        parseInt(gameId as string),
        session?.user
      );

      console.log("lobbyData", lobbyData?.players);

      if (!lobbyData) {
        router.push("/lobbies");
        toast({
          title: "Lobby",
          description: "Du er ikke en del af denne lobby.",
        });
      }

      setLobby(lobbyData);
    };

    fetchLobbyData();
  }, [connection]);

  return (
    <div className="container flex flex-col flex-grow mx-auto p-4">
      <Card className="mb-4 flex flex-grow flex-col">
        <CardHeader>
          <CardTitle>Game</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Game ID: {gameId}</p>
        </CardContent>
      </Card>
    </div>
  );
}
