import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenLayout } from "../../../shared/components/ScreenLayout";
import {
  ActivityIndicator,
  IconButton,
  MD3Theme,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationParamList } from "../../../shared/StackNavigationParamList";
import { useRequireLoggedUser } from "../../../shared/hooks/useRequireLoggedUser";
import { useGetAdoptionInterestQuery } from "./useGetAdoptionInterestQuery";
import { useUserContext } from "../../../contexts/UserContext";
import { useCoreLayer } from "../../../contexts/CoreLayerContext";

export function ChatScreen({
  route,
}: NativeStackScreenProps<StackNavigationParamList, "Chat">) {
  useRequireLoggedUser();
  const { adoptionInterestId } = route.params;

  const { adoptionInterest } = useGetAdoptionInterestQuery({
    adoptionInterestId,
  });

  const user = useUserContext().user;
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    adoptionModule: { sendMessageUsecase },
  } = useCoreLayer();
  const [newMessage, setNewMessage] = useState<string>("");
  const onSendNewMessage = () => {
    if (!user || !newMessage) return;
    sendMessageUsecase.sendMessage({
      adoptionInterestId: adoptionInterestId,
      text: newMessage,
      sender: user,
    });
    setNewMessage("");
  };

  return (
    <ScreenLayout
      appBarProps={{
        title:
          adoptionInterest?.owner.id === user?.id
            ? adoptionInterest?.interestedUser.name ?? "Chat"
            : adoptionInterest?.owner.name ?? "Chat",
        leftAction: "back",
        colorScheme: "primary-container",
      }}
    >
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {adoptionInterest == null ? (
            <View style={styles.center}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            adoptionInterest.messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  message.sender === user?.id
                    ? styles.messageContainerRight
                    : styles.messageContainerLeft,
                ]}
              >
                <Text style={{ color: theme.colors.onPrimaryContainer }}>
                  {message.text}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            outlineStyle={styles.textInputOutline}
            value={newMessage}
            onChange={(e) => setNewMessage(e.nativeEvent.text)}
          />
          <IconButton
            mode="contained"
            icon="send"
            containerColor={theme.colors.primary}
            iconColor={theme.colors.background}
            onPress={() => onSendNewMessage()}
            size={32}
          />
        </View>
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
    scrollView: {
      flex: 1,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      flex: 1,
      borderColor: "red",
    },
    textInputOutline: {
      borderColor: "transparent",
    },
    messageContainer: {
      padding: 8,
      borderRadius: 8,
      marginVertical: 8,
      maxWidth: 268,
    },
    messageContainerLeft: {
      backgroundColor: "white",
      alignSelf: "flex-start",
    },
    messageContainerRight: {
      backgroundColor: theme.colors.primaryContainer,
      alignSelf: "flex-end",
    },
  });
