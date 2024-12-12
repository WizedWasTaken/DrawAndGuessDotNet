"use client";

import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lobby } from "@/entities/lobby";
import { useSignalR } from "@/lib/hooks/UseSignalR";
import { useSession } from "next-auth/react";
import { toast } from "@/lib/hooks/use-toast";
import { Player } from "@/entities/player";

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export default function LobbyPage() {
  const { lobbyId } = useParams<{ lobbyId: string }>();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [lobby, setLobby] = useState<Lobby | undefined>();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { connection } = useSignalR();
  const session = useSession();
  const router = useRouter();

  // If lobby ID doesn't exist.
  if (!lobbyId) {
    return notFound();
  }

  useEffect(() => {
    if (connection) {
      connection.on("lobbyUpdated", (lobby: Lobby) => {
        setLobby(lobby);
      });

      connection.on("messageReceived", receiveMessage);

      return () => {
        connection.off("lobbyUpdated");
        connection.off("messageReceived");
      };
    }
  }, [connection]);

  useEffect(() => {
    const fetchLobbyData = async () => {
      const lobbyData = await connection?.invoke<Lobby>(
        "GetCurrentLobby",
        parseInt(lobbyId)
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

  useEffect(() => {
    const handleBeforeUnload = async () => {
      toast({
        title: "Lobby",
        description: "Forlader lobbyen.",
      });
      await connection?.invoke(
        "LeaveLobby",
        parseInt(lobbyId),
        session.data?.user
      );

      toast({
        title: "Lobby",
        description: "Du har forladt lobbyen.",
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [connection]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await connection?.invoke<ChatMessage[]>(
        "GetMessages",
        parseInt(lobbyId)
      );
      setChatMessages(messages || []);
    };

    fetchMessages();
  }, [connection]);

  const handleStartGame = () => {
    // Implement game start logic here
    console.log("Starting the game...");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage) {
      return;
    }

    const messageObj = {
      id: Date.now().toString(),
      sender: session.data?.user?.name || "Unknown",
      content: newMessage,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, messageObj]);

    await connection?.invoke(
      "SendMessage",
      parseInt(lobbyId),
      newMessage,
      session.data?.user?.name
    );

    setNewMessage("");
  };

  const receiveMessage = (message: ChatMessage) => {
    console.log("Received message:", message);
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="container flex flex-col flex-grow mx-auto p-4">
      <Card className="mb-4 flex flex-grow flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Lobby: {lobby?.lobbyId}</span>
            <span>Title: {lobby?.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col">
          <div className="grid flex-grow grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Spillere</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-full">
                  <ul>
                    {lobby?.players.map((player, index) => (
                      <li
                        key={index}
                        className={`mb-2 ${
                          player.userName === session.data?.user?.userName
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {player.userName}
                        {session.data?.user?.userName == player.userName
                          ? " (Dig)"
                          : ""}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <ScrollArea className="flex-grow mb-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className="mb-2">
                      <span className="font-bold">
                        {typeof message.sender === "string"
                          ? message.sender === session.data?.user?.name
                            ? "Dig"
                            : message.sender
                          : message.sender === session.data?.user?.name
                          ? "Dig"
                          : message.sender}
                        :{" "}
                      </span>
                      <span>{message.content}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex h-10">
                  <Input
                    type="text"
                    placeholder="Skriv en besked..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="mr-2"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Make a check if lobby owner. */}
      <Button onClick={handleStartGame} className="w-full">
        Start Game
      </Button>
    </div>
  );
}
