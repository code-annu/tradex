import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import ProfileController from "./profile.controller";
import { validateRequestBody } from "../../middlewares/validate.request.middleware";
import { createProfileSchema, updateProfileSchema } from "./profile.schema";
import { validateAuthorization } from "../../middlewares/auth.middleware";

const profileRouter = Router();

const profileController = container.get<ProfileController>(
  TYPES.ProfileController,
);

profileRouter.use(validateAuthorization);

profileRouter.post(
  "/",
  validateRequestBody(createProfileSchema),
  profileController.createProfile,
);
profileRouter.get("/", profileController.getProfile);
profileRouter.patch(
  "/",
  validateRequestBody(updateProfileSchema),
  profileController.updateProfile,
);
profileRouter.delete("/", profileController.deleteProfile);

export default profileRouter;
