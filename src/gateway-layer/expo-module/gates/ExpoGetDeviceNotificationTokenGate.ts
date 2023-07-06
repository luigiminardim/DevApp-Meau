import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { GetDeviceNotificationTokenGate } from "../../firebase-module/adoption-module";

export class ExpoGetDeviceNotificationTokenGate
  implements GetDeviceNotificationTokenGate
{
  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  /**
   * @see https://docs.expo.dev/versions/latest/sdk/notifications/#usage
   */
  getDeviceNotificationToken: GetDeviceNotificationTokenGate["getDeviceNotificationToken"] =
    async () => {
      let token: string | null = null;

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          console.warn("Failed to get push token for push notification!");
          return null;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } else {
        console.warn("Must use physical device for Push Notifications");
      }
      return token;
    };
}
