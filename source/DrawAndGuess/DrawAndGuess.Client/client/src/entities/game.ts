/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Lobby } from "./lobby";
import { Round } from "./round";

export interface IGame {
  gameId: number;
  lobby: Lobby;
  rounds: Round[];
  startTime: Date;
  endTime: Date;
}

export class Game implements IGame {
  gameId: number;
  lobby: Lobby;
  rounds: Round[];
  startTime: Date;
  endTime: Date;

  constructor(
    gameId: number,
    lobby: Lobby,
    rounds: Round[],
    startTime: Date,
    endTime: Date
  ) {
    this.gameId = gameId;
    this.lobby = lobby;
    this.rounds = rounds;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
