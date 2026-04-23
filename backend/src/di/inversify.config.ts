import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./inversify.types";
import AuthRepository from "../features/authentication/auth.repository";
import AuthService from "../features/authentication/auth.service";
import AuthController from "../features/authentication/auth.controller";
import AuthValidator from "../validator/auth.validator";

const container = new Container();

container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<AuthValidator>(TYPES.AuthValidator).to(AuthValidator);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export default container;
