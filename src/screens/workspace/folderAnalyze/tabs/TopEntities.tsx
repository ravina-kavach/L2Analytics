import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function TopEntities({ data }: any) {
    return (
        <View style={styles.container}>
            <FlatList
                data={data?.entities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.entityCard}>
                        <Text style={styles.entityText}>{item.id}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0F172A", padding: 16 },
    entityCard: {
        backgroundColor: "#1E293B",
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
    },
    entityText: { color: "#E2E8F0" },
});