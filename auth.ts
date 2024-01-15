import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { User, UserRole } from "@prisma/client";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    signOut() {
      console.log("sign out");
    },
    signIn({ account, user, isNewUser, profile }) {
      console.log("sign in event");
      // console.log({ account, user });
    },
    createUser({ user }) {
      console.log("{ createUser: user }");
    },
    async linkAccount({ user }) {
      console.log("{linkAccount: user}");
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("sign in");
      if (account?.provider !== "credentials") return true;
      console.log({ user, account });
      const existingUser = { ...user } as User;
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ session, token, newSession, trigger, user }) {
      // console.log("session");
      // console.log({session});
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, account, user, profile, session, trigger }) {
      // console.log("jwt");
      // console.log({token} );
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
