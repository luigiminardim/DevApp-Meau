import { LoginUsecase } from "./use-cases/LoginUsecase";
import { LogoutUsecase, LogoutUsecaseImpl } from "./use-cases/LogoutUsecase";
import { SignUpUsecase } from "./use-cases/SignUpUsecase";

export type { User } from "./entities/User";

export type { LoginUsecase, SignUpUsecase };

export class UserModule {
  logoutUsecase: LogoutUsecase = new LogoutUsecaseImpl();

  constructor(
    public loginUsecase: LoginUsecase,
    public signUpUsecase: SignUpUsecase
  ) {}
}
