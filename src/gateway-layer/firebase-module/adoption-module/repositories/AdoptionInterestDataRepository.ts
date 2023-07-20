import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";

export class AdoptionInterestDataRepository {
  constructor(private firebaseDb: Firestore) {}

  async getById(
    id: string
  ): Promise<
    | { success: true; data: [string, AdoptionInterestData] }
    | { success: false; error: string }
  > {
    try {
      const snapshot = await getDoc(
        doc(this.firebaseDb, "adoption-interests", id)
      );
      const data = snapshot.data() as AdoptionInterestData;
      return { success: true, data: [snapshot.id, data] };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  async update(
    id: string,
    data: AdoptionInterestData
  ): Promise<{ success: true } | { success: false; error: string }> {
    try {
      await updateDoc(doc(this.firebaseDb, "adoption-interests", id), data);
      return { success: true };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  async getByInterestedUserId(
    interestedUserId: string
  ): Promise<
    | { success: true; data: [string, AdoptionInterestData][] }
    | { success: false; error: string }
  > {
    try {
      const snapshot = await getDocs(
        query(
          collection(this.firebaseDb, "adoption-interests"),
          where("interestedUserId", "==", interestedUserId)
        )
      );
      const data = snapshot.docs.map(
        (snapshotdoc) =>
          [snapshotdoc.id, snapshotdoc.data()] as [string, AdoptionInterestData]
      );
      return { success: true, data };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  async getByAnimalId(
    animalId: string
  ): Promise<
    | { success: true; data: [string, AdoptionInterestData][] }
    | { success: false; error: string }
  > {
    try {
      const { docs } = await getDocs(
        query(
          collection(this.firebaseDb, "adoption-interests"),
          where("animalId", "==", animalId)
        )
      );
      const data = docs.map(
        (snapshotdoc) =>
          [snapshotdoc.id, snapshotdoc.data()] as [string, AdoptionInterestData]
      );
      return { success: true, data };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }
}
