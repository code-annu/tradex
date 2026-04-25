import { Token as PrismaToken } from "../../../../generated/prisma";
import { Token, TokenStatus } from "../../domain/types/token.types";

export default abstract class TokenMapper {
  public static mapToType(token: PrismaToken): Token {
    return {
      id: token.uuid,
      symbol: token.symbol,
      name: token.name,
      currentPrice: Number(token.current_price),
      circulatingSupply: Number(token.circulating_supply),
      totalSupply: Number(token.total_supply),
      maxSupply: Number(token.max_supply),
      marketCap: Number(token.market_cap),
      status: token.status as TokenStatus,
      updatedAt: token.updated_at,
      createdAt: token.created_at,
    };
  }
}
