import { Player } from "@/entities/player";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Player;
    expires: string;
    accessToken: string;
  }
}
