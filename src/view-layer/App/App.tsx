// See https://reactnavigation.org/docs/drawer-layout#installation
// to see how to install react - native - drawer - layout and verify why to
// import "react-native-gesture-handler" this way.
import "react-native-gesture-handler";

import { CoreLayer } from "../../core-layer";
import { CoreLayerProvider } from "../contexts/CoreLayerContext";
import { UserProvider } from "../contexts/UserContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LoginScreen, SignUpScreen } from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OopsScreen } from "../screens/requireLogin/oopsScreen";
import { IntroductionScreen } from "../screens/introduction";
import { RegisterAnimalScreen } from "../screens/registerAnimal";
import { StackNavigationParamList } from "../shared/StackNavigationParamList";
import { AllAnimalsScreen } from "../screens/AdoptAnimal/ViewAllAnimals/AllAnimalsScreen";
import { MypetsScreen } from "../screens/myPets/MypetsScreen";
import { SingleAnimalScreen } from "../screens/AdoptAnimal/ViewAnimal/SingleAnimalScreen";
import { RemovePetScreen } from "../screens/myPets/RemovePetScreen";
import { ChatListScreen } from "../screens/chat/ChatListScreen";
import { ChatScreen } from "../screens/chat/ChatScreen/ChatScreen";
import { InterestScreen } from "../screens/myPets/interestScreen";
import { ConfirmAdoptionScreen } from "../screens/myPets/ConfirmAdoptionScreen";

const Stack = createNativeStackNavigator<StackNavigationParamList>();

export type AppProps = {
  coreLayer: CoreLayer;
};

export function App({ coreLayer }: AppProps) {
  return (
    <CoreLayerProvider coreLayer={coreLayer}>
      <UserProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Introduction"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Introduction"
                component={IntroductionScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Oops" component={OopsScreen} />
              <Stack.Screen
                name="RegisterAnimal"
                component={RegisterAnimalScreen}
              />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="AdoptionList" component={AllAnimalsScreen} />
              <Stack.Screen
                name="SingleAnimal"
                component={SingleAnimalScreen}
              />
              <Stack.Screen name="myPets" component={MypetsScreen} />
              <Stack.Screen name="RemoveAnimal" component={RemovePetScreen} />
              <Stack.Screen name="ChatList" component={ChatListScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="animalsInterest" component={InterestScreen} />
              <Stack.Screen
                name="ConfirmAdopt"
                component={ConfirmAdoptionScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </UserProvider>
    </CoreLayerProvider>
  );
}
