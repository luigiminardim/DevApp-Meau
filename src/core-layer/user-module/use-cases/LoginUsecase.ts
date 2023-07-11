import { User } from "../entities/User";

export interface LoginUsecase {
  loginWithPassword(param: {
    username: string;
    password: string;
  }): Promise<
    { type: "success"; user: User } | { type: "error"; error: string }
  >;
}

export interface LoginGate {
  loginWithPassword(param: {
    username: string;
    password: string;
  }): Promise<
    { type: "success"; user: User } | { type: "error"; error: string }
  >;
}

export interface SetNotificationTokenGate {
  setNotificationToken(param: {
    user: User;
  }): Promise<
    | { type: "success"; notificationToken: string }
    | { type: "error"; error: string }
  >;
}

export class LoginUsecaseImpl implements LoginUsecase {
  constructor(
    private gate: LoginGate,
    private setNotificationTokenGate: SetNotificationTokenGate
  ) {}

  loginWithPassword: LoginUsecase["loginWithPassword"] = async (param) => {
    const loginResult = await this.gate.loginWithPassword(param);
    if (loginResult.type === "error") {
      return {
        type: "error",
        error: loginResult.error,
      };
    }
    this.setNotificationTokenGate.setNotificationToken({
      user: loginResult.user,
    });
    return {
      type: "success",
      user: loginResult.user,
    };
  };
}
