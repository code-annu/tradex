import { Router } from "express";
import container from "../../../../di/inversify.config";
import TYPES from "../../../../di/inversify.types";
import TokenController from "../controller/token.controller";
import priceHistoryRouter from "./price-history.router";

const tokenRouter = Router();

const tokenController = container.get<TokenController>(TYPES.TokenController);

tokenRouter.get("/", tokenController.listAllTokens);
tokenRouter.get("/search/name", tokenController.searchTokensByName);
tokenRouter.get("/search/symbol", tokenController.searchTokensBySymbol);
tokenRouter.get("/:tokenId", tokenController.getTokenById);

// Mount price history sub-routes
tokenRouter.use("/", priceHistoryRouter);

export default tokenRouter;
