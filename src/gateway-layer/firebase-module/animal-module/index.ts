import { RegisterAnimalGate } from "./gates/RegisterAnimalGate";

export class FirebaseAnimalModule {
  registerAnimalGate: RegisterAnimalGate;

  constructor() {
    this.registerAnimalGate = new RegisterAnimalGate();
  }
}
