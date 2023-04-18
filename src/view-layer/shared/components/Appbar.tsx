import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { Appbar as PaperAppbar, useTheme } from "react-native-paper";

type AppbarProps = {
  title: string;
};

export function Appbar({ title }: AppbarProps) {
  const theme = useTheme();

  return (
    <PaperAppbar.Header style={styles.header} statusBarHeight={0}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme.colors.primary}
      />
      <PaperAppbar.Action icon="menu" />
      <PaperAppbar.Content title={title} />
    </PaperAppbar.Header>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    color: "green",
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#cfe9e5",
  },
});
