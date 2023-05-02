import { LoginUsecase } from "../../core-layer/user-module";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth();
export class FirebaseAuthGate implements LoginUsecase {
  loginWithPassword: LoginUsecase["loginWithPassword"] = async (param) => {
    try {
      await signInWithEmailAndPassword(auth, param.username, param.password);
      return { type: "success" };
    } catch (err) {
      return { type: "error" };
    }
  };
}
