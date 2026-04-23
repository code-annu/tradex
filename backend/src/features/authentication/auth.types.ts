export interface User {
  readonly id: string;
  fullname: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  fullname: string;
  email: string;
  passwordHash: string;
}

export interface UserUpdate {
  fullname: string;
  isVerified: boolean;
}

export interface Session {
  readonly id: string;
  user: User;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface SessionCreate {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface SessionUpdate {
  token: string;
  expiresAt: Date;
}
