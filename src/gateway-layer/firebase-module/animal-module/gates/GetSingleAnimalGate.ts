import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
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
      const animalsRef = collection(this.firebaseDb, "animals");
      const animalQuery = query(animalsRef, where("id", "==", id));
      const querySnapshot = await getDocs(animalQuery);
      const animalDocs = [] as DocumentData[];
      querySnapshot.forEach((doc) => animalDocs.push(doc.data));
      const animalDoc = animalDocs[0];
      if (!animalDoc) return { type: "error", error: "Animal not found" };
      const animal = await this.animalBuilder.buildAnimalFromData(
        animalDoc as AnimalData
      );
      return { type: "success", animal };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
