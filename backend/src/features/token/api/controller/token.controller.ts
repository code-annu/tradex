import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../../../di/inversify.types";
import TokenService from "../../domain/service/token.service";
import {
  mapTokenResponse,
  mapTokensResponse,
} from "../response/token.response";
import catchAsync from "../../../../error/async.catch";
import { BadRequestError } from "../../../../error/errors";

@injectable()
export default class TokenController {
  constructor(
    @inject(TYPES.TokenService)
    private readonly tokenService: TokenService,
  ) {}

  public listAllTokens = catchAsync(async (req: Request, res: Response) => {
    const result = await this.tokenService.listAllTokens();
    const response = mapTokensResponse(
      result,
      200,
      "Tokens fetched successfully",
    );
    res.status(200).json(response);
  });

  public getTokenById = catchAsync(async (req: Request, res: Response) => {
    const tokenId = req.params.tokenId;
    if (!tokenId) {
      throw new BadRequestError("Token id is required");
    }
    const result = await this.tokenService.getTokenById(tokenId.toString());
    const response = mapTokenResponse(
      result,
      200,
      "Token fetched successfully",
    );
    res.status(200).json(response);
  });

  public searchTokensByName = catchAsync(
    async (req: Request, res: Response) => {
      const name = req.query.name as string;
      if (!name) {
        throw new BadRequestError("Name query parameter is required");
      }
      const result = await this.tokenService.searchTokensByName(name);
      const response = mapTokensResponse(
        result,
        200,
        "Tokens fetched successfully",
      );
      res.status(200).json(response);
    },
  );

  public searchTokensBySymbol = catchAsync(
    async (req: Request, res: Response) => {
      const symbol = req.query.symbol as string;
      if (!symbol) {
        throw new BadRequestError("Symbol query parameter is required");
      }
      const result = await this.tokenService.searchTokenBySymbol(symbol);
      const response = mapTokensResponse(
        result,
        200,
        "Tokens fetched successfully",
      );
      res.status(200).json(response);
    },
  );
}
