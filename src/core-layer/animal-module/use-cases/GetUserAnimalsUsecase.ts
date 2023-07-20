import { Animal } from "../entities/Animal";

export interface GetUserAnimalsUsecase {
  queryUserAnimals(param: {
    donorId: string;
  }): Promise<
    | { type: "success"; userAnimals: Array<Animal> }
    | { type: "error"; error: string }
  >;
}
