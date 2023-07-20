import { UserDataRepository } from "./repositories/UserDataRepository";
import { Auth as FirebaseAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { SignUpGateImpl } from "./gates/SignUpGate";
import { FirebaseLoginGate } from "./gates/FirebaseLoginGate";
import { FirebaseStorage } from "firebase/storage";
import { UserBuilder } from "./gates/utils/UserBuilder";
import { FirebaseGetUserGate } from "./gates/FirebaseGetUserGate";
import { SignUpGate } from "../../../core-layer/user-module";

export { UserDataRepository, UserBuilder };

export class FirebaseUserModule {
  userDataRepository: UserDataRepository;
  userBuilder: UserBuilder;

  getUserGate: FirebaseGetUserGate;
  signUpGate: SignUpGate;
  loginGate: FirebaseLoginGate;

  constructor(
    firebaseAuth: FirebaseAuth,
    firebaseDb: Firestore,
    firebaseStorage: FirebaseStorage
  ) {
    this.userDataRepository = new UserDataRepository(firebaseDb);
    this.userBuilder = new UserBuilder(firebaseStorage);
    this.getUserGate = new FirebaseGetUserGate(firebaseDb, this.userBuilder);
    this.signUpGate = new SignUpGateImpl(
      firebaseAuth,
      firebaseDb,
      firebaseStorage
    );
    this.loginGate = new FirebaseLoginGate(
      firebaseAuth,
      this.userDataRepository,
      this.userBuilder
    );
  }
}
