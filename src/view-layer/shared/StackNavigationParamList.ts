import * as ReactNavigation from "@react-navigation/native";
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
};

export const useNavigation = ReactNavigation.useNavigation<
  ReactNavigation.NavigationProp<StackNavigationParamList>
>;
