import { LoginUsecase } from "./use-cases/LoginUsecase";
import { LogoutUsecase, LogoutUsecaseImpl } from "./use-cases/LogoutUsecase";
import { SignUpUsecase } from "./use-cases/SignUpUsecase";

export type { LoginUsecase };

export type { SignUpUsecase };

export class UserModule {
  logoutUsecase: LogoutUsecase = new LogoutUsecaseImpl();

  constructor(
    public loginUsecase: LoginUsecase,
    public signUpUsecase: SignUpUsecase
  ) {}
}
