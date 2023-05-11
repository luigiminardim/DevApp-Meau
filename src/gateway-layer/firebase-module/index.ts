import { FirebaseAuthGate } from "./FirebaseAuthGate";
import { firebaseDb } from "./firebaseConfig";
import { FirebaseUserModule } from "./user-module";

export class FirebaseModule {
  authGate: FirebaseAuthGate;
  userModule: FirebaseUserModule;
  constructor() {
    this.authGate = new FirebaseAuthGate();
    this.userModule = new FirebaseUserModule(firebaseDb);
  }
}
