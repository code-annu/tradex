import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import AuthRepository from "./auth.repository";
import { User } from "./auth.types";
import AuthValidator from "../../validator/auth.validator";
import { LoginInput, SignupUserInput, UserWithSession } from "./auth.dto";
import * as bcrypt from "bcrypt";
import { UnauthorizedError } from "../../error/errors";
import { generateTokens } from "../../util/jwt-util";

@injectable()
export default class AuthService {
  constructor(
    @inject(TYPES.AuthRepository)
    private readonly authRepo: AuthRepository,
    @inject(TYPES.AuthValidator)
    private readonly authValidator: AuthValidator,
  ) {}

  public signup = async (input: SignupUserInput): Promise<UserWithSession> => {
    const { email, password, fullname } = input;
    await this.authValidator.ensureUserWithEmailNotExists(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authRepo.createUser({
      fullname,
      email,
      passwordHash: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const session = await this.authRepo.createSession({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return { user, session, accessToken };
  };

  public login = async (input: LoginInput): Promise<UserWithSession> => {
    const { email, password } = input;
    const user = await this.authValidator.ensureUserWithEmailExists(email);
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    await this.authRepo.deleteExpiredUserSessions(user.id);

    const session = await this.authRepo.createSession({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return { user, session, accessToken };
  };

  public refreshToken = async (token: string): Promise<UserWithSession> => {
    const session =
      await this.authValidator.ensureSessionWithTokenExists(token);

    if (session.expiresAt < new Date()) {
      await this.authRepo.deleteSession(session.id);
      throw new UnauthorizedError("Session expired");
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: session.user.id,
      email: session.user.email,
    });

    const newSession = await this.authRepo.updateSession(session.id, {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return { user: session.user, session: newSession, accessToken };
  };

  public logout = async (token: string) => {
    const session =
      await this.authValidator.ensureSessionWithTokenExists(token);
    await this.authRepo.deleteSession(session.id);
  };
}
