import { Token } from "../../domain/types/token.types";

export const mapTokenResponse = (
  token: Token,
  code: number,
  message: string,
) => {
  return {
    code,
    message,
    success: true,
    data: token,
  };
};

export const mapTokensResponse = (
  tokens: Token[],
  code: number,
  message: string,
) => {
  return {
    code,
    message,
    success: true,
    data: {
      total: tokens.length,
      tokens,
    },
  };
};
