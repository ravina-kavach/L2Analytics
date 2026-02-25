import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonView } from "../../utils/common";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../../theme/colors";

type FolderType = {
    id: string;
    name: string;
    subtitle?: string;
    files: number;
    date: string;
};

const Workspace = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [folders, setFolders] = useState<FolderType[]>([
        {
            id: "1",
            name: "Legal Files",
            subtitle: "Created by Keval Tilavat",
            files: 3,
            date: "09/12/2026",
        },
    ]);

    const [folderName, setFolderName] = useState("");
    const [description, setDescription] = useState("");
    const [isGridView, setIsGridView] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

    const isSelectionMode = selectedFolderId !== null;

    /* ===========================
          CREATE FOLDER
    =========================== */
    const handleCreateFolder = () => {
        if (!folderName.trim()) {
            Alert.alert("Error", "Folder name is required");
            return;
        }

        const newFolder: FolderType = {
            id: Date.now().toString(),
            name: folderName.trim(),
            subtitle: description.trim() || "No description",
            files: 0,
            date: new Date().toLocaleDateString(),
        };

        setFolders((prev) => [newFolder, ...prev]);
        setFolderName("");
        setDescription("");
    };

    /* ===========================
          DELETE FOLDER
    =========================== */
    const handleDeleteFolder = (id: string) => {
        if (!id) return;

        Alert.alert("Delete Folder", "Are you sure you want to delete?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setFolders((prev) => prev.filter((folder) => folder.id !== id));
                    setSelectedFolderId(null);
                },
            },
        ]);
    };

    /* ===========================
          RENDER ITEM
    =========================== */
    const renderFolder = useCallback(
        ({ item }: { item: FolderType }) => {
            const isSelected = selectedFolderId === item.id;

            return (
                <TouchableOpacity
                    style={[
                        isGridView ? styles.gridCard : styles.card,
                        isSelected && styles.selectedCard,
                    ]}
                    activeOpacity={0.8}
                    delayLongPress={300}
                    onLongPress={() => {
                        if (!item?.id) return;
                        setSelectedFolderId(prev => (prev === item.id ? null : item.id));
                    }}

                    onPress={() => {
                        setSelectedFolderId(prev => {
                            if (prev !== null) {
                                return null; // exit selection mode safely
                            }

                            // navigation.navigate("FolderDetails", { id: item.id });
                            return prev;
                        });
                    }}
                >
                    <Ionicons
                        name="folder"
                        size={isGridView ? 34 : 26}
                        color={COLORS.Orange}
                        style={{ marginBottom: isGridView ? 10 : 0 }}
                    />

                    <View
                        style={{
                            flex: 1,
                            paddingLeft: isGridView ? 0 : 15,
                            alignItems: isGridView ? "center" : "flex-start",
                        }}
                    >
                        <Text style={styles.folderTitle} numberOfLines={1}>
                            {item.name}
                        </Text>

                        {!isGridView && (
                            <>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>
                                <View style={styles.bottomRow}>
                                    <Text style={styles.fileCount}>{item.files} Files</Text>
                                    <Text style={styles.date}>{item.date}</Text>
                                </View>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            );
        },
        [isGridView, selectedFolderId, isSelectionMode]
    );

    return (
        <CommonView>
            <View style={styles.container}>
                {/* ================= HEADER ================= */}
                <View style={styles.header}>
                    <View style={styles.headerSide}>
                        {isSelectionMode ? (
                            <TouchableOpacity onPress={() => setSelectedFolderId(null)}>
                                <Ionicons name="close-outline" size={26} color={COLORS.BLACK} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons
                                    name="arrow-back-outline"
                                    size={22}
                                    color={COLORS.BLACK}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>
                            {isSelectionMode ? "1 Selected" : "Workspace"}
                        </Text>
                    </View>

                    <View style={styles.headerSide}>
                        {isSelectionMode ? (
                            <TouchableOpacity
                                onPress={() => {
                                    if (selectedFolderId !== null) {
                                        handleDeleteFolder(selectedFolderId);
                                    }
                                }}
                            >
                                <Ionicons name="trash-outline" size={24} color="red" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setIsGridView((prev) => !prev)}
                            >
                                <Ionicons
                                    name={isGridView ? "list-outline" : "grid-outline"}
                                    size={22}
                                    color={COLORS.Orange}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* ================= CREATE SECTION ================= */}
                {!isSelectionMode && (
                    <View style={styles.createSection}>
                        <TextInput
                            placeholder="New Folder Name"
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

                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={handleCreateFolder}
                        >
                            <Text style={styles.createButtonText}>+ Create</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* ================= FOLDER LIST ================= */}
                <FlatList
                    key={isGridView ? "grid" : "list"}   // ✅ REQUIRED FOR numColumns CHANGE
                    data={folders}
                    renderItem={renderFolder}
                    keyExtractor={(item, index) =>
                        item?.id ? item.id : index.toString()
                    }
                    numColumns={isGridView ? 2 : 1}
                    columnWrapperStyle={
                        isGridView ? { justifyContent: "space-between" } : undefined
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    removeClippedSubviews={false}
                />
            </View>
        </CommonView>
    );
};

export default Workspace;

/* ===========================
        STYLES
=========================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 60,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    headerSide: {
        width: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    headerCenter: {
        flex: 1,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.BLACK,
    },
    createSection: {
        backgroundColor: COLORS.WHITE,
        padding: 14,
        borderRadius: 14,
        marginBottom: 18,
        elevation: 2,
    },
    input: {
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 42,
        marginBottom: 10,
        color: "#000",
    },
    createButton: {
        backgroundColor: "#FF7A00",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    createButtonText: {
        color: "#FFF",
        fontWeight: "600",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        // elevation: 2,
    },
    gridCard: {
        width: "48%",
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginBottom: 12,
        // elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: COLORS.Orange,
    },
    folderTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1E1E1E",
    },
    subtitle: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
        width: "100%",
    },
    fileCount: {
        fontSize: 12,
        color: "#555",
    },
    date: {
        fontSize: 11,
        color: "#999",
    },
});