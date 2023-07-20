import { Firestore, doc, updateDoc } from "firebase/firestore";
import { ConfirmAdoptionUsecase } from "../../../../core-layer/adoption-module";

export class ConfirmAdoptionGate implements ConfirmAdoptionUsecase {
  constructor(private firebaseDb: Firestore) {}

  confirmAdoption: ConfirmAdoptionUsecase["confirmAdoption"] = async (
    param
  ) => {
    const animalAdoptedRef = doc(
      this.firebaseDb,
      "animals",
      param.animalId.toString()
    );
    try {
      await updateDoc(animalAdoptedRef, {
        avaible: false,
        donorId: param.interestedUserId.toString(),
      });
      return { success: true, message: "Animal adotado com sucesso." };
    } catch (err) {
      return { success: false, message: "Erro ao adotar animal" };
    }
  };
}
