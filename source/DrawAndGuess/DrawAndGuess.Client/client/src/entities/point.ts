/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Points } from "./points";

export interface IPoint {
  pointId: number;
  value: Points;
}

export class Point implements IPoint {
  pointId: number;
  value: Points;

  constructor(pointId: number, value: Points) {
    this.pointId = pointId;
    this.value = value;
  }
}
