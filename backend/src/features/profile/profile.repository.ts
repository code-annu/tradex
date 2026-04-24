import { injectable } from "inversify";
import { PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import { Profile, ProfileCreate, ProfileUpdate } from "./profile.types";
import ProfileMapper from "./profile.mapper";

@injectable()
export default class ProfileRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  public createProfile = async (data: ProfileCreate): Promise<Profile> => {
    const { userId, dob, gender, bio, avatarUrl } = data;
    const profile = await this.db.profile.create({
      data: {
        uuid: userId,
        dob: dob,
        gender: gender,
        bio: bio,
        avatar_url: avatarUrl,
      },
      include: { user: true },
    });

    return ProfileMapper.toProfileType(profile);
  };

  public findProfileById = async (
    profileId: string,
  ): Promise<Profile | null> => {
    const profile = await this.db.profile.findUnique({
      where: { uuid: profileId },
      include: { user: true },
    });

    return profile ? ProfileMapper.toProfileType(profile) : null;
  };

  public updateProfile = async (
    profileId: string,
    updates: ProfileUpdate,
  ): Promise<Profile> => {
    const { dob, gender, bio, avatarUrl } = updates;
    const profile = await this.db.profile.update({
      where: { uuid: profileId },
      data: {
        dob: dob,
        gender: gender,
        bio: bio,
        avatar_url: avatarUrl,
      },
      include: { user: true },
    });

    return ProfileMapper.toProfileType(profile);
  };

  public deleteProfile = async (profileId: string) => {
    await this.db.profile.delete({
      where: { uuid: profileId },
    });
  };
}
