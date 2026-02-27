import React from 'react';
import { CommonView } from '../../utils/common';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import CommonIcon from '../../components/CommonIcon';
import useWorkspace from './WorkspaceController';
import { WorkspaceTabs } from '../../navigation/AppNavigator';


const Workspace = () => {
    const { goBack, isGridView, setIsGridView } = useWorkspace()
    console.log("isGridView===>", isGridView)
    return (
        <CommonView>
            <View style={styles.container}>
                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerSide}>
                        <TouchableOpacity onPress={goBack}>
                            <CommonIcon
                                type="Ionicons"
                                name="arrow-back-outline"
                                size={22}
                                color={COLORS.BLACK}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.headerTitle}>
                        Workspace
                    </Text>

                    <View
                        style={[
                            styles.headerSide,
                            {
                                flexDirection: "row",
                                justifyContent: "flex-end",
                            },
                        ]}
                    >
                        {/* <TouchableOpacity
                            onPress={() => setIsGridView(!isGridView)}
                            style={{ marginRight: 12 }}
                        >
                            <CommonIcon
                                type="Ionicons"
                                name={"grid-outline"}
                                size={22}
                                color={COLORS.Orange}
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <WorkspaceTabs />
            </View>
        </CommonView>
    );
}
export default Workspace

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 60,
        overflow: "visible",
        backgroundColor: "transparent",

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
});