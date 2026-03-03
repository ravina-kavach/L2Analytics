import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SemanticGraph({ data }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Semantic Graph</Text>

            <View style={styles.graphContainer}>
                <Text style={{ color: "#94A3B8" }}>
                    Render data.semantic_graph.nodes here using graph library
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0F172A", padding: 16 },
    title: { fontSize: 18, color: "#fff", marginBottom: 12 },
    graphContainer: {
        flex: 1,
        backgroundColor: "#1E293B",
        borderRadius: 16,
    },
});