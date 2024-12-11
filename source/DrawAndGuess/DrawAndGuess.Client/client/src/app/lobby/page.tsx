"use client";

import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function LobbyPage() {
    const { lobbyId } = useParams<{ lobbyId: string }>();
    const router = useRouter();
    const [players, setPlayers] = useState<string[]>([]);
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const { theme, setTheme } = useTheme();

    // If lobby ID doesn't exist.
    if (!lobbyId) {
        return notFound();
    }

    useEffect(() => {
        // Simulating fetching players and chat messages
        setPlayers(["Player 1", "Player 2", "Player 3"]);
        setChatMessages(["Welcome to the lobby!", "Get ready to draw and guess!"]);
    }, []);

    const handleStartGame = () => {
        // Implement game start logic here
        console.log("Starting the game...");
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChatMessages([...chatMessages, newMessage]);
            setNewMessage("");
        }
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
            <Card className="mb-4 dark:bg-gray-700 dark:text-white">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Lobby: {lobbyId}</span>
                        <Button onClick={toggleTheme} variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="dark:bg-gray-700 dark:text-white">
                            <CardHeader>
                                <CardTitle>Players</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    {players.map((player, index) => (
                                        <li key={index} className="mb-2">{player}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-gray-700 dark:text-white">
                            <CardHeader>
                                <CardTitle>Chat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-40 overflow-y-auto mb-4 border rounded p-2 dark:border-gray-600">
                                    {chatMessages.map((message, index) => (
                                        <p key={index} className="mb-1">{message}</p>
                                    ))}
                                </div>
                                <div className="flex">
                                    <Input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="mr-2 dark:bg-gray-600 dark:text-white"
                                    />
                                    <Button onClick={handleSendMessage} className="dark:bg-gray-600 dark:text-white">Send</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
            <Button onClick={handleStartGame} className="w-full dark:bg-gray-600 dark:text-white">Start Game</Button>
        </div>
    );
}
