import { View, StyleSheet, ScrollView } from "react-native";
import {
  MD3Theme,
  Text,
  useTheme,
  TextInput,
  Button,
  Snackbar,
} from "react-native-paper";
import { Appbar } from "../../shared/components/Appbar";
import { useMemo } from "react";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { useCoreLayer } from "../../contexts/CoreLayerContext";
import { ImageInput } from "../../shared/components/ImageInput";

type SignUpFormValue = {
  name: string;
  age: string;
  email: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  password: string;
};

const initialValues: SignUpFormValue = {
  name: "",
  age: "",
  email: "",
  state: "",
  city: "",
  address: "",
  phone: "",
  password: "",
};

export function SignUpScreen() {
  const theme = useTheme();

  const [imageUri, setImageUri] = useState(null as null | string);
  const [snackMessage, setSnackMessage] = useState(null as string | null);

  const {
    userModule: { signUpUsecase },
  } = useCoreLayer();
  const onSubmit = useCallback(
    async (formValue: SignUpFormValue) => {
      if (!imageUri) {
        return;
      }
      const result = await signUpUsecase.signUpWithPassword({
        email: formValue.email,
        password: formValue.password,
        name: formValue.name,
        age: Number(formValue.age),
        state: formValue.state,
        city: formValue.city,
        address: formValue.address,
        phone: formValue.phone,
        imageUri,
      });
      if (result.type === "error") setSnackMessage(result.error);
      else setSnackMessage("Sucesso");
    },
    [imageUri, signUpUsecase]
  );

  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <>
      <Appbar title="Cadastro Pessoal" />
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleChange, handleBlur, values, submitForm, isSubmitting }) => (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.rectangle}>
                <Text style={styles.description}>
                  As informações preenchidas serão divulgadas apenas para a
                  pessoa com a qual você realizar o processo de adoção e/ou
                  apadrinhamento, após a formalização do processo.
                </Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>INFORMAÇÕES PESSOAIS</Text>
                <TextInput
                  placeholder="Nome completo"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

                <TextInput
                  placeholder="Idade"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  value={values.age}
                />

                <TextInput
                  placeholder="E-mail"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />

                <TextInput
                  placeholder="Estado"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  value={values.state}
                />

                <TextInput
                  placeholder="Cidade"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                />

                <TextInput
                  placeholder="Endereço"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />

                <TextInput
                  placeholder="Telefone"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />

                <Text style={styles.subtitle}>INFORMAÇÕES DE PERFIL</Text>

                <TextInput
                  secureTextEntry
                  placeholder="Senha"
                  dense
                  style={styles.inputStyle}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />

                <TextInput
                  secureTextEntry
                  placeholder="Confirmação de senha"
                  dense
                  style={styles.inputStyle}
                />

                <Text style={styles.subtitle}>FOTO DE PERFIL</Text>
              </View>
              <View style={styles.imageInputContainer}>
                <ImageInput value={imageUri} onChangeValue={setImageUri} />
              </View>
              <Button
                mode="contained"
                style={styles.buttonContainer}
                textColor="#434343"
                onPress={submitForm}
                loading={isSubmitting}
              >
                FAZER CADASTRO
              </Button>
            </View>
          </ScrollView>
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

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 24,
      marginBottom: 24,
      paddingHorizontal: 16,
      flexGrow: 1, // Fill all available space,
    },
    description: {
      textAlign: "center",
      fontSize: 14,
      color: "#434343",
    },
    rectangle: {
      marginTop: 16,
      width: 400,
      height: 82,
      backgroundColor: "#cfe9e5",
      paddingTop: 16,
      borderRadius: 4,
      alignSelf: "center",
    },

    subtitleContainer: {
      paddingHorizontal: 28,
      paddingBottom: 32,
    },

    subtitle: {
      paddingTop: 32,
      color: theme.colors.primary,
      fontSize: 14,
    },

    inputStyle: {
      ...baseStyle.input,
      color: "#bdbdbd",
      fontSize: 14,
      paddingTop: 36,
    },

    imageInputContainer: {
      alignItems: "center",
    },

    buttonContainer: {
      alignSelf: "center",
      marginTop: 52,
      width: 232,
      marginBottom: 32,
    },
  });
