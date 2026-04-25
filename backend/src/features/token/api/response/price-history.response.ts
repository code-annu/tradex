import { PriceHistory } from "../../domain/types/price-history.types";

export const mapPriceHistoryResponse = (
  priceHistory: PriceHistory[],
  code: number,
  message: string,
) => {
  return {
    code,
    message,
    success: true,
    data: {
      total: priceHistory.length,
      priceHistory,
    },
  };
};
