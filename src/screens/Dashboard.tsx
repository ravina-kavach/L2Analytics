import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BarChartCard from "../components/charts/BarChartCard";
import CognitiveAnalysisCard from "../components/charts/CognitiveAnalysisCard";
import { COLORS } from "../theme/colors";

const Dashboard = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <Text style={styles.hello}>Hello,</Text>
      <Text style={styles.name}>Keval Tilavat</Text>
      <Text style={styles.subtitle}>
        Here are your latest intelligence insights.
      </Text>

      {/* Top Stats Cards */}
      <View style={styles.cardRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Analysis Score</Text>
          <Text style={styles.statValue}>94.2%</Text>
          <Text style={styles.statSub}>↑ 2.4% vs last week</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Processing Vol</Text>
          <Text style={styles.statValue}>3 Docs</Text>
          <Text style={styles.statSub}>0.6 hrs saved</Text>
        </View>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Critical Flags</Text>
          <Text style={styles.statValue}>3 Alerts</Text>
          <Text style={styles.statSub}>Legal compliance alerts</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Generate Report</Text>
          <Text style={styles.statValue}>Create PDF</Text>
        </View>
      </View>
      <View style={styles.bigCard}>
        <Text style={styles.cardHeading}>Cognitive Analysis</Text>
        <CognitiveAnalysisCard />
      </View>
      {/* Sentiment Trends */}
      <View style={styles.bigCard}>
        <Text style={styles.cardHeading}>Sentiment Trends (7 Days)</Text>
        <BarChartCard />
      </View>

    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 20,
  },

  hello: {
    fontSize: 16,
    marginTop: 60,
    color: "#555",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.Orange,
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 20,
    color: "#777",
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },

  statTitle: {
    fontSize: 13,
    color: "#777",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  statSub: {
    fontSize: 12,
    color: COLORS.Orange,
    marginTop: 5,
  },

  bigCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  cardHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
