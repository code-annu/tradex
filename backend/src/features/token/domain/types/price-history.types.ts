export interface PriceHistory {
  readonly id: string;
  tokenId: string;
  price: number;
  timestamp: Date;
}

export enum PriceHistoryInterval {
  ONE_HOUR = "1h",
  EIGHT_HOURS = "8h",
  SIXTEEN_HOURS = "16h",
  TWENTY_FOUR_HOURS = "24h",
}

export const INTERVAL_HOURS: Record<PriceHistoryInterval, number> = {
  [PriceHistoryInterval.ONE_HOUR]: 1,
  [PriceHistoryInterval.EIGHT_HOURS]: 8,
  [PriceHistoryInterval.SIXTEEN_HOURS]: 16,
  [PriceHistoryInterval.TWENTY_FOUR_HOURS]: 24,
};
