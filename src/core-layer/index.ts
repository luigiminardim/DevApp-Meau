import { GetAnimalAdoptionInterestsGate } from "./adoption-module/use-cases/GetChatAdoptionInterestsUsecase";
import { GetUserAdoptionInterestsGate } from "./adoption-module";
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
  GetUserAnimalsUsecase,
  RemoveAnimalUseCase,
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
    getUserAnimalsUsecase: GetUserAnimalsUsecase,
    getAnimalsAdoptionUsecase: GetAnimalsAdoptionUsecase,
    removeAnimalUsecase: RemoveAnimalUseCase,
    createAdoptionInterestGate: CreateAdoptionInterestGate,
    getUserGate: GetUserGate,
    notifyAdoptionInterestGate: NotifyUserGate,
    setNotificationtokenGate: SetNotificationTokenGate,
    getUserAdoptionInterestsGate: GetUserAdoptionInterestsGate,
    getAnimalAdoptionInterestsGate: GetAnimalAdoptionInterestsGate
  ) {
    this.userModule = new UserModule(
      loginGate,
      signUpUsecase,
      setNotificationtokenGate
    );
    this.animalModule = new AnimalModule(
      registerAnimalUsecase,
      getSingleAnimalUsecase,
      getAnimalsAdoptionUsecase,
      getUserAnimalsUsecase,
      removeAnimalUsecase,
      getUserAnimalsUsecase
    );
    this.adoptionModule = new AdoptionModule(
      createAdoptionInterestGate,
      getUserGate,
      notifyAdoptionInterestGate,
      this.animalModule.getUserAnimalUsecase,
      getUserAdoptionInterestsGate,
      getAnimalAdoptionInterestsGate
    );
  }
}
