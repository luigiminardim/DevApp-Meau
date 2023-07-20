import { User } from "../entities/User";
import { LoginUsecase } from "./LoginUsecase";

export interface SignUpUsecase {
  signUpWithPassword(param: {
    email: string;
    password: string;
    name: string;
    age: number;
    state: string;
    city: string;
    address: string;
    phone: string;
    imageUri: string;
  }): Promise<
    { type: "success"; user: User } | { type: "error"; error: string }
  >;
}

export interface SignUpGate {
  signUpWithPassword(param: {
    email: string;
    password: string;
    name: string;
    age: number;
    state: string;
    city: string;
    address: string;
    phone: string;
    imageUri: string;
  }): Promise<{ type: "success" } | { type: "error"; error: string }>;
}

export class SignUpUsecaseImpl implements SignUpUsecase {
  constructor(
    private loginUsecase: LoginUsecase,
    private signUpGate: SignUpGate
  ) {}

  signUpWithPassword: SignUpUsecase["signUpWithPassword"] = async (param) => {
    const signupResult = await this.signUpGate.signUpWithPassword(param);
    if (signupResult.type === "error") {
      return signupResult;
    }
    const loginResult = await this.loginUsecase.loginWithPassword({
      username: param.email,
      password: param.password,
    });
    if (loginResult.type === "error") {
      return loginResult;
    }
    return { type: "success", user: loginResult.user };
  };
}
