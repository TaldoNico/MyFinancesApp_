// Arquivo: app/(tabs)/goals.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../services/firebase";

type Goal = {
  titulo: string;
  // outros campos (valorMeta, prazo, etc.) podem estar aqui também
  [key: string]: any;
};

// gera a chave de storage de acordo com o usuário logado
const getGoalsStorageKey = () => {
  const user = auth.currentUser;
  if (!user) {
    return "goals_guest"; // se não tiver usuário (só por segurança)
  }
  return `goals_${user.uid}`;
};

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]); // índices selecionados

  // Carregar metas sempre que abrir a tela
  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, [])
  );

  const loadGoals = async () => {
    try {
      const storageKey = getGoalsStorageKey();
      const saved = await AsyncStorage.getItem(storageKey);

      if (saved) {
        setGoals(JSON.parse(saved));
      } else {
        setGoals([]);
      }

      setSelectedGoals([]); // limpa seleção ao entrar
    } catch (err) {
      console.log("Erro ao carregar metas:", err);
    }
  };

  // Marca / desmarca uma meta
  const toggleSelectGoal = (index: number) => {
    setSelectedGoals((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  // Excluir metas selecionadas
  const handleDeleteSelected = () => {
    if (selectedGoals.length === 0) {
      Alert.alert("Nenhuma meta selecionada", "Selecione uma meta para excluir.");
      return;
    }

    Alert.alert(
      "Excluir meta(s)",
      "Tem certeza que deseja excluir a(s) meta(s) selecionada(s)?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const newGoals = goals.filter(
                (_, index) => !selectedGoals.includes(index)
              );

              setGoals(newGoals);
              setSelectedGoals([]);

              const storageKey = getGoalsStorageKey();
              await AsyncStorage.setItem(storageKey, JSON.stringify(newGoals));
            } catch (err) {
              console.log("Erro ao excluir metas:", err);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      {/* Header com título e lixeira */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Minhas Metas</Text>

        <TouchableOpacity onPress={handleDeleteSelected}>
          <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Card para adicionar nova meta */}
        <Link href="/newgoals" asChild>
          <TouchableOpacity style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </Link>

        {/* Lista de metas */}
        {goals.map((goal, index) => {
          const isSelected = selectedGoals.includes(index);

          return (
            <View key={index} style={styles.goalCard}>
              {/* Quadradinho de seleção no cantinho */}
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}
                onPress={() => toggleSelectGoal(index)}
              >
                {isSelected && <View style={styles.checkboxDot} />}
              </TouchableOpacity>

              <Text style={styles.goalText}>{goal.titulo}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  addButtonContainer: {
    width: 110,
    height: 110,
    backgroundColor: "#2F2F2F",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },

  addButtonText: {
    fontSize: 55,
    color: "#FFFFFF",
    marginTop: -4,
  },

  goalCard: {
    width: 110,
    height: 110,
    backgroundColor: "#3A3A3A",
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
  },

  goalText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  checkbox: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  checkboxSelected: {
    borderColor: "#4CAF50",
  },

  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
});
