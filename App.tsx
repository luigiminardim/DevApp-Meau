import { CoreLayer } from "./src/core-layer";
import { FirebaseModule } from "./src/gateway-layer/firebase-module";
import { App } from "./src/view-layer/App";

const {
  authModule: { authGate },
  userModule: { signUpGate },
  animalModule: { registerAnimalGate },
} = new FirebaseModule();
const coreLayer = new CoreLayer(signUpGate, authGate, registerAnimalGate);

export default function Main() {
  return <App coreLayer={coreLayer} />;
}
