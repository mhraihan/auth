"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Validation Failed" };
  }

  const { name, email, password } = validate.data;
  const user = await getUserByEmail(email);
  if (user) {
    return { error: "Email already in user!" };
  }

  const hashedPassword = await hash(password, 10);
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  //Todo: email verification
  return { success: "Register Success" };
};
