import {
  User as PrismaUser,
  Wallet as PrismWallet,
} from "../../generated/prisma";
import { Wallet } from "./wallet.types";

type WalletWithUser = PrismWallet & { user: PrismaUser };

export default abstract class WalletMapper {
  public static toType = (wallet: WalletWithUser): Wallet => {
    const {
      user,
      uuid,
      balance_usdt,
      locked_balance,
      user_id,
      created_at,
      updated_at,
    } = wallet;
    return {
      id: uuid.toString(),
      user: {
        id: user.uuid.toString(),
        fullname: user.fullname,
        email: user.email,
        isVerified: user.is_verified,
      },
      balanceUsdt: balance_usdt.toNumber(),
      lockedBalance: locked_balance.toNumber(),
      createdAt: created_at,
      updatedAt: updated_at,
    };
  };
}
