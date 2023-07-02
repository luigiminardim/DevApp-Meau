import {
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestUsecaseImpl,
  CreateAdoptionInterestGate,
} from "./use-cases/CreateAdoptionInterestUsecase";

export type { CreateAdoptionInterestUsecase, CreateAdoptionInterestGate };

export class AdoptionModule {
  public createAdoptionInterestUsecase: CreateAdoptionInterestUsecase;

  constructor(createAdoptionInterestGate: CreateAdoptionInterestGate) {
    this.createAdoptionInterestUsecase = new CreateAdoptionInterestUsecaseImpl(
      createAdoptionInterestGate
    );
  }
}
