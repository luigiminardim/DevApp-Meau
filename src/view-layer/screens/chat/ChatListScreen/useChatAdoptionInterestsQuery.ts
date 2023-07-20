import { useEffect, useState } from "react";
import { AdoptionInterest } from "../../../../core-layer/adoption-module";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { User } from "../../../../core-layer/user-module";

type UseChatAdoptionInterestsQueryProps = {
  user: User | null;
};

export function useChatAdoptionInterestsQuery({
  user,
}: UseChatAdoptionInterestsQueryProps) {
  const {
    adoptionModule: { getChatAdoptionInterestsUsecase },
  } = useCoreLayer();
  const [adoptionInterests, setAdoptionInterests] = useState<
    null | AdoptionInterest[]
  >(null);
  useEffect(() => {
    if (!user) {
      setAdoptionInterests(null);
      return;
    }
    getChatAdoptionInterestsUsecase
      .getChatAdoptionInterests({ user })
      .then((result) => {
        if (!result.success) {
          setAdoptionInterests(null);
          return;
        }
        setAdoptionInterests(result.adoptionInterests);
      });
  }, [getChatAdoptionInterestsUsecase, user]);

  return { adoptionInterests };
}
