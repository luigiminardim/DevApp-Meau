import { CreateAdoptionInterestGate } from "./../../../core-layer/adoption-module";
import { Firestore } from "firebase/firestore";
import { CreateAdoptionInterestGateImpl } from "./gates/CreateAdoptionInterestGate";

export class FirebaseAdoptionModule {
  public createAdoptionInterestGate: CreateAdoptionInterestGate;

  constructor(firebaseDb: Firestore) {
    this.createAdoptionInterestGate = new CreateAdoptionInterestGateImpl(
      firebaseDb
    );
  }
}
