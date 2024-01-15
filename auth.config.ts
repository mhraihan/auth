import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export default {
  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const validate = LoginSchema.safeParse(credentials);
        if (validate.success) {
          const { email, password } = validate.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
