import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Drawer as DrawerLayout } from "react-native-drawer-layout";
import { Button, List } from "react-native-paper";

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
  return (
    <DrawerLayout
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      renderDrawerContent={() => (
        <ScrollView contentContainerStyle={styles.container}>
          <List.Accordion
            title="Emille Catarine"
            left={() => <></>} // Add Padding in Accordion.Item s
          >
            <List.Item title="Meu Perfil" />
            <List.Item title="Meus Pets" />
            <List.Item title="Favoritos" />
            <List.Item title="Chat" />
          </List.Accordion>
          <List.Accordion
            title="Atalhos"
            left={(props) => <List.Icon {...props} icon="paw" />}
          >
            <List.Item title="Cadastrar um pet" />
            <List.Item title="Adotar um pet" />
          </List.Accordion>
          <List.Accordion
            title="Informações"
            left={(props) => (
              <List.Icon {...props} icon="information-outline" />
            )}
          >
            <List.Item title="Legislação" />
            <List.Item title="Termo de adoção" />
          </List.Accordion>

          <View style={styles.spacer} />
          <Button mode="contained" style={styles.singoutButton}>
            Sair
          </Button>
        </ScrollView>
      )}
    >
      {children}
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
