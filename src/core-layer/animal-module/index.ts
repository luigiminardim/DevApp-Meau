import { GetAnimalsAdoptionUsecase } from "./use-cases/GetAnimalsAdoptionUsecase";
import { GetSingleAnimalUsecase } from "./use-cases/GetSingleAnimalUsecase";
import {
  RegisterAnimalUsecase,
  RegisterAnimalParam,
} from "./use-cases/RegisterAnimalUsecase";

export type {
  RegisterAnimalUsecase,
  RegisterAnimalParam,
  GetSingleAnimalUsecase,
  GetAnimalsAdoptionUsecase,
};

export class AnimalModule {
  constructor(
    public registerAnimalUsecase: RegisterAnimalUsecase,
    public getSingleAnimalUsecase: GetSingleAnimalUsecase,
    public getAnimalsAdoptionUsecase: GetAnimalsAdoptionUsecase
  ) {}
}
