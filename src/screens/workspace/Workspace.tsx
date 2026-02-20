import React, { useState } from "react";
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
            subtitle: "Created by Deepak Prajapati",
            files: 3,
            date: "09/12/2026",
        },
    ]);

    const [folderName, setFolderName] = useState("");
    const [description, setDescription] = useState("");

    // ✅ Create Folder
    const handleCreateFolder = () => {
        if (!folderName.trim()) {
            Alert.alert("Error", "Folder name is required");
            return;
        }

        const newFolder: FolderType = {
            id: Date.now().toString(),
            name: folderName,
            subtitle: description || "No description",
            files: 0,
            date: new Date().toLocaleDateString(),
        };

        setFolders((prev) => [newFolder, ...prev]);

        setFolderName("");
        setDescription("");
    };

    // ✅ Delete Folder
    const handleDeleteFolder = (id: string) => {
        Alert.alert("Delete Folder", "Are you sure you want to delete?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setFolders((prev) =>
                        prev.filter((folder) => folder.id !== id)
                    );
                },
            },
        ]);
    };

    const renderFolder = ({ item }: { item: FolderType }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.folderIcon}>
                <Ionicons name="folder-outline" size={26} color={COLORS.Orange} />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.folderTitle}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.fileCount}>{item.files} Files</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => handleDeleteFolder(item.id)}>
                <Ionicons
                    name="trash-outline"
                    size={20}
                    color={COLORS.Orange}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <CommonView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Ionicons
                                name="arrow-back-outline"
                                size={22}
                                color={COLORS.BLACK}
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Workspace</Text>
                    </View>

                    <Ionicons
                        name="grid-outline"
                        size={22}
                        color={COLORS.Orange}
                    />
                </View>

                {/* Create Folder Section */}
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
                        <Text style={styles.createButtonText}>
                            + Create
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Folder List */}
                <FlatList
                    data={folders}
                    renderItem={renderFolder}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </CommonView>
    );
};

export default Workspace;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 60,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        marginRight: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.BLACK,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 12,
        borderRadius: 12,
        height: 45,
        marginBottom: 15,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: "#000",
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
        elevation: 2,
    },
    folderIcon: {
        marginRight: 12,
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