export interface RemoveAnimalUseCase {
  removeAnimal(param: {
    animalId: string;
  }): Promise<{ type: "success" } | { type: "error"; error: string }>;
}
