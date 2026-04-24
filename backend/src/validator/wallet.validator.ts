import { inject, injectable } from "inversify";
import TYPES from "../di/inversify.types";
import WalletRepository from "../features/wallet/wallet.repository";
import { Wallet } from "../features/wallet/wallet.types";
import { NotFoundError } from "../error/errors";

@injectable()
export default class WalletValidator {
  constructor(
    @inject(TYPES.WalletRepository)
    private readonly walletRepo: WalletRepository,
  ) {}

  public ensureWalletExists = async (id: string): Promise<Wallet> => {
    const wallet = await this.walletRepo.findById(id);
    if (!wallet) throw new NotFoundError("Wallet not found");
    return wallet;
  };
}
