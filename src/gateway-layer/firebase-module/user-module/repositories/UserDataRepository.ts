import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserData } from "../dto/UserData";

export class UserDataRepository {
  constructor(private firebaseDb: Firestore) {}

  async getUserDataById(
    id: string
  ): Promise<
    { success: true; data: UserData } | { success: false; error: string }
  > {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firebaseDb, "users"), where("id", "==", id))
      );
      const usersData = [] as UserData[];
      querySnapshot.forEach((doc) => usersData.push(doc.data() as UserData));
      const userDoc = usersData[0];
      if (!userDoc) return { success: false, error: "User not found" };
      return { success: true, data: userDoc };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }
}
