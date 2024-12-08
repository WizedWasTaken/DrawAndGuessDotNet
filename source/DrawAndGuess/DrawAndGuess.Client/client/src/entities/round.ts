/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Word } from "./word";
import { Guess } from "./guess";
import { Lobby } from "./lobby";

export interface IRound {
  roundId: number;
  correctWord: Word;
  guesses: Guess[];
  lobby: Lobby;
}

export class Round implements IRound {
  roundId: number;
  correctWord: Word;
  guesses: Guess[];
  lobby: Lobby;

  constructor(
    roundId: number,
    correctWord: Word,
    guesses: Guess[],
    lobby: Lobby
  ) {
    this.roundId = roundId;
    this.correctWord = correctWord;
    this.guesses = guesses;
    this.lobby = lobby;
  }
}
