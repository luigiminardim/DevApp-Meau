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

  constructor(
    signUpUsecase: SignUpUsecase,
    loginUsecase: LoginUsecase,
    registerAnimalUsecase: RegisterAnimalUsecase,
    getSingleAnimalUsecase: GetSingleAnimalUsecase,
    getAnimalsAdoptionUsecase: GetAnimalsAdoptionUsecase
  ) {
    this.userModule = new UserModule(loginUsecase, signUpUsecase);
    this.animalModule = new AnimalModule(
      registerAnimalUsecase,
      getSingleAnimalUsecase,
      getAnimalsAdoptionUsecase
    );
  }
}
