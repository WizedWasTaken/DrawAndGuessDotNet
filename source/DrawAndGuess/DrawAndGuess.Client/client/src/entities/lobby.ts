/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Player } from "./player";
import { LobbyStatus } from "./lobby-status";

export interface ILobby {
  lobbyId: number;
  title: string;
  players: Player[];
  lobbyStatus: LobbyStatus;
}

export class Lobby implements ILobby {
  lobbyId: number;
  title: string;
  players: Player[];
  lobbyStatus: LobbyStatus;

  constructor(
    lobbyId: number,
    title: string,
    players: Player[],
    lobbyStatus: LobbyStatus
  ) {
    this.lobbyId = lobbyId;
    this.title = title;
    this.players = players;
    this.lobbyStatus = lobbyStatus;
  }
}
