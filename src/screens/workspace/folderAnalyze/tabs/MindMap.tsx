import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MindMap({ data }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mind Map View</Text>

            <View style={styles.graphBox}>
                <Text style={{ color: "#94A3B8" }}>
                    Integrate react-native-svg for dynamic node graph
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0F172A", padding: 16 },
    title: { fontSize: 18, color: "#fff", marginBottom: 12 },
    graphBox: {
        flex: 1,
        backgroundColor: "#1E293B",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
});