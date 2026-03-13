import React, { useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Animated,
} from "react-native";
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from "../../../../utils/common";
import CommonHeader from "../../../../components/CommonHeader";
import { useAppSelector } from "../../../../store/hooks";


const { width, height } = Dimensions.get("window");

export default function SemanticGraph() {
    const { fileAnalyzeWithTabData } = useAppSelector(
        (state) => state.common
    );
    const data: any = fileAnalyzeWithTabData?.data
    // const data: any = folderAnaylzeData?.data
    const scale = useRef(new Animated.Value(1)).current;


    const nodes = useMemo(() => {
        const list = data?.semantic_graph?.nodes || new Array(60).fill(0);

        return list.map((_: any, i: number) => ({
            id: i,
            x: Math.random() * (width * 1.5),
            y: Math.random() * (height * 1.2),
            label: "node",
        }));
    }, [data]);

    return (
        <CommonView>
            <CommonHeader title='Semantic Graph' style={styles.mainHeader} />
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Document Semantic Relationship Graph
                        </Text>
                        <Text style={styles.subtitle}>
                            Interactive force-directed graph showing document connections.
                        </Text>
                    </View>

                    {/* BADGE */}
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            • {nodes.length} Nodes   • 0 Links
                        </Text>
                    </View>
                    {/* GRAPH AREA */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        directionalLockEnabled={false}
                        nestedScrollEnabled
                        contentContainerStyle={{
                            width: width * 1.8,
                            height: height * 1.4,
                            paddingVertical: 30,
                        }}
                    >
                        <Animated.View style={{ transform: [{ scale }] }}>
                            {nodes.map((node: any) => (
                                <View
                                    key={node.id}
                                    style={[
                                        styles.node,
                                        { left: node.x, top: node.y },
                                    ]}
                                >
                                    <Text style={styles.nodeText}>{node.label}</Text>
                                </View>
                            ))}
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>
        </CommonView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, },
    card: { flex: 1, borderRadius: 18, overflow: "hidden" },
    mainHeader: {
        paddingHorizontal: 20,
        paddingTop: 50
    },
    header: { padding: 14, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
    title: { fontSize: 15, fontWeight: "600", color: "#7C3AED" },
    subtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
    badge: {
        position: "absolute",
        top: 70,
        left: 14,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    badgeText: { color: "#7C3AED", fontSize: 12, fontWeight: "600" },
    graphContainer: { flex: 1 },
    node: {
        position: "absolute",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#C4B5FD",
        backgroundColor: "#F5F3FF",
    },
    nodeText: { fontSize: 10, color: "#8B5CF6" },
    controls: {
        position: "absolute",
        bottom: 14,
        left: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 4,
    },
    controlBtn: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    controlText: { fontSize: 16, color: "#334155", textAlign: "center" },
});