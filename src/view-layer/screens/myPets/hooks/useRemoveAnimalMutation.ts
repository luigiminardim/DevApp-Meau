import { useCallback, useState } from "react";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { RemoveAnimalUseCase } from "../../../../core-layer/animal-module";

export function useRemoveAnimalMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    animalModule: { removeAnimalUsecase },
  } = useCoreLayer();

  const mutate = useCallback<RemoveAnimalUseCase["removeAnimal"]>(
    async (param) => {
      setIsLoading(true);
      const result = await removeAnimalUsecase.removeAnimal(param);
      setIsLoading(false);
      return result;
    },
    [removeAnimalUsecase]
  );
  return { mutate, isLoading };
}
