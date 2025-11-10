import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Configurações</Text>
      </View>

      {/* Ícone central */}
      <Image
        source={require("../assets/chart.png")} // Coloque uma imagem de gráfico 3D parecida
        style={styles.image}
        resizeMode="contain"
      />

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>PERFIL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="star-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>MINHAS METAS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="trophy-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>MINHAS CONQUISTAS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="color-palette-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>MUDAR TEMA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="information-circle-outline" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>SOBRE</Text>
        </TouchableOpacity>
      </View>

      {/* Versão */}
      <Text style={styles.version}>Versão : 03.10.25</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 40,
  },
  buttonsContainer: {
    width: "85%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#2a2a2a",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  version: {
    color: "#bbb",
    fontSize: 12,
    position: "absolute",
    bottom: 10,
  },
});
