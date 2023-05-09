import { View, StyleSheet, Image } from "react-native";
import { Appbar } from "../../../shared/components/Appbar";
import { Button, MD3Theme, Text, useTheme } from "react-native-paper";
import LogoSrc from "./images/Meau_marca_2.png";
import { useMemo } from "react";

export function IntroductionScreen({ navigation }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <>
      <Appbar title="" colorScheme="transparent" />
      <View style={styles.container}>
        <Text style={styles.title}>Olá!</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Bem vindo ao Meau!</Text>
          <Text style={styles.subtitle}>
            Aqui você pode adotar, doar e ajudar cães e gatos com facilidade.
          </Text>
          <Text style={styles.subtitle}>Qual o seu interesse?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.adoptButton}
            mode="contained"
            compact
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
          >
            Adotar
          </Button>
          <Button
            style={styles.helpButton}
            mode="contained"
            compact
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
          >
            Ajudar
          </Button>
          <Button
            style={styles.registerAnimalButton}
            mode="contained"
            compact
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
            onPress={() => navigation.navigate("Ops")}
          >
            Cadastrar Animal
          </Button>
          <Button
            style={styles.loginButton}
            mode="text"
            compact
            uppercase={false}
            onPress={() => navigation.navigate("Login")}
          >
            login
          </Button>
        </View>
        <Image source={LogoSrc} style={styles.logoImage} />
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
      color: theme.colors.secondary,
    },
    subtitleContainer: {
      marginTop: 52,
    },
    subtitle: {
      textAlign: "center",
      fontSize: 16,
      color: theme.colors.onBackground,
    },
    buttonContainer: {
      marginTop: 48,
      width: 232,
    },
    adoptButton: {},
    helpButton: {
      marginTop: 12,
    },
    registerAnimalButton: {
      marginTop: 12,
    },
    loginButton: {
      marginTop: 44,
    },
    logoImage: {
      marginTop: "auto",
      alignSelf: "center",
      width: 122,
      height: 44,
    },
  });
