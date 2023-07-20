import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GetUserAnimalsUsecase } from "../../../../core-layer/animal-module";
import { AnimalBuilder } from "../builders/AnimalBuilder";
import { AnimalData } from "./dto/AnimalData";

export class GetUserAnimalsGate implements GetUserAnimalsUsecase {
  constructor(
    private firebaseDb: Firestore,
    private animalBuilder: AnimalBuilder
  ) {}

  getUserAnimals: GetUserAnimalsUsecase["getUserAnimals"] = async (param) => {
    try {
      const animalTuples = await getDocs(
        query(
          collection(this.firebaseDb, "animals"),
          where("donorId", "==", param.user.id)
        )
      ).then((querySnapshot) => {
        let docsTuple = [] as [string, AnimalData][];
        querySnapshot.forEach((doc) =>
          docsTuple.push([doc.id, doc.data()] as [string, AnimalData])
        );
        return docsTuple;
      });
      const animals = await Promise.all(
        animalTuples.map(([id, animalData]) =>
          this.animalBuilder.buildAnimalFromData(id, animalData)
        )
      );
      return { success: true, animals };
    } catch (e) {
      return { success: false, message: String(e) };
    }
  };
}
