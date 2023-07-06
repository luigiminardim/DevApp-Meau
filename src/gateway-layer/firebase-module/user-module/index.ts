import { Auth as FirebaseAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { SignUpGate } from "./gates/SignUpGate";
import { FirebaseLoginGate } from "./gates/FirebaseLoginGate";
import { FirebaseStorage } from "firebase/storage";
import { UserBuilder } from "./gates/utils/UserBuilder";
import { FirebaseGetUserGate } from "./gates/FirebaseGetUserGate";

export class FirebaseUserModule {
  getUserGate: FirebaseGetUserGate;
  signUpGate: SignUpGate;
  loginGate: FirebaseLoginGate;

  constructor(
    firebaseAuth: FirebaseAuth,
    firebaseDb: Firestore,
    firebaseStorage: FirebaseStorage
  ) {
    const userBuilder = new UserBuilder(firebaseStorage);
    this.getUserGate = new FirebaseGetUserGate(firebaseDb, userBuilder);
    this.signUpGate = new SignUpGate(firebaseAuth, firebaseDb, firebaseStorage);
    this.loginGate = new FirebaseLoginGate(
      firebaseAuth,
      firebaseDb,
      userBuilder
    );
  }
}
