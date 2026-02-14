import React from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const BarChartCard = () => {
  return (
    <View>
      <BarChart
        data={{
          labels: ["Docs", "Reports", "Search"],
          datasets: [{ data: [20, 15, 30] }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => `rgba(0, 0, 255, 0.8)`,
        }}
      />
    </View>
  );
};

export default BarChartCard;
