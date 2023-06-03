import { Auth as FirebaseAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { SignUpGate } from "./gates/SignUpGate";
import { LoginGate } from "./gates/LoginGate";
import { FirebaseStorage } from "firebase/storage";

export class FirebaseUserModule {
  signUpGate: SignUpGate;
  loginGate: LoginGate;

  constructor(
    firebaseAuth: FirebaseAuth,
    firebaseDb: Firestore,
    firebaseStorage: FirebaseStorage
  ) {
    this.signUpGate = new SignUpGate(firebaseAuth, firebaseDb, firebaseStorage);
    this.loginGate = new LoginGate(firebaseAuth);
  }
}
