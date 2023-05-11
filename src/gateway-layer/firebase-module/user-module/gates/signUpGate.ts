import { addDoc, Firestore, collection } from "firebase/firestore";
import { SignUpUsecase } from "../../../../core-layer/user-module";

export class SignUpGate implements SignUpUsecase {
  constructor(private firebaseDb: Firestore) {}
  signUpWithPassword: SignUpUsecase["signUpWithPassword"] = async (param) => {
    try {
      const dbRef = collection(this.firebaseDb, "users");
      const { id } = await addDoc(dbRef, param);
      console.log("documento adicionado ao banco de dados!", id);
      return { type: "success", userId: id };
    } catch (err) {
      console.log("Falha ao gravar documento no banco de dados");
      return { type: "error", error: err as string };
    }
  };
}
