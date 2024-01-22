import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = {
    id: String;
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
    accounts?: Array;
} & DefaultSession["user"];

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
}