import { useEffect, useState } from "react";
import { AdoptionInterest } from "../../../../core-layer/adoption-module";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { Animal } from "../../../../core-layer/animal-module";

type UseGetAdoptionInterestQuery = {
  animal: Animal | null;
};

export function useGetAdoptionInterestQuery({
  animal,
}: UseGetAdoptionInterestQuery) {
  const {
    adoptionModule: { getAnimalAdoptionInterestsUsecase },
  } = useCoreLayer();
  const [adoptionInterests, setAdoptionInterests] = useState<
    null | AdoptionInterest[]
  >(null);
  useEffect(() => {
    if (!animal) {
      setAdoptionInterests(null);
      return;
    }
    getAnimalAdoptionInterestsUsecase
      .getAnimalAdoptionInterests({ animal })
      .then((result) => {
        if (!result.success) {
          setAdoptionInterests(null);
          return;
        }
        setAdoptionInterests(result.adoptionInterests);
      });
  }, [getAnimalAdoptionInterestsUsecase, animal]);

  return { adoptionInterests };
}
