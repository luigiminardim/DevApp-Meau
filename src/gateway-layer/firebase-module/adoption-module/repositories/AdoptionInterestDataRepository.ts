import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";

export class AdoptionInterestDataRepository {
  constructor(private firebaseDb: Firestore) {}

  async getByInterestedUserId(
    interestedUserId: string
  ): Promise<
    | { success: true; data: AdoptionInterestData[] }
    | { success: false; error: string }
  > {
    try {
      const { docs } = await getDocs(
        query(
          collection(this.firebaseDb, "adoptionInterests"),
          where("interestedUserId", "==", interestedUserId)
        )
      );
      const data = docs.map((doc) => doc.data() as AdoptionInterestData);
      return { success: true, data };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  async getByAnimalId(
    animalId: string
  ): Promise<
    | { success: true; data: AdoptionInterestData[] }
    | { success: false; error: string }
  > {
    try {
      const { docs } = await getDocs(
        query(
          collection(this.firebaseDb, "adoptionInterests"),
          where("animalId", "==", animalId)
        )
      );
      const data = docs.map((doc) => doc.data() as AdoptionInterestData);
      return { success: true, data };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }
}
