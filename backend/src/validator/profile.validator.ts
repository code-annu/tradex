import { inject, injectable } from "inversify";
import TYPES from "../di/inversify.types";
import ProfileRepository from "../features/profile/profile.repository";
import { Profile } from "../features/profile/profile.types";
import { ConflictError, NotFoundError } from "../error/errors";

@injectable()
export default class ProfileValidator {
  constructor(
    @inject(TYPES.ProfileRepository)
    private readonly profileRepo: ProfileRepository,
  ) {}

  public ensureProfileExists = async (id: string): Promise<Profile> => {
    const profile = await this.profileRepo.findProfileById(id);
    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return profile;
  };

  public ensureProfileNotExists = async (id: string) => {
    const profile = await this.profileRepo.findProfileById(id);
    if (profile) {
      throw new ConflictError("Profile already exists");
    }
  };
}
