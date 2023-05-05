import { CoreLayer } from "./src/core-layer";
import { FirebaseModule } from "./src/gateway-layer/firebase-module";
import { App } from "./src/view-layer/App";

const { authGate } = new FirebaseModule();
const coreLayer = new CoreLayer(authGate);

export default function Main() {
  return <App coreLayer={coreLayer} />;
}
