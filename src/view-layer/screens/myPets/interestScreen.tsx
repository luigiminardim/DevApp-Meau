import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenLayout } from "../../shared/components/ScreenLayout";
import {
  ActivityIndicator,
  Avatar,
  List,
  MD3Theme,
  Text,
  useTheme,
} from "react-native-paper";
import { useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  StackNavigationParamList,
  useNavigation,
} from "../../shared/StackNavigationParamList";
import { useRequireLoggedUser } from "../../shared/hooks/useRequireLoggedUser";
import { useGetAdoptionInterestQuery } from "./hooks/useGetAdoptionInterests";

export function InterestScreen({
  route,
}: NativeStackScreenProps<StackNavigationParamList, "animalsInterest">) {
  useRequireLoggedUser();

  const navigation = useNavigation();
  const animal = route.params;
  const { adoptionInterests } = useGetAdoptionInterestQuery(animal);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <ScreenLayout
      appBarProps={{
        title: "Interessados",
        leftAction: "menu",
        colorScheme: "primary-container",
      }}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {adoptionInterests == null ? (
          <View style={styles.center}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : adoptionInterests.length === 0 ? (
          <View style={styles.center}>
            <Text>Não existem interessados para este animal</Text>
          </View>
        ) : (
          adoptionInterests.map((adoptionInterest, index) => (
            <List.Item
              key={index}
              title={adoptionInterest.interestedUser.name}
              description={`${adoptionInterest.interestedUser.age} anos`}
              // eslint-disable-next-line react/no-unstable-nested-components
              left={(props) => (
                <Avatar.Image
                  {...props}
                  source={{ uri: adoptionInterest.interestedUser.imageUri }}
                  size={48}
                />
              )}
              titleStyle={styles.itemTitle}
              descriptionStyle={styles.itemDescription}
              onPress={() =>
                navigation.navigate("Chat", {
                  adoptionInterestId: adoptionInterest.id,
                })
              }
            />
          ))
        )}
      </ScrollView>
    </ScreenLayout>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      padding: 16,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    itemTitle: {
      color: theme.colors.primary,
      fontFamily: "Roboto-Regular",
    },
    itemDescription: {
      color: theme.colors.onBackground,
      fontFamily: "Roboto-Regular",
    },
  });
