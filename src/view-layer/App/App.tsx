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
import { SingleAnimalScreen } from "../screens/AdoptAnimal/ViewAnimal/SingleAnimalScreen";


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
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </UserProvider>
    </CoreLayerProvider>
  );
}

const Stack = createNativeStackNavigator<StackNavigationParamList>();
