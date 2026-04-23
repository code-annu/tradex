import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../di/inversify.types";
import AuthService from "./auth.service";
import { mapToAuthResponse } from "./auth.response";
import catchAsync from "../../error/async.catch";

@injectable()
export default class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: AuthService,
  ) {}

  public signup = catchAsync(async (req: Request, res: Response) => {
    const { fullname, email, password } = req.body;
    const result = await this.authService.signup({ fullname, email, password });
    const response = mapToAuthResponse(
      result,
      201,
      "User registered successfully",
    );
    res.status(201).json(response);
  });

  public login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.authService.login({ email, password });
    const response = mapToAuthResponse(result, 200, "Login successful");
    res.status(200).json(response);
  });

  public refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.body;
    const result = await this.authService.refreshToken(token);
    const response = mapToAuthResponse(
      result,
      200,
      "Token refreshed successfully",
    );
    res.status(200).json(response);
  });

  public logout = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await this.authService.logout(refreshToken);
    res.status(200).json({
      message: "Logged out successfully",
      code: 200,
      success: true,
    });
  });
}
