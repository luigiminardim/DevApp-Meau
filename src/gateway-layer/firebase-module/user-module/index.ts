import { Auth as FirebaseAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { SignUpGate } from "./gates/signUpGate";

export class FirebaseUserModule {
  signUpGate: SignUpGate;

  constructor(firebaseAuth: FirebaseAuth, firebaseDb: Firestore) {
    this.signUpGate = new SignUpGate(firebaseAuth, firebaseDb);
  }
}
