import { Firestore, doc, deleteDoc } from "firebase/firestore";
import { RemoveAnimalUseCase } from "../../../../core-layer/animal-module";

export class RemoveAnimalGate implements RemoveAnimalUseCase {
  constructor(private firebaseDb: Firestore) {}
  removeAnimal: RemoveAnimalUseCase["removeAnimal"] = async (param) => {
    try {
      const animalRef = doc(
        this.firebaseDb,
        "animals",
        param.animalId.toString()
      );
      deleteDoc(animalRef).then(() => {
        console.log("Animal removido com sucesso!");
      });
      return { type: "success" };
    } catch (err) {
      return {
        type: "error",
        error: "falha ao remover o animal selecionado",
      };
    }
  };
}
