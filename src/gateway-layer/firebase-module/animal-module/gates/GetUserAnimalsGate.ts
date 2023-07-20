import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { GetUserAnimalsUsecase } from "../../../../core-layer/animal-module/use-cases/GetUserAnimalsUsecase";
import { AnimalBuilder } from "./utils/AnimalBuilder";
import { AnimalData } from "./dto/AnimalData";
import { Animal } from "../../../../core-layer/animal-module/entities/Animal";

export class GetUserAnimalsGate implements GetUserAnimalsUsecase {
  constructor(
    private firebaseDb: Firestore,
    private animalBuilder: AnimalBuilder
  ) {}
  queryUserAnimals: GetUserAnimalsUsecase["queryUserAnimals"] = async (
    param
  ) => {
    try {
      const animalsRef = collection(this.firebaseDb, "animals");
      const animalsQuery = query(
        animalsRef,
        where("donorId", "==", param.donorId.toString())
      );
      const querySnapshot = await getDocs(animalsQuery);
      const userAnimals: Animal[] = [];
      for (const snapshot of querySnapshot.docs) {
        let animal = await this.animalBuilder.buildAnimalFromData(
          snapshot.id,
          snapshot.data() as AnimalData
        );
        userAnimals.push(animal);
      }
      return { type: "success", userAnimals };
    } catch (err) {
      return {
        type: "error",
        error: "falha ao consultar animais disponiveis",
      };
    }
  };
}
