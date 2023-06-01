import { firebaseAuth, firebaseDb } from "./firebaseConfig";
import { FirebaseAnimalModule } from "./animal-module";
import { FirebaseUserModule } from "./user-module";
import { FirebaseAuthModule } from "./auth-module";

export class FirebaseModule {
  authModule: FirebaseAuthModule;
  userModule: FirebaseUserModule;
  animalModule: FirebaseAnimalModule;

  constructor() {
    this.authModule = new FirebaseAuthModule(firebaseAuth);
    this.animalModule = new FirebaseAnimalModule(firebaseDb);
    this.userModule = new FirebaseUserModule(firebaseAuth, firebaseDb);
  }
}
