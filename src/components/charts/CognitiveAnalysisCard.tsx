import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Polygon, Line, Text as SvgText } from "react-native-svg";
import { COLORS } from "../../theme/colors";

const SIZE = 250;
const CENTER = SIZE / 2;
const RADIUS = 100;

const labels = [
    "Positivity",
    "Clarity",
    "Conciseness",
    "Actionability",
    "Compliance",
    "Tone",
];

const values = [80, 65, 55, 60, 70, 50];

const getPoints = (data: any) => {
    return data
        .map((value: any, i: any) => {
            const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
            const r = (value / 100) * RADIUS;
            const x = CENTER + r * Math.cos(angle);
            const y = CENTER + r * Math.sin(angle);
            return `${x},${y}`;
        })
        .join(" ");
};

const getAxisPoints = () => {
    return labels.map((_, i) => {
        const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
        const x = CENTER + RADIUS * Math.cos(angle);
        const y = CENTER + RADIUS * Math.sin(angle);
        return { x, y };
    });
};

const CognitiveAnalysisCard = () => {
    const polygonPoints = getPoints(values);
    const axisPoints = getAxisPoints();

    return (
        <View>
            <Text style={styles.cardHeading}>Cognitive Analysis</Text>
            <View style={styles.container}>
                <Svg width={SIZE} height={SIZE}>
                    {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
                        const points = labels
                            .map((_, index) => {
                                const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
                                const r = RADIUS * scale;
                                const x = CENTER + r * Math.cos(angle);
                                const y = CENTER + r * Math.sin(angle);
                                return `${x},${y}`;
                            })
                            .join(" ");

                        return (
                            <Polygon
                                key={i}
                                points={points}
                                fill="none"
                                stroke="#e0e0e0"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {axisPoints.map((point, index) => (
                        <Line
                            key={index}
                            x1={CENTER}
                            y1={CENTER}
                            x2={point.x}
                            y2={point.y}
                            stroke="#e0e0e0"
                            strokeWidth="1"
                        />
                    ))}

                    <Polygon
                        points={polygonPoints}
                        fill="rgba(255,122,0,0.35)"
                        stroke="#ff7a00"
                        strokeWidth="2"
                    />

                    {axisPoints.map((point, index) => (
                        <SvgText
                            key={index}
                            x={point.x}
                            y={point.y}
                            fontSize="12"
                            fill={COLORS.dark2}
                            textAnchor="middle"
                            alignmentBaseline='middle'
                        >
                            {labels[index]}
                        </SvgText>
                    ))}
                </Svg>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    cardHeading: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CognitiveAnalysisCard;
