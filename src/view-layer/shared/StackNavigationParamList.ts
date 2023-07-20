import * as ReactNavigation from "@react-navigation/native";
import { Animal } from "../../core-layer/animal-module";
export type StackNavigationParamList = {
  Introduction: undefined;
  Login: undefined;
  Oops: undefined;
  RegisterAnimal: undefined;
  SignUp: undefined;
  AdoptionList: undefined;
  SingleAnimal: { id: string };
  myPets: undefined;
  RemoveAnimal: { id: string };
  ChatList: undefined;
  Chat: { adoptionInterestId: string };
  animalsInterest: { animal: Animal };
  ConfirmAdopt: { adoptionInterestId: string };
};

export const useNavigation = ReactNavigation.useNavigation<
  ReactNavigation.NavigationProp<StackNavigationParamList>
>;
