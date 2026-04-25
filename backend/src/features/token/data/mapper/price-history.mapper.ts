import { PriceHistory as PrismaPriceHistory } from "../../../../generated/prisma";
import { PriceHistory } from "../../domain/types/price-history.types";

export default abstract class PriceHistoryMapper {
  public static mapToType(record: PrismaPriceHistory): PriceHistory {
    return {
      id: record.uuid,
      tokenId: record.token_id,
      price: Number(record.price),
      timestamp: record.timestamp,
    };
  }
}
