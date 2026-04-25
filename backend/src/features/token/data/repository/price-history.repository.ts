import { injectable } from "inversify";
import { prisma } from "../../../../config/prisma.client";
import { PriceHistory } from "../../domain/types/price-history.types";
import PriceHistoryMapper from "../mapper/price-history.mapper";

@injectable()
export default class PriceHistoryRepository {
  private readonly db;

  constructor() {
    this.db = prisma;
  }

  public findByTokenId = async (
    tokenId: string,
    fromDate: Date,
  ): Promise<PriceHistory[]> => {
    const records = await this.db.priceHistory.findMany({
      where: {
        token_id: tokenId,
        timestamp: { gte: fromDate },
      },
      orderBy: { timestamp: "asc" },
    });
    return records.map(PriceHistoryMapper.mapToType);
  };
}
