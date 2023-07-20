import { SendNewMessageGate } from "./gates/SendNewMessageGate";
import {
  FirebaseSetNotificationTokenGate,
  GetDeviceNotificationTokenGate,
} from "./gates/FirebaseSetNotificationTokenGate";
import {
  CreateAdoptionInterestGate,
  GetAnimalAdoptionInterestsGate,
  GetUserAdoptionInterestsGate,
} from "./../../../core-layer/adoption-module";
import { Firestore } from "firebase/firestore";
import { CreateAdoptionInterestGateImpl } from "./gates/CreateAdoptionInterestGate";
import {
  FirebaseNotifyUserGate,
  NotifierGate,
} from "./gates/FirebaseNotifyUserGate";
import { GetUserAdoptionInterestsGateImpl } from "./gates/GetUserAdoptionInterestsGate";
import { AdoptionInterestDataRepository } from "./repositories/AdoptionInterestDataRepository";
import { UserDataRepository, UserBuilder } from "../user-module";
import { AnimalBuilder, AnimalDataRepository } from "../animal-module";
import { AdoptionInterstBuilder } from "./builders/AdoptionInterestBuilder";
import { GetAnimalAdoptionInterestsGateImpl } from "./gates/GetAnimalAdoptionInterestsGate";
import { GetAdoptionInterestSubscriptionGate } from "./gates/GetAdoptionInterestSubscriptionGate";
export type { NotifierGate, GetDeviceNotificationTokenGate };

export class FirebaseAdoptionModule {
  public createAdoptionInterestGate: CreateAdoptionInterestGate;
  public notifyUserGate: FirebaseNotifyUserGate;
  public setNotificationTokenGate: FirebaseSetNotificationTokenGate;
  public getUserAdoptionInterestsGate: GetUserAdoptionInterestsGate;
  public getAnimalAdoptionInterestsGate: GetAnimalAdoptionInterestsGate;
  public getAdoptionInterestSubscriptionGate: GetAdoptionInterestSubscriptionGate;
  public SendNewMessageGate: SendNewMessageGate;

  constructor(
    firebaseDb: Firestore,
    notifierGate: NotifierGate,
    getDeviceNotificationTokenGate: GetDeviceNotificationTokenGate,
    userDataRepository: UserDataRepository,
    userBuilder: UserBuilder,
    animalDataRepostory: AnimalDataRepository,
    animalBuilder: AnimalBuilder
  ) {
    const adoptionInterestDataRepository = new AdoptionInterestDataRepository(
      firebaseDb
    );
    const adoptionInterestBuilder = new AdoptionInterstBuilder(
      userDataRepository,
      userBuilder,
      animalDataRepostory,
      animalBuilder
    );
    this.createAdoptionInterestGate = new CreateAdoptionInterestGateImpl(
      firebaseDb
    );
    this.notifyUserGate = new FirebaseNotifyUserGate(firebaseDb, notifierGate);
    this.setNotificationTokenGate = new FirebaseSetNotificationTokenGate(
      firebaseDb,
      getDeviceNotificationTokenGate
    );
    this.getUserAdoptionInterestsGate = new GetUserAdoptionInterestsGateImpl(
      adoptionInterestDataRepository,
      adoptionInterestBuilder
    );
    this.getAnimalAdoptionInterestsGate =
      new GetAnimalAdoptionInterestsGateImpl(
        adoptionInterestDataRepository,
        adoptionInterestBuilder
      );
    this.getAdoptionInterestSubscriptionGate =
      new GetAdoptionInterestSubscriptionGate(
        firebaseDb,
        adoptionInterestBuilder
      );
    this.SendNewMessageGate = new SendNewMessageGate(
      adoptionInterestDataRepository
    );
  }
}
