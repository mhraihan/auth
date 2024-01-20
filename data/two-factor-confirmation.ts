import { db } from "@/lib/db";
import { TwoFactorConfirmation } from "@prisma/client";

export const getTwoFactorConfirmationByUserId = async (
  userId: string
): Promise<TwoFactorConfirmation | null> => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
