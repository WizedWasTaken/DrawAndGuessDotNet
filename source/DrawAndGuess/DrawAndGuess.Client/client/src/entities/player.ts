/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Statistic } from "./statistic";
import { IdentityUser } from "./IdentityUser";

export interface IPlayer {
  name: string;
  statistic: Statistic;
}

export class Player extends IdentityUser<string> implements IPlayer {
  name: string;
  statistic: Statistic;

  constructor(
    name: string,
    statistic: Statistic,
    id: string,
    userName: string,
    email: string,
    phoneNumberConfirmed: boolean,
    twoFactorEnabled: boolean,
    lockoutEnabled: boolean,
    accessFailedCount: number
  ) {
    super(
      id,
      userName,
      email,
      phoneNumberConfirmed,
      twoFactorEnabled,
      lockoutEnabled,
      accessFailedCount
    );
    this.name = name;
    this.statistic = statistic;
  }
}
