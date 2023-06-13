import { useMemo } from "react";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { MD3Theme, Appbar as PaperAppbar, useTheme } from "react-native-paper";

type AppbarProps = {
  title: string;

  /**
   * The color palette for the appbar.
   * @default "primary-container"
   */
  colorScheme?: "primary-container" | "secondary-container" | "transparent";

  /**
   * The action to display on the left side of the appbar.
   * @default "menu"
   */
  leftAction?: "menu" | "back";
};

export function Appbar(props: AppbarProps) {
  const { title, leftAction = "menu" } = props;
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme, props), [theme, props]);

  return (
    <PaperAppbar.Header style={styles.header} statusBarHeight={0}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={styles.statusbar.backgroundColor}
      />
      {leftAction === "menu" ? (
        <PaperAppbar.Action icon="menu" color={styles.content.color} />
      ) : (
        //TODO: Implementar navigation.goBack sem quebrar o navigator inteiro
        <PaperAppbar.BackAction color={styles.content.color} />
      )}
      <PaperAppbar.Content title={title} color={styles.content.color} />
    </PaperAppbar.Header>
  );
}

const containerPrimaryStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    statusbar: {
      backgroundColor: theme.colors.primary,
    },
    header: {
      backgroundColor: theme.colors.primaryContainer,
    },
    content: {
      color: theme.colors.onPrimaryContainer,
    },
  });

const secondaryStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    statusbar: {
      backgroundColor: theme.colors.secondary,
    },
    header: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    content: {
      color: theme.colors.onSecondaryContainer,
    },
  });

const transparentStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    statusbar: {
      backgroundColor: theme.colors.primary,
    },
    header: {
      backgroundColor: "transparent",
      elevation: 0,
    },
    content: {
      color: theme.colors.onPrimaryContainer,
    },
  });

const createStyles = (theme: MD3Theme, props: AppbarProps) =>
  ({
    "primary-container": containerPrimaryStyles(theme),
    "secondary-container": secondaryStyles(theme),
    transparent: transparentStyles(theme),
  }[props.colorScheme ?? "primary-container"]);
