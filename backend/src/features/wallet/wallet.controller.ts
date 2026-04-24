import { inject, injectable } from "inversify";
import { Response } from "express";
import TYPES from "../../di/inversify.types";
import WalletService from "./wallet.service";
import { mapToWalletResponse, mapToWalletsResponse } from "./wallet.response";
import catchAsync from "../../error/async.catch";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { BadRequestError } from "../../error/errors";

@injectable()
export default class WalletController {
  constructor(
    @inject(TYPES.WalletService)
    private readonly walletService: WalletService,
  ) {}

  public createWallet = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const result = await this.walletService.createWallet({ userId });
    const response = mapToWalletResponse(
      result,
      201,
      "Wallet created successfully",
    );
    res.status(201).json(response);
  });

  public getWallet = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const walletId = req.params.walletId;
    if (!walletId) {
      throw new BadRequestError("Wallet id is required");
    }
    const result = await this.walletService.getWallet({
      userId,
      walletId: walletId.toString(),
    });
    const response = mapToWalletResponse(
      result,
      200,
      "Wallet fetched successfully",
    );
    res.status(200).json(response);
  });

  public getUserWallets = catchAsync(
    async (req: AuthRequest, res: Response) => {
      const userId = req.auth!.userId;
      const result = await this.walletService.getUserWallets(userId);
      const response = mapToWalletsResponse(
        result,
        200,
        "Wallets fetched successfully",
      );
      res.status(200).json(response);
    },
  );

  public creditWallet = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const walletId = req.params.walletId;
    if (!walletId) {
      throw new BadRequestError("Wallet id is required");
    }
    const { amount } = req.body;
    const result = await this.walletService.creditWallet({
      userId,
      walletId: walletId.toString(),
      amount,
    });
    const response = mapToWalletResponse(
      result,
      200,
      "Wallet credited successfully",
    );
    res.status(200).json(response);
  });

  public debitWallet = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const walletId = req.params.walletId;
    if (!walletId) {
      throw new BadRequestError("Wallet id is required");
    }
    const { amount } = req.body;
    const result = await this.walletService.debitWallet({
      userId,
      walletId: walletId.toString(),
      amount,
    });
    const response = mapToWalletResponse(
      result,
      200,
      "Wallet debited successfully",
    );
    res.status(200).json(response);
  });

  public deleteWallet = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const walletId = req.params.walletId;
    if (!walletId) {
      throw new BadRequestError("Wallet id is required");
    }
    await this.walletService.deleteWallet({
      userId,
      walletId: walletId.toString(),
    });
    res.status(200).json({
      message: "Wallet deleted successfully",
      code: 200,
      success: true,
    });
  });
}
