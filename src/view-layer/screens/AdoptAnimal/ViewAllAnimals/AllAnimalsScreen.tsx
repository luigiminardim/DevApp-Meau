import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenLayout } from "../../../shared/components/ScreenLayout";
import { Card, ProgressBar, Text, useTheme } from "react-native-paper";
import { useEffect, useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";
import { Animal } from "../../../../core-layer/animal-module/entities/Animal";
import { StackNavigationParamList } from "../../../shared/StackNavigationParamList";
import AnimalPrettyPrint from "../../../shared/AnimalPrettyPrint";

type StackProps = NativeStackScreenProps<
  StackNavigationParamList,
  "AdoptionList"
>;

export function AllAnimalsScreen({ navigation }: StackProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(), []);
  const {
    animalModule: { getAnimalsAdoptionUsecase },
  } = useCoreLayer();
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    getAnimalsAdoptionUsecase.queryAnimalsForAdoption().then((res) => {
      if (res.type === "success") {
        setAnimals(res.animalsForAdoption);
      }
    });
  }, [getAnimalsAdoptionUsecase]);

  return (
    <ScreenLayout
      appBarProps={{
        title: "Adotar",
        colorScheme: "secondary-container",
      }}
    >
      <ScrollView>
        {animals.length === 0 && (
          <ProgressBar indeterminate={true} color={theme.colors.primary} />
        )}
        {animals.map((animal) => (
          <Card
            mode="elevated"
            elevation={4}
            style={styles.card}
            key={animal.id}
            onPress={() =>
              navigation.navigate("SingleAnimal", { id: animal.id })
            }
          >
            <Card.Title title={animal.name} style={styles.cardTitle} />
            <Card.Cover source={{ uri: animal.imageUri }} />
            <Card.Content>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  {AnimalPrettyPrint(animal).sex}
                </Text>
                <Text style={styles.cardText}>
                  {AnimalPrettyPrint(animal).age}
                </Text>
                <Text style={styles.cardText}>
                  {AnimalPrettyPrint(animal).size}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}

const createStyles = () =>
  StyleSheet.create({
    card: {
      margin: 8,
    },
    cardTitle: {
      backgroundColor: "#FEE29B",
      color: "#434343",
      fontSize: 16,
    },
    cardBody: {
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    cardText: {
      fontSize: 12,
      fontFamily: "Roboto-Regular",
      textTransform: "uppercase",
    },
  });
