import NextAuth, { User, type DefaultSession } from "next-auth"
import { UserRole } from "./generated/prisma";


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {

      role: UserRole

    } & DefaultSession["user"]
  }
}