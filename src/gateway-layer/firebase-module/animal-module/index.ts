import { AnimalData } from "./gates/dto/AnimalData";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";
import { GetAnimalsAdoptionGate } from "./gates/GetAnimalsAdoptionGate";
import { GetSingleAnimalGate } from "./gates/GetSingleAnimalGate";
import { RegisterAnimalGate } from "./gates/RegisterAnimalGate";
import { GetUserAnimalsGate } from "./gates/GetUserAnimalsGate";
import { RemoveAnimalGate } from "./gates/RemoveAnimalGate";
import { AnimalDataRepository } from "./repositories/AnimalDataRepository";
import { AnimalBuilder } from "./builders/AnimalBuilder";

export { AnimalData, AnimalBuilder, GetSingleAnimalGate, AnimalDataRepository };

export class FirebaseAnimalModule {
  animalDataRepository: AnimalDataRepository;
  animalBuilder: AnimalBuilder;

  registerAnimalGate: RegisterAnimalGate;
  getAnimalsAdoptionGate: GetAnimalsAdoptionGate;
  getSingleAnimalGate: GetSingleAnimalGate;
  getUserAnimalsGate: GetUserAnimalsGate;
  removeAnimalGate: RemoveAnimalGate;

  constructor(firebaseDb: Firestore, firebaseStorage: FirebaseStorage) {
    this.animalDataRepository = new AnimalDataRepository(firebaseDb);
    this.registerAnimalGate = new RegisterAnimalGate(
      firebaseDb,
      firebaseStorage
    );
    this.animalBuilder = new AnimalBuilder(firebaseStorage);
    this.getAnimalsAdoptionGate = new GetAnimalsAdoptionGate(
      firebaseDb,
      this.animalBuilder
    );
    this.getSingleAnimalGate = new GetSingleAnimalGate(
      this.animalDataRepository,
      this.animalBuilder
    );
    this.getUserAnimalsGate = new GetUserAnimalsGate(
      firebaseDb,
      this.animalBuilder
    );
    this.removeAnimalGate = new RemoveAnimalGate(firebaseDb);
  }
}
