import { PropsWithChildren } from "react";
import {
  Provider as PaperProvider,
  MD2LightTheme,
  MD2Theme,
  configureFonts,
} from "react-native-paper";

/** Use Material Design 2 font configuration
 *  @see https://callstack.github.io/react-native-paper/docs/guides/fonts/
 */
const md2FontConfig = {
  web: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Roboto",
      fontWeight: "500",
    },
    light: {
      fontFamily: "Roboto",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "Roboto",
      fontWeight: "200",
    },
  },
  ios: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Roboto",
      fontWeight: "500",
    },
    light: {
      fontFamily: "Roboto",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "Roboto",
      fontWeight: "200",
    },
  },
  android: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Roboto",
      fontWeight: "500",
    },
    light: {
      fontFamily: "Roboto",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "Roboto",
      fontWeight: "200",
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
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
