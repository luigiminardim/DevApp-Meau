import { useEffect, useState } from "react";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { AdoptionInterest } from "../../../../core-layer/adoption-module";

type UseGetAdoptionInterestQueryProps = {
  adoptionInterestId: string;
};

export function useGetAdoptionInterestQuery({
  adoptionInterestId,
}: UseGetAdoptionInterestQueryProps) {
  const [adoptionInterest, setAdoptionInterest] =
    useState<null | AdoptionInterest>(null);
  const {
    adoptionModule: { getAdoptionInterestSubscriptionUsecase },
  } = useCoreLayer();
  useEffect(() => {
    const { unsubscribe } =
      getAdoptionInterestSubscriptionUsecase.getAdoptionInterestSubscription({
        adoptionInterestId,
        callback: setAdoptionInterest,
      });
    return () => {
      unsubscribe();
    };
  }, [adoptionInterestId, getAdoptionInterestSubscriptionUsecase]);
  return { adoptionInterest };
}
