import { GetSingleAnimalUsecase } from "../../../../core-layer/animal-module/use-cases/GetSingleAnimalUsecase";
import { AnimalBuilder } from "../builders/AnimalBuilder";
import { AnimalDataRepository } from "../repositories/AnimalDataRepository";

export class GetSingleAnimalGate implements GetSingleAnimalUsecase {
  constructor(
    private animalDataRepository: AnimalDataRepository,
    private animalBuilder: AnimalBuilder
  ) {}
  querySingleAnimal: GetSingleAnimalUsecase["querySingleAnimal"] = async (
    param
  ) => {
    const result = await this.animalDataRepository.getAnimalDataById(
      param.animalId
    );
    if (!result.success) return { type: "error", error: result.error };
    const animal = await this.animalBuilder.buildAnimalFromData(
      param.animalId,
      result.data
    );
    return { type: "success", animal };
  };
}
