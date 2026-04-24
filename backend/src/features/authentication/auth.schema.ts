import { z } from "zod";

export const signupSchema = z.object({
  fullname: z
    .string({ error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  token: z.string({ error: "Token is required" }).min(1, "Token is required"),
});
