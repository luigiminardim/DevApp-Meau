import "./firebaseConfig";
import { FirebaseAuthGate } from "./FirebaseAuthGate";
import { FireStoreDb } from "./FirestoreDb";

export class FirebaseModule {
  authGate: FirebaseAuthGate;
  firestoreUser: FireStoreDb;
  constructor() {
    this.authGate = new FirebaseAuthGate();
    this.firestoreUser = new FireStoreDb();
  }
}
