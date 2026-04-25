export enum TokenStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface Token {
  readonly id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  marketCap: number;
  status: TokenStatus;
  updatedAt: Date;
  createdAt: Date;
}

export interface TokenUpdate {
  currentPrice: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  marketCap: number;
  status: TokenStatus;
}
