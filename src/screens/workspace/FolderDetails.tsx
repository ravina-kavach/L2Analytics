import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommonHeader from "../../components/CommonHeader";
import { CommonView } from "../../utils/common";
import useWorkspace from "./WorkspaceController";

const files = [
    {
        id: "1",
        name: "IR SUMIT BICHPADI.docx",
        size: "391.35 KB",
        type: "doc",
    },
    {
        id: "2",
        name: "Sumit Bichpari.pdf",
        size: "1.25 MB",
        type: "pdf",
    },
    {
        id: "3",
        name: "Sumit Bichpari.pdf",
        size: "59.31 KB",
        type: "pdf",
    },
];

const FolderDetails = () => {
    const { folder, filesData } = useWorkspace()
    const renderItem = ({ item }: any) => (
        <View style={styles.fileCard}>
            <View style={styles.fileLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={item.type === "pdf" ? "document-text" : "document"}
                        size={22}
                        color={item.type === "pdf" ? "#FF3B30" : "#4F46E5"}
                    />
                </View>

                <View>
                    <Text style={styles.fileName}>{item.name}</Text>
                    <Text style={styles.fileSize}>{item.size}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity>
                    <Ionicons name="eye-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                    <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>
        </View>
    );

    console.log("filesData====>", filesData)

    return (
        <CommonView>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <CommonHeader
                    title={folder.name}
                />
                {/* <View style={styles.header}>
                <Text style={styles.breadcrumb}>Folders › Legal & Confidentials</Text>

                <TouchableOpacity style={styles.analyzeBtn}>
                    <Ionicons name="sparkles-outline" size={16} color="#fff" />
                    <Text style={styles.analyzeText}>Analyze Folder</Text>
                </TouchableOpacity>
            </View> */}

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={18} color="#8E8E93" />
                    <TextInput
                        placeholder="Search in Legal & Confidentials..."
                        placeholderTextColor="#8E8E93"
                        style={styles.searchInput}
                    />
                </View>

                {/* Upload Card */}
                <TouchableOpacity style={styles.uploadCard} activeOpacity={0.8}>
                    <View style={styles.uploadIconBox}>
                        <Ionicons name="cloud-upload-outline" size={30} color="#F97316" />
                    </View>

                    <Text style={styles.uploadTitle}>Upload Documents</Text>
                    <Text style={styles.uploadSubtitle}>
                        Tap to upload PDF, DOCX or JPG files
                    </Text>

                    <View style={styles.fileTypes}>
                        <Text style={styles.badge}>PDF</Text>
                        <Text style={styles.badge}>DOCX</Text>
                        <Text style={styles.badge}>JPG</Text>
                    </View>
                </TouchableOpacity>

                {/* Folder Content */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Folder Content</Text>
                    <Text style={styles.itemCount}>{files.length} items</Text>
                </View>

                <FlatList
                    data={files}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />

                {/* Pagination */}
                <View style={styles.pagination}>
                    <Text style={styles.pageText}>Page 1 of 1</Text>
                </View>
            </ScrollView>
        </CommonView>
    );
};

export default FolderDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#F9FAFB",
        paddingHorizontal: 16,
        marginTop: 60,
    },

    header: {
        marginBottom: 16,
    },

    breadcrumb: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 10,
    },

    analyzeBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#111827",
        alignSelf: "flex-start",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    analyzeText: {
        color: "#fff",
        marginLeft: 6,
        fontWeight: "600",
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#111",
    },

    uploadCard: {
        backgroundColor: "#FFF7ED",
        borderWidth: 1,
        borderColor: "#FDBA74",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        marginBottom: 24,
    },

    uploadIconBox: {
        backgroundColor: "#FFEAD5",
        padding: 18,
        borderRadius: 16,
        marginBottom: 12,
    },

    uploadTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },

    uploadSubtitle: {
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 12,
    },

    fileTypes: {
        flexDirection: "row",
    },

    badge: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
        marginHorizontal: 4,
        color: "#F97316",
        fontWeight: "600",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
    },

    itemCount: {
        fontSize: 13,
        color: "#F97316",
    },

    fileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginBottom: 10,
    },

    fileLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        backgroundColor: "#F3F4F6",
        padding: 10,
        borderRadius: 10,
        marginRight: 12,
    },

    fileName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },

    fileSize: {
        fontSize: 12,
        color: "#6B7280",
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
    },

    pagination: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    },

    pageText: {
        color: "#6B7280",
        fontSize: 13,
    },
});