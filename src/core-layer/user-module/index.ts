import {
  LoginGate,
  LoginUsecase,
  LoginUsecaseImpl,
  SetNotificationTokenGate,
} from "./use-cases/LoginUsecase";
import { LogoutUsecase, LogoutUsecaseImpl } from "./use-cases/LogoutUsecase";
import { SignUpUsecase } from "./use-cases/SignUpUsecase";

export type { User } from "./entities/User";
export type { GetUserGate } from "./interfaces/GetUserGate";

export type { LoginGate, SignUpUsecase, SetNotificationTokenGate };

export class UserModule {
  loginUsecase: LoginUsecase;
  logoutUsecase: LogoutUsecase = new LogoutUsecaseImpl();

  constructor(
    loginGate: LoginGate,
    public signUpUsecase: SignUpUsecase,
    setNotificationTokenGate: SetNotificationTokenGate
  ) {
    this.loginUsecase = new LoginUsecaseImpl(
      loginGate,
      setNotificationTokenGate
    );
  }
}
