import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import CommonIcon from "./CommonIcon";
import { COLORS } from "../theme/colors";

interface Props {
    item: any;
    onAnalyze?: (item: any) => void;
    onPreview?: (item: any) => void;
    onChat?: (item: any) => void;
}

const CommonFileItem: React.FC<Props> = ({
    item,
    onAnalyze,
    onPreview,
    onChat,
}) => {
    const getIcon = () => {
        if (item?.isLink) return "link-outline";
        if (item?.type === "pdf") return "document-text";
        return "document";
    };

    const getColor = () => {
        if (item?.isLink) return "#10B981";
        if (item?.type === "pdf") return "#FF3B30";
        return "#4F46E5";
    };

    return (
        <View style={styles.fileCard}>
            {/* LEFT SIDE */}
            <View style={styles.fileLeft}>
                <View style={styles.iconContainer}>
                    <CommonIcon
                        type="Ionicons"
                        name={getIcon()}
                        size={22}
                        color={getColor()}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.fileName} numberOfLines={2}>
                        {item?.name}
                    </Text>
                    <Text style={styles.fileSize}>{item?.size}</Text>
                </View>
            </View>

            {/* ACTIONS */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onAnalyze?.(item)}>
                    <CommonIcon
                        type="Ionicons"
                        name="sparkles-outline"
                        size={16}
                        color="#7C3AED"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionSpacing}
                    onPress={() => item?.isLink ? Linking.openURL(item.url) : onPreview?.(item)}
                >
                    {item?.isLink ?
                        <CommonIcon
                            type="Feather"
                            name={"external-link"}
                            size={20}
                            color={COLORS.LightBlue}
                        />
                        : <CommonIcon
                            type="Ionicons"
                            name={"eye-outline"}
                            size={20}
                            color={COLORS.LightBlue}
                        />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionSpacing, styles.actionTopSpacing]}
                    onPress={() => onChat?.(item)}
                >
                    <CommonIcon
                        type="Ionicons"
                        name="chatbox-outline"
                        size={20}
                        color={COLORS.darkGreen}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default CommonFileItem;

const styles = StyleSheet.create({
    fileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 12,
    },

    fileLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    iconContainer: {
        marginRight: 12,
    },

    textContainer: {
        flex: 1,
        maxWidth: 160,
    },

    fileName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },

    fileSize: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
    },

    actionSpacing: {
        marginLeft: 16,
    },
    actionTopSpacing: {
        marginTop: 3,
    },

});