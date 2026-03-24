import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from "../../../../utils/common";
import CommonHeader from "../../../../components/CommonHeader";
import { useAppSelector } from "../../../../store/hooks";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 55) / 2;

export default function TopEntities() {
    const { fileAnalyzeWithTabData, loading } = useAppSelector(
        (state) => state.common
    );
    // const data: any = fileAnalyzeWithTabData?.data
    const data: any = folderAnaylzeData?.data
    return (
        <CommonView>
            <CommonHeader title='Top Entities' style={styles.mainHeader} />
            {!loading && (
                <View style={styles.container}>
                    <FlatList
                        data={data?.result?.entities}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                {/* Top Row */}
                                <View style={styles.topRow}>
                                    <View style={styles.iconCircle}>
                                        <Text style={styles.iconText}>#</Text>
                                    </View>

                                    <View style={styles.percentWrapper}>
                                        <Text style={styles.percentText}>
                                            {item.confidence || 99}%
                                        </Text>
                                        <View style={styles.progressBackground}>
                                            <View
                                                style={[
                                                    styles.progressFill,
                                                    { width: `${item.confidence || 99}%` },
                                                ]}
                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Title */}
                                <Text style={styles.title} numberOfLines={2}>
                                    {item.id}
                                </Text>

                                {/* Subtitle */}
                                <Text style={styles.subtitle}>
                                    {item.type || "DATA POINT"}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </CommonView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

    card: {
        width: CARD_WIDTH,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
    },

    mainHeader: {
        paddingHorizontal: 20,
        paddingTop: 50
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    iconText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#64748B",
    },

    percentWrapper: {
        alignItems: "flex-end",
    },

    percentText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#64748B",
        marginBottom: 4,
    },

    progressBackground: {
        width: 60,
        height: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 4,
    },

    progressFill: {
        height: 4,
        backgroundColor: "#22C55E",
        borderRadius: 4,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0F172A",
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 11,
        fontWeight: "500",
        color: "#94A3B8",
        letterSpacing: 1,
    },
});