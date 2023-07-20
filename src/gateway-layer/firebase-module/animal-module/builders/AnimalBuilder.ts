import { FirebaseStorage, getDownloadURL, ref } from "firebase/storage";
import { Animal } from "../../../../core-layer/animal-module/entities/Animal";
import { AnimalData } from "../gates/dto/AnimalData";

export class AnimalBuilder {
  constructor(private firebaseStorage: FirebaseStorage) {}

  async buildAnimalFromData(id: string, data: AnimalData): Promise<Animal> {
    const imageRef = ref(this.firebaseStorage, `animals/image/${id}`);
    const imageUri = await getDownloadURL(imageRef);
    return {
      id,
      donorId: data.donorId,
      name: data.name,
      imageUri: imageUri,
      species: data.species,
      sex: data.sex,
      size: data.size,
      age: data.age,
      temperament: {
        playful: data.temperament.playful,
        shy: data.temperament.shy,
        calm: data.temperament.calm,
        guard: data.temperament.guard,
        loving: data.temperament.loving,
        lazy: data.temperament.lazy,
        docile: data.temperament.docile,
      },
      health: {
        vaccinated: data.health.vaccinated,
        dewormed: data.health.dewormed,
        castrated: data.health.castrated,
        sick: data.health.sick,
        sickDescription: data.health.sickDescription,
      },
      adoptionRequirements: {
        terms: data.adoptionRequirements.terms,
        homePhotos: data.adoptionRequirements.homePhotos,
        animalPreviousVisit: data.adoptionRequirements.animalPreviousVisit,
        postAdoptionFollowup: data.adoptionRequirements.postAdoptionFollowup,
      },
      commentary: data.commentary,
      avaible: data.avaible,
    };
  }
}
