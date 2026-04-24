import { Wallet } from "./wallet.types";

export const mapToWalletResponse = (
  wallet: Wallet,
  code: number,
  message: string,
) => {
  return {
    code,
    message,
    success: true,
    data: wallet,
  };
};

export const mapToWalletsResponse = (
  wallets: Wallet[],
  code: number,
  message: string,
) => {
  return {
    code,
    message,
    success: true,
    data: {
      total: wallets.length,
      wallets,
    },
  };
};
