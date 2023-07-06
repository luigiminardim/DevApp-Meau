import { GetDeviceNotificationTokenGate } from "./adoption-module";
import { firebaseAuth, firebaseDb, firebaseStorage } from "./firebaseConfig";
import { FirebaseAnimalModule } from "./animal-module";
import { FirebaseUserModule } from "./user-module";
import { FirebaseAdoptionModule, NotifierGate } from "./adoption-module";

export type { NotifierGate };

export class FirebaseModule {
  userModule: FirebaseUserModule;
  animalModule: FirebaseAnimalModule;
  adoptionModule: FirebaseAdoptionModule;

  constructor(
    notifierGate: NotifierGate,
    getDeviceNotificationTokenGate: GetDeviceNotificationTokenGate
  ) {
    this.animalModule = new FirebaseAnimalModule(firebaseDb, firebaseStorage);
    this.userModule = new FirebaseUserModule(
      firebaseAuth,
      firebaseDb,
      firebaseStorage
    );
    this.adoptionModule = new FirebaseAdoptionModule(
      firebaseDb,
      notifierGate,
      getDeviceNotificationTokenGate
    );
  }
}
