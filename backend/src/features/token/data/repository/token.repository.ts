import { injectable } from "inversify";
import { prisma } from "../../../../config/prisma.client";
import { Token, TokenStatus, TokenUpdate } from "../../domain/types/token.types";
import TokenMapper from "../mapper/token.mapper";

@injectable()
export default class TokenRepository {
  private readonly db;

  constructor() {
    this.db = prisma;
  }

  public findAllTokens = async (): Promise<Token[]> => {
    const tokens = await this.db.token.findMany();
    return tokens.map(TokenMapper.mapToType);
  };

  public findTokenById = async (id: string): Promise<Token> => {
    const token = await this.db.token.findUniqueOrThrow({
      where: { uuid: id },
    });
    return TokenMapper.mapToType(token);
  };

  public findTokensBySymbol = async (symbol: string): Promise<Token[]> => {
    const tokens = await this.db.token.findMany({
      where: { symbol: { contains: symbol, mode: "insensitive" } },
    });
    return tokens.map(TokenMapper.mapToType);
  };

  public findTokensByName = async (name: string): Promise<Token[]> => {
    const tokens = await this.db.token.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
    });
    return tokens.map(TokenMapper.mapToType);
  };

  public findTokenByStatus = async (status: TokenStatus): Promise<Token[]> => {
    const tokens = await this.db.token.findMany({
      where: { status },
    });
    return tokens.map(TokenMapper.mapToType);
  };

  public updateToken = async (
    id: string,
    updates: TokenUpdate,
  ): Promise<Token> => {
    const {
      currentPrice,
      circulatingSupply,
      totalSupply,
      maxSupply,
      marketCap,
      status,
    } = updates;
    const token = await this.db.token.update({
      where: { uuid: id },
      data: {
        current_price: currentPrice,
        circulating_supply: circulatingSupply,
        total_supply: totalSupply,
        max_supply: maxSupply,
        market_cap: marketCap,
        status,
      },
    });
    return TokenMapper.mapToType(token);
  };
}
