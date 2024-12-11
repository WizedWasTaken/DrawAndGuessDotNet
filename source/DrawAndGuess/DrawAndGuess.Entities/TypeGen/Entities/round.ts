/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Word } from "./word";
import { Guess } from "./guess";
import { Lobby } from "./lobby";

export class Round {
    roundId: number = -1;
    correctWord: Word = new Word();
    guesses: Guess[];
    lobby: Lobby = new Lobby();
}
