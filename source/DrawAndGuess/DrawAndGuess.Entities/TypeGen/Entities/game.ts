/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Lobby } from "./lobby";
import { Round } from "./round";

export class Game {
    gameId: number = -1;
    lobby: Lobby = new Lobby();
    rounds: Round[];
    startTime: Date;
    endTime: Date;
}
