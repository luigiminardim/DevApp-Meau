import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar } from "../../shared/components/Appbar";
import {
  Button,
  Card,
  Checkbox,
  MD3Theme,
  RadioButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useMemo } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function RegisterAnimalScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <Appbar
        title="Cadastro do Animal"
        colorScheme="secondary-container"
        leftAction="back"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adoção</Text>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>NOME DO ANIMAL</Text>
          <TextInput
            placeholder="Nome do Animal"
            dense
            style={styles.textInput}
            activeUnderlineColor={theme.colors.secondary}
            right={
              <TextInput.Icon icon="check" iconColor={theme.colors.secondary} />
            }
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>FOTOS DO ANIMAL</Text>
          <Card
            style={styles.imageInputContainer}
            contentStyle={styles.imageInputContent}
          >
            <Icon name="plus-circle-outline" style={styles.imageInputIcon} />
            <Text style={styles.imageInputText}>adicionar fotos</Text>
          </Card>
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>ESPÉCIE</Text>
          <View style={styles.radioButtonGroup}>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="dog"
                status={"checked"}
                color={theme.colors.secondary}
              />
              <Text style={styles.radioButtonLabel}>Cachorro</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="cat" color={theme.colors.secondary} />
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
                status={"checked"}
                color={theme.colors.secondary}
              />
              <Text style={styles.radioButtonLabel}>Macho</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="female" color={theme.colors.secondary} />
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
                status={"checked"}
                color={theme.colors.secondary}
              />
              <Text style={styles.radioButtonLabel}>Pequeno</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="medium" color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Médio</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="big" color={theme.colors.secondary} />
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
                status={"checked"}
                color={theme.colors.secondary}
              />
              <Text style={styles.radioButtonLabel}>Filhote</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="adult" color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Adulto</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="elderly" color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Idoso</Text>
            </View>
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>TEMPERAMENTO</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"checked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Brincalhão</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Tímido</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Calmo</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Guarda</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Amoroso</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Preguiçoso</Text>
            </View>
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>SAÚDE</Text>
          <View style={styles.checkboxGroup}>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"checked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Vacinado</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Vermufugado</Text>
            </View>
            <View style={styles.checkboxButtonContainer} />
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Castrado</Text>
            </View>
            <View style={styles.checkboxButtonContainer}>
              <Checkbox status={"unchecked"} color={theme.colors.secondary} />
              <Text style={styles.radioButtonLabel}>Doente</Text>
            </View>
          </View>
          <TextInput
            placeholder="Doenças do animal"
            disabled
            style={styles.textInput}
            dense
            activeUnderlineColor={theme.colors.secondary}
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
                <Checkbox status={"checked"} color={theme.colors.secondary} />
                <Text style={styles.radioButtonLabel}>Termo de adoção</Text>
              </View>
              <View style={styles.checkboxButtonContainer}>
                <Checkbox status={"unchecked"} color={theme.colors.secondary} />
                <Text style={styles.radioButtonLabel}>Fotos da casa</Text>
              </View>
              <View style={styles.checkboxButtonContainer}>
                <Checkbox status={"unchecked"} color={theme.colors.secondary} />
                <Text style={styles.radioButtonLabel}>
                  Visita prévia ao animal
                </Text>
              </View>
              <View style={styles.checkboxButtonContainer}>
                <Checkbox status={"unchecked"} color={theme.colors.secondary} />
                <Text style={styles.radioButtonLabel}>
                  Acompanhamento pós adoção
                </Text>
              </View>
              <View style={styles.innerCheckboxGroupVertical}>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    status={"unchecked"}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.radioButtonLabel}>1 mês</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    status={"unchecked"}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.radioButtonLabel}>3 meses</Text>
                </View>
                <View style={styles.checkboxButtonContainer}>
                  <Checkbox
                    status={"unchecked"}
                    color={theme.colors.secondary}
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
              <TextInput.Icon icon="check" iconColor={theme.colors.secondary} />
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            buttonColor={theme.colors.secondaryContainer}
            textColor={theme.colors.onSecondaryContainer}
          >
            Colocar para adoção
          </Button>
        </View>
      </ScrollView>
    </>
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
    imageInputContainer: {
      backgroundColor: theme.colors.surface,
      marginTop: 8,
    },
    imageInputContent: {
      paddingVertical: 48,
      alignItems: "center",
    },
    imageInputIcon: {
      fontSize: 24,
      color: theme.colors.onSurface,
    },
    imageInputText: {
      color: theme.colors.onSurface,
      fontSize: 14,
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
      flexBasis: "33%",
    },
    buttonContainer: {
      marginTop: 24,
    },
  });
