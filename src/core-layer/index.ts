import {
  AdoptionModule,
  CreateAdoptionInterestGate,
  NotifyUserGate,
} from "./adoption-module";
import {
  AnimalModule,
  GetSingleAnimalUsecase,
  RegisterAnimalUsecase,
  GetAnimalsAdoptionUsecase,
} from "./animal-module";
import {
  LoginGate,
  UserModule,
  SignUpUsecase,
  GetUserGate,
} from "./user-module";
import { SetNotificationTokenGate } from "./user-module";

export class CoreLayer {
  userModule: UserModule;
  animalModule: AnimalModule;
  adoptionModule: AdoptionModule;

  constructor(
    signUpUsecase: SignUpUsecase,
    loginGate: LoginGate,
    registerAnimalUsecase: RegisterAnimalUsecase,
    getSingleAnimalUsecase: GetSingleAnimalUsecase,
    getAnimalsAdoptionUsecase: GetAnimalsAdoptionUsecase,
    createAdoptionInterestGate: CreateAdoptionInterestGate,
    getUserGate: GetUserGate,
    notifyAdoptionInterestGate: NotifyUserGate,
    setNotificationtokenGate: SetNotificationTokenGate
  ) {
    this.userModule = new UserModule(
      loginGate,
      signUpUsecase,
      setNotificationtokenGate
    );
    this.animalModule = new AnimalModule(
      registerAnimalUsecase,
      getSingleAnimalUsecase,
      getAnimalsAdoptionUsecase
    );
    this.adoptionModule = new AdoptionModule(
      createAdoptionInterestGate,
      getUserGate,
      notifyAdoptionInterestGate
    );
  }
}
