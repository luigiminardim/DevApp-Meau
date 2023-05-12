import { FirebaseAuthModule } from "./auth-module";
import { firebaseAuth, firebaseDb } from "./firebaseConfig";
import { FirebaseUserModule } from "./user-module";

export class FirebaseModule {
  authModule: FirebaseAuthModule;
  userModule: FirebaseUserModule;
  constructor() {
    this.authModule = new FirebaseAuthModule(firebaseAuth);
    this.userModule = new FirebaseUserModule(firebaseDb);
  }
}
