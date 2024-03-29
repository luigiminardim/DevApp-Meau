import { GetAnimalAdoptionInterestsGate } from "./adoption-module/use-cases/GetChatAdoptionInterestsUsecase";
import {
  ConfirmAdoptionUsecase,
  GetAdoptionInterestSubscriptionUsecase,
  GetUserAdoptionInterestsGate,
  SendMessageUsecase,
} from "./adoption-module";
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
import { LoginGate, UserModule, GetUserGate, SignUpGate } from "./user-module";
import { SetNotificationTokenGate } from "./user-module";

export class CoreLayer {
  userModule: UserModule;
  animalModule: AnimalModule;
  adoptionModule: AdoptionModule;

  constructor(
    signUpGate: SignUpGate,
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
    getAnimalAdoptionInterestsGate: GetAnimalAdoptionInterestsGate,
    getAdoptionInterestSubscriptionUsecase: GetAdoptionInterestSubscriptionUsecase,
    sendMessageGate: SendMessageUsecase,
    confirmAdoptionUsecase: ConfirmAdoptionUsecase
  ) {
    this.userModule = new UserModule(
      loginGate,
      signUpGate,
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
      getAnimalAdoptionInterestsGate,
      getAdoptionInterestSubscriptionUsecase,
      sendMessageGate,
      confirmAdoptionUsecase
    );
  }
}
