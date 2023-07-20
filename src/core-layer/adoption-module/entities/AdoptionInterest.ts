import { Animal } from "../../animal-module";
import { User } from "../../user-module";

export type AdoptionInterest = {
  owner: User;
  animal: Animal;
  interestedUser: User;
};
