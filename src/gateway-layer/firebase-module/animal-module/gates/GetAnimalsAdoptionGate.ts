import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { GetAnimalsAdoptionUsecase } from "../../../../core-layer/animal-module/use-cases/GetAnimalsAdoptionUsecase";
import { AnimalBuilder } from "./utils/AnimalBuilder";
import { AnimalData } from "./dto/AnimalData";

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
        const animalsDoc = [] as DocumentData[];
        querySnapshot.forEach((doc) => animalsDoc.push(doc.data));
        const animalsForAdoption = [];
        for (let i = 0; i < animalsDoc.length - 1; i++) {
          let animal = await this.animalBuilder.buildAnimalFromData(
            animalsDoc[i] as AnimalData
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
