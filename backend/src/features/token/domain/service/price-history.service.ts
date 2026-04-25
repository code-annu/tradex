import { inject, injectable } from "inversify";
import TYPES from "../../../../di/inversify.types";
import PriceHistoryRepository from "../../data/repository/price-history.repository";
import TokenValidator from "../../../../validator/token.validator";
import {
  PriceHistory,
  PriceHistoryInterval,
  INTERVAL_HOURS,
} from "../types/price-history.types";

@injectable()
export default class PriceHistoryService {
  constructor(
    @inject(TYPES.PriceHistoryRepository)
    private readonly priceHistoryRepo: PriceHistoryRepository,
    @inject(TYPES.TokenValidator)
    private readonly tokenValidator: TokenValidator,
  ) {}

  public getPriceHistory = async (
    tokenId: string,
    interval: PriceHistoryInterval,
  ): Promise<PriceHistory[]> => {
    // Ensure the token exists before querying history
    await this.tokenValidator.ensureTokenExists(tokenId);

    const hours = INTERVAL_HOURS[interval];
    const fromDate = new Date(Date.now() - hours * 60 * 60 * 1000);

    return this.priceHistoryRepo.findByTokenId(tokenId, fromDate);
  };
}
