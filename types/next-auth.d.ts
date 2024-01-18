import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = {
    id: string;
    role: UserRole;
    isTwoFactorEnabled: boolean;
} & DefaultSession["user"];

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
}