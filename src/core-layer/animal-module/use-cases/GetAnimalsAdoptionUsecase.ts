import { Animal } from "../entities/Animal";

export interface GetAnimalsAdoptionUsecase {
  queryAnimalsForAdoption(): Promise<
    | { type: "success"; animalsForAdoption: Array<Animal> }
    | { type: "error"; error: string }
  >;
}
