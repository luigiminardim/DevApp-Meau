import { RegisterAnimalUsecase } from "./use-cases/RegisterAnimalUsecase";

export { RegisterAnimalUsecase };

export class AnimalModule {
  constructor(public registerAnimalUsecase: RegisterAnimalUsecase) {}
}
