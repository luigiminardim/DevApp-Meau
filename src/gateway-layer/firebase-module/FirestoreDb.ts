import { SignUpUsecase } from "../../core-layer/user-module";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export class FireStoreDb implements SignUpUsecase {
  signUpWithPassword: SignUpUsecase["signUpWithPassword"] = async (param) => {
    try {
      const dbRef = collection(db, "users");
      const docRef = await addDoc(dbRef, param);
      console.log("documento adicionado ao banco de dados!", docRef.id);
      return { type: "success" };
    } catch (err) {
      console.log("Falha ao gravar documento no banco de dados");
      return { type: "error" };
    }
  };
}
