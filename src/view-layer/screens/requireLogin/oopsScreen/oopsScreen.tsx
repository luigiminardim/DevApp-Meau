import { View, StyleSheet } from "react-native";
import { Appbar } from "../../../shared/components/Appbar";
import { Button, MD3Theme, Text, useTheme } from "react-native-paper";
import { useMemo } from "react";

export function OopsScreen({ navigation }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <>
      <Appbar title="Cadastro" />
      <View style={styles.container}>
        <Text style={styles.title}>Ops!</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Você não pode realizar essa ação sem possuir um cadastro.
          </Text>
          <Button
            style={styles.defaultButton}
            mode="contained"
            compact
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={() => navigation.navigate("RegUser")}
          >
            Fazer cadastro
          </Button>
        </View>
        <View>
          <Text style={styles.subtitle}>Já possui cadastro?</Text>
          <Button
            style={styles.defaultButton}
            mode="contained"
            compact
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={() => navigation.navigate("Login")}
          >
            Fazer login
          </Button>
        </View>
      </View>
    </>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 48,
      paddingBottom: 32,
      flexGrow: 1, // Fill all available space
      alignItems: "center",
    },
    title: {
      fontFamily: "Courgette-Regular",
      fontSize: 72,
      color: theme.colors.primary,
      marginVertical: 52,
    },
    subtitleContainer: {
      marginBottom: 44,
      alignItems: "center",
    },
    subtitle: {
      textAlign: "center",
      fontSize: 16,
      color: theme.colors.onBackground,
      marginBottom: 16,
    },
    defaultButton: {
      width: 232,
    },
  });
