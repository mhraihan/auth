"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { hash } from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Token missing!" };
  }
  const validate = NewPasswordSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalids fields" };
  }
  const { password } = validate.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exists!" };
  }
  const hasExpired = existingToken.expires < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: "Email does not exists!" };
  }

  const hashedPassword = await hash(password, 10);
  Promise.all([
    db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    }),
    db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    }),
  ]);

  return { success: "Password updated!" };
};
