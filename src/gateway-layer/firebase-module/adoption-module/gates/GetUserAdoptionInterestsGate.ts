import { AdoptionInterestDataRepository } from "./../repositories/AdoptionInterestDataRepository";
import { GetUserAdoptionInterestsGate } from "../../../../core-layer/adoption-module";
import { AdoptionInterstBuilder } from "../builders/AdoptionInterestBuilder";

export class GetUserAdoptionInterestsGateImpl
  implements GetUserAdoptionInterestsGate
{
  constructor(
    private adoptionInterestDataRepository: AdoptionInterestDataRepository,
    private adoptionInterstBuilder: AdoptionInterstBuilder
  ) {}

  getUserAdoptionInterests: GetUserAdoptionInterestsGate["getUserAdoptionInterests"] =
    async (param) => {
      const adoptionInterestsDatasResult =
        await this.adoptionInterestDataRepository.getByInterestedUserId(
          param.user.id
        );
      if (!adoptionInterestsDatasResult.success) {
        return { success: false, message: adoptionInterestsDatasResult.error };
      }
      const adoptionInterestsResults = await Promise.all(
        adoptionInterestsDatasResult.data.map(([id, adoptionInterestData]) =>
          this.adoptionInterstBuilder.buildAdoptionInterestFromData(
            id,
            adoptionInterestData
          )
        )
      );
      const adoptionInterests = adoptionInterestsResults.flatMap((result) =>
        result.success ? [result.adoptionInterest] : []
      );
      return { success: true, adoptionInterests };
    };
}
