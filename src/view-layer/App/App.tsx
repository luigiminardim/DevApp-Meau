import { ThemeProvider } from "../contexts/ThemeContext";
import { RegisterAnimalScreen } from "../screens/registerAnimal";
// import { LoginScreen } from "../screens";
// import { IntroductionScreen } from "../screens/introduction";
// import { SignUpScreen } from "../screens/register";
// import { OopsScreen } from "../screens/requireLogin/oopsScreen";

export function App() {
  return (
    <ThemeProvider>
      <RegisterAnimalScreen />
      {/* <OopsScreen /> */}
      {/* <IntroductionScreen /> */}
      {/* <LoginScreen /> */}
      {/* <SignUpScreen /> */}
    </ThemeProvider>
  );
}
