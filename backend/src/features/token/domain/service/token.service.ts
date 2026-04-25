import { inject, injectable } from "inversify";
import TYPES from "../../../../di/inversify.types";
import TokenRepository from "../../data/repository/token.repository";
import TokenValidator from "../../../../validator/token.validator";
import { Token } from "../types/token.types";
import { UpdateTokenCurrentPriceInput } from "../dto/token.dto";

@injectable()
export default class TokenService {
  constructor(
    @inject(TYPES.TokenRepository) private readonly tokenRepo: TokenRepository,
    @inject(TYPES.TokenValidator)
    private readonly tokenValidator: TokenValidator,
  ) {}

  public listAllTokens = async (): Promise<Token[]> => {
    return this.tokenRepo.findAllTokens();
  };

  public getTokenById = async (id: string): Promise<Token> => {
    const token = await this.tokenValidator.ensureTokenExists(id);
    return token;
  };

  public searchTokensByName = async (name: string): Promise<Token[]> => {
    const tokens = await this.tokenRepo.findTokensByName(name);
    return tokens;
  };

  public searchTokenBySymbol = async (symbol: string): Promise<Token[]> => {
    const tokens = await this.tokenRepo.findTokensBySymbol(symbol);
    return tokens;
  };

  public updateCurrentPrice = async (
    input: UpdateTokenCurrentPriceInput,
  ): Promise<Token> => {
    const { tokenId, currentPrice } = input;
    const token = await this.tokenValidator.ensureTokenExists(tokenId);
    const updatedToken = await this.tokenRepo.updateToken(tokenId, {
      currentPrice,
      circulatingSupply: token.circulatingSupply,
      totalSupply: token.totalSupply,
      maxSupply: token.maxSupply,
      marketCap: token.marketCap,
      status: token.status,
    });

    return updatedToken;
  };
}
