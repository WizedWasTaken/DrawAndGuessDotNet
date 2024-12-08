/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

export interface IWord {
  wordId: number;
  value: string;
}

export class Word implements IWord {
  wordId: number;
  value: string;

  constructor(wordId: number, value: string) {
    this.wordId = wordId;
    this.value = value;
  }
}
