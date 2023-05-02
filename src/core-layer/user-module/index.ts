import { LoginUsecase } from "./use-cases/LoginUsecase";
import { SignUpUsecase } from "./use-cases/SignUpUsecase";

export { LoginUsecase };

export { SignUpUsecase };

export class UserModule {
  constructor(public loginUsecase: LoginUsecase) {}
}
