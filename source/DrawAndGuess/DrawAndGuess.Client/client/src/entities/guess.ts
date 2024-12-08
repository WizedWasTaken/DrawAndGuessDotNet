/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Player } from "./player";
import { WordDifficulty } from "./word-difficulty";

export interface Guess {
  guessId: number;
  guessWord: string;
  guessedBy: Player;
  wordDifficulty: WordDifficulty;
}

export class Guess implements Guess {
  guessId: number;
  guessWord: string;
  guessedBy: Player;
  wordDifficulty: WordDifficulty;

  constructor(
    guessId: number,
    guessWord: string,
    guessedBy: Player,
    wordDifficulty: WordDifficulty
  ) {
    this.guessId = guessId;
    this.guessWord = guessWord;
    this.guessedBy = guessedBy;
    this.wordDifficulty = wordDifficulty;
  }
}
