import { Firestore, doc, getDoc } from "firebase/firestore";
import { AnimalData } from "../gates/dto/AnimalData";

export class AnimalDataRepository {
  constructor(private firebaseDb: Firestore) {}

  async getAnimalDataById(
    id: string
  ): Promise<
    | { success: true; id: string; data: AnimalData }
    | { success: false; error: string }
  > {
    try {
      const animalData = (await getDoc(
        doc(this.firebaseDb, "animals", id)
      ).then((snapshot) => snapshot.data())) as AnimalData;
      return { success: true, id, data: animalData };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  }
}
