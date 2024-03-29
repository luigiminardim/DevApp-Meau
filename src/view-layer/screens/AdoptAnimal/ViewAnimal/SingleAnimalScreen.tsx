import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParamList } from "../../../shared/StackNavigationParamList";
import { ScreenLayout } from "../../../shared/components/ScreenLayout";
import {
  Button,
  Divider,
  MD3Theme,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { useEffect, useState, useMemo, useCallback } from "react";
import { StyleSheet, Image, View } from "react-native";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { Animal } from "../../../../core-layer/animal-module/entities/Animal";
import { ScrollView } from "react-native";
import AnimalPrettyPrint from "../../../shared/AnimalPrettyPrint";
import { useCreateAdoptionInterestMutation } from "./hooks/useCreateAdoptionInterestMutation";
import { useUserContext } from "../../../contexts/UserContext";
import { useRequireLoggedUser } from "../../../shared/hooks/useRequireLoggedUser";

type StackProps = NativeStackScreenProps<
  StackNavigationParamList,
  "SingleAnimal"
>;

export function SingleAnimalScreen({ route }: StackProps) {
  useRequireLoggedUser();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { id } = route.params;
  const {
    animalModule: { getSingleAnimalUsecase },
  } = useCoreLayer();
  const [animal, setAnimal] = useState<Animal | null>(null);
  useEffect(() => {
    getSingleAnimalUsecase.querySingleAnimal({ animalId: id }).then((res) => {
      if (res.type === "success") {
        setAnimal(res.animal);
      }
    });
  }, [getSingleAnimalUsecase, id]);

  const { user } = useUserContext();
  const createAdoptionInterestMutation = useCreateAdoptionInterestMutation();
  const onAdoptAnimal = useCallback(() => {
    if (!user || !animal) return;
    createAdoptionInterestMutation.mutate({
      animal: animal,
      interested: user,
    });
  }, [animal, createAdoptionInterestMutation, user]);

  return (
    <ScreenLayout
      appBarProps={{
        title: "Adotar",
        colorScheme: "secondary-container",
      }}
    >
      {!animal && (
        <ProgressBar indeterminate={true} color={theme.colors.primary} />
      )}
      {animal && (
        <ScrollView>
          <View>
            <Image
              style={styles.animalImage}
              source={{ uri: animal.imageUri }}
            />
          </View>
          <View style={styles.content}>
            <View>
              <Text style={styles.largeHeader}>{animal.name}</Text>
            </View>
            <View style={styles.flexContainer}>
              <View>
                <Text style={styles.smallHeader}>Sexo</Text>
                <Text>{AnimalPrettyPrint(animal).sex}</Text>
              </View>
              <View>
                <Text style={styles.smallHeader}>Porte</Text>
                <Text>{AnimalPrettyPrint(animal).size}</Text>
              </View>
              <View>
                <Text style={styles.smallHeader}>Idade</Text>
                <Text>{AnimalPrettyPrint(animal).age}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.flexContainer}>
              <View>
                <Text style={styles.smallHeader}>Castrado</Text>
                <Text>{animal.health.castrated ? "Sim" : "Não"}</Text>
              </View>
              <View>
                <Text style={styles.smallHeader}>Vermifugado</Text>
                <Text>{animal.health.dewormed ? "Sim" : "Não"}</Text>
              </View>
              <View>
                <Text style={styles.smallHeader}>Vacinado</Text>
                <Text>{animal.health.vaccinated ? "Sim" : "Não"}</Text>
              </View>
              <View>
                <Text style={styles.smallHeader}>Doenças</Text>
                <Text>
                  {animal.health.sick
                    ? animal.health.sickDescription
                    : "Nenhuma"}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text style={styles.smallHeader}>Temperamento</Text>
              <Text>{animal.temperament.calm ? "Calmo" : null}</Text>
              <Text>{animal.temperament.loving ? "Amoroso" : null}</Text>
              <Text>{animal.temperament.guard ? "Guarda" : null}</Text>
              <Text>{animal.temperament.lazy ? "Preguiçoso" : null}</Text>
              <Text>{animal.temperament.shy ? "Tímido" : null}</Text>
              <Text>{animal.temperament.playful ? "Brincalhão" : null}</Text>
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text style={styles.smallHeader}>Exigências do doador</Text>
              <Text>
                {animal.adoptionRequirements.terms ? "Termos de adoção" : null}
              </Text>
              <Text>
                {animal.adoptionRequirements.animalPreviousVisit
                  ? "Visita prévia ao animal"
                  : null}
              </Text>
              <Text>
                {animal.adoptionRequirements.homePhotos
                  ? "Fotos da casa"
                  : null}
              </Text>
              <Text>
                {animal.adoptionRequirements.postAdoptionFollowup === "null"
                  ? "Não é necessário acompanhamento pós adoção "
                  : animal.adoptionRequirements.postAdoptionFollowup}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View>
              <Text style={styles.smallHeader}>Mais sobre {animal.name}</Text>
              <Text>{animal.commentary}</Text>
            </View>
            <Button
              mode="contained"
              compact
              buttonColor={theme.colors.secondary}
              textColor={theme.colors.onSecondary}
              style={styles.button}
              onPress={onAdoptAnimal}
              loading={createAdoptionInterestMutation.isLoading}
            >
              Pretendo Adotar
            </Button>
          </View>
        </ScrollView>
      )}
    </ScreenLayout>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    content: {
      margin: 16,
    },
    largeHeader: {
      fontSize: 16,
      fontWeight: "bold",
    },
    smallHeader: {
      color: theme.colors.secondary,
      textTransform: "uppercase",
      fontSize: 12,
      marginTop: 16,
      marginBottom: 8,
    },
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 30,
      flexWrap: "wrap",
    },
    animalImage: {
      height: 184,
    },
    divider: {
      marginTop: 16,
    },
    button: {
      marginVertical: 28,
    },
  });
