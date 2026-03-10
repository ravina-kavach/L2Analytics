import React from 'react'
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native'
import CommonIcon from '../../components/CommonIcon'
import { COLORS } from '../../theme/colors'
import useWorkspace from './WorkspaceController'
import CommonFileItem from '../../components/CommonFileItem'

const WorkspaceLinks = () => {
    const { searchQueryLinks, setSearchQueryLinks, filteredlinks, navigateToChat, handleFolderAnalyze } = useWorkspace()


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
        <View style={styles.flex}>
            <View style={styles.searchContainer}>
                <CommonIcon
                    type="Ionicons"
                    name="search-outline"
                    size={18}
                    color={COLORS.dark3}
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search Links..."
                    placeholderTextColor={COLORS.dark3}
                    style={styles.searchInput}
                    value={searchQueryLinks}
                    onChangeText={setSearchQueryLinks}
                />
            </View>
            <FlatList
                data={filteredlinks}
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

export default WorkspaceLinks