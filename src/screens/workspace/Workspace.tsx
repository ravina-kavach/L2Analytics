import React from 'react';
import { CommonView } from '../../utils/common';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import { WorkspaceTabs } from '../../navigation/AppNavigator';
import CommonHeader from '../../components/CommonHeader';


const Workspace = () => {
    return (
        <CommonView>
            <View style={styles.container}>
                {/* HEADER */}
                <CommonHeader
                    title={"Workspace"}
                />
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
});