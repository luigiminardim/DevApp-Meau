import { LoginUsecase } from "../../core-layer/user-module";

export class FirebaseAuthGate implements LoginUsecase {
  /** @todo */
  loginWithPassword: LoginUsecase["loginWithPassword"] = (param) => {
    return new Promise((resolve) => {
      console.log(
        `FirebaseAuth.loginWithPassword(${JSON.stringify(param, null, 2)})`
      );
      setTimeout(() => {
        resolve({ type: "success" });
      }, 1000);
    });
  };
}
