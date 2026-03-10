import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CommonView } from '../../../utils/common';
import CommonHeader from '../../../components/CommonHeader';
import { useFolderAnalyze } from './FolderAnalyzeController';
import CommonLoader from '../../../components/CommonLoader';
import folderAnaylzeData from '../../../utils/folderAnaylzeData.json'
// import { AnalyzeSummaryTabs } from '../../../navigation/AnalyzeSummaryTabs';
import { AnalyzeFileMenu } from '../../../navigation/AnalyzeFileMenu';

const FolderAnalyze = () => {
    const { loading, folderAnalyzeFileData, setSelectedTab } = useFolderAnalyze()
    // console.log("folderAnalyzeFileData=========>", JSON.stringify(folderAnalyzeFileData, null, 2))
    return (
        <CommonView>
            <View style={styles.container}>
                <CommonHeader
                    title={" Intelligence Analysis"}
                />
                <CommonLoader visible={loading} />

                {!loading && (
                    <AnalyzeFileMenu fileDetails={folderAnaylzeData.data} />
                )}
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