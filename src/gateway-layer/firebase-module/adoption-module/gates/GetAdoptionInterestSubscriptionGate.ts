import { Firestore, doc, onSnapshot } from "firebase/firestore";
import { GetAdoptionInterestSubscriptionUsecase } from "../../../../core-layer/adoption-module";
import { AdoptionInterstBuilder } from "../builders/AdoptionInterestBuilder";
import { AdoptionInterestData } from "../dto/AdoptionInterestData";

export class GetAdoptionInterestSubscriptionGate
  implements GetAdoptionInterestSubscriptionUsecase
{
  constructor(
    private firebaseDb: Firestore,
    private adoptionInterestBuilder: AdoptionInterstBuilder
  ) {}

  getAdoptionInterestSubscription: GetAdoptionInterestSubscriptionUsecase["getAdoptionInterestSubscription"] =
    (param) => {
      const unsubscribe = onSnapshot(
        doc(this.firebaseDb, "adoption-interests", param.adoptionInterestId),
        async (snapshot) => {
          try {
            const adoptionInterestData =
              snapshot.data() as AdoptionInterestData;
            const result =
              await this.adoptionInterestBuilder.buildAdoptionInterestFromData(
                snapshot.id,
                adoptionInterestData
              );
            if (result.success) {
              param.callback(result.adoptionInterest);
            }
          } catch (e) {
            console.error(
              `Error while getting adoption interest: ${String(e)}`
            );
          }
        }
      );
      return { unsubscribe };
    };
}
