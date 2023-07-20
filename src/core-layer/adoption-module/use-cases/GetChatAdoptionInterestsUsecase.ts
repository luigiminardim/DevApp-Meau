import { Animal } from "../../animal-module";
import { GetUserAnimalsUsecase } from "../../animal-module";
import { User } from "../../user-module";
import { AdoptionInterest } from "../entities/AdoptionInterest";

export interface GetChatAdoptionInterestsUsecase {
  getChatAdoptionInterests(param: {
    user: User;
  }): Promise<
    | { success: true; adoptionInterests: AdoptionInterest[] }
    | { success: false; message: string }
  >;
}

export interface GetUserAdoptionInterestsGate {
  getUserAdoptionInterests(param: {
    user: User;
  }): Promise<
    | { success: true; adoptionInterests: AdoptionInterest[] }
    | { success: false; message: string }
  >;
}

export interface GetAnimalAdoptionInterestsGate {
  getAnimalAdoptionInterests(param: {
    animal: Animal;
  }): Promise<
    | { success: true; adoptionInterests: AdoptionInterest[] }
    | { success: false; message: string }
  >;
}

export class GetChatAdoptionInterestsUsecaseImpl
  implements GetChatAdoptionInterestsUsecase
{
  constructor(
    private getUserAnimalUsecase: GetUserAnimalsUsecase,
    private getUserAdoptionInterestsGate: GetUserAdoptionInterestsGate,
    private getAnimalAdoptionInterestsGate: GetAnimalAdoptionInterestsGate
  ) {}

  getChatAdoptionInterests: GetChatAdoptionInterestsUsecase["getChatAdoptionInterests"] =
    async (param) => {
      const [userAnimalsResult, userAdoptionInterestsResult] =
        await Promise.all([
          this.getUserAnimalUsecase.getUserAnimals({ user: param.user }),
          this.getUserAdoptionInterestsGate.getUserAdoptionInterests({
            user: param.user,
          }),
        ]);
      if (!userAnimalsResult.success) {
        return { success: false, message: userAnimalsResult.message };
      }
      if (!userAdoptionInterestsResult.success) {
        return { success: false, message: userAdoptionInterestsResult.message };
      }
      const ownAnimalAdoptionInterests = await Promise.all(
        userAnimalsResult.animals.map((animal) =>
          this.getAnimalAdoptionInterestsGate.getAnimalAdoptionInterests({
            animal,
          })
        )
      );
      const adoptionInterests = [
        ...userAdoptionInterestsResult.adoptionInterests,
        ...ownAnimalAdoptionInterests.flatMap((result) =>
          result.success ? result.adoptionInterests : []
        ),
      ];
      return { success: true, adoptionInterests };
    };
}
