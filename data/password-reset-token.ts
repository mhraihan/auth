import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export const getPasswordResetTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    return await db.passwordResetToken.findUnique({ where: { token } });
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    return await db.passwordResetToken.findFirst({ where: { email } });
  } catch {
    return null;
  }
};
