/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Point } from "./point";

export interface IStatistic {
  statisticId: number;
  points: Point[];
}

export class Statistic implements IStatistic {
  statisticId: number;
  points: Point[];

  constructor(statisticId: number, points: Point[]) {
    this.statisticId = statisticId;
    this.points = points;
  }
}
