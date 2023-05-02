import { LoginUsecase } from "./use-cases/LoginUsecase";

export { LoginUsecase };

export class UserModule {
  constructor(public loginUsecase: LoginUsecase) {}
}
