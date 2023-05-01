import { ThemeProvider } from "../contexts/ThemeContext";
import { RegisterAnimalScreen } from "../screens/registerAnimal";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { LoginScreen } from "../screens";
// import { IntroductionScreen } from "../screens/introduction";
// import { SignUpScreen } from "../screens/register";
// import { OopsScreen } from "../screens/requireLogin/oopsScreen";

export function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.safeArea}>
        <RegisterAnimalScreen />
        {/* <OopsScreen /> */}
        {/* <IntroductionScreen /> */}
        {/* <LoginScreen /> */}
        {/* <SignUpScreen /> */}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    overflow: "hidden",
  },
});
