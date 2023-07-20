import { AdoptionInterest } from "../entities/AdoptionInterest";

export interface GetAdoptionInterestSubscriptionUsecase {
  getAdoptionInterestSubscription(param: {
    adoptionInterestId: string;
    callback: (adoptionInterest: AdoptionInterest) => void;
  }): {
    unsubscribe: () => void;
  };
}
