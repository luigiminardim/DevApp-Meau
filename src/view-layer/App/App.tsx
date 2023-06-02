import { SafeAreaView } from "react-native";
import { CoreLayer } from "../../core-layer";
import { CoreLayerProvider } from "../contexts/CoreLayerContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LoginScreen, SignUpScreen } from "../screens";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OopsScreen } from "../screens/requireLogin/oopsScreen";
import { IntroductionScreen } from "../screens/introduction";
import { RegisterAnimalScreen } from "../screens/registerAnimal";
import { StackNavigationParamList } from "./shared/NavigationProps";

export type AppProps = {
  coreLayer: CoreLayer;
};

export function App({ coreLayer }: AppProps) {
  return (
    <CoreLayerProvider coreLayer={coreLayer}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <ThemeProvider>
            <Stack.Navigator
              initialRouteName="Introduction"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Introduction"
                component={IntroductionScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Ops" component={OopsScreen} />
              <Stack.Screen name="RegAnim" component={RegisterAnimalScreen} />
              <Stack.Screen name="RegUser" component={SignUpScreen} />
            </Stack.Navigator>
          </ThemeProvider>
        </SafeAreaView>
      </NavigationContainer>
    </CoreLayerProvider>
  );
}

const Stack = createNativeStackNavigator<StackNavigationParamList>();
const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    overflow: "hidden",
  },
});
