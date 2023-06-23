import { PropsWithChildren, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Drawer as DrawerLayout } from "react-native-drawer-layout";
import { Avatar, Button, List, MD3Theme, useTheme } from "react-native-paper";
import { useUserContext } from "../../../../contexts/UserContext";
import { useNavigation } from "../../../StackNavigationParamList";

type MenuDrawerProps = PropsWithChildren<{
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}>;

export function MenuDrawer({
  onOpen,
  onClose,
  isOpen,
  children,
}: MenuDrawerProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { user } = useUserContext();

  const navigation = useNavigation();

  return (
    <DrawerLayout
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      renderDrawerContent={() => (
        <ScrollView contentContainerStyle={styles.container}>
          {user && (
            <>
              <View style={styles.header}>
                <Avatar.Image size={64} source={{ uri: user.imageUri }} />
              </View>
              <List.Accordion
                title={user.name}
                style={styles.profileAccordionHeader}
                titleStyle={styles.profileAccordionHeaderTitle}
                // eslint-disable-next-line react/no-unstable-nested-components
                left={() => <></>} // Add Padding in Accordion.Item s
              >
                <List.Item title="Meu Perfil" />
                <List.Item title="Meus Pets" />
                <List.Item title="Favoritos" />
                <List.Item title="Chat" />
              </List.Accordion>
            </>
          )}
          {user && (
            <List.Accordion
              title="Atalhos"
              // eslint-disable-next-line react/no-unstable-nested-components
              left={() => (
                <List.Icon color={theme.colors.onSurface} icon="paw" />
              )}
              style={styles.shortcutAccordionHeader}
              titleStyle={styles.shortcutAccordionHeaderTitle}
            >
              <List.Item
                title="Cadastrar um pet"
                onPress={() => navigation.navigate("RegisterAnimal")}
              />
              <List.Item title="Adotar um pet" />
            </List.Accordion>
          )}
          <List.Accordion
            title="Informações"
            style={styles.informationAccordionHeader}
            titleStyle={styles.informationAccordionHeaderTitle}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={() => (
              <List.Icon
                color={theme.colors.onSurface}
                icon="information-outline"
              />
            )}
          >
            <List.Item title="Legislação" />
            <List.Item title="Termo de adoção" />
          </List.Accordion>

          <View style={styles.spacer} />
          {user ? (
            <Button
              mode="contained"
              style={styles.singoutButton}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
            >
              Sair
            </Button>
          ) : (
            <Button
              mode="contained"
              style={styles.singoutButton}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              onPress={() => navigation.navigate("Login")}
            >
              Entrar
            </Button>
          )}
        </ScrollView>
      )}
    >
      {children}
    </DrawerLayout>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.colors.surface,
    },
    header: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 40,
      paddingLeft: 16,
    },
    profileAccordionHeader: {
      backgroundColor: theme.colors.primary,
    },
    profileAccordionHeaderTitle: {
      color: theme.colors.onPrimary,
    },
    shortcutAccordionHeader: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    shortcutAccordionHeaderTitle: {
      color: theme.colors.onSecondaryContainer,
    },
    informationAccordionHeader: {
      backgroundColor: theme.colors.primaryContainer,
    },
    informationAccordionHeaderTitle: {
      color: theme.colors.onPrimaryContainer,
    },
    spacer: {
      flexGrow: 1,
    },
    singoutButton: {
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
  });
