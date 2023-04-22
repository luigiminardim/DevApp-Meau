import { useMemo } from "react";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { MD3Theme, Appbar as PaperAppbar, useTheme } from "react-native-paper";

type AppbarProps = {
  title: string;

  /**
   * The color palette for the appbar.
   * @default "primary"
   */
  colorScheme?: "primary-container" | "transparent";
};

export function Appbar({
  title,
  colorScheme = "primary-container",
}: AppbarProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const headerContainerStyle = {
    "primary-container": styles.headerContainerPrimary,
    transparent: styles.headerContainerTransparent,
  }[colorScheme];

  return (
    <PaperAppbar.Header style={headerContainerStyle} statusBarHeight={0}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme.colors.primary}
      />
      <PaperAppbar.Action icon="menu" />
      <PaperAppbar.Content
        title={title}
        color={theme.colors.onPrimaryContainer}
      />
    </PaperAppbar.Header>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    headerContainerPrimary: {
      backgroundColor: theme.colors.primaryContainer,
    },
    headerContainerTransparent: {
      backgroundColor: "transparent",
      elevation: 0,
    },
  });
