import {
  Auth as FirebaseAuth,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import {
  addDoc,
  Firestore as FirebaseDb,
  collection,
} from "firebase/firestore";
import { SignUpUsecase } from "../../../../core-layer/user-module";
import { UserData } from "../dto/UserData";

export class SignUpGate implements SignUpUsecase {
  constructor(
    private firebaseAuth: FirebaseAuth,
    private firebaseDb: FirebaseDb
  ) {}
  signUpWithPassword: SignUpUsecase["signUpWithPassword"] = async (param) => {
    try {
      const createAuthResult = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        param.email,
        param.password
      );
      const userData: UserData = {
        id: createAuthResult.user.uid,
        email: param.email,
        name: param.name,
        age: param.age,
        state: param.state,
        city: param.city,
        address: param.address,
        phone: param.phone,
      };
      try {
        const dbRef = collection(this.firebaseDb, "users");
        const { id } = await addDoc(dbRef, userData);
        return { type: "success", userId: id };
      } catch (err) {
        return { type: "error", error: String(err) };
      }
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
