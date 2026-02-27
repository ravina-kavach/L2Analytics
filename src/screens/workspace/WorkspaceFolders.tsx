import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../theme/colors";
import useWorkspace from "./WorkspaceController";
import CommonIcon from "../../components/CommonIcon";
import KeyboardAvoidWrapper from '../../components/KeyboardAvoidWrapper';

const WorkspaceFolders = () => {
    const {
        folderName,
        setFolderName,
        openMenuId,
        setOpenMenuId,
        description,
        setDescription,
        isGridView,
        setIsGridView,
        selectedFolderId,
        setSelectedFolderId,
        goBack,
        handleCreateFolder,
        handleDeleteFolder,
        searchQuery,
        setSearchQuery,
        filteredFolders
    } = useWorkspace();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => setIsModalVisible(true);

    const closeModal = () => {
        setIsModalVisible(false);
        setFolderName("");
        setDescription("");
    };

    const onCreateFolder = () => {
        handleCreateFolder();
        closeModal();
    };

    /* ===========================
        RENDER FOLDER ITEM
    =========================== */

    const renderFolder = useCallback(
        ({ item }: { item: any }) => {
            const isSelected = selectedFolderId === item._id;

            const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "";

            return (
                <TouchableWithoutFeedback onPress={() => setOpenMenuId(null)}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[
                            styles.folderCard,
                            isGridView && { width: "48%" },
                            // isSelected && styles.selectedFolderCard,
                        ]}
                        onPress={() =>
                            setSelectedFolderId((prev) =>
                                prev === item._id ? null : item._id
                            )
                        }
                    >
                        {/* 3 DOT MENU */}
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={(e) => {
                                e.stopPropagation();
                                setOpenMenuId((prev) =>
                                    prev === item._id ? null : item._id
                                );
                            }}
                        >
                            <CommonIcon
                                type="Ionicons"
                                name="ellipsis-vertical"
                                size={18}
                                color="#FF7A00"
                            />
                        </TouchableOpacity>

                        <View style={styles.iconWrapper}>
                            <CommonIcon
                                type="Ionicons"
                                name="folder-outline"
                                size={22}
                                color="#FF7A00"
                            />
                        </View>

                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.folderTitle} numberOfLines={1}>
                                {item.name}
                            </Text>

                            <Text style={styles.subtitle} numberOfLines={1}>
                                {item.desc || "Secure files"}
                            </Text>

                            <View style={styles.createdRow}>
                                <CommonIcon
                                    type="Ionicons"
                                    name="person-outline"
                                    size={14}
                                    color="#8E8E93"
                                />
                                <Text style={styles.createdText}>
                                    {" "}Created by {item.createdBy || "Admin"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.bottomRow}>
                            <Text style={styles.fileCount}>
                                {item.files ?? 0} Items
                            </Text>
                            <Text style={styles.date}>{formattedDate}</Text>
                        </View>

                        {/* POPUP MENU */}
                        {openMenuId === item._id && (
                            <View style={styles.popupMenu}>
                                <TouchableOpacity style={styles.menuItem}>
                                    <CommonIcon
                                        type="Ionicons"
                                        name="sparkles-outline"
                                        size={16}
                                        color="#7C3AED"
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            { color: "#7C3AED" },
                                        ]}
                                    >
                                        Analyze
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem}>
                                    <CommonIcon
                                        type="Ionicons"
                                        name="chatbubble-outline"
                                        size={16}
                                        color="#2563EB"
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            { color: "#2563EB" },
                                        ]}
                                    >
                                        Chat
                                    </Text>
                                </TouchableOpacity>

                                {/* DELETE */}
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        handleDeleteFolder(item._id);
                                        setOpenMenuId(null);
                                        setSelectedFolderId(null);
                                    }}
                                >
                                    <CommonIcon
                                        type="Ionicons"
                                        name="trash-outline"
                                        size={16}
                                        color="#EF4444"
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            { color: "#EF4444" },
                                        ]}
                                    >
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                </TouchableWithoutFeedback>
            );
        },
        [
            selectedFolderId,
            isGridView,
            openMenuId,
            handleDeleteFolder,
            setOpenMenuId,
            setSelectedFolderId,
        ]
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.Transparent }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    if (openMenuId) {
                        setOpenMenuId(null);
                    }
                }}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        {/* SEARCH BAR */}
                        <View style={styles.topRow}>
                            <View style={styles.searchContainer}>
                                <CommonIcon
                                    type="Ionicons"
                                    name="search-outline"
                                    size={18}
                                    color="#8E8E93"
                                    style={styles.searchIcon}
                                />
                                <TextInput
                                    placeholder="Search folders..."
                                    placeholderTextColor="#8E8E93"
                                    style={styles.searchInput}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={() => setIsGridView(!isGridView)}
                                style={styles.gridButton}
                                activeOpacity={0.7}
                            >
                                <CommonIcon
                                    type="Ionicons"
                                    name={isGridView ? "list-outline" : "grid-outline"}
                                    size={20}
                                    color={COLORS.Orange}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* FOLDER LIST */}
                        <FlatList
                            key={isGridView ? "grid" : "list"}
                            data={filteredFolders}
                            renderItem={renderFolder}
                            keyExtractor={(item, index) =>
                                item?._id
                                    ? item._id
                                    : index.toString()
                            }
                            numColumns={isGridView ? 2 : 1}
                            columnWrapperStyle={
                                isGridView
                                    ? { justifyContent: "space-between" }
                                    : undefined
                            }
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 120,
                            }}
                        />

                        {/* CREATE FOLDER MODAL */}
                        <Modal
                            visible={isModalVisible}
                            animationType="slide"
                            transparent
                            onRequestClose={closeModal}
                        >
                            <KeyboardAvoidWrapper>
                                <View style={styles.modalOverlay}>
                                    <TouchableWithoutFeedback
                                        onPress={closeModal}
                                    >
                                        <View style={{ flex: 1 }} />
                                    </TouchableWithoutFeedback>

                                    <View style={styles.modalContainer}>
                                        <Text style={styles.modalTitle}>
                                            Create New Folder
                                        </Text>

                                        <TextInput
                                            placeholder="Folder Name"
                                            placeholderTextColor={COLORS.dark3}
                                            style={styles.input}
                                            value={folderName}
                                            onChangeText={setFolderName}
                                        />

                                        <TextInput
                                            placeholder="Description (Optional)"
                                            placeholderTextColor={COLORS.dark3}
                                            style={styles.input}
                                            value={description}
                                            onChangeText={setDescription}
                                        />

                                        <View style={styles.modalButtonRow}>
                                            <TouchableOpacity
                                                style={styles.cancelButton}
                                                onPress={closeModal}
                                            >
                                                <Text style={styles.cancelText}>
                                                    Cancel
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.createButton}
                                                onPress={onCreateFolder}
                                            >
                                                <Text
                                                    style={
                                                        styles.createButtonText
                                                    }
                                                >
                                                    Create
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidWrapper>
                        </Modal>
                    </View>

                    {/* FLOATING ADD BUTTON */}
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: 40,
                            right: 0,
                        }}
                        onPress={openModal}
                    >
                        <CommonIcon
                            type="Ionicons"
                            name="add-circle"
                            size={60}
                            color={COLORS.Orange}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default WorkspaceFolders;

/* ===========================
        STYLES
=========================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "visible",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
    },

    headerSide: {
        width: 80,
    },

    headerTitle: {
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.BLACK,
    },
    headerCenter: {
        flex: 1,
        alignItems: "center",
    },

    folderCard: {
        backgroundColor: "#F9F6F2",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        overflow: "visible",
        width: "100%", // add this
    },

    selectedFolderCard: {
        borderWidth: 1.5,
        borderColor: "#FF7A00",
    },

    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#FFF1E6",
        justifyContent: "center",
        alignItems: "center",
    },

    menuButton: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#FFE9D6",
        justifyContent: "center",
        alignItems: "center",
    },

    folderTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1C1C1E",
    },

    subtitle: {
        fontSize: 13,
        color: "#8E8E93",
        marginTop: 4,
    },

    createdRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    createdText: {
        fontSize: 12,
        color: "#8E8E93",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
    },

    fileCount: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
    },

    date: {
        fontSize: 12,
        color: "#9CA3AF",
    },

    /* ================= MODAL ================= */

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        padding: 20,
    },

    modalContainer: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
        color: "#000",
    },

    input: {
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 42,
        marginBottom: 12,
        color: "#000",
    },

    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    cancelText: {
        color: "#6B7280",
        fontWeight: "600",
    },

    createButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    createButtonText: {
        color: "#FFF",
        fontWeight: "600",
    },
    popupMenu: {
        position: "absolute",
        top: 50,
        right: 10,
        backgroundColor: "#FFF",
        borderRadius: 14,
        paddingVertical: 8,
        width: 150,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 999,
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 14,
    },

    menuText: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "600",
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F2F7",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },

    searchIcon: {
        marginRight: 6,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: "#000",
        paddingVertical: 0,
    },

    gridButton: {
        marginLeft: 12,
        height: 44,
        width: 44,
        borderRadius: 12,
        backgroundColor: "#F2F2F7",
        justifyContent: "center",
        alignItems: "center",
    },
});