import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NotifyUserGate } from "../../../../core-layer/adoption-module";
import { User } from "../../../../core-layer/user-module";
import { NotificationTokenData } from "../dto/NotificationTokenData";

export interface NotifierGate {
  notify: (param: { token: string; title: string; body: string }) => void;
}

export class FirebaseNotifyUserGate implements NotifyUserGate {
  constructor(
    private firebaseDb: Firestore,
    private notifierGate: NotifierGate
  ) {}

  notifyUser: NotifyUserGate["notifyUser"] = async (param) => {
    const notificationTokens = await this.getUserNotificationTokens(param.user);
    notificationTokens.forEach((token) =>
      this.notifierGate.notify({
        token,
        title: param.message.title,
        body: param.message.body,
      })
    );
  };

  private async getUserNotificationTokens(user: User) {
    const notificationTokenDatas: NotificationTokenData[] = [];
    const docs = await getDocs(
      query(
        collection(this.firebaseDb, "notification-tokens"),
        where("userId", "==", user.id)
      )
    );
    docs.forEach((doc) =>
      notificationTokenDatas.push(doc.data() as NotificationTokenData)
    );
    return notificationTokenDatas.map((data) => data.value);
  }
}
