/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Player } from "./player";
import { WordDifficulty } from "./word-difficulty";

export class Guess {
    guessId: number = -1;
    guessWord: string =  "" ;
    guessedBy: Player = new Player();
    wordDifficulty: WordDifficulty;
}
