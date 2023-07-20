import { CoreLayer } from "./src/core-layer";
import { ExpoModule } from "./src/gateway-layer/expo-module";
import { FirebaseModule } from "./src/gateway-layer/firebase-module";
import { App } from "./src/view-layer/App";

const { notifierGate, getDeviceNotificationTokenGate } = new ExpoModule();
const {
  userModule: { signUpGate, loginGate, getUserGate },
  animalModule: {
    registerAnimalGate,
    getAnimalsAdoptionGate,
    getSingleAnimalGate,
    getUserAnimalsGate,
    removeAnimalGate,
  },
  adoptionModule: {
    createAdoptionInterestGate,
    notifyUserGate,
    setNotificationTokenGate,
    getUserAdoptionInterestsGate,
    getAnimalAdoptionInterestsGate,
  },
} = new FirebaseModule(notifierGate, getDeviceNotificationTokenGate);
const coreLayer = new CoreLayer(
  signUpGate,
  loginGate,
  registerAnimalGate,
  getSingleAnimalGate,
  getUserAnimalsGate,
  getAnimalsAdoptionGate,
  removeAnimalGate,
  createAdoptionInterestGate,
  getUserGate,
  notifyUserGate,
  setNotificationTokenGate,
  getUserAdoptionInterestsGate,
  getAnimalAdoptionInterestsGate
);

export default function Main() {
  return <App coreLayer={coreLayer} />;
}
