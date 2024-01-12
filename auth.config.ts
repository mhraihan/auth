import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
export default {
  providers: [
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
