import { CoreLayer } from "../../core-layer";
import { CoreLayerProvider } from "../contexts/CoreLayerContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LoginScreen } from "../screens";
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
        {/* <OopsScreen /> */}
        {/* <IntroductionScreen /> */}
        <LoginScreen />
        {/* <SignUpScreen /> */}
      </ThemeProvider>
    </CoreLayerProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    overflow: "hidden",
  },
});
