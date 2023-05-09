import { SafeAreaView } from "react-native";
import { CoreLayer } from "../../core-layer";
import { CoreLayerProvider } from "../contexts/CoreLayerContext";
import { ThemeProvider } from "../contexts/ThemeContext";
// import { LoginScreen } from "../screens";
import { StyleSheet } from "react-native";
// import { IntroductionScreen } from "../screens/introduction";
import { SignUpScreen } from "../screens/register";
// import { OopsScreen } from "../screens/requireLogin/oopsScreen";

export type AppProps = {
  coreLayer: CoreLayer;
};

export function App({ coreLayer }: AppProps) {
  return (
    <CoreLayerProvider coreLayer={coreLayer}>
      <SafeAreaView style={styles.safeArea}>
        <ThemeProvider>
          {/* <OopsScreen /> */}
          {/* <IntroductionScreen /> */}
          {/* <LoginScreen /> */}
          <SignUpScreen />
        </ThemeProvider>
      </SafeAreaView>
    </CoreLayerProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    overflow: "hidden",
  },
});
