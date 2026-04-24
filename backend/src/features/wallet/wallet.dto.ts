export interface CreateWalletInput {
  userId: string;
}

export interface GetWalletInput {
  userId: string;
  walletId: string;
}

export interface DeleteWalletInput {
  userId: string;
  walletId: string;
}

export interface DebitWalletInput {
  userId: string;
  walletId: string;
  amount: number;
}

export interface CreditWalletInput {
  userId: string;
  walletId: string;
  amount: number;
}
