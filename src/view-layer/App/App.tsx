import { ThemeProvider } from "../contexts/ThemeContext";
// import { LoginScreen } from "../screens";
// import { IntroductionScreen } from "../screens/introduction";
import { OopsScreen } from "../screens/requireLogin/oopsScreen";

export function App() {
  return (
    <ThemeProvider>
      <OopsScreen />
      {/* <IntroductionScreen /> */}
      {/* <LoginScreen /> */}
    </ThemeProvider>
  );
}
