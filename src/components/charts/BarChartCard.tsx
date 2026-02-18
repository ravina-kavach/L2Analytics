import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";
import { COLORS } from "../../theme/colors";

const WIDTH = 320;
const HEIGHT = 220;
const BAR_WIDTH = 22;
const MAX_VALUE = 100;

const data = [
  { day: "Mon", positive: 40, neutral: 25, negative: 35 },
  { day: "Tue", positive: 30, neutral: 20, negative: 20 },
  { day: "Wed", positive: 25, neutral: 30, negative: 45 },
  { day: "Thu", positive: 28, neutral: 25, negative: 37 },
  { day: "Fri", positive: 24, neutral: 28, negative: 38 },
  { day: "Sat", positive: 26, neutral: 30, negative: 34 },
  { day: "Sun", positive: 35, neutral: 22, negative: 43 },
];

const BarChartCard = () => {
  const spacing = WIDTH / data.length;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>📈 Sentiment Trends (7 Days)</Text>

        <View style={styles.legendRow}>
          <Legend color="#34D399" label="Positive" />
          <Legend color="#D1D5DB" label="Neutral" />
          <Legend color="#FB7185" label="Negative" />
        </View>
      </View>
      <View style={styles.card}>
        <Svg width={WIDTH} height={HEIGHT}>
          {data.map((item, index) => {
            const spacing = WIDTH / data.length;
            const x = spacing * index + spacing / 4 - BAR_WIDTH / 4;

            const positiveHeight = (item.positive / MAX_VALUE) * 140;
            const neutralHeight = (item.neutral / MAX_VALUE) * 140;
            const negativeHeight = (item.negative / MAX_VALUE) * 140;

            const baseY = 160;

            return (
              <React.Fragment key={index}>
                {/* Positive */}
                <Rect
                  x={x}
                  y={baseY - positiveHeight}
                  width={BAR_WIDTH}
                  height={positiveHeight}
                  fill="#34D399"
                />

                {/* Neutral */}
                <Rect
                  x={x}
                  y={baseY - positiveHeight - neutralHeight}
                  width={BAR_WIDTH}
                  height={neutralHeight}
                  fill="#D1D5DB"
                />

                {/* Negative */}
                <Rect
                  x={x}
                  y={baseY - positiveHeight - neutralHeight - negativeHeight}
                  width={BAR_WIDTH}
                  height={negativeHeight}
                  fill="#FB7185"
                />

                <SvgText
                  x={x + BAR_WIDTH / 2}
                  y={190}
                  fontSize="12"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  {item.day}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const Legend = ({ color, label }: any) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    borderRadius: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: "row",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#374151",
  },
  dayLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
});

export default BarChartCard;
