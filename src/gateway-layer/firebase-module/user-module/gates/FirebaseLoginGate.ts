import { LoginGate } from "../../../../core-layer/user-module";
import {
  signInWithEmailAndPassword,
  Auth as FirebaseAuth,
} from "firebase/auth";
import { UserBuilder } from "./utils/UserBuilder";
import { UserDataRepository } from "../repositories/UserDataRepository";

export class FirebaseLoginGate implements LoginGate {
  constructor(
    private firebaseAuth: FirebaseAuth,
    private userDataRepostory: UserDataRepository,
    private userBuilder: UserBuilder
  ) {}

  loginWithPassword: LoginGate["loginWithPassword"] = async (param) => {
    try {
      const {
        user: { uid: id },
      } = await signInWithEmailAndPassword(
        this.firebaseAuth,
        param.username,
        param.password
      );
      const getUserDataResult = await this.userDataRepostory.getUserDataById(
        id
      );
      if (!getUserDataResult.success) {
        return { type: "error", error: getUserDataResult.error };
      }
      const user = await this.userBuilder.buildUserFromData(
        getUserDataResult.data
      );
      return { type: "success", user };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
