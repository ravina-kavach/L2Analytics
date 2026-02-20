import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BarChartCard from "../../components/charts/BarChartCard";
import CognitiveAnalysisCard from "../../components/charts/CognitiveAnalysisCard";
import { COLORS } from "../../theme/colors";
import { CommonView } from "../../utils/common";
import CommonIcon from "../../components/CommonIcon";

const Dashboard = () => {
  const navigation: any = useNavigation();
  return (
    <CommonView>
      <ScrollView style={styles.container} contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} >
        {/* Header */}
        <Text style={styles.hello}>Hello,</Text>
        <Text style={styles.name}>Keval Tilavat</Text>
        <Text style={styles.subtitle}>
          Here are your latest intelligence insights.
        </Text>

        <View style={styles.storageContainer}>
          <View>
            <Text style={styles.label}>STORAGE</Text>
            <Text style={styles.value}>
              {0.58} / {1.0} GB
            </Text>
          </View>

          {/* Right Side - Button */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Workspace")}>
            <CommonIcon type="Ionicons" name="folder-outline" size={16} color={COLORS.Orange} />
            <Text style={styles.buttonText}>Open Workspace</Text>
          </TouchableOpacity>
        </View>

        {/* Top Stats Cards */}
        <View style={styles.cardRow}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statTitle}>Analysis Score</Text>
              <Text style={styles.statValue}>94.2%</Text>
              <Text style={styles.statSub}>↑ 2.4% vs last week</Text>
            </View>
            <View>
              <CommonIcon type="Entypo" name="line-graph" size={18} color={COLORS.LightGreen} style={styles.icon} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statTitle}>Processing Vol</Text>
              <Text style={styles.statValue}>3 Docs</Text>
              <Text style={styles.statSub}>0.6 hrs saved</Text>
            </View>
            <View>
              <CommonIcon type="Ionicons" name="flash-outline" size={22} color={COLORS.Orange} style={styles.icon} />
            </View>
          </View>
        </View>

        <View style={[styles.cardRow, styles.secondCard]}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statTitle}>Critical Flags</Text>
              <Text style={styles.statValue}>3 Alerts</Text>
              <Text style={styles.statSub}>Legal compliance alerts</Text>
            </View>
            <View>
              <CommonIcon type="Feather" name="info" size={20} color={COLORS.Red} style={styles.icon} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statTitle}>Generate Report</Text>
              <Text style={styles.statValue}>Create PDF</Text>
            </View>
            <View>
              <CommonIcon type="FontAwesome" name="file-pdf-o" size={18} color={COLORS.Purple} style={styles.icon} />
            </View>
          </View>
        </View>
        <View style={styles.bigCard}>
          <CognitiveAnalysisCard />
        </View>
        {/* Sentiment Trends */}
        <View style={styles.bigCard}>
          <BarChartCard />
        </View>
      </ScrollView>
    </CommonView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  storageContainer: {
    backgroundColor: "#F6F7F9",
    padding: 16,
    marginBottom: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 8,
  },
  statContent: {
    flex: 1,
  },
  gradiantContainer: {
    flex: 1,
  },
  mainContainer: { paddingBottom: 100 },

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
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondCard: {
    marginBottom: 5,
  },
  statCard: {
    // flex: 1,
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // important
    marginBottom: 12,
    elevation: 2,
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

  label: {
    fontSize: 11,
    color: "#9CA3AF",
    letterSpacing: 1,
    fontWeight: "600",
  },
  value: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },
});
