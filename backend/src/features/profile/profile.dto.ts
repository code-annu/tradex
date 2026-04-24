import { Gender } from "./profile.types";

export interface CreateProfileInput {
  userId: string;
  dob?: Date;
  gender?: Gender;
  bio?: string;
  avatarUrl?: string;
}

export interface ProfileUpdateInput {
  id: string;
  dob?: Date;
  gender?: Gender;
  bio?: string;
  avatarUrl?: string;
}
