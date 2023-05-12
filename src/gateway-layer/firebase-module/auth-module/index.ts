import { Auth as FirebaseAuth } from "firebase/auth";
import { FirebaseAuthGate } from "./gates/FirebaseAuthGate";

export class FirebaseAuthModule {
  authGate: FirebaseAuthGate;

  constructor(firebaseAuth: FirebaseAuth) {
    this.authGate = new FirebaseAuthGate(firebaseAuth);
  }
}
