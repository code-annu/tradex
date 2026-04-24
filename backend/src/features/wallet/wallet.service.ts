import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import WalletRepository from "./wallet.repository";
import WalletValidator from "../../validator/wallet.validator";
import { Wallet } from "./wallet.types";
import {
  CreateWalletInput,
  CreditWalletInput,
  DebitWalletInput,
  DeleteWalletInput,
  GetWalletInput,
} from "./wallet.dto";
import UserValidator from "../../validator/user.validator";
import { ForbiddenError, InsufficientBalanceError } from "../../error/errors";

@injectable()
export default class WalletService {
  constructor(
    @inject(TYPES.WalletRepository)
    private readonly walletRepo: WalletRepository,
    @inject(TYPES.WalletValidator)
    private readonly walletValidator: WalletValidator,
    @inject(TYPES.UserValidator)
    private readonly userValidator: UserValidator,
  ) {}

  public createWallet = async (input: CreateWalletInput): Promise<Wallet> => {
    const { userId } = input;
    await this.userValidator.ensureUserWithIdExists(userId);
    const wallet = await this.walletRepo.createWallet({
      userId,
      balanceUsdt: 10000,
      lockedBalance: 0,
    });
    return wallet;
  };

  public getWallet = async (input: GetWalletInput): Promise<Wallet> => {
    const { walletId, userId } = input;

    const user = await this.userValidator.ensureUserWithIdExists(userId);
    const wallet = await this.walletValidator.ensureWalletExists(walletId);
    if (wallet.user.id !== user.id) {
      throw new ForbiddenError("Not authorized for this action");
    }
    return wallet;
  };

  public getUserWallets = async (userId: string): Promise<Wallet[]> => {
    await this.userValidator.ensureUserWithIdExists(userId);
    const wallets = await this.walletRepo.findByUserId(userId);
    return wallets;
  };

  public debitWallet = async (input: DebitWalletInput): Promise<Wallet> => {
    const { userId, walletId, amount } = input;
    const user = await this.userValidator.ensureUserWithIdExists(userId);
    const wallet = await this.walletValidator.ensureWalletExists(walletId);
    if (wallet.user.id !== user.id) {
      throw new ForbiddenError("Not authorized for this action");
    }
    if (wallet.balanceUsdt < amount) {
      throw new InsufficientBalanceError("Insufficient Balance");
    }
    const updatedWallet = await this.walletRepo.updateWallet(walletId, {
      balanceUsdt: wallet.balanceUsdt - amount,
      lockedBalance: wallet.lockedBalance,
    });
    return updatedWallet;
  };

  public creditWallet = async (input: CreditWalletInput): Promise<Wallet> => {
    const { userId, walletId, amount } = input;
    const user = await this.userValidator.ensureUserWithIdExists(userId);
    const wallet = await this.walletValidator.ensureWalletExists(walletId);
    if (wallet.user.id !== user.id) {
      throw new ForbiddenError("Not authorized for this action");
    }
    const updatedWallet = await this.walletRepo.updateWallet(walletId, {
      balanceUsdt: wallet.balanceUsdt + amount,
      lockedBalance: wallet.lockedBalance,
    });
    return updatedWallet;
  };

  public deleteWallet = async (input: DeleteWalletInput): Promise<void> => {
    const { userId, walletId } = input;
    const user = await this.userValidator.ensureUserWithIdExists(userId);
    const wallet = await this.walletValidator.ensureWalletExists(walletId);
    if (wallet.user.id !== user.id) {
      throw new ForbiddenError("Not authorized for this action");
    }
    await this.walletRepo.deleteWallet(walletId);
  };
}
