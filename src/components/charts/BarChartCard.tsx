import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const BarChartCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Activity Overview</Text>

      <BarChart
        data={{
          labels: ["Docs", "Reports", "Search"],
          datasets: [{ data: [20, 15, 30] }],
        }}
        width={screenWidth - 100}
        height={220}
        fromZero
        showValuesOnTopOfBars
        withInnerLines={false}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          barPercentage: 0.6,
          fillShadowGradient: "#4F46E5",
          fillShadowGradientOpacity: 1,
          color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeDasharray: "",
            stroke: "#E5E7EB",
          },
          propsForLabels: {
            fontSize: 12,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

export default BarChartCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 20,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Android shadow
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#111827",
  },
  chart: {
    borderRadius: 16,
  },
});
