import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Strings } from "../../utils/strings";
import { COLORS } from "../../theme/colors";

const screenWidth = Dimensions.get("window").width;


const BarChartCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {Strings.common.ActivityOverview}
      </Text>

      <BarChart
        data={{
          labels: ["Docs", "Reports", "Search"],
          datasets: [{ data: [20, 15, 30] }],
        }}
        width={screenWidth - 140}
        height={220}
        fromZero
        showValuesOnTopOfBars
        yAxisLabel=""
        yAxisSuffix=""
        withInnerLines={false}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          barPercentage: 0.6,

          // 🔥 Bar color
          fillShadowGradient: COLORS.Orange,
          fillShadowGradientOpacity: 1,

          // 🔥 Value text color on top
          color: (opacity = 1) =>
            `rgba(249, 115, 22, ${opacity})`,

          // Axis label color
          labelColor: () => "#374151",

          style: {
            borderRadius: 16,
          },

          propsForBackgroundLines: {
            strokeDasharray: "",
            stroke: "#E5E7EB",
          },

          propsForLabels: {
            fontSize: 14,
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
