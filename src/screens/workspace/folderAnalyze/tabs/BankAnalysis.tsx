import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import CommonIcon from '../../../../components/CommonIcon';
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from '../../../../utils/common';
import CommonHeader from '../../../../components/CommonHeader';

const { width } = Dimensions.get('window');

const BankAnalysis = () => {
    const data: any = folderAnaylzeData?.data
    const stats = {
        inflows: data?.total_inflows || "$0.00",
        outflows: data?.total_outflows || "$0.00",
        net: data?.net_cash_flow || "$0.00"
    };

    return (
        <CommonView>
            <CommonHeader title='Bank Analysis' style={styles.header} />
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.headerRow}>
                        <CommonIcon type='MaterialCommunityIcons' name="bank-outline" size={24} color="#6A329F" />
                        <Text style={styles.mainTitle}>Financial Intelligence</Text>
                    </View>
                    <Text style={styles.subTitle}>Extracted banking trends and entity summaries</Text>
                    <View style={styles.statsContainer}>
                        <StatCard
                            label="TOTAL INFLOWS"
                            value={stats.inflows}
                            icon="trending-up"
                            color="#10B981"
                        />
                        <StatCard
                            label="TOTAL OUTFLOWS"
                            value={stats.outflows}
                            icon="trending-down"
                            color="#EF4444"
                        />
                        <StatCard
                            label="NET CASH FLOW"
                            value={stats.net}
                            icon="chart-timeline-variant"
                            color="#6366F1"
                        />
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <CommonIcon type='MaterialCommunityIcons' name="chart-line" size={18} color="#6A329F" />
                            <Text style={styles.sectionTitle}>TRANSACTION TIMELINE</Text>
                        </View>
                        <View style={styles.placeholder}>
                            <CommonIcon type='MaterialCommunityIcons' name="information-outline" size={40} color="#D1D5DB" />
                            <Text style={styles.placeholderText}>Not enough data to map timeline</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </CommonView>
    );
};


const StatCard = ({ label, value, icon, color }: any) => (
    <View style={styles.statCard}>
        <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
            <CommonIcon type='MaterialCommunityIcons' name={icon} size={22} color={color} />
        </View>
        <View>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statValue, { color: color === '#10B981' ? '#10B981' : '#1F2937' }]}>
                {value}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingHorizontal: 20,
        paddingTop: 30
    },
    card: { borderRadius: 16, padding: 20 },
    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    mainTitle: { fontSize: 20, fontWeight: 'bold', color: '#4C1D95', marginLeft: 10 },
    subTitle: { fontSize: 12, color: '#8E24AA', marginBottom: 25 },
    statsContainer: { marginBottom: 20 },
    statCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginBottom: 10
    },
    iconBox: { padding: 10, borderRadius: 10, marginRight: 15 },
    statLabel: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
    statValue: { fontSize: 18, fontWeight: '800' },
    section: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 20 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#4C1D95', marginLeft: 8 },
    placeholder: { height: 150, justifyContent: 'center', alignItems: 'center' },
    placeholderText: { color: '#9CA3AF', fontSize: 12, marginTop: 10 }
});

export default BankAnalysis;