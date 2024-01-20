"use server";
import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validate = LoginSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Login Success" };
  }

  const { email, password, code } = validate.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User does not exists" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent" };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      console.log(code);
      const twoFactorToken = await getTwoFactorTokenByEmail(email);
      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid Code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "AuthorizedCallbackError":
          return { error: "Valid Two Factor Code Required" };
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "OAuthAccountNotLinked":
          return { error: "Already linked with another provider" };
        case "Verification":
          return { error: "Email not verified yet" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    // if not throw the error, it does not redirect
    throw error;
  }
};
