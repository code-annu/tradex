const TYPES = {
  // Authentication types
  AuthRepository: Symbol.for("AuthRepository"),
  AuthService: Symbol.for("AuthService"),
  AuthController: Symbol.for("AuthController"),
  UserValidator: Symbol.for("AuthValidator"),

  // Profile types
  ProfileRepository: Symbol.for("ProfileRepository"),
  ProfileService: Symbol.for("ProfileService"),
  ProfileController: Symbol.for("ProfileController"),
  ProfileValidator: Symbol.for("ProfileValidator"),

  // Wallet types
  WalletRepository: Symbol.for("WalletRepository"),
  WalletService: Symbol.for("WalletService"),
  WalletController: Symbol.for("WalletController"),
  WalletValidator: Symbol.for("WalletValidator"),

  TokenRepository: Symbol.for("TokenRepository"),
  TokenService: Symbol.for("TokenService"),
  TokenController: Symbol.for("TokenController"),
  TokenValidator: Symbol.for("TokenValidator"),

  // Price History types
  PriceHistoryRepository: Symbol.for("PriceHistoryRepository"),
  PriceHistoryService: Symbol.for("PriceHistoryService"),
  PriceHistoryController: Symbol.for("PriceHistoryController"),
};

export default TYPES;
