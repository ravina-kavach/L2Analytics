import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import CommonIcon from '../../components/CommonIcon'
import { COLORS } from '../../theme/colors'
import useWorkspace from './WorkspaceController'

const WorkspaceFiles = () => {
    const { searchQueryFiles, setSearchQueryFiles, } = useWorkspace()
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
});

export default WorkspaceFiles