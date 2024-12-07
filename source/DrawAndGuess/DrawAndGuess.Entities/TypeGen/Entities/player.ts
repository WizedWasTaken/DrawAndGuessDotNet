/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { IdentityUser } from "./identity-user";
import { Statistic } from "./statistic";

export class Player extends IdentityUser {
    name: string =  "" ;
    password: string =  "" ;
    email: string =  "" ;
    statistic: Statistic = new Statistic();
}
