import { FirebaseAuthGate } from "./FirebaseAuthGate";

export class FirebaseModule {
  authGate: FirebaseAuthGate;

  constructor() {
    this.authGate = new FirebaseAuthGate();
  }
}
