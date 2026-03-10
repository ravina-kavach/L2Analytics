import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CommonView } from '../../../utils/common';
import CommonHeader from '../../../components/CommonHeader';
import { useFolderAnalyze } from './FolderAnalyzeController';
// import { AnalyzeSummaryTabs } from '../../../navigation/AnalyzeSummaryTabs';
import { AnalyzeFileMenu } from '../../../navigation/AnalyzeFileMenu';

const FolderAnalyze = () => {
    const { folderItem } = useFolderAnalyze()
    return (
        <CommonView>
            <View style={styles.container}>
                <CommonHeader
                    title={" Intelligence Analysis"}
                />
                <AnalyzeFileMenu fileDetails={folderItem} />

            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 60,
        overflow: "visible",
        backgroundColor: "transparent",

    },
});

export default FolderAnalyze