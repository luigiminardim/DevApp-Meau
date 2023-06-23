import { View, StyleSheet } from "react-native";
import { Button, MD3Theme, Text, useTheme } from "react-native-paper";
import { useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParamList } from "../../../App/shared/NavigationProps";
import { ScreenLayout } from "../../../shared/components/ScreenLayout";

type StackProps = NativeStackScreenProps<StackNavigationParamList, "Oops">;

export function OopsScreen({ navigation }: StackProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <ScreenLayout appBarProps={{ title: "Cadastro" }}>
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
            onPress={() => navigation.navigate("SignUp")}
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
            onPress={() =>
              navigation.navigate("Login", { fwdTo: "Introduction" })
            }
          >
            Fazer login
          </Button>
        </View>
      </View>
    </ScreenLayout>
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
