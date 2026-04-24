interface WalletUser {
  readonly id: string;
  fullname: string;
  email: string;
  isVerified: boolean;
}

export interface Wallet {
  readonly id: string;
  user: WalletUser;
  balanceUsdt: number;
  lockedBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletCreate {
  userId: string;
  balanceUsdt: number;
  lockedBalance: number;
}

export interface WalletUpdate {
  balanceUsdt: number;
  lockedBalance: number;
}
