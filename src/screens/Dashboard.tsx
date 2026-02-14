import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BarChartCard from "../components/charts/BarChartCard";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>
      <BarChartCard />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:"#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 40, marginBottom: 20 },
});
