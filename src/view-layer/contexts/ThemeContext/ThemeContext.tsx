import { PropsWithChildren } from "react";
import {
  Provider as PaperProvider,
  MD2LightTheme,
  configureFonts,
} from "react-native-paper";
import { useFontsLoaded } from "./useFontsLoaded";
import { View } from "react-native";

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

/** @see https://callstack.github.io/react-native-paper/docs/guides/theming#theme-properties */
const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: md2FontConfig, isV3: false }),
  colors: {
    ...MD2LightTheme.colors,
    primary: "#88c9bf",
    onPrimary: "#434343",
    primaryContainer: "#cfe9e5",
    onPrimaryContainer: "#434343",
    secondary: "#f7a800",
    onSecondary: "#434343",
    secondaryContainer: "#ffd358",
    onSecondaryContainer: "#434343",
    background: "#fafafa",
    onBackground: "#757575",
    surface: "#f1f2f2",
    onSurface: "#757575",
  },
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const fontsLoaded = useFontsLoaded();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexGrow: 1, backgroundColor: theme.colors.background }}>
        {children}
      </View>
    </PaperProvider>
  );
}
