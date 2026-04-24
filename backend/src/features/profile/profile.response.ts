import { Profile } from "./profile.types";

export const mapToProfileResponse = (
  profile: Profile,
  code: number,
  message: string,
) => {
  const { id, dob, gender, user, bio, avatarUrl, createdAt, updatedAt } =
    profile;
  return {
    code,
    message,
    success: true,
    data: {
      id,
      dob,
      gender,
      bio,
      avatarUrl,
      createdAt,
      updatedAt,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
      },
    },
  };
};
