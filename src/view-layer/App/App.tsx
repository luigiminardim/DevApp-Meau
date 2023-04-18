import { LoginScreen } from "../screens";
import { ThemeProvider } from "../contexts/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
}
