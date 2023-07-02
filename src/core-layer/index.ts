import { AdoptionModule, CreateAdoptionInterestGate } from "./adoption-module";
import {
  AnimalModule,
  GetSingleAnimalUsecase,
  RegisterAnimalUsecase,
  GetAnimalsAdoptionUsecase,
} from "./animal-module";
import { LoginUsecase, UserModule, SignUpUsecase } from "./user-module";

export class CoreLayer {
  userModule: UserModule;
  animalModule: AnimalModule;
  adoptionModule: AdoptionModule;

  constructor(
    signUpUsecase: SignUpUsecase,
    loginUsecase: LoginUsecase,
    registerAnimalUsecase: RegisterAnimalUsecase,
    getSingleAnimalUsecase: GetSingleAnimalUsecase,
    getAnimalsAdoptionUsecase: GetAnimalsAdoptionUsecase,
    createAdoptionInterestGate: CreateAdoptionInterestGate
  ) {
    this.userModule = new UserModule(loginUsecase, signUpUsecase);
    this.animalModule = new AnimalModule(
      registerAnimalUsecase,
      getSingleAnimalUsecase,
      getAnimalsAdoptionUsecase
    );
    this.adoptionModule = new AdoptionModule(createAdoptionInterestGate);
  }
}
