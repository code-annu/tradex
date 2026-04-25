import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./inversify.types";
import AuthRepository from "../features/authentication/auth.repository";
import AuthService from "../features/authentication/auth.service";
import AuthController from "../features/authentication/auth.controller";
import UserValidator from "../validator/user.validator";
import ProfileRepository from "../features/profile/profile.repository";
import ProfileService from "../features/profile/profile.service";
import ProfileController from "../features/profile/profile.controller";
import ProfileValidator from "../validator/profile.validator";
import WalletRepository from "../features/wallet/wallet.repository";
import WalletService from "../features/wallet/wallet.service";
import WalletController from "../features/wallet/wallet.controller";
import WalletValidator from "../validator/wallet.validator";
import TokenService from "../features/token/domain/service/token.service";
import TokenController from "../features/token/api/controller/token.controller";
import TokenValidator from "../validator/token.validator";
import TokenRepository from "../features/token/data/repository/token.repository";
import PriceHistoryRepository from "../features/token/data/repository/price-history.repository";
import PriceHistoryService from "../features/token/domain/service/price-history.service";
import PriceHistoryController from "../features/token/api/controller/price-history.controller";

const container = new Container();

// Authentication bindings
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);
container.bind<UserValidator>(TYPES.UserValidator).to(UserValidator);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

// Profile bindings
container
  .bind<ProfileRepository>(TYPES.ProfileRepository)
  .to(ProfileRepository);
container.bind<ProfileValidator>(TYPES.ProfileValidator).to(ProfileValidator);
container.bind<ProfileService>(TYPES.ProfileService).to(ProfileService);
container
  .bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController);

// Wallet bindings
container.bind<WalletRepository>(TYPES.WalletRepository).to(WalletRepository);
container.bind<WalletValidator>(TYPES.WalletValidator).to(WalletValidator);
container.bind<WalletService>(TYPES.WalletService).to(WalletService);
container.bind<WalletController>(TYPES.WalletController).to(WalletController);

// Token bindings
container.bind<TokenRepository>(TYPES.TokenRepository).to(TokenRepository);
container.bind<TokenValidator>(TYPES.TokenValidator).to(TokenValidator);
container.bind<TokenService>(TYPES.TokenService).to(TokenService);
container.bind<TokenController>(TYPES.TokenController).to(TokenController);

// Price History bindings
container.bind<PriceHistoryRepository>(TYPES.PriceHistoryRepository).to(PriceHistoryRepository);
container.bind<PriceHistoryService>(TYPES.PriceHistoryService).to(PriceHistoryService);
container.bind<PriceHistoryController>(TYPES.PriceHistoryController).to(PriceHistoryController);

export default container;
