export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

interface ProfileUser {
  readonly id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  readonly id: string;
  dob: Date | null;
  gender: Gender | null;
  user: ProfileUser;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileCreate {
  userId: string;
  dob: Date | null;
  gender: Gender | null;
  bio: string | null;
  avatarUrl: string | null;
}

export interface ProfileUpdate {
  dob: Date | null;
  gender: Gender | null;
  bio: string | null;
  avatarUrl: string | null;
}
