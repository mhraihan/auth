"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
 const validate = LoginSchema.safeParse(values);
 if (!validate.success) {
      return {error: "Login Success"};

 }
  return {success: "Login Success"};
};
