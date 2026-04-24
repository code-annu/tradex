import { inject, injectable } from "inversify";
import { Response } from "express";
import TYPES from "../../di/inversify.types";
import ProfileService from "./profile.service";
import { mapToProfileResponse } from "./profile.response";
import catchAsync from "../../error/async.catch";
import { AuthRequest } from "../../middlewares/auth.middleware";

@injectable()
export default class ProfileController {
  constructor(
    @inject(TYPES.ProfileService)
    private readonly profileService: ProfileService,
  ) {}

  public createProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
      const userId = req.auth!.userId;
      const { dob, gender, bio, avatarUrl } = req.body;
      const result = await this.profileService.createProfile({
        userId,
        dob,
        gender,
        bio,
        avatarUrl,
      });
      const response = mapToProfileResponse(
        result,
        201,
        "Profile created successfully",
      );
      res.status(201).json(response);
    },
  );

  public getProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
      const userId = req.auth!.userId;
      const result = await this.profileService.getProfile(userId);
      const response = mapToProfileResponse(
        result,
        200,
        "Profile fetched successfully",
      );
      res.status(200).json(response);
    },
  );

  public updateProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
      const userId = req.auth!.userId;
      const { dob, gender, bio, avatarUrl } = req.body;
      const result = await this.profileService.updateProfile({
        id: userId,
        dob,
        gender,
        bio,
        avatarUrl,
      });
      const response = mapToProfileResponse(
        result,
        200,
        "Profile updated successfully",
      );
      res.status(200).json(response);
    },
  );

  public deleteProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
      const userId = req.auth!.userId;
      await this.profileService.deleteProfile(userId);
      res.status(200).json({
        message: "Profile deleted successfully",
        code: 200,
        success: true,
      });
    },
  );
}
