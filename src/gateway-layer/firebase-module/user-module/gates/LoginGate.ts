import { LoginUsecase } from "../../../../core-layer/user-module";
import {
  signInWithEmailAndPassword,
  Auth as FirebaseAuth,
} from "firebase/auth";

export class LoginGate implements LoginUsecase {
  constructor(private firebaseAuth: FirebaseAuth) {}

  loginWithPassword: LoginUsecase["loginWithPassword"] = async (param) => {
    try {
      await signInWithEmailAndPassword(
        this.firebaseAuth,
        param.username,
        param.password
      );
      return { type: "success" };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
