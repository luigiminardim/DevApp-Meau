import { NotifierGate } from "../../firebase-module";

export class ExpoNotifierGate implements NotifierGate {
  notify: NotifierGate["notify"] = async (param) => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      mode: "no-cors", // Disable pre flight options request in web browsers
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: param.token,
        title: param.title,
        body: param.body,
      }),
    });
  };
}
