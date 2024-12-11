/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Player } from "./player";
import { LobbyStatus } from "./lobby-status";

export class Lobby {
    lobbyId: number = -1;
    title: string =  "" ;
    players: Player[];
    lobbyStatus: LobbyStatus;
}
