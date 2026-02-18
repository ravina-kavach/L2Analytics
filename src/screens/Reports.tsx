import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonView } from "../utils/common";

const Reports = () => {
    return (
        <CommonView>
            <ScrollView style={styles.container} contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.smallTitle}>AI INTELLIGENCE CORE</Text>
                    <Text style={styles.title}>
                        Generate <Text style={styles.highlight}>Insights</Text>
                    </Text>
                </View>

                {/* Configuration Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configuration</Text>
                    <Text style={styles.sectionSubtitle}>
                        Setup your analysis parameters
                    </Text>
                </View>

                {/* Parameters Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="settings-outline" size={20} color="#FF6B00" />
                        <Text style={styles.cardTitle}> Parameters</Text>
                    </View>

                    {/* Target Entity */}
                    <Text style={styles.label}>Target Entity</Text>
                    <TextInput
                        placeholder="Type a company, topic, or keyword..."
                        placeholderTextColor="#999"
                        style={styles.input}
                    />

                    {/* Output Format */}
                    <Text style={styles.label}>Output Format</Text>
                    <View style={styles.dropdown}>
                        <Text style={{ color: "#333" }}>Executive Report</Text>
                        <Ionicons name="chevron-down-outline" size={18} color="#555" />
                    </View>

                    {/* Generate Button */}
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="flash-outline" size={18} color="#fff" />
                        <Text style={styles.buttonText}> Generate Report</Text>
                    </TouchableOpacity>
                </View>

                {/* Live Console */}
                <View style={styles.consoleCard}>
                    <Text style={styles.consoleTitle}>Live Console</Text>

                    <Text style={styles.consoleText}>
                        ✓ Revenue Growth: +12%
                    </Text>
                    <Text style={styles.consoleText}>
                        ✓ Customer Retention: 85%
                    </Text>
                    <Text style={styles.consoleText}>
                        ✓ Net Profit Margin: 18%
                    </Text>

                    <Text style={styles.suggestionTitle}>AI Suggestions</Text>
                    <Text style={styles.consoleText}>• Improve marketing ROI</Text>
                    <Text style={styles.consoleText}>• Reduce operational cost</Text>
                    <Text style={styles.consoleText}>• Expand to new segments</Text>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.emptyBox}>
                        <Ionicons name="document-text-outline" size={40} color="#ccc" />
                        <Text style={{ color: "#aaa", marginTop: 10 }}>
                            No reports yet.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </CommonView>
    );
};

export default Reports;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    gradiantContainer: {
        flex: 1,
    },

    mainContainer: { paddingBottom: 100 },


    header: {
        marginTop: 40,
    },

    smallTitle: {
        fontSize: 12,
        color: "#999",
        letterSpacing: 1,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 5,
    },

    highlight: {
        color: "#FF6B00",
    },

    section: {
        marginTop: 25,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
    },

    sectionSubtitle: {
        fontSize: 13,
        color: "#777",
        marginTop: 4,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginTop: 15,
        elevation: 3,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },

    label: {
        fontSize: 13,
        fontWeight: "500",
        marginTop: 10,
        marginBottom: 6,
        color: "#555",
    },

    input: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        backgroundColor: "#FAFAFA",
    },

    dropdown: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
    },

    button: {
        backgroundColor: "#0F172A",
        marginTop: 20,
        padding: 14,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    consoleCard: {
        backgroundColor: "#111827",
        borderRadius: 14,
        padding: 16,
        marginTop: 25,
    },

    consoleTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    consoleText: {
        color: "#D1D5DB",
        fontSize: 13,
        marginBottom: 5,
    },

    suggestionTitle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 6,
    },

    emptyBox: {
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 2,
    },
});
