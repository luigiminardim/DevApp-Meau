import { useCallback, useState } from "react";
import { CreateAdoptionInterestUsecase } from "../../../../../core-layer/adoption-module";
import { useCoreLayer } from "../../../../contexts/CoreLayerContext";

export function useCreateAdoptionInterestMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    adoptionModule: { createAdoptionInterestUsecase },
  } = useCoreLayer();
  const mutate = useCallback<
    CreateAdoptionInterestUsecase["createAdoptionInterest"]
  >(
    async (param) => {
      setIsLoading(true);
      const result = await createAdoptionInterestUsecase.createAdoptionInterest(
        param
      );
      setIsLoading(false);
      return result;
    },
    [createAdoptionInterestUsecase]
  );
  return { mutate, isLoading };
}
