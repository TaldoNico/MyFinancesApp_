// app/modal.tsx
// @ts-nocheck
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useStats } from "@/context/StatsContext";

export default function ModalScreen() {
  const router = useRouter();
  const { stats, updateStats } = useStats();

  // campos só para dar sensação de "registro de despesa"
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  function handleSaveExpense() {
    // 👉 aqui entraria sua lógica REAL de salvar a despesa
    // (em contexto, AsyncStorage, Firestore, etc.)
    // por enquanto só vamos focar na conquista

    // Atualiza o contador de registros de despesas
    updateStats({
      totalRegistrosDespesas: stats.totalRegistrosDespesas + 1,
    });

    // Volta para a tela anterior
    router.back();
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Registrar despesa
      </ThemedText>

      <ThemedText style={styles.label}>Descrição</ThemedText>
      <TextInput
        placeholder="Ex: Mercado, Conta de luz..."
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <ThemedText style={styles.label}>Valor (R$)</ThemedText>
      <TextInput
        placeholder="Ex: 120.50"
        placeholderTextColor="#888"
        keyboardType="decimal-pad"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveExpense}>
        <ThemedText type="link" style={styles.saveText}>
          Salvar despesa
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <ThemedText style={styles.cancelText}>Cancelar</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: "#1fbf5b",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
