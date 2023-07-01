import { View, StyleSheet, Image } from "react-native";
import { Button, MD3Theme, Text, useTheme } from "react-native-paper";
import LogoSrc from "./images/Meau_marca_2.png";
import { useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParamList } from "../../../shared/StackNavigationParamList";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { ScreenLayout } from "../../../shared/components/ScreenLayout/ScreenLayout";

type StackProps = NativeStackScreenProps<
  StackNavigationParamList,
  "Introduction"
>;

export function IntroductionScreen({ navigation }: StackProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScreenLayout appBarProps={{ title: "", colorScheme: "transparent" }}>
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
            onPress={() => navigation.navigate("AdoptionList")}
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
            onPress={() => navigation.navigate("RegisterAnimal")}
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
