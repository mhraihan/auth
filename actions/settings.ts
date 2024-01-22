"use server";
import * as z from "zod";

import { SettingsSchema } from "@/schemas";
import currentUser from "@/lib/currentUser";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { compare, hash } from "bcryptjs";
import { signOut, update } from "@/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // password update
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await compare(values.password, dbUser.password);
    if (!passwordMatch) {
      return { error: "Incorrect Password" };
    }

    const hashedPassword = await hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updateUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
      email: undefined,
    },
  });
  // if user want to change the email
  if (values.email && values.email !== user.email) {
    // check values email is exists or not
    const existingUser = await getUserByEmail(values.email);
    if (!!existingUser && existingUser.id !== user.id) {
      return { error: "Email already used" };
    }

    // so email is unique, generate verification token and send email
    const token = await generateVerificationToken(values.email);
    Promise.all([
      sendVerificationEmail(token.email, token.token),
      db.user.update({
        where: { id: dbUser.id },
        data: {
          email: token.email,
          emailVerified: null,
        },
      }),
    ]);
    await signOut({
      redirectTo: "/auth/notify",
    });
    
    return { success: "verification email sent" };
  }
  // update session data
  update({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
      role: updateUser.role,
    },
  });
  console.log(values);
  return { success: "Settings Updated!" };
};
