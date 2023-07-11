import { ExpoGetDeviceNotificationTokenGate } from "./gates/ExpoGetDeviceNotificationTokenGate";
import { ExpoNotifierGate } from "./gates/ExpoNotifierGate";

export class ExpoModule {
  public getDeviceNotificationTokenGate: ExpoGetDeviceNotificationTokenGate;
  public notifierGate: ExpoNotifierGate;

  constructor() {
    this.notifierGate = new ExpoNotifierGate();
    this.getDeviceNotificationTokenGate =
      new ExpoGetDeviceNotificationTokenGate();
  }
}
