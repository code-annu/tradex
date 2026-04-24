import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import AuthController from "./auth.controller";
import { validateRequestBody } from "../../middlewares/validate.request.middleware";
import { signupSchema, loginSchema, refreshTokenSchema } from "./auth.schema";

const authRouter = Router();

const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.signup,
);
authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.login,
);
authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.refreshToken,
);
authRouter.post("/logout", authController.logout);

export default authRouter;
