import { GetUserGate } from "../user-module";
import {
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestUsecaseImpl,
  CreateAdoptionInterestGate,
  NotifyUserGate,
} from "./use-cases/CreateAdoptionInterestUsecase";

export type {
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestGate,
  NotifyUserGate,
};

export class AdoptionModule {
  public createAdoptionInterestUsecase: CreateAdoptionInterestUsecase;

  constructor(
    createAdoptionInterestGate: CreateAdoptionInterestGate,
    getUserGate: GetUserGate,
    notifyAdoptionInterestGate: NotifyUserGate
  ) {
    this.createAdoptionInterestUsecase = new CreateAdoptionInterestUsecaseImpl(
      createAdoptionInterestGate,
      getUserGate,
      notifyAdoptionInterestGate
    );
  }
}
