"use client";

// Important Imports
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { DataTableColumnHeader } from "@/components/dataTable/data-table-header";

// UI
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";

// Types
import { Lobby } from "@/entities/lobby";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Player } from "@/entities/player";

export function LobbyTableColumn(): ColumnDef<Lobby>[] {
  return [
    {
      id: "select",
      meta: {
        name: "Vælg",
      },
      header: ({ table }: { table: any }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: any }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      meta: {
        name: "Titel",
      },
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="Titel" />
      ),
      cell: ({ row }: { row: any }) => {
        const title: string = row.getValue("title");
        return <div className="text-right font-medium">{title}</div>;
      },
    },
    {
      accessorKey: "players",
      meta: {
        name: "Spillere",
      },
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="Spillere" />
      ),
      cell: ({ row }: { row: any }) => {
        const players: Player[] = row.getValue("players");
        return (
          <div className="text-right">
            {players.length > 0
              ? players.map((player) => player.name).join(", ")
              : "Ingen spillere :(("}
          </div>
        );
      },
    },
    {
      id: "actions",
      meta: {
        name: "Handlinger",
      },
      cell: ({ row }: { row: any }) => {
        const lobby = row.original as Lobby;

        function setTempLobby(lobby: Lobby): void {
          throw new Error("Function not implemented.");
        }

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => setTempLobby(lobby)}
                >
                  <span className="sr-only">Åben menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Muligheder</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    const { lobbyId } = row.original;
                    // updateLobbyStatus(lobbyId);
                  }}
                >
                  Rediger
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Rediger</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rediger lobby</DialogTitle>
                <DialogDescription>
                  Rediger lobbyen {lobby.title}
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  alert("Form submitted");

                  // TODO: Implement form submission
                }}
              >
                <DialogDescription className="flex flex-col gap-5">
                  <div>
                    <Label>Titel</Label>
                    <Input
                      name="title"
                      id="title"
                      type="text"
                      defaultValue={lobby.title}
                    />
                  </div>
                </DialogDescription>
                <DialogFooter className="pt-5">
                  <Button type="submit">Bekræft</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
}