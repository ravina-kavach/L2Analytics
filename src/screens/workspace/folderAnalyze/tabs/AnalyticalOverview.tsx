import React from 'react'
import { View, Text, ScrollView, StyleSheet } from "react-native";
const AnalyticalOverview = ({ data }: any) => {
    return (

        <ScrollView style={styles.container}>
            <Text style={styles.title}>Summary Overview</Text>

            <View style={styles.card}>
                <Text style={styles.content}>
                    {data?.result?.auto_summary}
                </Text>
            </View>

            <View style={styles.statRow}>
                <StatBox label="Total Files" value={data?.structure?.total_files} />
                <StatBox label="Entities" value={data?.entities?.length} />
                <StatBox label="Keywords" value={data?.trends?.length} />
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
    container: { flex: 1, backgroundColor: "#0F172A", padding: 16 },
    title: { fontSize: 18, color: "#fff", marginBottom: 12 },
    card: {
        backgroundColor: "#1E293B",
        padding: 15,
        borderRadius: 12,
    },
    content: { color: "#E2E8F0", lineHeight: 20 },
    statRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
    statBox: {
        backgroundColor: "#1E293B",
        padding: 15,
        borderRadius: 12,
        width: "30%",
        alignItems: "center",
    },
    statValue: { color: "#00D4FF", fontSize: 18, fontWeight: "bold" },
    statLabel: { color: "#94A3B8", marginTop: 5 },
});
export default AnalyticalOverview