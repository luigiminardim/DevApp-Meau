import {
  RegisterAnimalUsecase,
  RegisterAnimalParam,
} from "./use-cases/RegisterAnimalUsecase";

export { RegisterAnimalUsecase, RegisterAnimalParam };

export class AnimalModule {
  constructor(public registerAnimalUsecase: RegisterAnimalUsecase) {}
}
