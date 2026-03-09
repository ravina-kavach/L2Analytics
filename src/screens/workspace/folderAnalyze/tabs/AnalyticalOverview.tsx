import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS } from '../../../../theme/colors';

const TypewriterText = ({ text = "", speed = 20 }: any) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        setDisplayedText("");

        const interval = setInterval(() => {
            index++;
            setDisplayedText(text.slice(0, index));

            if (index >= text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text]);

    const parsed = useMemo(() => {
        const parts: any[] = [];
        const regex = /\*\*(.*?)\*\*/g;

        let lastIndex = 0;
        let match;

        while ((match = regex.exec(displayedText)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    text: displayedText.slice(lastIndex, match.index),
                    bold: false,
                });
            }

            parts.push({
                text: match[1],
                bold: true,
            });

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < displayedText.length) {
            parts.push({
                text: displayedText.slice(lastIndex),
                bold: false,
            });
        }

        return parts;
    }, [displayedText]);

    return (
        <Text style={styles.content}>
            {parsed.map((part, index) => (
                <Text
                    key={index}
                    style={part.bold ? styles.boldText : undefined}
                >
                    {part.text}
                </Text>
            ))}
        </Text>
    );
};

const AnalyticalOverview = ({ data }: any) => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Summary Overview</Text>

            <View style={styles.card}>
                <TypewriterText
                    text={data?.result?.auto_summary || ""}
                    speed={15}
                />
            </View>

            <View style={styles.statRow}>
                <StatBox label="Total Files" value={data?.result.structure?.total_files} />
                <StatBox label="Entities" value={data?.result.entities?.length} />
                <StatBox label="Keywords" value={data?.result.trends?.length} />
            </View>
        </ScrollView>
    )
}


const StatBox = ({ label, value }: any) => (
    <View style={styles.statBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 280,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#0F172A",
        marginBottom: 12
    },
    card: {
        padding: 15,
        borderRadius: 12,
    },
    content: {
        color: "#1E293B",
        lineHeight: 22,
        fontWeight: '500'
    },
    boldText: {
        fontWeight: "bold",
        color: "#020617",
    },
    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    statBox: {
        backgroundColor: "#1E293B",
        padding: 15,
        borderRadius: 12,
        width: "30%",
        alignItems: "center",
    },
    statValue: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontWeight: "bold"
    },
    statLabel: {
        color: COLORS.WHITE,
        marginTop: 5
    },
});

export default AnalyticalOverview;

