import { RegisterAnimalUsecase } from "../../../../core-layer/animal-module";

export class RegisterAnimalGate implements RegisterAnimalUsecase {
  registerAnimal: RegisterAnimalUsecase["registerAnimal"] = async (param) => {
    console.log("RegisterAnimalGate.registerAnimal", param);
  };
}
