import { UserWithSession } from "./auth.dto";

export const mapToAuthResponse = (
  userWithSession: UserWithSession,
  code: number,
  message: string,
) => {
  return {
    message,
    code,
    success: true,
    data: {
      user: {
        id: userWithSession.user.id,
        fullname: userWithSession.user.fullname,
        email: userWithSession.user.email,
        createdAt: userWithSession.user.createdAt,
        isVerified: userWithSession.user.isVerified,
      },
      session: {
        refreshToken: userWithSession.session.token,
        expiresAt: userWithSession.session.expiresAt,
        createdAt: userWithSession.session.createdAt,
      },
      accessToken: userWithSession.accessToken,
    },
  };
};
