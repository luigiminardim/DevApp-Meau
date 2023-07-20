import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenLayout } from "../../shared/components/ScreenLayout";
import { Card, ProgressBar, Text, useTheme } from "react-native-paper";
import { useEffect, useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useCoreLayer } from "../../contexts/CoreLayerContext";
import { Animal } from "../../../core-layer/animal-module/entities/Animal";
import { StackNavigationParamList } from "../../shared/StackNavigationParamList";
import { useRequireLoggedUser } from "../../shared/hooks/useRequireLoggedUser";
import { useUserContext } from "../../contexts/UserContext";

type StackProps = NativeStackScreenProps<StackNavigationParamList, "myPets">;

export function MypetsScreen({ navigation }: StackProps) {
  useRequireLoggedUser();
  const { user } = useUserContext();
  console.log(user);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(), []);
  const {
    animalModule: { getUserAnimalsUsecase },
  } = useCoreLayer();
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    if (!user) {
      return;
    }
    getUserAnimalsUsecase.getUserAnimals({ user }).then((res) => {
      if (res.success) {
        setAnimals(res.animals);
      }
    });
  }, [getUserAnimalsUsecase, user]);

  return (
    <ScreenLayout
      appBarProps={{
        title: "Meus Pets",
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
              navigation.navigate("RemoveAnimal", { id: animal.id })
            }
          >
            <Card.Title title={animal.name} style={styles.cardTitle} />
            <Card.Cover source={{ uri: animal.imageUri }} />
            <Card.Content>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>"Apadrinhamento | ajuda"</Text>
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
      backgroundColor: "#cfe9e5",
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
      fontFamily: "Roboto-Medium",
      textTransform: "uppercase",
    },
  });
