import { z } from "zod";

export const createProfileSchema = z.object({
  dob: z.coerce
    .date({ error: "Invalid date of birth" })
    .optional(),
  gender: z
    .enum(["Male", "Female", "Other"], { error: "Gender must be Male, Female, or Other" })
    .optional(),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .optional(),
  avatarUrl: z
    .string()
    .url("Invalid avatar URL")
    .optional(),
});

export const updateProfileSchema = z.object({
  dob: z.coerce
    .date({ error: "Invalid date of birth" })
    .optional(),
  gender: z
    .enum(["Male", "Female", "Other"], { error: "Gender must be Male, Female, or Other" })
    .optional(),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .optional(),
  avatarUrl: z
    .string()
    .url("Invalid avatar URL")
    .optional(),
});
