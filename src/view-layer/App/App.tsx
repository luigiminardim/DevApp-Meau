import { ThemeProvider } from "../contexts/ThemeContext";
// import { LoginScreen } from "../screens";
import { IntroductionScreen } from "../screens/introduction";

export function App() {
  return (
    <ThemeProvider>
      <IntroductionScreen />
      {/* <LoginScreen /> */}
    </ThemeProvider>
  );
}
