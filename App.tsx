import { CoreLayer } from "./src/core-layer";
import { FirebaseModule } from "./src/gateway-layer/firebase-module";
import { App } from "./src/view-layer/App";

const {
  userModule: { signUpGate, loginGate },
  animalModule: {
    registerAnimalGate,
    getAnimalsAdoptionGate,
    getSingleAnimalGate,
  },
  adoptionModule: { createAdoptionInterestGate },
} = new FirebaseModule();
const coreLayer = new CoreLayer(
  signUpGate,
  loginGate,
  registerAnimalGate,
  getSingleAnimalGate,
  getAnimalsAdoptionGate,
  createAdoptionInterestGate
);

export default function Main() {
  return <App coreLayer={coreLayer} />;
}
