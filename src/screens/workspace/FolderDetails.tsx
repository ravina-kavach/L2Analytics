import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommonHeader from "../../components/CommonHeader";
import { CommonView } from "../../utils/common";
import useWorkspace from "./WorkspaceController";
import CommonDocumentViewer from "../../components/CommonDocumentViewer";
import UploadDocsModal from "../../components/UploadDocsModal";
import CommonFileItem from "../../components/CommonFileItem";

const FolderDetails = () => {
    const {
        folder,
        formattedItems,
        addDocsModalVisible,
        setAddDocsModalVisible,
        pickDocument,
        selectedFile,
        relatedDoc,
        setRelatedDoc,
        uploadDocument,
        handleFolderAnalyze,
        searchQuery,
        setSearchQuery,
        navigateToChat,
        showDoc,
        setShowDoc,
        selectedDoc,
        setSelectedDoc
    } = useWorkspace()


    const renderItem = ({ item }: any) => {
        return (
            <CommonFileItem
                item={item}
                onAnalyze={handleFolderAnalyze}
                onPreview={(item) => console.log("Preview", item)}
                onChat={navigateToChat}
            />
        );
    };

    return (
        <CommonView>
            <View style={styles.container}>
                {/* Header */}
                <CommonHeader
                    title={folder.name}
                />
                {/* Search */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={18} color="#8E8E93" />
                    <TextInput
                        placeholder="Search Documents..."
                        placeholderTextColor="#8E8E93"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Upload Card */}
                <TouchableOpacity style={styles.uploadCard} activeOpacity={0.8} onPress={() => pickDocument()}>
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
                    <Text style={styles.itemCount}>
                        {formattedItems.length} items
                    </Text>
                </View>

                <FlatList
                    data={formattedItems}
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />

                {/* Pagination */}
                {/* <View style={styles.pagination}>
                    <Text style={styles.pageText}>Page 1 of 1</Text>
                </View> */}
            </View>
            {addDocsModalVisible && <UploadDocsModal visible={addDocsModalVisible} relatedDoc={relatedDoc} setRelatedDoc={setRelatedDoc} selectedFile={selectedFile} onClose={() => setAddDocsModalVisible(false)} onConfirm={() => uploadDocument()} />}
            {showDoc && <CommonDocumentViewer url={selectedDoc} />}
        </CommonView >
    );
};

export default FolderDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 60,
    },

    header: {
        marginBottom: 16,
    },
    contentContainer: { paddingBottom: 30 },

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
        width: "75%",
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
});