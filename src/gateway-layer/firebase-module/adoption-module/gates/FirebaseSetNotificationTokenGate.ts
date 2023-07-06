import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  SetNotificationTokenGate,
  User,
} from "../../../../core-layer/user-module";
import { NotificationTokenData } from "../dto/NotificationTokenData";

export interface GetDeviceNotificationTokenGate {
  getDeviceNotificationToken: () => Promise<null | string>;
}

export class FirebaseSetNotificationTokenGate
  implements SetNotificationTokenGate
{
  constructor(
    private firebaseDb: Firestore,
    private getDeviceNotificaionTokenGate: GetDeviceNotificationTokenGate
  ) {}

  setNotificationToken: SetNotificationTokenGate["setNotificationToken"] =
    async (param) => {
      await this.removeNotificationTokensFromUser(param.user);
      const notificationToken =
        await this.getDeviceNotificaionTokenGate.getDeviceNotificationToken();
      if (!notificationToken) {
        return { type: "error", error: "Could not get notification token" };
      }
      await this.removeRedundantNotificationTokens(notificationToken);
      await this.addNotificationToken(param.user, notificationToken);
      return {
        type: "success",
        notificationToken,
      };
    };

  private async removeNotificationTokensFromUser(user: User) {
    try {
      const docs = await getDocs(
        query(
          collection(this.firebaseDb, "notification-tokens"),
          where("userId", "==", user.id)
        )
      );
      for (const doc of docs.docs) {
        try {
          await deleteDoc(doc.ref);
        } catch {
          console.error(
            "Failed to delete notification token from doc id: ",
            doc.id
          );
        }
      }
    } catch (e) {
      console.error(
        "Failed to delete notification tokens from user: ",
        String(e)
      );
    }
  }

  private async removeRedundantNotificationTokens(tokenValue: string) {
    try {
      const docs = await getDocs(
        collection(this.firebaseDb, "notification-tokens")
      );
      for (const doc of docs.docs) {
        const data = doc.data();
        if (data.token === tokenValue) {
          try {
            await deleteDoc(doc.ref);
          } catch {
            console.error(
              "Failed to delete notification token from doc id: ",
              doc.id
            );
          }
        }
      }
    } catch (e) {
      console.error(
        "Failed to delete redundant notification tokens: ",
        String(e)
      );
    }
  }

  private async addNotificationToken(
    user: User,
    tokenValue: string
  ): Promise<void> {
    try {
      const notifcationTokenData: NotificationTokenData = {
        userId: user.id,
        value: tokenValue,
      };
      await addDoc(
        collection(this.firebaseDb, "notification-tokens"),
        notifcationTokenData
      );
    } catch (e) {
      console.error("Failed to add notification token: ", String(e));
    }
  }
}
