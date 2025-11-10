import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [reports, setReports] = useState([
    { id: "1", name: "Seu Relatorio", color: "#333" },
    { id: "2", name: "Seu Relatorio", color: "#333" },
    { id: "3", name: "Seu Relatorio", color: "#333" },
    { id: "4", name: "Seu Relatorio", color: "#333" },
  ]);
  const [editModal, setEditModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#333");

  const colors = [
    "#333",
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
    "#E91E63",
    "#FF9800",
    "#F44336",
    "#00BCD4",
    "#8BC34A",
  ];

  const toggleView = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const openEdit = (report) => {
    setSelectedReport(report);
    setNewName(report.name);
    setNewColor(report.color);
    setEditModal(true);
  };

  const saveEdit = () => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id
          ? { ...r, name: newName || r.name, color: newColor }
          : r
      )
    );
    setEditModal(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.reportBox,
        {
          backgroundColor: item.color,
          width: viewMode === "grid" ? "47%" : "100%",
          height: viewMode === "grid" ? 120 : 60,
          flexDirection: viewMode === "grid" ? "column" : "row",
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={styles.reportText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEdit(item)}
      >
        <Ionicons name="pencil" size={22} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={toggleView}>
          <Ionicons
            name={viewMode === "grid" ? "list-outline" : "grid-outline"}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === "grid" ? 2 : 1}
        key={viewMode}
        contentContainerStyle={styles.list}
        columnWrapperStyle={
          viewMode === "grid" ? { justifyContent: "space-between" } : null
        }
      />

      {/* Botão flutuante */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal de Edição */}
      <Modal visible={editModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Relatório</Text>
            <TextInput
              style={styles.input}
              placeholder="Novo nome"
              placeholderTextColor="#aaa"
              value={newName}
              onChangeText={setNewName}
            />

            <Text style={styles.colorLabel}>Selecione uma cor:</Text>
            <View style={styles.colorPalette}>
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor: c,
                      borderWidth: newColor === c ? 3 : 1,
                      borderColor: newColor === c ? "#fff" : "#555",
                    },
                  ]}
                  onPress={() => setNewColor(c)}
                />
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#4caf50" }]}
                onPress={saveEdit}
              >
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#e53935" }]}
                onPress={() => setEditModal(false)}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  reportBox: {
    borderRadius: 12,
    marginVertical: 8,
    justifyContent: "space-between",
    padding: 12,
  },
  reportText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  editButton: {
    alignSelf: "flex-end",
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#2196F3",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    width: "80%",
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    color: "#fff",
    padding: 10,
    marginBottom: 15,
  },
  colorLabel: {
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  colorPalette: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
