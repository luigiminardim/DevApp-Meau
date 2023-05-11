import { CoreLayer } from "./src/core-layer";
import { FirebaseModule } from "./src/gateway-layer/firebase-module";
import { App } from "./src/view-layer/App";

const {
  authGate,
  userModule: { signUpGate },
} = new FirebaseModule();

const coreLayer = new CoreLayer(authGate, signUpGate);

export default function Main() {
  return <App coreLayer={coreLayer} />;
}
