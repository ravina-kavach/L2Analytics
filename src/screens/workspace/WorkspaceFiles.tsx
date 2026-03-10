import React from 'react'
import { View, StyleSheet, TextInput, FlatList } from 'react-native'
import CommonIcon from '../../components/CommonIcon'
import { COLORS } from '../../theme/colors'
import useWorkspace from './WorkspaceController'
import CommonFileItem from '../../components/CommonFileItem'

const WorkspaceFiles = () => {
    const { searchQueryFiles, setSearchQueryFiles, filteredfiles, navigateToChat, handleFolderAnalyze } = useWorkspace()


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
                data={filteredfiles}
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
    containContainer: { paddingTop: 30, paddingBottom: 50 },

});

export default WorkspaceFiles