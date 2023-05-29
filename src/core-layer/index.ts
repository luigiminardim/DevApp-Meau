import { AnimalModule } from "./animal-module";
import { RegisterAnimalUsecase } from "./animal-module";
import { LoginUsecase, UserModule, SignUpUsecase } from "./user-module";

export class CoreLayer {
  userModule: UserModule;
  animalModule: AnimalModule;

  constructor(
    signUpUsecase: SignUpUsecase,
    loginUsecase: LoginUsecase,
    registerAnimalUsecase: RegisterAnimalUsecase
  ) {
    this.userModule = new UserModule(loginUsecase, signUpUsecase);
    this.animalModule = new AnimalModule(registerAnimalUsecase);
  }
}
