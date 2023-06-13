import { Firestore, doc, getDoc } from "firebase/firestore";
import { GetSingleAnimalUsecase } from "../../../../core-layer/animal-module/use-cases/GetSingleAnimalUsecase";
import { AnimalBuilder } from "./utils/AnimalBuilder";
import { AnimalData } from "./dto/AnimalData";

export class GetSingleAnimalGate implements GetSingleAnimalUsecase {
  constructor(
    private firebaseDb: Firestore,
    private animalBuilder: AnimalBuilder
  ) {}
  querySingleAnimal: GetSingleAnimalUsecase["querySingleAnimal"] = async (
    param
  ) => {
    const id = param.animalId;
    try {
      const docRef = doc(this.firebaseDb, "animals", id);
      const animalSnapshot = await getDoc(docRef);
      const animalDoc = animalSnapshot.data();
      if (!animalDoc) return { type: "error", error: "Animal not found" };
      const animal = await this.animalBuilder.buildAnimalFromData(
        animalSnapshot.id,
        animalDoc as AnimalData
      );
      return { type: "success", animal };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
