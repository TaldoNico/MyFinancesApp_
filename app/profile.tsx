// app/profile.tsx
// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { auth, db } from "../services/firebase";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [savingName, setSavingName] = useState(false);

  // pega usuário logado e carrega o perfil do Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const email = user.email ?? "";
        setUserEmail(email);

        const fallbackName =
          email && email.includes("@") ? email.split("@")[0] : "Usuário";

        try {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data();
            setDisplayName(data.displayName || fallbackName);
          } else {
            setDisplayName(fallbackName);
          }
        } catch (err) {
          console.log("Erro ao carregar perfil:", err);
          setDisplayName(fallbackName);
        }
      } else {
        router.replace("/");
      }
    });

    return unsub;
  }, []);

  async function handleSaveName() {
    if (!userId || !userEmail) {
      Alert.alert("Erro", "Usuário não encontrado.");
      return;
    }

    if (!displayName.trim()) {
      Alert.alert("Atenção", "Digite um nome/apelido.");
      return;
    }

    try {
      setSavingName(true);
      const userRef = doc(db, "users", userId);

      await setDoc(
        userRef,
        {
          displayName: displayName.trim(),
          email: userEmail,
        },
        { merge: true }
      );

      Alert.alert("Sucesso", "Nome atualizado com sucesso!");
    } catch (err) {
      console.log("Erro ao salvar nome:", err);
      Alert.alert("Erro", "Não foi possível salvar o nome.");
    } finally {
      setSavingName(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível encerrar a sessão.");
    }
  }

  // agora só envia e-mail de redefinição, sem campos de nova senha
  async function handleResetPassword() {
    if (!userEmail) {
      Alert.alert("Atenção", "E-mail não identificado.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, userEmail);
      Alert.alert(
        "Redefinição de senha",
        "Enviamos um e-mail para você redefinir sua senha."
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro",
        "Não foi possível enviar o e-mail de redefinição. Tente novamente."
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Botão voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>Meu Perfil</Text>

        {/* Avatar */}
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={80} color="#ffffffcc" />
        </View>

        {/* Nome / Apelido */}
        <Text style={styles.label}>Nome / Apelido</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Seu nome"
          placeholderTextColor="#aaa"
        />

        {/* Botão salvar nome */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSaveName}
          disabled={savingName}
        >
          <Text style={styles.primaryButtonText}>
            {savingName ? "Salvando..." : "Salvar nome"}
          </Text>
        </TouchableOpacity>

        {/* Email */}
        <Text style={styles.label}>Email </Text>
        <TextInput
          style={styles.input}
          value={userEmail}
          editable={false}
          placeholder="Email do usuário"
          placeholderTextColor="#aaa"
        />

        {/* Botão Redefinir Senha */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.secondaryButtonText}>Redefinir Senha</Text>
        </TouchableOpacity>

        {/* Botão Encerrar Sessão */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>ENCERRAR SESSÃO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  card: {
    backgroundColor: "#2b2b2b",
    borderRadius: 24,
    padding: 24,
    width: "90%",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#00000055",
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  avatarCircle: {
    marginTop: 32,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#3b3b3b",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 24,
  },
  input: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginTop: 5,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#22aa22",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#444",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 24,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#b22222",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
