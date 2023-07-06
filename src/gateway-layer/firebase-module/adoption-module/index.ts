import {
  FirebaseSetNotificationTokenGate,
  GetDeviceNotificationTokenGate,
} from "./gates/FirebaseSetNotificationTokenGate";
import { CreateAdoptionInterestGate } from "./../../../core-layer/adoption-module";
import { Firestore } from "firebase/firestore";
import { CreateAdoptionInterestGateImpl } from "./gates/CreateAdoptionInterestGate";
import {
  FirebaseNotifyUserGate,
  NotifierGate,
} from "./gates/FirebaseNotifyUserGate";

export type { NotifierGate, GetDeviceNotificationTokenGate };

export class FirebaseAdoptionModule {
  public createAdoptionInterestGate: CreateAdoptionInterestGate;
  public notifyUserGate: FirebaseNotifyUserGate;
  public setNotificationTokenGate: FirebaseSetNotificationTokenGate;

  constructor(
    firebaseDb: Firestore,
    notifierGate: NotifierGate,
    getDeviceNotificationTokenGate: GetDeviceNotificationTokenGate
  ) {
    this.createAdoptionInterestGate = new CreateAdoptionInterestGateImpl(
      firebaseDb
    );
    this.notifyUserGate = new FirebaseNotifyUserGate(firebaseDb, notifierGate);
    this.setNotificationTokenGate = new FirebaseSetNotificationTokenGate(
      firebaseDb,
      getDeviceNotificationTokenGate
    );
  }
}
