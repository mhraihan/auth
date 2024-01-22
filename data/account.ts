import { db } from "@/lib/db";
import { Account, User } from "@prisma/client";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch {
    return null;
  }
};
export const getUserWithAccountById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true, // Eagerly load the accounts relation
      },
    });
    return user;
  } catch {
    return null;
  }
};