import { firebaseAuth, firebaseDb } from "./firebaseConfig";
import { FirebaseAnimalModule } from "./animal-module";
import { FirebaseUserModule } from "./user-module";

export class FirebaseModule {
  userModule: FirebaseUserModule;
  animalModule: FirebaseAnimalModule;

  constructor() {
    this.animalModule = new FirebaseAnimalModule(firebaseDb);
    this.userModule = new FirebaseUserModule(firebaseAuth, firebaseDb);
  }
}
