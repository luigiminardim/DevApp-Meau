import { View, StyleSheet } from "react-native";
import { Button, Snackbar, TextInput, useTheme } from "react-native-paper";
import { Appbar } from "../../shared/components/Appbar";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { useCoreLayer } from "../../contexts/CoreLayerContext";
import { useUserContext } from "../../contexts/UserContext";

type LoginFormValue = {
  username: string;
  password: string;
};

const initialValues: LoginFormValue = {
  username: "",
  password: "",
};

export function LoginScreen() {
  const theme = useTheme();
  const { setUser } = useUserContext();

  const [snackMessage, setSnackMessage] = useState(null as string | null);

  const {
    userModule: { loginUsecase },
  } = useCoreLayer();
  const onSubmit = useCallback(
    async (formValue: LoginFormValue) => {
      const result = await loginUsecase.loginWithPassword({
        password: formValue.password,
        username: formValue.username,
      });
      if (result.type === "error") {
        setSnackMessage("Erro");
        return;
      }
      setUser(result.user);
      setSnackMessage("Sucesso");
    },
    [loginUsecase, setUser]
  );

  return (
    <>
      <Appbar title="Login" />
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({
          handleChange,
          handleBlur,
          values,
          submitForm,
          isSubmitting,
          touched,
        }) => (
          <View style={styles.container}>
            <TextInput
              placeholder="Nome de Usuário"
              dense
              style={styles.usernameInput}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              right={
                touched.username &&
                values.username && (
                  <TextInput.Icon
                    icon="check"
                    iconColor={theme.colors.primary}
                  />
                )
              }
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              dense
              style={styles.passwordInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              right={
                touched.password &&
                values.password && (
                  <TextInput.Icon
                    icon="check"
                    iconColor={theme.colors.primary}
                  />
                )
              }
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                textColor={theme.colors.onPrimary}
                onPress={submitForm}
                loading={isSubmitting}
              >
                Entrar
              </Button>
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
        )}
      </Formik>
      <Snackbar
        visible={!!snackMessage}
        onDismiss={() => setSnackMessage(null)}
        duration={3000}
      >
        {snackMessage}
      </Snackbar>
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
