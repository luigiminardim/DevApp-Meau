import { AdoptionInterestDataRepository } from "./../repositories/AdoptionInterestDataRepository";
import { GetAnimalAdoptionInterestsGate } from "../../../../core-layer/adoption-module";
import { AdoptionInterstBuilder } from "../builders/AdoptionInterestBuilder";

export class GetAnimalAdoptionInterestsGateImpl
  implements GetAnimalAdoptionInterestsGate
{
  constructor(
    private adoptionInterestDataRepository: AdoptionInterestDataRepository,
    private adoptionInterstBuilder: AdoptionInterstBuilder
  ) {}

  getAnimalAdoptionInterests: GetAnimalAdoptionInterestsGate["getAnimalAdoptionInterests"] =
    async (param) => {
      const adoptionInterestsDatasResult =
        await this.adoptionInterestDataRepository.getByAnimalId(
          param.animal.id
        );
      console.log(
        `adoptionInterestsDatasResult: ${param.animal.id}`,
        adoptionInterestsDatasResult
      );
      if (!adoptionInterestsDatasResult.success) {
        return { success: false, message: adoptionInterestsDatasResult.error };
      }
      const adoptionInterestsResults = await Promise.all(
        adoptionInterestsDatasResult.data.map((adoptionInterestData) =>
          this.adoptionInterstBuilder.buildAdoptionInterestFromData(
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
