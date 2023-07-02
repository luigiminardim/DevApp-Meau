import { firebaseAuth, firebaseDb, firebaseStorage } from "./firebaseConfig";
import { FirebaseAnimalModule } from "./animal-module";
import { FirebaseUserModule } from "./user-module";
import { FirebaseAdoptionModule } from "./adoption-module";

export class FirebaseModule {
  userModule: FirebaseUserModule;
  animalModule: FirebaseAnimalModule;
  adoptionModule: FirebaseAdoptionModule;

  constructor() {
    this.animalModule = new FirebaseAnimalModule(firebaseDb, firebaseStorage);
    this.userModule = new FirebaseUserModule(
      firebaseAuth,
      firebaseDb,
      firebaseStorage
    );
    this.adoptionModule = new FirebaseAdoptionModule(firebaseDb);
  }
}
