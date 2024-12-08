/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Player } from "./player";

export interface IAdmin {
  adminId: number;
  user: Player;
}

class Admin implements IAdmin {
  adminId: number;
  user: Player;

  constructor(adminId: number, user: Player) {
    this.adminId = adminId;
    this.user = user;
  }
}
