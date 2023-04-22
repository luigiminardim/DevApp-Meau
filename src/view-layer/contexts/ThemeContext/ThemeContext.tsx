import { PropsWithChildren } from "react";
import {
  Provider as PaperProvider,
  MD2LightTheme,
  MD2Theme,
  configureFonts,
} from "react-native-paper";
import { useFontsLoaded } from "./useFontsLoaded";

/** Use Material Design 2 font configuration
 *  @see https://callstack.github.io/react-native-paper/docs/guides/fonts/
 */
const md2FontConfig = {
  web: {
    regular: {
      fontFamily: "Roboto-Regular",
    },
    medium: {
      fontFamily: "Roboto-Medium",
    },
    light: {
      fontFamily: "Roboto-Light",
    },
    thin: {
      fontFamily: "Roboto-Light",
    },
  },
  ios: {
    regular: {
      fontFamily: "Roboto-Regular",
    },
    medium: {
      fontFamily: "Roboto-Medium",
    },
    light: {
      fontFamily: "Roboto-Light",
    },
    thin: {
      fontFamily: "Roboto-Light",
    },
  },
  android: {
    regular: {
      fontFamily: "Roboto-Regular",
    },
    medium: {
      fontFamily: "Roboto-Medium",
    },
    light: {
      fontFamily: "Roboto-Light",
    },
    thin: {
      fontFamily: "Roboto-Light",
    },
  },
} as const;

const theme: MD2Theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: md2FontConfig, isV3: false }),
  colors: {
    ...MD2LightTheme.colors,
    primary: "#88c9bf",
  },
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const fontsLoaded = useFontsLoaded();
  if (!fontsLoaded) {
    return null;
  }
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
