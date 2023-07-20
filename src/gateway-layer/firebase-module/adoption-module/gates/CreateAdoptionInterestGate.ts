import { Firestore, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { CreateAdoptionInterestGate } from "../../../../core-layer/adoption-module";
import { Animal } from "../../../../core-layer/animal-module";
import { User } from "../../../../core-layer/user-module";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";
import { AnimalData } from "../../animal-module";

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
      messages: [],
    };
  };

  createAdoptionInterest: CreateAdoptionInterestGate["createAdoptionInterest"] =
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

  getAnimalOwnerId: CreateAdoptionInterestGate["getAnimalOwnerId"] = async (
    animal
  ) => {
    try {
      const docSnapshot = await getDoc(
        doc(this.firebaseDb, "animals", animal.id)
      );
      const animalData = docSnapshot.data() as AnimalData;
      return { type: "success", animalOwnerId: animalData.donorId };
    } catch (err) {
      return { type: "error", message: String(err) };
    }
  };
}
