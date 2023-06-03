import { SafeAreaView, ScrollView } from "react-native";
import { CoreLayer } from "../../core-layer";
import { CoreLayerProvider } from "../contexts/CoreLayerContext";
import { ThemeProvider } from "../contexts/ThemeContext";
// import { LoginScreen } from "../screens";
import { StyleSheet } from "react-native";
import { RegisterAnimalScreen } from "../screens/registerAnimal";
// import { IntroductionScreen } from "../screens/introduction";
// import { SignUpScreen } from "../screens/register";
// import { OopsScreen } from "../screens/requireLogin/oopsScreen";

export type AppProps = {
  coreLayer: CoreLayer;
};

export function App({ coreLayer }: AppProps) {
  return (
    <CoreLayerProvider coreLayer={coreLayer}>
      <ThemeProvider>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView>
            {/* <OopsScreen /> */}
            {/* <IntroductionScreen /> */}
            {/* <LoginScreen /> */}
            {/* <SignUpScreen /> */}
            <RegisterAnimalScreen />
            {/* <SignUpScreen /> */}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </CoreLayerProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
});
