import { z } from "zod";

export const createWalletSchema = z.object({});

export const creditWalletSchema = z.object({
  amount: z
    .number({ error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
});

export const debitWalletSchema = z.object({
  amount: z
    .number({ error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
});
