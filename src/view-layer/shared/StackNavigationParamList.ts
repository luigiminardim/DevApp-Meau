import * as ReactNavigation from "@react-navigation/native";
export type StackNavigationParamList = {
  Introduction: undefined;
  Login: undefined;
  Oops: undefined;
  RegisterAnimal: undefined;
  SignUp: undefined;
};

export const useNavigation = ReactNavigation.useNavigation<
  ReactNavigation.NavigationProp<StackNavigationParamList>
>;
