import { Firestore } from "firebase/firestore";
import { RegisterAnimalGate } from "./gates/RegisterAnimalGate";

export class FirebaseAnimalModule {
  registerAnimalGate: RegisterAnimalGate;

  constructor(firebaseDb: Firestore) {
    this.registerAnimalGate = new RegisterAnimalGate(firebaseDb);
  }
}
