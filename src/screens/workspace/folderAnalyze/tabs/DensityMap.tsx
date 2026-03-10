import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from '../../../../utils/common';
import CommonHeader from '../../../../components/CommonHeader';
import { useAppSelector } from '../../../../store/hooks';

const { width } = Dimensions.get('window');

const DensityMap = () => {
     const { fileAnalyzeWithTabData } = useAppSelector(
            (state) => state.common
        );
        // const data: any = fileAnalyzeWithTabData?.data
    const data = folderAnaylzeData?.data
    const rawData = data?.result?.insight_density_map || [];
    const categories = ['General Activity', 'People & Entities', 'Locations', 'Metrics & Data'];

    const getHeatColor = (value: number) => {
        if (value === 0) return '#FEE2E2';
        if (value < 5) return '#FCA5A5';
        if (value < 10) return '#F87171';
        if (value < 15) return '#E11D48';
        return '#4C1D95';
    };

    return (
        <CommonView>
            <CommonHeader title='Density Map' style={styles.header} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.chartTitle}>Insight Density Heatmap</Text>

                    <View style={styles.heatmapWrapper}>
                        <View>
                            {rawData.map((doc: any, rowIndex: number) => (
                                <View key={rowIndex} style={styles.row}>
                                    <Text style={styles.yLabel}>{doc.source}</Text>
                                    <View style={styles.cellRow}>
                                        {categories.map((cat, colIndex) => {
                                            const value = doc[cat] || 0;
                                            return (
                                                <View
                                                    key={colIndex}
                                                    style={[styles.cell, { backgroundColor: getHeatColor(value) }]}
                                                >
                                                    <Text style={[
                                                        styles.cellText,
                                                        { color: value > 12 ? '#FFFFFF' : '#4C1D95' }
                                                    ]}>
                                                        {value}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.xAxis}>
                            {categories.map((cat, index) => (
                                <View key={index} style={styles.xLabelWrapper}>
                                    <Text style={styles.xLabel}>{cat}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </CommonView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 20
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4C1D95',
        textAlign: 'center',
        marginBottom: 30,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50
    },
    heatmapWrapper: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    yLabel: {
        fontSize: 12,
        color: '#6366F1',
        fontWeight: '600',
        textAlign: 'right',
        marginRight: 10,
    },
    cellRow: {
        flexDirection: 'row',
    },
    cell: {
        width: 70,
        height: 70,
        borderRadius: 6,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    xAxis: {
        flexDirection: 'row',
        marginLeft: 110,
        marginTop: 10,
    },
    xLabelWrapper: {
        width: 78,
        alignItems: 'center',
    },
    xLabel: {
        fontSize: 10,
        color: '#6366F1',
        fontWeight: '600',
        textAlign: 'center',
        transform: [{ rotate: '45deg' }],
        marginTop: 15,
    },
});

export default DensityMap;