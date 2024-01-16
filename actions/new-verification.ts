"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
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
  Promise.all([
    db.user.update({
      where: { id: user?.id },
      data: {
        // need to update email field to, suppose user change the email
        emailVerified: new Date(),
        email: user?.email, 
      },
    }),
    db.verificationToken.delete({ where: { id: existingToken.id } }),
  ]);
  return { success: "Email verified!" };
};
