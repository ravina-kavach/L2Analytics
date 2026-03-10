import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from '../../../../utils/common';
import CommonHeader from '../../../../components/CommonHeader';
const { width } = Dimensions.get('window');

const KeywordCloud = () => {
    const data = folderAnaylzeData?.data
    const wordData = data?.result?.word_cloud_data || [];
    const getColor = (value: number) => {

        if (value > 25) return "#6A329F";
        if (value > 15) return "#8E24AA";
        if (value > 8) return "#D81B60";
        return "#A349A4";
    };

    return (
        <CommonView>
            <CommonHeader title='Keyword Cloud' style={styles.header} />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.title}>Keyword Analysis Cloud</Text>

                    <View style={styles.cloudWrapper}>
                        {wordData.map((item: any, index: number) => {
                            const word = item.text;
                            const value = item.value;

                            return (
                                <Text
                                    key={index}
                                    style={[
                                        styles.word,
                                        {
                                            fontSize: 14 + (value * 0.8),
                                            color: getColor(value),
                                        }
                                    ]}
                                >
                                    {word}
                                </Text>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </CommonView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 130
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 30
    },
    card: {
        borderRadius: 20,
        minHeight: 400,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        color: "#4B0082",
        marginVertical: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    cloudWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    word: {
        marginHorizontal: 8,
        marginVertical: 4,
        fontWeight: "bold",
        textAlign: 'center',
    },
});

export default KeywordCloud;