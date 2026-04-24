import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import WalletController from "./wallet.controller";
import { validateRequestBody } from "../../middlewares/validate.request.middleware";
import { creditWalletSchema, debitWalletSchema } from "./wallet.schema";
import { validateAuthorization } from "../../middlewares/auth.middleware";

const walletRouter = Router();

const walletController = container.get<WalletController>(
  TYPES.WalletController,
);

walletRouter.use(validateAuthorization);

walletRouter.post("/", walletController.createWallet);
walletRouter.get("/", walletController.getUserWallets);
walletRouter.get("/:walletId", walletController.getWallet);
walletRouter.patch(
  "/:walletId/credit",
  validateRequestBody(creditWalletSchema),
  walletController.creditWallet,
);
walletRouter.patch(
  "/:walletId/debit",
  validateRequestBody(debitWalletSchema),
  walletController.debitWallet,
);
walletRouter.delete("/:walletId", walletController.deleteWallet);

export default walletRouter;
