import { LoginUsecase, UserModule, SignUpUsecase } from "./user-module";

export class CoreLayer {
  userModule: UserModule;

  constructor(loginUsecase: LoginUsecase, public signUpUsecase: SignUpUsecase) {
    this.userModule = new UserModule(loginUsecase, signUpUsecase);
  }
}
