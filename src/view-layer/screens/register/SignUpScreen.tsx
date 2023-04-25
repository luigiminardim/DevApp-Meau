import { View, StyleSheet, ScrollView } from "react-native";
import { IconButton, MD3Theme, Text, useTheme, TextInput , Button} from "react-native-paper";
import { Appbar } from "../../shared/components/Appbar";
import { useMemo } from "react";

export function SignUpScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <>
      <Appbar title="Cadastro Pessoal"/>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.rectangle}>
        <Text style={styles.description}>
        As informações preenchidas serão divulgadas
        apenas para a pessoa com a qual você realizar
        o processo de adoção e/ou apadrinhamento,
        após a formalização do processo.
        </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            INFORMAÇÕES PESSOAIS
          </Text>
          <TextInput
            placeholder='Nome completo'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Idade'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='E-mail'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Estado'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Cidade'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Endereço'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Telefone'
            dense
            style={styles.inputStyle}/>
          
          <Text style={styles.subtitle}>
            INFORMAÇÕES DE PERFIL
          </Text>

          <TextInput
            placeholder='Nome de usuário'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Senha'
            dense
            style={styles.inputStyle}/>

          <TextInput
            placeholder='Confirmação de senha'
            dense
            style={styles.inputStyle}/>
          
          <Text style={styles.subtitle}>
            FOTO DE PERFIL
          </Text>
        </View>
        <View style={styles.pictureRectangle}>
          <IconButton
            icon="plus-circle-outline"
            size={24} 
            onPress={()=>{}}
            style={styles.controlPointIcon}
            iconColor="#757575"
          />
          <Text style={styles.pictureText}>
            adicionar foto
          </Text>
        </View>
        <Button
            mode="contained"
            style={styles.buttonContainer}
            textColor="#434343"
            onPress={()=>{}}
          >
            FAZER CADASTRO
          </Button>
      </View>
      </ScrollView>
    </>
  );
}

const baseStyle = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    fontHeight: 14,
  },
});

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 24,
      marginBottom: 24,
      paddingHorizontal: 16,
      flexGrow: 1, // Fill all available space,
    },
    description: {
      textAlign: "center",
      fontSize: 14,
      color: "#434343",
    },
    rectangle: {
      marginTop: 16,
      width: 400,
      height: 82,
      backgroundColor: "#cfe9e5",
      paddingTop: 16,
      borderRadius: 4,
      alignSelf: "center",
    },

    subtitleContainer: {
      paddingHorizontal: 28,
      paddingBottom: 32
    },

    subtitle:{
      paddingTop: 32,
      color: theme.colors.primary,
      fontSize: 14
    },

    inputStyle:{
      ...baseStyle.input,
      color: "#bdbdbd",
      fontSize: 14,
      paddingTop: 36
    },
    
    pictureRectangle: {
      marginTop: 16,
      width: 128,
      height: 128,
      backgroundColor: "#e6e7e7",
      paddingTop: 16,
      borderRadius: 2,
      alignSelf: "center"
    },

    controlPointIcon: {
      alignSelf:"center"
    },

    pictureText: {
      color:"#757575",
      textAlign:"center"
    },

    buttonContainer: {
      alignSelf: "center",
      marginTop: 52,
      width: 232,
      marginBottom: 32
    },
  })
