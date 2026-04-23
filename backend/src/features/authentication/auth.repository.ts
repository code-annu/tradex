import { injectable } from "inversify";
import { PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import {
  Session,
  SessionCreate,
  SessionUpdate,
  User,
  UserCreate,
  UserUpdate,
} from "./auth.types";
import AuthMapper from "./auth.mapper";

@injectable()
export default class AuthRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  public createUser = async (data: UserCreate): Promise<User> => {
    const { fullname, email, passwordHash } = data;
    const user = await this.db.user.create({
      data: {
        fullname: fullname,
        email: email,
        password_hash: passwordHash,
      },
    });

    return AuthMapper.toUserType(user);
  };

  public findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.db.user.findUnique({
      where: { email: email },
    });
    return user ? AuthMapper.toUserType(user) : null;
  };

  public updateUser = async (
    id: string,
    updates: UserUpdate,
  ): Promise<User> => {
    const { fullname, isVerified } = updates;
    const user = await this.db.user.update({
      where: { uuid: id },
      data: {
        fullname: fullname,
        is_verified: isVerified,
      },
    });

    return AuthMapper.toUserType(user);
  };

  public deleteUser = async (id: string): Promise<User> => {
    const user = await this.db.user.update({
      where: { uuid: id },
      data: { deleted_at: new Date() },
    });

    return AuthMapper.toUserType(user);
  };

  public findUserById = async (id: string): Promise<User | null> => {
    const user = await this.db.user.findUnique({ where: { uuid: id } });
    return user ? AuthMapper.toUserType(user) : null;
  };

  public createSession = async (data: SessionCreate): Promise<Session> => {
    const { userId, token, expiresAt } = data;
    const session = await this.db.session.create({
      data: {
        user_id: userId,
        token: token,
        expires_at: expiresAt,
      },
      include: { user: true },
    });
    return AuthMapper.toSessionType(session);
  };

  public updateSession = async (
    id: string,
    updates: SessionUpdate,
  ): Promise<Session> => {
    const { token, expiresAt } = updates;
    const session = await this.db.session.update({
      where: { uuid: id },
      data: {
        token: token,
        expires_at: expiresAt,
      },
      include: { user: true },
    });
    return AuthMapper.toSessionType(session);
  };

  public deleteSession = async (id: string): Promise<Session> => {
    const session = await this.db.session.delete({
      where: { uuid: id },
      include: { user: true },
    });
    return AuthMapper.toSessionType(session);
  };

  public findSessionByToken = async (
    token: string,
  ): Promise<Session | null> => {
    const session = await this.db.session.findUnique({
      where: { token: token },
      include: { user: true },
    });
    return session ? AuthMapper.toSessionType(session) : null;
  };

  public findSessionById = async (id: string): Promise<Session | null> => {
    const session = await this.db.session.findUnique({
      where: { uuid: id },
      include: { user: true },
    });
    return session ? AuthMapper.toSessionType(session) : null;
  };

  public findUserSessions = async (userId: string): Promise<Session[]> => {
    const sessions = await this.db.session.findMany({
      where: { user_id: userId },
      include: { user: true },
    });
    return sessions.map((session) => AuthMapper.toSessionType(session));
  };

  public deleteUserSessions = async (userId: string): Promise<void> => {
    await this.db.session.deleteMany({
      where: { user_id: userId },
    });
  };

  public deleteExpiredUserSessions = async (userId: string) => {
    await this.db.session.deleteMany({
      where: {
        user_id: userId,
        expires_at: { lt: new Date() },
      },
    });
  };
}
