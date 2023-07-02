import { Firestore, addDoc, collection } from "firebase/firestore";
import {
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestGate,
} from "../../../../core-layer/adoption-module";
import { Animal } from "../../../../core-layer/animal-module";
import { User } from "../../../../core-layer/user-module";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";

export class CreateAdoptionInterestGateImpl
  implements CreateAdoptionInterestGate
{
  constructor(private firebaseDb: Firestore) {}

  private buildAdoptionInterestData = (
    animal: Animal,
    interested: User
  ): AdoptionInterestData => {
    return {
      animalId: animal.id,
      interestedUserId: interested.id,
    };
  };

  createAdoptionInterest: CreateAdoptionInterestUsecase["createAdoptionInterest"] =
    async (param) => {
      const adoptionInterestData = this.buildAdoptionInterestData(
        param.animal,
        param.interested
      );
      const collectionRef = collection(this.firebaseDb, "adoption-interests");
      try {
        await addDoc(collectionRef, adoptionInterestData);
        return { type: "success" };
      } catch (err) {
        return { type: "error", message: String(err) };
      }
    };
}
