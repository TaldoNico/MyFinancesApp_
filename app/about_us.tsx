// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function AboutUs() {
  const router = useRouter();

  // Animação
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Sobre Nós</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Card com animação */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >

        {/* LOGO (troque a imagem pelo seu logo depois) */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
          }}
          style={styles.logo}
        />

        <Text style={styles.cardTitle}>My Finances</Text>

        {/* TEXTO PROFISSIONAL */}
        <Text style={styles.description}>
          O My Finances nasceu com o objetivo de simplificar a organização
          financeira. Nosso propósito é ajudar pessoas a entenderem seus gastos,
          planejarem seu futuro e tomarem decisões mais conscientes por meio de
          uma experiência moderna e intuitiva.
        </Text>

        {/* Seção - Quem Somos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quem Somos?</Text>

          <Text style={styles.sectionText}>
            Somos a <Text style={{ color: "#0D9AFE", fontWeight: "600" }}>Unitech Studio</Text>,
            uma equipe dedicada ao desenvolvimento de soluções digitais simples,
            rápidas e eficientes.{"\n\n"}
            Nosso foco é criar aplicativos que realmente melhorem o dia a dia
            das pessoas, combinando tecnologia, design e funcionalidade.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Social Links */}
        <Text style={styles.subTitle}>Conecte-se conosco</Text>

        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL("https://www.instagram.com/unitechstudio.dev/")}
          >
            <Ionicons name="logo-instagram" size={30} color="#ffffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL("https://github.com/n1colin0")}
          >
            <Ionicons name="logo-github" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1e1e1e",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#292929",
    padding: 6,
    borderRadius: 10,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    minHeight: 550,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 40,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
    tintColor: "#0D9AFE",
  },

  cardTitle: {
    color: "#0D9AFE",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  description: {
    color: "#ddd",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },

  section: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 5,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },

  sectionText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },

  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "#444",
    marginVertical: 25,
  },

  subTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  linksContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 30,
  },

  linkButton: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 60,
    elevation: 4,
  },
});
