import { Animal } from "../../animal-module";
import { GetUserGate, User } from "../../user-module";

export interface CreateAdoptionInterestUsecase {
  createAdoptionInterest(param: {
    animal: Animal;
    interested: User;
  }): Promise<{ type: "success" } | { type: "error"; message: string }>;
}

export interface CreateAdoptionInterestGate {
  createAdoptionInterest(param: {
    animal: Animal;
    interested: User;
  }): Promise<{ type: "success" } | { type: "error"; message: string }>;

  getAnimalOwnerId(
    animal: Animal
  ): Promise<
    | { type: "success"; animalOwnerId: string }
    | { type: "error"; message: string }
  >;
}

export interface NotifyUserGate {
  notifyUser(param: {
    user: User;
    message: {
      title: string;
      body: string;
    };
  }): Promise<void>;
}

export class CreateAdoptionInterestUsecaseImpl
  implements CreateAdoptionInterestUsecase
{
  constructor(
    private createGate: CreateAdoptionInterestGate,
    private getUserGate: GetUserGate,
    private notifyGate: NotifyUserGate
  ) {}

  createAdoptionInterest: CreateAdoptionInterestUsecase["createAdoptionInterest"] =
    async (param) => {
      const getAnimalOwnerResult = await this.getAnimalOwner(param.animal);
      if (getAnimalOwnerResult.type === "error") return getAnimalOwnerResult;
      const createAdoptionInterestResult =
        await this.createGate.createAdoptionInterest(param);
      if (createAdoptionInterestResult.type === "error") {
        return {
          type: "error",
          message: createAdoptionInterestResult.message,
        };
      }
      this.notifyUser({
        animal: param.animal,
        animalOwner: getAnimalOwnerResult.animalOwner,
        interested: param.interested,
      });
      return { type: "success" };
    };

  private getAnimalOwner = async (
    animal: Animal
  ): Promise<
    { type: "success"; animalOwner: User } | { type: "error"; message: string }
  > => {
    const getAnimalOwnerIdResult = await this.createGate.getAnimalOwnerId(
      animal
    );
    if (getAnimalOwnerIdResult.type === "error") {
      return {
        type: "error",
        message: `getAnimalOwnerId: ${getAnimalOwnerIdResult.message}`,
      };
    }
    const getAnimalOwnerResult = await this.getUserGate.getUser({
      id: getAnimalOwnerIdResult.animalOwnerId,
    });
    if (getAnimalOwnerResult.type === "error") {
      return {
        type: "error",
        message: `getAnimalOwner: ${getAnimalOwnerResult.error}`,
      };
    }
    return { type: "success", animalOwner: getAnimalOwnerResult.user };
  };

  private notifyUser = async (param: {
    animal: Animal;
    animalOwner: User;
    interested: User;
  }): Promise<void> => {
    const message = {
      title: "Novo interesse de adoção",
      body: `${param.interested.name} está interessado em adotar ${param.animal.name}`,
    };
    await this.notifyGate.notifyUser({
      user: param.animalOwner,
      message,
    });
  };
}
