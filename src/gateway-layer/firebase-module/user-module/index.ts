import { Firestore } from "firebase/firestore";
import { SignUpGate } from "./gates/signUpGate";

export class FirebaseUserModule {
  signUpGate: SignUpGate;

  constructor(firebaseDb: Firestore) {
    this.signUpGate = new SignUpGate(firebaseDb);
  }
}
