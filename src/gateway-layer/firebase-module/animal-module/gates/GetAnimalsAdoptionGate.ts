import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { GetAnimalsAdoptionUsecase } from "../../../../core-layer/animal-module/use-cases/GetAnimalsAdoptionUsecase";
import { AnimalBuilder } from "./utils/AnimalBuilder";
import { AnimalData } from "./dto/AnimalData";
import { Animal } from "../../../../core-layer/animal-module/entities/Animal";

export class GetAnimalsAdoptionGate implements GetAnimalsAdoptionUsecase {
  constructor(
    private firebaseDb: Firestore,
    private animalBuilder: AnimalBuilder
  ) {}

  queryAnimalsForAdoption: GetAnimalsAdoptionUsecase["queryAnimalsForAdoption"] =
    async () => {
      try {
        const animalsRef = collection(this.firebaseDb, "animals");
        const animalsQuery = query(animalsRef, where("avaible", "==", true));
        const querySnapshot = await getDocs(animalsQuery);
        const animalsForAdoption: Animal[] = [];
        for (const snapshot of querySnapshot.docs) {
          let animal = await this.animalBuilder.buildAnimalFromData(
            snapshot.id,
            snapshot.data() as AnimalData
          );
          animalsForAdoption.push(animal);
        }
        return { type: "success", animalsForAdoption };
      } catch (err) {
        return {
          type: "error",
          error: "falha ao consultar animais disponiveis",
        };
      }
    };
}
