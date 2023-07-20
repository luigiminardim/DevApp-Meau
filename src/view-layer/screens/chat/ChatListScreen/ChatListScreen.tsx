import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenLayout } from "../../../shared/components/ScreenLayout";
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
import { StackNavigationParamList } from "../../../shared/StackNavigationParamList";
import { useChatAdoptionInterestsQuery } from "./useChatAdoptionInterestsQuery";
import { useUserContext } from "../../../contexts/UserContext";
import { useRequireLoggedUser } from "../../../shared/hooks/useRequireLoggedUser";

export function ChatListScreen({}: NativeStackScreenProps<
  StackNavigationParamList,
  "ChatList"
>) {
  useRequireLoggedUser();
  const { user } = useUserContext();
  const { adoptionInterests } = useChatAdoptionInterestsQuery({ user });

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <ScreenLayout
      appBarProps={{
        title: "Chat",
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
            <Text>Não há chats abertos</Text>
          </View>
        ) : (
          adoptionInterests.map((adoptionInterest, index) =>
            user?.id === adoptionInterest.owner.id ? (
              <List.Item
                key={index}
                title={adoptionInterest.interestedUser.name}
                description={`Sobre seu pet: ${adoptionInterest.animal.name}`}
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
              />
            ) : (
              <List.Item
                key={index}
                title={adoptionInterest.owner.name}
                description={`Para adotar: ${adoptionInterest.animal.name}`}
                // eslint-disable-next-line react/no-unstable-nested-components
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={{ uri: adoptionInterest.owner.imageUri }}
                    size={48}
                  />
                )}
                titleStyle={styles.itemTitle}
                descriptionStyle={styles.itemDescription}
              />
            )
          )
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
