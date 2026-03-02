import React from 'react'
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native'
import CommonIcon from '../../components/CommonIcon'
import { COLORS } from '../../theme/colors'
import useWorkspace from './WorkspaceController'

const WorkspaceFiles = () => {
    const { searchQueryFiles, setSearchQueryFiles, formattedMyFiles } = useWorkspace()


    const renderItem = ({ item }: any) => {
        const getIcon = () => {
            if (item.isLink) return "link-outline";
            if (item.type === "pdf") return "document-text";
            return "document";
        };

        const getColor = () => {
            if (item.isLink) return "#10B981";
            if (item.type === "pdf") return "#FF3B30";
            return "#4F46E5";
        };

        return (
            <View style={styles.fileCard}>
                <View style={styles.fileLeft}>
                    <View style={styles.iconContainer}>
                        <CommonIcon
                            type='Ionicons'
                            name={getIcon()}
                            size={22}
                            color={getColor()}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.fileName} numberOfLines={2}>
                            {item.name}
                        </Text>
                        <Text style={styles.fileSize}>{item.size}</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity>
                        <CommonIcon type='Ionicons' name="eye-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginLeft: 16 }}>
                        <CommonIcon type='Ionicons' name="chatbubble-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.flex}>
            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
                <CommonIcon
                    type="Ionicons"
                    name="search-outline"
                    size={18}
                    color={COLORS.dark3}
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search Files..."
                    placeholderTextColor={COLORS.dark3}
                    style={styles.searchInput}
                    value={searchQueryFiles}
                    onChangeText={setSearchQueryFiles}
                />
            </View>
            <FlatList
                data={formattedMyFiles}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.containContainer}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
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
    fileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginBottom: 10,
    },
    containContainer: { paddingTop: 30, paddingBottom: 50 },

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

export default WorkspaceFiles