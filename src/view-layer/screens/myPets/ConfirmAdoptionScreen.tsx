import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParamList } from "../../shared/StackNavigationParamList";
import { ScreenLayout } from "../../shared/components/ScreenLayout";
import { StyleSheet, View } from "react-native";
import { useRequireLoggedUser } from "../../shared/hooks/useRequireLoggedUser";
import { Button, Divider, MD3Theme, Text, useTheme } from "react-native-paper";
import { useCallback, useMemo } from "react";
import { useCoreLayer } from "../../contexts/CoreLayerContext";
import { useGetAdoptionInterestQuery } from "../chat/ChatScreen/useGetAdoptionInterestQuery";

export function ConfirmAdoptionScreen({
  route,
  navigation,
}: NativeStackScreenProps<StackNavigationParamList, "ConfirmAdopt">) {
  useRequireLoggedUser();
  const {
    adoptionModule: { confirmAdoptionUsecase },
  } = useCoreLayer();
  const { adoptionInterestId } = route.params;
  console.log(adoptionInterestId);

  const { adoptionInterest } = useGetAdoptionInterestQuery({
    adoptionInterestId,
  });

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const adoptAnimal = useCallback(() => {
    if (!adoptionInterest) return;
    const result = confirmAdoptionUsecase.confirmAdoption({
      animalId: adoptionInterest.animal.id,
      interestedUserId: adoptionInterest.interestedUser.id,
    });
    navigation.navigate("Introduction");
    console.log(result);
  }, [adoptionInterest, confirmAdoptionUsecase, navigation]);
  return (
    <ScreenLayout
      appBarProps={{
        title: "Finalizar Adoção",
        leftAction: "back",
        colorScheme: "primary-container",
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.header}>
          Deseja confirmar a adoção de {adoptionInterest?.animal.name} por{" "}
          {adoptionInterest?.interestedUser.name}?
        </Text>
        <Divider />
        <Text style={styles.warn}>
          Antes de realizar esse passo, certifique-se que o adotante tenha
          cumprido todos os requisitos prévios à adoção e que ele já está em
          posse do animal.
        </Text>
        <Text style={styles.warn}>
          Após finalizar esse processo, seu animal será automaticamente removido
          da lista de animais para adoção.
        </Text>
        <Button mode="contained" onPress={adoptAnimal}>
          Confirmar adoção
        </Button>
      </View>
    </ScreenLayout>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      padding: 16,
      color: theme.colors.onBackground,
    },
    header: {
      fontSize: 20,
    },
    warn: {
      marginVertical: 8,
    },
  });
