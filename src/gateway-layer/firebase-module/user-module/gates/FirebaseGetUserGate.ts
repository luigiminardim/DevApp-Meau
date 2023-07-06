import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GetUserGate, User } from "../../../../core-layer/user-module";
import { UserBuilder } from "./utils/UserBuilder";

export class FirebaseGetUserGate implements GetUserGate {
  constructor(
    private firebaseDb: Firestore,
    private userBuilder: UserBuilder
  ) {}

  getUser: GetUserGate["getUser"] = async (param) => {
    try {
      const docs = await getDocs(
        query(collection(this.firebaseDb, "users"), where("id", "==", param.id))
      );
      const userDoc = docs.docs[0];
      if (!userDoc) return { type: "error", error: "User not found" };
      const user = await this.userBuilder.buildUserFromData(
        userDoc.data() as User
      );
      return { type: "success", user };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
