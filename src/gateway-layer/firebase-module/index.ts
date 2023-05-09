import "./firebaseConfig";
import { FirebaseAuthGate } from "./FirebaseAuthGate";
import { FirebaseAnimalModule } from "./animal-module";

export class FirebaseModule {
  authGate: FirebaseAuthGate;
  animalModule: FirebaseAnimalModule;

  constructor() {
    this.authGate = new FirebaseAuthGate();
    this.animalModule = new FirebaseAnimalModule();
  }
}
