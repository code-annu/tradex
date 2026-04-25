import { z } from "zod";

export const updateTokenPriceSchema = z.object({
  tokenId: z
    .string({ error: "Token ID must be a string" })
    .min(1, "Token ID is required"),
  currentPrice: z
    .number({ error: "Current price must be a number" })
    .positive("Current price must be greater than 0"),
});
