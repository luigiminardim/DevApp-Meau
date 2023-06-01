import { Auth as FirebaseAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { SignUpGate } from "./gates/signUpGate";
import { LoginGate } from "./gates/LoginGate";

export class FirebaseUserModule {
  signUpGate: SignUpGate;
  loginGate: LoginGate;

  constructor(firebaseAuth: FirebaseAuth, firebaseDb: Firestore) {
    this.signUpGate = new SignUpGate(firebaseAuth, firebaseDb);
    this.loginGate = new LoginGate(firebaseAuth);
  }
}
