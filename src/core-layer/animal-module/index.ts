import { GetAnimalsAdoptionUsecase } from "./use-cases/GetAnimalsAdoptionUsecase";
import { GetSingleAnimalUsecase } from "./use-cases/GetSingleAnimalUsecase";
import { GetUserAnimalsUsecase } from "./use-cases/GetUserAnimalsUsecase";
import { RemoveAnimalUseCase } from "./use-cases/RemoveAnimalUsecase";
import {
  RegisterAnimalUsecase,
  RegisterAnimalParam,
} from "./use-cases/RegisterAnimalUsecase";

export type { Animal } from "./entities/Animal";

export type {
  RegisterAnimalUsecase,
  RegisterAnimalParam,
  GetSingleAnimalUsecase,
  GetAnimalsAdoptionUsecase,
  GetUserAnimalsUsecase,
  RemoveAnimalUseCase,
};

export class AnimalModule {
  constructor(
    public registerAnimalUsecase: RegisterAnimalUsecase,
    public getSingleAnimalUsecase: GetSingleAnimalUsecase,
    public getAnimalsAdoptionUsecase: GetAnimalsAdoptionUsecase,
    public getUserAnimalsUsecase: GetUserAnimalsUsecase,
    public removeAnimalUsecase: RemoveAnimalUseCase
  ) {}
}
