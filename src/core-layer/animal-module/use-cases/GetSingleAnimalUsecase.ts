import { Animal } from "../entities/Animal";

export interface GetSingleAnimalUsecase {
  querySingleAnimal(param: {
    animalId: string;
  }): Promise<
    { type: "success"; animal: Animal } | { type: "error"; error: string }
  >;
}
