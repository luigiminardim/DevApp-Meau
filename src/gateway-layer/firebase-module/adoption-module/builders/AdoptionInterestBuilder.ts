import { AdoptionInterest } from "../../../../core-layer/adoption-module";
import { AnimalBuilder, AnimalDataRepository } from "../../animal-module";
import { UserBuilder, UserDataRepository } from "../../user-module";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";

export class AdoptionInterstBuilder {
  constructor(
    private userDataRepository: UserDataRepository,
    private userBuilder: UserBuilder,
    private animalDataRepository: AnimalDataRepository,
    private animalBuilder: AnimalBuilder
  ) {}

  async buildAdoptionInterestFromData(
    data: AdoptionInterestData
  ): Promise<
    | { success: true; adoptionInterest: AdoptionInterest }
    | { success: false; error: string }
  > {
    const interestedUserDataResult =
      await this.userDataRepository.getUserDataById(data.interestedUserId);
    if (!interestedUserDataResult.success) {
      return { success: false, error: interestedUserDataResult.error };
    }
    const animalDataResult = await this.animalDataRepository.getAnimalDataById(
      data.animalId
    );
    if (!animalDataResult.success) {
      return { success: false, error: animalDataResult.error };
    }
    const interestedUser = await this.userBuilder.buildUserFromData(
      interestedUserDataResult.data
    );
    const animal = await this.animalBuilder.buildAnimalFromData(
      animalDataResult.id,
      animalDataResult.data
    );
    const animalOwnerDataResult = await this.userDataRepository.getUserDataById(
      animalDataResult.data.donorId
    );
    if (!animalOwnerDataResult.success) {
      return { success: false, error: animalOwnerDataResult.error };
    }
    const owner = await this.userBuilder.buildUserFromData(
      animalOwnerDataResult.data
    );
    return {
      success: true,
      adoptionInterest: { animal, interestedUser, owner },
    };
  }
}
