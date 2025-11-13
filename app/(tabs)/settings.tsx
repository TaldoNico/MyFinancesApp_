import { Ionicons } from "@expo/vector-icons";
// @ts-nocheck
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com Botão Voltar e Título */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Gráfico Pizza (placeholder) */}
      <View style={styles.chartContainer}>
        <Image
          source={require("@/assets/images/MYFINANCES-LOGO.png")}
          style={styles.pieChart}
          resizeMode="contain"
        />
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {/* Perfil */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="person-circle" size={20} color="#0095ff" />
            <Text style={styles.menuText}>PERFIL</Text>
          </View>
        </TouchableOpacity>

        {/* Minhas Metas */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="flag" size={20} color="#0095ff" />
            <Text style={styles.menuText}>MINHAS METAS</Text>
          </View>
        </TouchableOpacity>

        {/* Minhas Conquistas */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="trophy" size={20} color="#ffa500" />
            <Text style={styles.menuText}>MINHAS CONQUISTAS</Text>
          </View>
        </TouchableOpacity>

        {/* Mudar Tema */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="contrast" size={20} color="#0095ff" />
            <Text style={styles.menuText}>MUDAR TEMA</Text>
          </View>
        </TouchableOpacity>

        {/* Sobre */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="information-circle" size={20} color="#0095ff" />
            <Text style={styles.menuText}>SOBRE</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Versão */}
      <Text style={styles.version}>Versão • 03.10.25</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2b2b2b",
    paddingBottom: 40,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  pieChart: {
    width: 180,
    height: 150,
  },
  pieSection1: {
    position: "absolute",
    width: 150,
    height: 75,
    backgroundColor: "#22aa22",
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
  },
  pieSection2: {
    position: "absolute",
    width: 75,
    height: 150,
    backgroundColor: "#ffd700",
    borderTopRightRadius: 150,
  },
  pieSection3: {
    position: "absolute",
    width: 150,
    height: 75,
    backgroundColor: "#ff6b6b",
    bottom: 0,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  pieSection4: {
    position: "absolute",
    width: 75,
    height: 150,
    backgroundColor: "#0095ff",
    left: 0,
    borderTopLeftRadius: 150,
    borderBottomLeftRadius: 150,
  },
  menuContainer: {
    paddingHorizontal: 16,
    gap: 10,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  menuText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  version: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 30,
  },
});
