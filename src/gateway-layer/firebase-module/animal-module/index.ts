import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { RegisterAnimalGate } from "./gates/RegisterAnimalGate";

export class FirebaseAnimalModule {
  registerAnimalGate: RegisterAnimalGate;

  constructor(firebaseDb: Firestore, firebaseStorage: FirebaseStorage) {
    this.registerAnimalGate = new RegisterAnimalGate(
      firebaseDb,
      firebaseStorage
    );
  }
}
