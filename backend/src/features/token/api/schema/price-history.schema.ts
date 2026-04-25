import { z } from "zod";
import { PriceHistoryInterval } from "../../domain/types/price-history.types";

export const getPriceHistorySchema = z.object({
  interval: z
    .enum(PriceHistoryInterval, {
      error: `Invalid interval. Must be one of: ${Object.values(PriceHistoryInterval).join(", ")}`,
    })
    .default(PriceHistoryInterval.TWENTY_FOUR_HOURS),
});
