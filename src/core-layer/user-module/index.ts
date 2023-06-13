import { LoginUsecase } from "./use-cases/LoginUsecase";
import { SignUpUsecase } from "./use-cases/SignUpUsecase";

export type { LoginUsecase };

export type { SignUpUsecase };

export class UserModule {
  constructor(
    public loginUsecase: LoginUsecase,
    public signUpUsecase: SignUpUsecase
  ) {}
}
