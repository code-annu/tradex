import {
  User as PrismaUser,
  Session as PrismaSession,
} from "../../generated/prisma";
import { Session, User } from "./auth.types";

type SessionWithUser = PrismaSession & { user: PrismaUser };

export default abstract class AuthMapper {
  public static toUserType(user: PrismaUser): User {
    return {
      id: user.uuid.toString(),
      fullname: user.fullname,
      email: user.email,
      passwordHash: user.password_hash,
      isVerified: user.is_verified,
      deletedAt: user.deleted_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  public static toSessionType(session: SessionWithUser): Session {
    return {
      id: session.uuid.toString(),
      user: AuthMapper.toUserType(session.user),
      token: session.token,
      expiresAt: session.expires_at,
      createdAt: session.created_at,
    };
  }
}
