import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { COLORS } from "../theme/colors";
import CommonIcon from "../components/CommonIcon";
import { CommonView } from "../utils/common";
import { useNavigation } from "@react-navigation/native";
import { useFolderAnalyze } from "../screens/workspace/folderAnalyze/FolderAnalyzeController";

interface Props {
    fileDetails: any;
}

export const AnalyzeFileMenu: React.FC<Props> = ({ fileDetails }) => {
    const Navigation: any = useNavigation();
    const { handleFileAnalyze } = useFolderAnalyze()
    const ANALYZE_TABS = [
        { name: "Analytical Overview", iconName: "grid-outline", type: "overview" },
        { name: "Mind Map", iconName: "git-network-outline", type: "mindmap" },
        { name: "Semantic Graph", iconName: "share-social-outline", type: "semantic" },
        { name: "Top Entities", iconName: "trophy-outline", type: "entities" },
        { name: "Link Analysis", iconName: "link-outline", type: "link_analysis" },
        { name: "Keyword Cloud", iconName: "cloud-outline", type: "wordcloud" },
        { name: "Density Map", iconName: "map-outline", type: "densitymap" },
        { name: "Bank Analysis", iconName: "business-outline", type: "bank_analysis" },
    ];

    const onTabPress = (item: any) => {
        handleFileAnalyze(item.type)
        Navigation.navigate(item.name);
    };

    const FileHeader = ({ file }: any) => {
        const getIcon = () => {
            if (file?.isLink) return "link-outline";

            switch (file?.type) {
                case "pdf":
                    return "document-text-outline";
                case "docx":
                    return "document-outline";
                default:
                    return "document-outline";
            }
        };

        return (
            <View style={styles.fileCard}>
                {/* ICON + INFO */}
                <View style={styles.fileRow}>
                    <View style={styles.fileIcon}>
                        <CommonIcon
                            type="Ionicons"
                            name={getIcon()}
                            size={26}
                            color={COLORS.Orange}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={styles.fileName}>
                            {file?.name}
                        </Text>

                        <Text style={styles.fileMeta}>
                            {file?.type?.toUpperCase()}  • {file?.size}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.card}
                onPress={() => onTabPress(item)}
            >
                <View style={styles.iconContainer}>
                    <CommonIcon
                        type="Ionicons"
                        name={item.iconName}
                        size={25}
                        color={COLORS.Orange}
                    />
                </View>

                <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FileHeader file={fileDetails} />
            <FlatList
                data={ANALYZE_TABS}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        paddingVertical: 10,
    },

    card: {
        flex: 1,
        margin: 8,
        height: 120,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 4,
    },

    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: COLORS.LightOrange,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    label: {
        fontSize: 12.5,
        textAlign: "center",
        color: "#374151",
        fontWeight: "500",
        paddingHorizontal: 6,
    },

    fileCard: {
        backgroundColor: "#FFF",
        borderRadius: 18,
        padding: 16,
        margin: 10,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },

    fileRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    fileIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: COLORS.LightOrange,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    fileName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },

    fileMeta: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
});