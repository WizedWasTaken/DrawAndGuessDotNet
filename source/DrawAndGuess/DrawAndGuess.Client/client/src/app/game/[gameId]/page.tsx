"use client";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function LobbyPage() {
    const { gameId } = useParams();

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
