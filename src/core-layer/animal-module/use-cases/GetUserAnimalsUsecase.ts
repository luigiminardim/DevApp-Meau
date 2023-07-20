import { User } from "../../user-module";
import { Animal } from "../entities/Animal";

export interface GetUserAnimalsUsecase {
  getUserAnimals(param: {
    user: User;
  }): Promise<
    { success: true; animals: Animal[] } | { success: false; message: string }
  >;
}
