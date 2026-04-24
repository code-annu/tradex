import { Profile as PrismaProfile, User } from "../../generated/prisma";
import { Gender, Profile } from "./profile.types";

type ProfileWithUser = PrismaProfile & {
  user: User;
};

export default abstract class ProfileMapper {
  public static toProfileType(profile: ProfileWithUser): Profile {
    return {
      id: profile.uuid.toString(),
      dob: profile.dob,
      gender: profile.gender as Gender,
      user: {
        id: profile.user.uuid.toString(),
        fullName: profile.user.fullname,
        email: profile.user.email,
        isVerified: profile.user.is_verified,
        createdAt: profile.user.created_at,
        updatedAt: profile.user.updated_at,
      },
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
  }
}
