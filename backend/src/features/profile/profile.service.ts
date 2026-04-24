import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import ProfileRepository from "./profile.repository";
import { Profile } from "./profile.types";
import ProfileValidator from "../../validator/profile.validator";
import UserValidator from "../../validator/user.validator";
import { CreateProfileInput, ProfileUpdateInput } from "./profile.dto";

@injectable()
export default class ProfileService {
  constructor(
    @inject(TYPES.ProfileRepository)
    private readonly profileRepo: ProfileRepository,
    @inject(TYPES.ProfileValidator)
    private readonly profileValidator: ProfileValidator,
    @inject(TYPES.UserValidator)
    private readonly userValidator: UserValidator,
  ) {}

  public createProfile = async (
    input: CreateProfileInput,
  ): Promise<Profile> => {
    const { userId, dob, gender, bio, avatarUrl } = input;
    const user = await this.userValidator.ensureUserWithIdExists(userId);
    await this.profileValidator.ensureProfileNotExists(userId);

    return await this.profileRepo.createProfile({
      userId: user.id,
      dob: dob || null,
      gender: gender || null,
      bio: bio || null,
      avatarUrl: avatarUrl || null,
    });
  };

  public getProfile = async (userId: string): Promise<Profile> => {
    await this.userValidator.ensureUserWithIdExists(userId);
    return await this.profileValidator.ensureProfileExists(userId);
  };

  public updateProfile = async (
    input: ProfileUpdateInput,
  ): Promise<Profile> => {
    const { id, dob, gender, bio, avatarUrl } = input;
    await this.profileValidator.ensureProfileExists(id);
    return await this.profileRepo.updateProfile(id, {
      dob: dob || null,
      gender: gender || null,
      bio: bio || null,
      avatarUrl: avatarUrl || null,
    });
  };

  public deleteProfile = async (id: string) => {
    await this.profileValidator.ensureProfileExists(id);
    return await this.profileRepo.deleteProfile(id);
  };
}
