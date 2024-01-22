import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Min name is two characters",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(2, {
        message: "Min name is two characters",
      })
    ),
    email: z.optional(
      z.string().email({
        message: "Email is required",
      })
    ),
    password: z.optional(
      z
        .string()
        .refine((password) => password === "" || password.length >= 6, {
          message: "Password must be at least 6 characters",
        })
        .transform((value) => value || undefined)
    ),
    newPassword: z.optional(
      z
        .string()
        .refine((password) => password === "" || password.length >= 6, {
          message: "Password must be at least 6 characters",
        })
        .transform((value) => value || undefined)
    ),
    isTwoFactorEnabled: z.optional(
      z.boolean().transform((value) => value || false)
    ),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );
