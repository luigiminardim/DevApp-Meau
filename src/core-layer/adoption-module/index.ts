import { AdoptionInterest } from "./entities/AdoptionInterest";
import { GetUserAnimalsUsecase } from "../animal-module";
import { GetUserGate } from "../user-module";
import {
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestUsecaseImpl,
  CreateAdoptionInterestGate,
  NotifyUserGate,
} from "./use-cases/CreateAdoptionInterestUsecase";
import {
  GetAnimalAdoptionInterestsGate,
  GetChatAdoptionInterestsUsecase,
  GetChatAdoptionInterestsUsecaseImpl,
  GetUserAdoptionInterestsGate,
} from "./use-cases/GetChatAdoptionInterestsUsecase";

export type {
  AdoptionInterest,
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestGate,
  NotifyUserGate,
  GetUserAdoptionInterestsGate,
  GetAnimalAdoptionInterestsGate,
};

export class AdoptionModule {
  public createAdoptionInterestUsecase: CreateAdoptionInterestUsecase;
  public getChatAdoptionInterestsUsecase: GetChatAdoptionInterestsUsecase;

  constructor(
    createAdoptionInterestGate: CreateAdoptionInterestGate,
    getUserGate: GetUserGate,
    notifyAdoptionInterestGate: NotifyUserGate,
    getUserAnimalsUsecase: GetUserAnimalsUsecase,
    getUserAdoptionInterestsGate: GetUserAdoptionInterestsGate,
    getAnimalAdoptionInterestsGate: GetAnimalAdoptionInterestsGate
  ) {
    this.createAdoptionInterestUsecase = new CreateAdoptionInterestUsecaseImpl(
      createAdoptionInterestGate,
      getUserGate,
      notifyAdoptionInterestGate
    );
    this.getChatAdoptionInterestsUsecase =
      new GetChatAdoptionInterestsUsecaseImpl(
        getUserAnimalsUsecase,
        getUserAdoptionInterestsGate,
        getAnimalAdoptionInterestsGate
      );
  }
}
