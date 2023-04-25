import { ThemeProvider } from "../contexts/ThemeContext";
// import { LoginScreen } from "../screens";
// import { IntroductionScreen } from "../screens/introduction";
import { SignUpScreen } from "../screens/register";

export function App() {
  return (
    <ThemeProvider>
      {/* <IntroductionScreen /> */}
      {/* <LoginScreen /> */}
      <SignUpScreen />
    </ThemeProvider>
  );
}
