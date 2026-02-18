import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { COLORS } from "../../theme/colors";

const screenWidth = Dimensions.get("window").width;

const CognitiveAnalysisCard = () => {
    const data = {
        labels: [],
        data: [0.75, 0.6, 0.7, 0.65, 0.55, 0.68],
    };

    const metrics = [
        { label: "Positivity", value: 75 },
        { label: "Clarity", value: 60 },
        { label: "Concise", value: 70 },
        { label: "Action", value: 65 },
        { label: "Compliance", value: 55 },
        { label: "Tone", value: 68 },
    ];

    return (
        <View style={styles.bigCard}>
            <Text style={styles.cardHeading}>Cognitive Analysis</Text>

            <ProgressChart
                data={data}
                width={screenWidth - 80}
                height={200}
                strokeWidth={12}
                radius={32}
                hideLegend={true}
                chartConfig={{
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                        `rgba(249, 115, 22, ${opacity})`,
                }}
                style={styles.chart}
            />

            {/* ✅ Custom Short Legend */}
            <View style={styles.legendContainer}>
                {metrics.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={styles.dot} />
                        <Text style={styles.legendText}>
                            {item.label} ({item.value}%)
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CognitiveAnalysisCard;

const styles = StyleSheet.create({
    bigCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        elevation: 3,
    },
    cardHeading: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 15,
        color: "#111827",
    },
    chart: {
        alignSelf: "center",
    },
    legendContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 10,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        margin: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.Orange,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
        color: "#6B7280",
    },
});
