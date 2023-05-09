import { AnimalModule } from "./animal-module";
import { RegisterAnimalUsecase } from "./animal-module";
import { LoginUsecase, UserModule } from "./user-module";

export class CoreLayer {
  userModule: UserModule;
  animalModule: AnimalModule;

  constructor(
    loginUsecase: LoginUsecase,
    registerAnimalUsecase: RegisterAnimalUsecase
  ) {
    this.userModule = new UserModule(loginUsecase);
    this.animalModule = new AnimalModule(registerAnimalUsecase);
  }
}
