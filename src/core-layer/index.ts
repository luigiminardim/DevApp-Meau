import { LoginUsecase, UserModule } from "./user-module";

export class CoreLayer {
  userModule: UserModule;

  constructor(loginUsecase: LoginUsecase) {
    this.userModule = new UserModule(loginUsecase);
  }
}
