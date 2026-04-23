import { Session, User } from "./auth.types";

export interface SignupUserInput {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserWithSession {
  user: User;
  session: Session;
  accessToken: string;
}
