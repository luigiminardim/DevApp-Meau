import { View, StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { Appbar } from "../../shared/components/Appbar";

export function LoginScreen() {
  const theme = useTheme();

  return (
    <>
      <Appbar title="Login" />
      <View style={styles.container}>
        <TextInput
          placeholder="Nome de Usuário"
          dense
          style={styles.usernameInput}
          right={
            <TextInput.Icon icon="check" iconColor={theme.colors.primary} />
          }
        />
        <TextInput
          placeholder="Senha"
          dense
          style={styles.passwordInput}
          right={
            <TextInput.Icon icon="check" iconColor={theme.colors.primary} />
          }
        />
        <View style={styles.buttonContainer}>
          <Button mode="contained">Entrar</Button>
          <Button
            mode="contained"
            style={styles.facebookButton}
            textColor={styles.facebookButton.color}
            icon={"facebook"}
          >
            Entrar com Facebook
          </Button>
          <Button
            mode="contained"
            style={styles.googleButton}
            textColor={styles.googleButton.color}
            icon={"google-plus"}
          >
            Entrar com Google
          </Button>
        </View>
      </View>
    </>
  );
}

const baseStyle = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    fontHeight: 14,
  },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  usernameInput: {
    ...baseStyle.input,
  },
  passwordInput: {
    ...baseStyle.input,
    marginTop: 20,
  },
  checkInputIcon: {
    color: "#fff",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 52,
    width: 232,
  },
  facebookButton: {
    marginTop: 72,
    color: "#fff",
    backgroundColor: "#194f7c",
  },
  googleButton: {
    marginTop: 8,
    color: "#fff",
    backgroundColor: "#f15f5c",
  },
});
