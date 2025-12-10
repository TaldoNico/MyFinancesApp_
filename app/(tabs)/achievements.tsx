// app/(tabs)/achievements.tsx
// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStats } from "@/context/StatsContext";

/**
 * Hook que pega os números do contexto global
 */
function useUserStats() {
  const { stats } = useStats();
  return stats;
}

/**
 * Config das conquistas:
 * cada uma tem um "check" que recebe stats e devolve se foi concluída.
 */
const achievementsConfig = [
  // BÁSICAS
  {
    id: "primeiro_registro",
    icon: "trophy",
    color: "#f8c200",
    text: "Faça seu primeiro registro de despesas",
    check: (stats) => stats.totalRegistrosDespesas >= 1,
  },
  {
    id: "primeiro_relatorio_mensal",
    icon: "document-text",
    color: "#00c3ff",
    text: "Conclua seu primeiro relatório mensal",
    check: (stats) => stats.relatoriosMensaisConcluidos >= 1,
  },
  {
    id: "rendimento_positivo",
    icon: "trending-up",
    color: "#1fbf5b",
    text: "Tenha um rendimento positivo",
    check: (stats) => stats.saldoPositivoMes === true,
  },
  {
    id: "5_dias_sem_gastar",
    icon: "timer",
    color: "#ff884d",
    text: "Fique mais de 5 dias sem gastar com uma despesa",
    check: (stats) => stats.diasSemGastarDespesa > 5,
  },
  {
    id: "primeiro_relatorio_anual",
    icon: "calendar",
    color: "#bd73ff",
    text: "Conclua seu primeiro relatório anual",
    check: (stats) => stats.relatoriosAnuaisConcluidos >= 1,
  },
  {
    id: "deposito_200_casa",
    icon: "wallet",
    color: "#ffd84d",
    text: "Deposite 200R$ em despesas da casa",
    check: (stats) => stats.depositoCasa >= 200,
  },
  {
    id: "saldo_positivo_mes",
    icon: "checkmark-done",
    color: "#42ff9e",
    text: "Tenha um saldo positivo ao final do mês",
    check: (stats) => stats.saldoPositivoMes === true,
  },
  {
    id: "deposito_300_poupanca",
    icon: "cash",
    color: "#00d47c",
    text: "Deposite 300R$ em poupança",
    check: (stats) => stats.depositoPoupanca >= 300,
  },
  {
    id: "sem_gastos_cartao",
    icon: "card",
    color: "#ff5f5f",
    text: "Não tenha gastos no cartão de crédito",
    check: (stats) => stats.semGastosCartaoCredito === true,
  },
  {
    id: "2_dias_sem_lanches",
    icon: "fast-food",
    color: "#ffa97a",
    text: "Fique 2 dias sem gastar com a despesa (lanches)",
    check: (stats) => stats.diasSemLanches >= 2,
  },

  // NOVAS CONQUISTAS
  {
    id: "7_dias_acompanhando",
    icon: "stats-chart",
    color: "#4dd2ff",
    text: "Acompanhe suas despesas por 7 dias seguidos",
    check: (stats) => stats.diasAcompanhandoDespesas >= 7,
  },
  {
    id: "primeira_meta",
    icon: "rocket",
    color: "#ff7bf2",
    text: "Bata sua primeira meta financeira",
    check: (stats) => stats.metasFinanceirasBatidas >= 1,
  },
  {
    id: "500_poupanca",
    icon: "gift",
    color: "#ffcc00",
    text: "Guarde 500R$ na poupança",
    check: (stats) => stats.totalGuardadoPoupanca >= 500,
  },
  {
    id: "30_dias_sem_atrasar",
    icon: "shield-checkmark",
    color: "#48ff84",
    text: "Fique 30 dias sem atrasar contas",
    check: (stats) => stats.diasSemAtrasarContas >= 30,
  },
  {
    id: "grafico_mensal",
    icon: "pie-chart",
    color: "#8c7bff",
    text: "Monte seu primeiro gráfico mensal",
    check: (stats) => stats.montouGraficoMensal === true,
  },
  {
    id: "economizar_50_dia",
    icon: "cash-outline",
    color: "#4fffcb",
    text: "Economize 50R$ em um único dia",
    check: (stats) => stats.economizou50EmUmDia === true,
  },
  {
    id: "3_dias_sem_superfluos",
    icon: "leaf",
    color: "#66ff92",
    text: "Fique 3 dias sem gastos supérfluos",
    check: (stats) => stats.diasSemSupérfluos >= 3,
  },
  {
    id: "5_conquistas",
    icon: "star",
    color: "#ffd93b",
    text: "Complete 5 conquistas",
    check: (_stats, resolved) =>
      resolved.filter((a) => a.completed).length >= 5,
  },
  {
    id: "1000_total_economizado",
    icon: "diamond",
    color: "#82e8ff",
    text: "Economize mais de 1000R$ no total",
    check: (stats) => stats.totalEconomizado > 1000,
  },
  {
    id: "despesa_antes_9",
    icon: "alarm",
    color: "#ff8e7b",
    text: "Registre uma despesa antes das 9h",
    check: (stats) => stats.registrouDespesaAntesDas9 === true,
  },
  {
    id: "revisar_relatorio_mensal",
    icon: "analytics",
    color: "#00e2ff",
    text: "Revise seu relatório mensal completo",
    check: (stats) => stats.revisouRelatorioMensal === true,
  },
  {
    id: "comecar_mes_saldo_positivo",
    icon: "sunny",
    color: "#ffd966",
    text: "Comece um mês com saldo positivo",
    check: (stats) => stats.comecouMesComSaldoPositivo === true,
  },
  {
    id: "7_dias_sem_lanches",
    icon: "heart",
    color: "#ff7a7a",
    text: "Evite gastar com lanches por 7 dias",
    check: (stats) => stats.diasSemLanches >= 7,
  },
  {
    id: "fundo_emergencia",
    icon: "umbrella",
    color: "#a3b0ff",
    text: "Crie um fundo de emergência",
    check: (stats) => stats.criouFundoEmergencia === true,
  },
  {
    id: "educacao_financeira",
    icon: "library",
    color: "#caff7a",
    text: "Leia sobre educação financeira pela primeira vez",
    check: (stats) => stats.leuEducacaoFinanceira === true,
  },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const stats = useUserStats();

  const achievements = useMemo(() => {
    let resolved = achievementsConfig.map((ach) => ({
      ...ach,
      completed: ach.check(stats, []),
    }));

    resolved = resolved.map((ach) => {
      if (ach.id === "5_conquistas") {
        return {
          ...ach,
          completed: ach.check(stats, resolved),
        };
      }
      return ach;
    });

    return resolved;
  }, [stats]);

  const totalCompleted = achievements.filter((a) => a.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Minhas Conquistas</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Resumo */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {totalCompleted} / {achievements.length} conquistas concluídas
        </Text>
      </View>

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {achievements.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              item.completed && styles.cardCompleted,
            ]}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon} size={26} color={item.color} />
              {item.completed && (
                <View style={styles.badgeCheck}>
                  <Ionicons name="checkmark" size={14} color="#000" />
                </View>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardText}>{item.text}</Text>
              <Text style={styles.cardStatus}>
                {item.completed ? "Conquistado 🎉" : "Em progresso..."}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>Mostre mais</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginRight: 34,
  },
  summary: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  summaryText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    gap: 12,
    opacity: 0.7,
  },
  cardCompleted: {
    opacity: 1,
    borderWidth: 1,
    borderColor: "#42ff9e",
  },
  iconWrapper: {
    position: "relative",
  },
  badgeCheck: {
    position: "absolute",
    bottom: -4,
    right: -6,
    backgroundColor: "#42ff9e",
    borderRadius: 999,
    padding: 3,
  },
  cardText: {
    color: "#fff",
    fontSize: 15,
    flexShrink: 1,
  },
  cardStatus: {
    color: "#bbbbbb",
    fontSize: 12,
    marginTop: 4,
  },
  moreButton: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#1fbf5b",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
