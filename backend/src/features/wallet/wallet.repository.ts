import { injectable } from "inversify";
import { prisma } from "../../config/prisma.client";
import { Wallet, WalletCreate, WalletUpdate } from "./wallet.types";
// import { Decimal } from "@prisma/client/runtime/wasm-compiler-edge";
import WalletMapper from "./wallet.mapper";

@injectable()
export default class WalletRepository {
  private readonly db;

  constructor() {
    this.db = prisma;
  }

  public createWallet = async (data: WalletCreate): Promise<Wallet> => {
    const { userId, balanceUsdt, lockedBalance } = data;
    const wallet = await this.db.wallet.create({
      data: {
        user: { connect: { uuid: userId } },
        balance_usdt: balanceUsdt,
        locked_balance: lockedBalance,
      },
      include: { user: true },
    });

    return WalletMapper.toType(wallet);
  };

  public findByUserId = async (userId: string): Promise<Wallet[]> => {
    const wallet = await this.db.wallet.findMany({
      where: { user_id: userId },
      include: { user: true },
    });

    return wallet.map(WalletMapper.toType);
  };

  public findById = async (walletId: string): Promise<Wallet | null> => {
    const wallet = await this.db.wallet.findUnique({
      where: { uuid: walletId },
      include: { user: true },
    });

    return wallet ? WalletMapper.toType(wallet) : null;
  };

  public updateWallet = async (
    walletId: string,
    updates: WalletUpdate,
  ): Promise<Wallet> => {
    const { balanceUsdt, lockedBalance } = updates;
    const wallet = await this.db.wallet.update({
      where: { uuid: walletId },
      data: {
        balance_usdt: balanceUsdt,
        locked_balance: lockedBalance,
      },
      include: { user: true },
    });

    return WalletMapper.toType(wallet);
  };

  public deleteWallet = async (walletId: string) => {
    await this.db.wallet.delete({
      where: { uuid: walletId },
      include: { user: true },
    });
  };
}
