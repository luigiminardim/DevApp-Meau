import { addDoc, Firestore, collection } from "firebase/firestore";
import { FirebaseStorage, ref, uploadBytesResumable } from "firebase/storage";
import {
  RegisterAnimalParam,
  RegisterAnimalUsecase,
} from "../../../../core-layer/animal-module";
import { AnimalData } from "./dto/AnimalData";

type AddAnimalDocData = Omit<AnimalData, "id" | "imageUri">;

export class RegisterAnimalGate implements RegisterAnimalUsecase {
  constructor(
    private firebaseDb: Firestore,
    private firebaseStorage: FirebaseStorage
  ) {}

  buildAddAnimalDocData(param: RegisterAnimalParam): AddAnimalDocData {
    const postAdoptionFollowup =
      param.adoptionRequirements.postAdoptionFollowup === null
        ? "null"
        : param.adoptionRequirements.postAdoptionFollowup;
    return {
      donorId: param.donorId,
      name: param.name,
      species: param.species,
      sex: param.sex,
      size: param.size,
      age: param.age,
      temperament: {
        playful: param.temperament.playful,
        shy: param.temperament.shy,
        calm: param.temperament.calm,
        guard: param.temperament.guard,
        loving: param.temperament.loving,
        lazy: param.temperament.lazy,
        docile: param.temperament.docile,
      },
      health: {
        vaccinated: param.health.vaccinated,
        dewormed: param.health.dewormed,
        castrated: param.health.castrated,
        sick: param.health.sick,
        sickDescription: param.health.sickDescription,
      },
      adoptionRequirements: {
        terms: param.adoptionRequirements.terms,
        homePhotos: param.adoptionRequirements.homePhotos,
        animalPreviousVisit: param.adoptionRequirements.animalPreviousVisit,
        postAdoptionFollowup,
      },
      commentary: param.commentary,
      avaible: true,
    };
  }

  registerAnimal: RegisterAnimalUsecase["registerAnimal"] = async (param) => {
    const addAnimalDocData = this.buildAddAnimalDocData(param);
    try {
      const { id } = await addDoc(
        collection(this.firebaseDb, "animals"),
        addAnimalDocData
      );
      const imageRef = ref(this.firebaseStorage, `animals/image/${id}`);
      const imageBlob = await fetch(param.imageUri).then((res) => res.blob());
      await uploadBytesResumable(imageRef, imageBlob);
      return { type: "success", animalId: id };
    } catch (error) {
      return { type: "error", error: error as string };
    }
  };
}
