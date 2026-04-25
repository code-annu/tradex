import { Router } from "express";
import container from "../../../../di/inversify.config";
import TYPES from "../../../../di/inversify.types";
import PriceHistoryController from "../controller/price-history.controller";

const priceHistoryRouter = Router();

const priceHistoryController = container.get<PriceHistoryController>(
  TYPES.PriceHistoryController,
);

// GET /api/tokens/:tokenId/price-history?interval=1h|8h|16h|24h
priceHistoryRouter.get(
  "/:tokenId/price-history",
  priceHistoryController.getPriceHistory,
);

export default priceHistoryRouter;
