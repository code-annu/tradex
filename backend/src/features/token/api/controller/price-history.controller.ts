import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../../../di/inversify.types";
import PriceHistoryService from "../../domain/service/price-history.service";
import { mapPriceHistoryResponse } from "../response/price-history.response";
import catchAsync from "../../../../error/async.catch";
import { BadRequestError } from "../../../../error/errors";
import { PriceHistoryInterval } from "../../domain/types/price-history.types";
import { getPriceHistorySchema } from "../schema/price-history.schema";

@injectable()
export default class PriceHistoryController {
  constructor(
    @inject(TYPES.PriceHistoryService)
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  public getPriceHistory = catchAsync(async (req: Request, res: Response) => {
    const tokenId = req.params.tokenId;
    if (!tokenId) {
      throw new BadRequestError("Token id is required");
    }

    const parsed = getPriceHistorySchema.parse(req.query);
    const interval = parsed.interval as PriceHistoryInterval;

    const result = await this.priceHistoryService.getPriceHistory(
      tokenId.toString(),
      interval,
    );

    const response = mapPriceHistoryResponse(
      result,
      200,
      "Price history fetched successfully",
    );
    res.status(200).json(response);
  });
}
