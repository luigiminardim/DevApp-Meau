import {
  LoginGate,
  LoginUsecase,
  LoginUsecaseImpl,
  SetNotificationTokenGate,
} from "./use-cases/LoginUsecase";
import { LogoutUsecase, LogoutUsecaseImpl } from "./use-cases/LogoutUsecase";
import {
  SignUpGate,
  SignUpUsecase,
  SignUpUsecaseImpl,
} from "./use-cases/SignUpUsecase";

export type { User } from "./entities/User";
export type { GetUserGate } from "./interfaces/GetUserGate";

export type { LoginGate, SignUpUsecase, SetNotificationTokenGate, SignUpGate };

export class UserModule {
  loginUsecase: LoginUsecase;
  signupUsecase: SignUpUsecase;
  logoutUsecase: LogoutUsecase = new LogoutUsecaseImpl();

  constructor(
    loginGate: LoginGate,
    signUpGate: SignUpGate,
    setNotificationTokenGate: SetNotificationTokenGate
  ) {
    this.loginUsecase = new LoginUsecaseImpl(
      loginGate,
      setNotificationTokenGate
    );
    this.signupUsecase = new SignUpUsecaseImpl(this.loginUsecase, signUpGate);
  }
}
