import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const LinkAnalysis = ({ data }: any) => {
    const hasData = data?.relationships && data?.relationships.length > 0;

    return (
        <View style={styles.container}>
            {hasData ? (
                <View style={styles.activeContent}>
                    <View style={styles.badge}>
                        <Icon name="link-variant" size={16} color="#6A329F" />
                        <Text style={styles.badgeText}>
                            Total Links: {data.relationships.length}
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <View style={styles.iconCircle}>
                        <Icon name="web" size={80} color="#D1D5DB" />
                    </View>

                    <Text style={styles.emptyTitle}>
                        No source intelligence data available.
                    </Text>

                    <Text style={styles.emptySubtitle}>
                        Ensure sources are linked and analysis is authorized.
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        margin: 10,
        minHeight: height * 0.6,
    },
    emptyContainer: {
        flex: 1,
        top: 140,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    iconCircle: {
        marginBottom: 20,
        opacity: 0.6,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#6B7280', // Muted gray
        textAlign: 'center',
        marginBottom: 10,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 20,
    },
    activeContent: {
        padding: 20,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3E8FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#6A329F',
        fontWeight: '700',
        fontSize: 14,
        marginLeft: 6,
    },
});

export default LinkAnalysis;