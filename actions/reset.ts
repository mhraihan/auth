"use server";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import * as z from "zod";
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validate = ResetSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validate.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset Password email sent" };
};
