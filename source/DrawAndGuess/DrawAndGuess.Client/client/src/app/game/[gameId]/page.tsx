"use client";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Game } from "@/entities/game";
import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LobbyPage() {
    const { gameId } = useParams();

    // State
    const [game, setGame] = useState<Game>();

    // Hooks
    const { connection } = useSignalR();

    // Effects
    useEffect(() => {
        if (!connection) {
            return;
        }

        connection.on("GameUpdated", (game: Game) => {
            setGame(game);
        });
    }, [connection]);

    useEffect(() => {
        if (!connection) {
            return;
        }

        connection.invoke("GetGame", gameId);
    })

    return (
        <div className="container flex flex-col flex-grow mx-auto p-4">
            <Card className="mb-4 flex flex-grow flex-col">
                <CardHeader>
                    <h1>Test</h1>
                </CardHeader>
                <CardContent>
                    <p>{gameId}</p>
                </CardContent>
            </Card>
        </div>
    );
}
