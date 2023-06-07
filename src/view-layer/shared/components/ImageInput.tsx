import { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { Card, MD3Theme, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

type ImageInputProps = {
  value: null | string;
  onChangeValue: (value: null | string) => void;
  aspect: [number, number];
};

export function ImageInput({ value, onChangeValue, aspect }: ImageInputProps) {
  const onOpenSelectPicture = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect,
    });
    if (result.canceled || !result.assets[0]) return;
    onChangeValue(result.assets[0].uri);
  }, [aspect, onChangeValue]);

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
          <Image
            source={{ uri: value }}
            style={styles.image}
            resizeMode={"cover"}
          />
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
      minWidth: 128,
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
