import { addDoc, Firestore, collection } from "firebase/firestore";
import { SignUpUsecase } from "../../../../core-layer/user-module";

export class SignUpGate implements SignUpUsecase {
  constructor(private firebaseDb: Firestore) {}
  signUpWithPassword: SignUpUsecase["signUpWithPassword"] = async (param) => {
    try {
      const dbRef = collection(this.firebaseDb, "users");
      const { id } = await addDoc(dbRef, param);
      return { type: "success", userId: id };
    } catch (err) {
      return { type: "error", error: err as string };
    }
  };
}
