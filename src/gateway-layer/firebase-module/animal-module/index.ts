import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { GetAnimalsAdoptionGate } from "./gates/GetAnimalsAdoptionGate";
import { GetSingleAnimalGate } from "./gates/GetSingleAnimalGate";
import { RegisterAnimalGate } from "./gates/RegisterAnimalGate";
import { AnimalBuilder } from "./gates/utils/AnimalBuilder";
import { GetUserAnimalsGate } from "./gates/GetUserAnimalsGate";
import { RemoveAnimalGate } from "./gates/RemoveAnimalGate";

export type { AnimalData } from "./gates/dto/AnimalData";

export class FirebaseAnimalModule {
  registerAnimalGate: RegisterAnimalGate;
  getAnimalsAdoptionGate: GetAnimalsAdoptionGate;
  getSingleAnimalGate: GetSingleAnimalGate;
  getUserAnimalsGate: GetUserAnimalsGate;
  removeAnimalGate: RemoveAnimalGate;

  constructor(firebaseDb: Firestore, firebaseStorage: FirebaseStorage) {
    this.registerAnimalGate = new RegisterAnimalGate(
      firebaseDb,
      firebaseStorage
    );
    const animalBuilder = new AnimalBuilder(firebaseStorage);
    this.getAnimalsAdoptionGate = new GetAnimalsAdoptionGate(
      firebaseDb,
      animalBuilder
    );
    this.getSingleAnimalGate = new GetSingleAnimalGate(
      firebaseDb,
      animalBuilder
    );
    this.getUserAnimalsGate = new GetUserAnimalsGate(firebaseDb, animalBuilder);
    this.removeAnimalGate = new RemoveAnimalGate(firebaseDb);
  }
}
