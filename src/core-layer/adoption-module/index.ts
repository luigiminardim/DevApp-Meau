import { GetAdoptionInterestSubscriptionUsecase } from "./use-cases/GetAdoptionInterestSubscriptionUsecase";
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
  GetUserAdoptionInterestsUsecase,
} from "./use-cases/GetChatAdoptionInterestsUsecase";
import { SendMessageUsecase } from "./use-cases/SendMessageUsecase";

export type {
  AdoptionInterest,
  CreateAdoptionInterestUsecase,
  CreateAdoptionInterestGate,
  NotifyUserGate,
  GetUserAdoptionInterestsUsecase as GetUserAdoptionInterestsGate,
  GetAnimalAdoptionInterestsGate,
  GetAdoptionInterestSubscriptionUsecase,
  SendMessageUsecase,
};

export class AdoptionModule {
  public createAdoptionInterestUsecase: CreateAdoptionInterestUsecase;
  public getChatAdoptionInterestsUsecase: GetChatAdoptionInterestsUsecase;

  constructor(
    createAdoptionInterestGate: CreateAdoptionInterestGate,
    getUserGate: GetUserGate,
    notifyAdoptionInterestGate: NotifyUserGate,
    getUserAnimalsUsecase: GetUserAnimalsUsecase,
    public getUserAdoptionInterestsUsecase: GetUserAdoptionInterestsUsecase,
    public getAnimalAdoptionInterestsUsecase: GetAnimalAdoptionInterestsGate,
    public getAdoptionInterestSubscriptionUsecase: GetAdoptionInterestSubscriptionUsecase,
    public sendMessageUsecase: SendMessageUsecase
  ) {
    this.createAdoptionInterestUsecase = new CreateAdoptionInterestUsecaseImpl(
      createAdoptionInterestGate,
      getUserGate,
      notifyAdoptionInterestGate
    );
    this.getChatAdoptionInterestsUsecase =
      new GetChatAdoptionInterestsUsecaseImpl(
        getUserAnimalsUsecase,
        getUserAdoptionInterestsUsecase,
        getAnimalAdoptionInterestsUsecase
      );
  }
}
