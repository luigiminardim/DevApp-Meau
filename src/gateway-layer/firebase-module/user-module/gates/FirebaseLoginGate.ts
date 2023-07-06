import { LoginGate } from "../../../../core-layer/user-module";
import {
  signInWithEmailAndPassword,
  Auth as FirebaseAuth,
} from "firebase/auth";
import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserBuilder } from "./utils/UserBuilder";
import { UserData } from "../dto/UserData";

export class FirebaseLoginGate implements LoginGate {
  constructor(
    private firebaseAuth: FirebaseAuth,
    private firebaseDb: Firestore,
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
      const usersRef = collection(this.firebaseDb, "users");
      const userQuery = query(usersRef, where("id", "==", id));
      const querySnapshot = await getDocs(userQuery);
      const userDocs = [] as DocumentData[];
      querySnapshot.forEach((doc) => userDocs.push(doc.data()));
      const userDoc = userDocs[0];
      if (!userDoc) return { type: "error", error: "User not found" };
      const user = await this.userBuilder.buildUserFromData(
        userDoc as UserData
      );
      return { type: "success", user };
    } catch (err) {
      return { type: "error", error: String(err) };
    }
  };
}
