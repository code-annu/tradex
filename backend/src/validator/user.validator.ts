import { inject, injectable } from "inversify";
import TYPES from "../di/inversify.types";
import AuthRepository from "../features/authentication/auth.repository";
import { User } from "../features/authentication/auth.types";
import { ConflictError, NotFoundError } from "../error/errors";

@injectable()
export default class UserValidator {
  constructor(
    @inject(TYPES.AuthRepository) private readonly authRepo: AuthRepository,
  ) {}

  public ensureUserWithEmailNotExists = async (email: string) => {
    const user = await this.authRepo.findUserByEmail(email);
    if (user) {
      throw new ConflictError(`User with email ${email} is already exists`);
    }
  };

  public ensureUserWithEmailExists = async (email: string) => {
    const user = await this.authRepo.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError(`User with email ${email} is not exists`);
    }
    return user;
  };

  public ensureUserWithIdExists = async (id: string): Promise<User> => {
    const user = await this.authRepo.findUserById(id);
    if (!user || user.deletedAt) {
      throw new NotFoundError(
        `User with id ${id} is not exists or account may be deleted`,
      );
    }
    return user;
  };

  public ensureSessionWithTokenExists = async (token: string) => {
    const session = await this.authRepo.findSessionByToken(token);
    if (!session) {
      throw new NotFoundError(`Session with token ${token} is not exists`);
    }
    return session;
  };

  public ensureSessionWithIdExists = async (id: string) => {
    const session = await this.authRepo.findSessionById(id);
    if (!session) {
      throw new NotFoundError(`Session with id ${id} is not exists`);
    }
    return session;
  };
}
