"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Register Success" };
  }
  return { success: "Register Success" };
};
