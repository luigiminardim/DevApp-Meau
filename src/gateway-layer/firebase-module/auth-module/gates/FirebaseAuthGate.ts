import { LoginUsecase } from "../../../../core-layer/user-module";
import {
  signInWithEmailAndPassword,
  Auth as FirebaseAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export class FirebaseAuthGate implements LoginUsecase {
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
      return { type: "error" };
    }
  };

  createUser: LoginUsecase["createUser"] = async (param) => {
    try {
      await createUserWithEmailAndPassword(
        this.firebaseAuth,
        param.username,
        param.password
      );
      return { type: "success" };
    } catch (err) {
      return { type: "error" };
    }
  };
}
