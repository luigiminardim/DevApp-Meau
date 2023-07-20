import { Animal } from "../../animal-module";
import { User } from "../../user-module";

export type ChatMessage = {
  sender: string;
  text: string;
};

export type AdoptionInterest = {
  id: string;
  owner: User;
  animal: Animal;
  interestedUser: User;
  messages: ChatMessage[];
};
