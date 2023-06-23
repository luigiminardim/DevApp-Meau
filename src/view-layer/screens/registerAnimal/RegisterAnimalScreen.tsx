import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  MD3Theme,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useCallback, useMemo, useState } from "react";
import { Formik } from "formik";
import { useCoreLayer } from "../../contexts/CoreLayerContext";
import { useUserContext } from "../../contexts/UserContext";
import { ImageInput } from "../../shared/components/ImageInput";
import { ScreenLayout } from "../../shared/components/ScreenLayout";
import { useRequireLoggedUser } from "../../shared/hooks/useRequireLoggedUser";

type RegisterAnimalFormValue = {
  name: string;
  imageUri?: string;
  species?: "dog" | "cat";
  sex?: "male" | "female";
  size?: "small" | "medium" | "big";
  age?: "cub" | "adult" | "elderly";
  temperament: {
    playful: boolean;
    shy: boolean;
    calm: boolean;
    guard: boolean;
    loving: boolean;
    lazy: boolean;
    docile: boolean;
  };
  health: {
    vaccinated: boolean;
    dewormed: boolean;
    castrated: boolean;
    sick: boolean;
    sickDescription: string;
  };
  adoptionRequirements: {
    terms: boolean;
    homePhotos: boolean;
    animalPreviousVisit: boolean;
    postAdoptionFollowup: boolean;
    postAdoptionFollowupTime?: "1-month" | "3-months" | "6-months";
  };
  commentary: string;
};

const registerAnimalFormInitialValues: RegisterAnimalFormValue = {
  name: "",
  imageUri: undefined,
  species: undefined,
  sex: undefined,
  size: undefined,
  age: undefined,
  temperament: {
    playful: false,
    shy: false,
    calm: false,
    guard: false,
    loving: false,
    lazy: false,
    docile: false,
  },
  health: {
    vaccinated: false,
    dewormed: false,
    castrated: false,
    sick: false,
    sickDescription: "",
  },
  adoptionRequirements: {
    terms: false,
    homePhotos: false,
    animalPreviousVisit: false,
    postAdoptionFollowup: false,
    postAdoptionFollowupTime: undefined,
  },
  commentary: "",
};

export function RegisterAnimalScreen() {
  useRequireLoggedUser();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const {
    animalModule: { registerAnimalUsecase },
  } = useCoreLayer();

  const { user } = useUserContext();
  const onSubmit = useCallback(
    async (formValue: RegisterAnimalFormValue) => {
      const postAdoptionFollowup = formValue.adoptionRequirements
        .postAdoptionFollowup
        ? formValue.adoptionRequirements.postAdoptionFollowupTime
        : null;
      if (
        !formValue.imageUri ||
        postAdoptionFollowup === undefined ||
        !formValue.species ||
        !formValue.sex ||
        !formValue.size ||
        !formValue.age ||
        !user
      ) {
        return;
      }
      const result = await registerAnimalUsecase.registerAnimal({
        donorId: user.id,
        name: formValue.name,
        imageUri: formValue.imageUri,
        species: formValue.species,
        sex: formValue.sex,
        size: formValue.size,
        age: formValue.age,
        temperament: {
          playful: formValue.temperament.playful,
          shy: formValue.temperament.shy,
          calm: formValue.temperament.calm,
          guard: formValue.temperament.guard,
          loving: formValue.temperament.loving,
          lazy: formValue.temperament.lazy,
          docile: formValue.temperament.docile,
        },
        health: {
          vaccinated: formValue.health.vaccinated,
          dewormed: formValue.health.dewormed,
          castrated: formValue.health.castrated,
          sick: formValue.health.sick,
          sickDescription: formValue.health.sickDescription,
        },
        adoptionRequirements: {
          terms: formValue.adoptionRequirements.terms,
          homePhotos: formValue.adoptionRequirements.homePhotos,
          animalPreviousVisit:
            formValue.adoptionRequirements.animalPreviousVisit,
          postAdoptionFollowup,
        },
        commentary: formValue.commentary,
      });
      if (result.type === "error") {
        setSnackbarMessage("Erro ao registrar animal:" + result.error);
      } else {
        setSnackbarMessage("Animal registrado com sucesso!");
      }
    },
    [registerAnimalUsecase, user]
  );

  return (
    <ScreenLayout
      appBarProps={{
        title: "Cadastro do Animal",
        colorScheme: "secondary-container",
        leftAction: "back",
      }}
    >
      <Formik
        initialValues={registerAnimalFormInitialValues}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleBlur,
          submitForm,
          handleChange,
          setFieldValue,
          isSubmitting,
        }) => (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Adoção</Text>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>NOME DO ANIMAL</Text>
              <TextInput
                placeholder="Nome do Animal"
                dense
                style={styles.textInput}
                activeUnderlineColor={theme.colors.secondary}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                right={
                  <TextInput.Icon
                    icon="check"
                    iconColor={theme.colors.secondary}
                  />
                }
              />
            </View>
            <View style={styles.formField}>
              <Text style={[styles.fieldLabel, styles.marginBottom8]}>
                FOTO DO ANIMAL
              </Text>
              <ImageInput
                value={values.imageUri ?? null}
                onChangeValue={(uri) => setFieldValue("imageUri", uri)}
                aspect={[1, 1]}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>ESPÉCIE</Text>
              <View style={styles.radioButtonGroup}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="dog"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("species")("dog")}
                    status={values.species === "dog" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Cachorro</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="cat"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("species")("cat")}
                    status={values.species === "cat" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Gato</Text>
                </View>
                <View style={styles.radioButtonContainer} />
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>SEXO</Text>
              <View style={styles.radioButtonGroup}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="male"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("sex")("male")}
                    status={values.sex === "male" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Macho</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="female"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("sex")("female")}
                    status={values.sex === "female" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Fêmea</Text>
                </View>
                <View style={styles.radioButtonContainer} />
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>PORTE</Text>
              <View style={styles.radioButtonGroup}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="small"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("size")("small")}
                    status={values.size === "small" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Pequeno</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="medium"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("size")("medium")}
                    status={values.size === "medium" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Médio</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="big"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("size")("big")}
                    status={values.size === "big" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Grande</Text>
                </View>
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>IDADE</Text>
              <View style={styles.radioButtonGroup}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="cub"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("age")("cub")}
                    status={values.age === "cub" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Filhote</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="adult"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("age")("adult")}
                    status={values.age === "adult" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Adulto</Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="elderly"
                    color={theme.colors.secondary}
                    onPress={() => handleChange("age")("elderly")}
                    status={values.age === "elderly" ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Idoso</Text>
                </View>
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>TEMPERAMENTO</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "temperament.playful",
                        !values.temperament.playful
                      )
                    }
                    status={
                      values.temperament.playful ? "checked" : "unchecked"
                    }
                  />
                  <Text style={styles.radioButtonLabel}>Brincalhão</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue("temperament.shy", !values.temperament.shy)
                    }
                    status={values.temperament.shy ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Tímido</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "temperament.calm",
                        !values.temperament.calm
                      )
                    }
                    status={values.temperament.calm ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Calmo</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "temperament.guard",
                        !values.temperament.guard
                      )
                    }
                    status={values.temperament.guard ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Guarda</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "temperament.loving",
                        !values.temperament.loving
                      )
                    }
                    status={values.temperament.loving ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Amoroso</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "temperament.lazy",
                        !values.temperament.lazy
                      )
                    }
                    status={values.temperament.lazy ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Preguiçoso</Text>
                </View>
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>SAÚDE</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "health.vaccinated",
                        !values.health.vaccinated
                      )
                    }
                    status={values.health.vaccinated ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Vacinado</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue("health.dewormed", !values.health.dewormed)
                    }
                    status={values.health.dewormed ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Vermufugado</Text>
                </View>
                <View style={styles.checkboxButtonContainer} />
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue(
                        "health.castrated",
                        !values.health.castrated
                      )
                    }
                    status={values.health.castrated ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Castrado</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    color={theme.colors.secondary}
                    onPress={() =>
                      setFieldValue("health.sick", !values.health.sick)
                    }
                    status={values.health.sick ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioButtonLabel}>Doente</Text>
                </View>
              </View>
              <TextInput
                placeholder="Doenças do animal"
                disabled
                style={styles.textInput}
                dense
                activeUnderlineColor={theme.colors.secondary}
                value={values.health.sickDescription}
                onChangeText={handleChange("health.sickDescription")}
                onBlur={handleBlur("health.sickDescription")}
                right={
                  <TextInput.Icon
                    disabled
                    icon="check"
                    iconColor={theme.colors.secondary}
                  />
                }
              />
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>EXIGÊNCIAS PARA ADOÇÃO</Text>
                <View style={styles.checkboxGroupVertical}>
                  <View style={styles.checkboxButtonContainer}>
                    <Checkbox
                      color={theme.colors.secondary}
                      status={
                        values.adoptionRequirements.terms
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setFieldValue(
                          "adoptionRequirements.terms",
                          !values.adoptionRequirements.terms
                        )
                      }
                    />
                    <Text style={styles.radioButtonLabel}>Termo de adoção</Text>
                  </View>
                  <View style={styles.checkboxButtonContainer}>
                    <Checkbox
                      color={theme.colors.secondary}
                      status={
                        values.adoptionRequirements.homePhotos
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setFieldValue(
                          "adoptionRequirements.homePhotos",
                          !values.adoptionRequirements.homePhotos
                        )
                      }
                    />
                    <Text style={styles.radioButtonLabel}>Fotos da casa</Text>
                  </View>
                  <View style={styles.checkboxButtonContainer}>
                    <Checkbox
                      color={theme.colors.secondary}
                      status={
                        values.adoptionRequirements.animalPreviousVisit
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setFieldValue(
                          "adoptionRequirements.animalPreviousVisit",
                          !values.adoptionRequirements.animalPreviousVisit
                        )
                      }
                    />
                    <Text style={styles.radioButtonLabel}>
                      Visita prévia ao animal
                    </Text>
                  </View>
                  <View style={styles.checkboxButtonContainer}>
                    <Checkbox
                      color={theme.colors.secondary}
                      status={
                        values.adoptionRequirements.postAdoptionFollowup
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setFieldValue(
                          "adoptionRequirements.postAdoptionFollowup",
                          !values.adoptionRequirements.postAdoptionFollowup
                        )
                      }
                    />
                    <Text style={styles.radioButtonLabel}>
                      Acompanhamento pós adoção
                    </Text>
                  </View>
                  <View style={styles.innerCheckboxGroupVertical}>
                    <View style={styles.checkboxButtonContainer}>
                      <Checkbox
                        color={theme.colors.secondary}
                        status={
                          values.adoptionRequirements
                            .postAdoptionFollowupTime === "1-month"
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() =>
                          setFieldValue(
                            "adoptionRequirements.postAdoptionFollowupTime",
                            "1-month"
                          )
                        }
                      />
                      <Text style={styles.radioButtonLabel}>1 mês</Text>
                    </View>
                    <View style={styles.checkboxButtonContainer}>
                      <Checkbox
                        color={theme.colors.secondary}
                        status={
                          values.adoptionRequirements
                            .postAdoptionFollowupTime === "3-months"
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() =>
                          setFieldValue(
                            "adoptionRequirements.postAdoptionFollowupTime",
                            "3-months"
                          )
                        }
                      />
                      <Text style={styles.radioButtonLabel}>3 meses</Text>
                    </View>
                    <View style={styles.checkboxButtonContainer}>
                      <Checkbox
                        color={theme.colors.secondary}
                        status={
                          values.adoptionRequirements
                            .postAdoptionFollowupTime === "6-months"
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() =>
                          setFieldValue(
                            "adoptionRequirements.postAdoptionFollowupTime",
                            "6-months"
                          )
                        }
                      />
                      <Text style={styles.radioButtonLabel}>6 meses</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>SOBRE O ANIMAL</Text>
              <TextInput
                placeholder="Compartilhe a história do animal"
                dense
                style={styles.textInput}
                activeUnderlineColor={theme.colors.secondary}
                right={
                  <TextInput.Icon
                    icon="check"
                    iconColor={theme.colors.secondary}
                  />
                }
                value={values.commentary}
                onChangeText={handleChange("commentary")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                buttonColor={theme.colors.secondaryContainer}
                textColor={theme.colors.onSecondaryContainer}
                loading={isSubmitting}
                onPress={submitForm}
              >
                Colocar para adoção
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
      <Snackbar
        visible={!!snackbarMessage}
        onDismiss={() => setSnackbarMessage(null)}
      >
        {snackbarMessage}
      </Snackbar>
    </ScreenLayout>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingHorizontal: 24,
      /** @todo Fix scroll view container height       */
      paddingBottom: 24,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.onPrimary,
      fontFamily: "Roboto-Medium",
      fontSize: 16,
    },
    formField: {
      marginTop: 24,
    },
    fieldLabel: {
      color: theme.colors.secondary,
      fontFamily: "Roboto-Regular",
    },
    textInput: {
      backgroundColor: "transparent",
      fontHeight: 14,
    },
    radioButtonGroup: {
      marginTop: 16,
      flexDirection: "row",
    },
    radioButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    radioButtonLabel: {
      color: theme.colors.onSurface,
    },
    checkboxGroup: {
      marginTop: 16,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    checkboxGroupVertical: {
      marginTop: 16,
    },
    innerCheckboxGroupVertical: {
      paddingLeft: 24,
      opacity: 0.5,
    },
    checkboxButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: 24,
    },
    marginBottom8: {
      marginBottom: 8,
    },
  });
