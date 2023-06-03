import { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { Card, MD3Theme, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

type ImageInputProps = {
  value: null | string;
  onChangeValue: (value: null | string) => void;
};

export function ImageInput({ value, onChangeValue }: ImageInputProps) {
  const onOpenSelectPicture = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled || !result.assets[0]) return;
    onChangeValue(result.assets[0].uri);
  }, [onChangeValue]);

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Card
      style={styles.container}
      contentStyle={styles.content}
      onPress={onOpenSelectPicture}
    >
      {value ? (
        <>
          <Image source={{ uri: value }} style={styles.image} />
        </>
      ) : (
        <>
          <Icon name="plus-circle-outline" style={styles.icon} />
          <Text style={styles.text}>adicionar foto</Text>
        </>
      )}
    </Card>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
    },
    content: {
      height: 128,
      width: 128,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: 24,
      color: theme.colors.onSurface,
    },
    text: {
      color: theme.colors.onSurface,
      fontSize: 14,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });
