import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from "react-native";
import { CommonView } from "../../utils/common";
import CommonIcon from "../../components/CommonIcon";
import { COLORS } from "../../theme/colors";
import useWorkspace from "../workspace/WorkspaceController";
import {
    reportAnalyze
} from "../../store/slices/commonSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Reports = () => {
    const dispatch = useAppDispatch()
    const [mode, setMode] = React.useState("workspace");
    const [dropdownOpen, setDropdownOpen] = React.useState<any>(false);
    const [outputDropdownOpen, setOutputDropdownOpen] = useState(false);

    const [selectedFile, setSelectedFile] = React.useState<any>(null);
    const { formattedMyFiles } = useWorkspace()
    const [keyWordText, setKeyWordText] = useState("")
    const { reportAnalyzeData } = useAppSelector((state) => state.common)

    const OUTPUT_FORMATS = [
        "Security Report",
        "Technical Report",
        "Market Report",
        "Executive Report",
        "Timeline Analysis Report",
        "Bank Analysis Report",
        "Master Criminal Profile",
        "FIR & Case Analysis",
        "Interrogation Intelligence Report",
        "Custody Movement Report",
        "Gang Network Report",
        "Court-Ready Legal Summary"
    ];

    const [selectedOutput, setSelectedOutput] =
        useState("Executive Report");

    const getFileColor = (type: string) => {
        if (type === "pdf") {
            return "#EF4444"
        } else if (type === "docx") {
            return "#2563EB"
        } else if (type === "csv") {
            return COLORS.dark4
        } else {
            return COLORS.LightGreen
        }
    }

    const handleReportAnalyze = () => {
        let payload: any = {
            reportType: selectedOutput
        };

        if (mode === "workspace") {
            payload.fileId = selectedFile?.id;
        } else {
            payload.keyword = keyWordText;
        }

        dispatch(reportAnalyze(payload));
    };

    return (
        <CommonView>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.mainContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* ================= HERO SECTION ================= */}
                <View style={styles.heroContainer}>
                    <View style={styles.badge}>
                        <View style={styles.dot} />
                        <Text style={styles.badgeText}>
                            NEURAL GENERATION ENGINE
                        </Text>
                    </View>

                    <Text style={styles.heroTitle}>
                        Generate <Text style={styles.highlight}>Insights</Text>
                    </Text>

                    <Text style={styles.heroSubtitle}>
                        Harness advanced AI to synthesize, analyze, and extract
                        actionable intelligence from your workspace documents.
                    </Text>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>
                                REPORTS GENERATED
                            </Text>
                            <Text style={styles.statValue}>0</Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>
                                SUCCESS RATE
                            </Text>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: "#16A34A" },
                                ]}
                            >
                                100%
                            </Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>TIME SAVED</Text>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: "#F97316" },
                                ]}
                            >
                                0h
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ================= CONFIG HEADER ================= */}
                <View style={styles.configHeader}>
                    <View style={styles.configIcon}>
                        <CommonIcon
                            type="Ionicons"
                            name="layers-outline"
                            size={20}
                            color="#FF6B00"
                        />
                    </View>

                    <View>
                        <Text style={styles.configTitle}>
                            Configuration Parameters
                        </Text>
                        <Text style={styles.configSubtitle}>
                            Define your analysis vectors and targets
                        </Text>
                    </View>
                </View>

                {/* ================= PARAMETERS CARD ================= */}

                <View style={styles.paramCard}>

                    {/* Header */}
                    <View style={styles.paramHeader}>
                        <View style={styles.paramIcon}>
                            <CommonIcon
                                type="Ionicons"
                                name="briefcase-outline"
                                size={20}
                                color="#fff"
                            />
                        </View>

                        <View>
                            <Text style={styles.paramTitle}>Parameters</Text>
                            <Text style={styles.paramSubtitle}>
                                Configure your analysis source
                            </Text>
                        </View>
                    </View>

                    {/* Toggle */}
                    <View style={styles.toggleContainer}>

                        {/* Keyword */}
                        <TouchableOpacity
                            onPress={() => {
                                setMode("keyword");
                                setSelectedFile(null);
                                setDropdownOpen(false);
                            }}
                            style={[
                                styles.toggleButton,
                                mode === "keyword" && styles.toggleActive,
                            ]}
                        >
                            <CommonIcon
                                type="Ionicons"
                                name="search-outline"
                                size={16}
                                color={mode === "keyword" ? "#0F172A" : "#64748B"}
                            />
                            <Text
                                style={[
                                    styles.toggleText,
                                    mode === "keyword" && styles.toggleTextActive,
                                ]}
                            >
                                Keyword
                            </Text>
                        </TouchableOpacity>

                        {/* Workspace */}
                        <TouchableOpacity
                            onPress={() => setMode("workspace")}
                            style={[
                                styles.toggleButton,
                                mode === "workspace" && styles.toggleActive,
                            ]}
                        >
                            <CommonIcon
                                type="Ionicons"
                                name="folder-outline"
                                size={16}
                                color={mode === "workspace" ? "#0F172A" : "#64748B"}
                            />
                            <Text
                                style={[
                                    styles.toggleText,
                                    mode === "workspace" && styles.toggleTextActive,
                                ]}
                            >
                                Workspace
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* ================= MODE CONTENT ================= */}

                    {mode === "keyword" && (
                        <>
                            <Text style={styles.label}>TARGET KEYWORD</Text>

                            <TextInput
                                value={keyWordText}
                                onChangeText={setKeyWordText}
                                placeholder="Type a company, topic, or keyword..."
                                placeholderTextColor="#999"
                                cursorColor={COLORS.BLACK}
                                style={styles.input}
                            />
                        </>
                    )}

                    {mode === "workspace" && (
                        <View style={styles.fileContainer}>

                            <Text style={styles.fileLabel}>SELECT SOURCE FILE</Text>
                            <TouchableOpacity
                                style={[
                                    styles.fileCard,
                                    dropdownOpen && styles.fileCardActive,
                                ]}
                                onPress={() => {
                                    setDropdownOpen(!dropdownOpen);
                                }}
                            >
                                {selectedFile === null ?
                                    <Text style={styles.paramSubtitle}>Select docs form workspace</Text>
                                    :
                                    <>
                                        <View style={styles.fileLeft}>
                                            <CommonIcon
                                                type="Ionicons"
                                                name="document-text-outline"
                                                size={20}
                                                color={getFileColor(selectedFile?.type)}
                                            />

                                            <View style={{ marginLeft: 10 }}>
                                                <Text numberOfLines={1} style={styles.fileTitle}>
                                                    {selectedFile?.name}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.fileRight}>
                                            <View style={styles.fileBadge}>
                                                <Text style={styles.fileBadgeText}>
                                                    {selectedFile?.type}
                                                </Text>
                                            </View>

                                            <CommonIcon
                                                type="Ionicons"
                                                name={
                                                    dropdownOpen
                                                        ? "chevron-up"
                                                        : "chevron-down"
                                                }
                                                size={18}
                                                color="#64748B"
                                            />
                                        </View>
                                    </>
                                }
                            </TouchableOpacity>

                            {/* Dropdown Files */}
                            {dropdownOpen && (
                                <FlatList
                                    data={formattedMyFiles}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.dropdownList}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={10}
                                    windowSize={5}
                                    renderItem={({ item }) => {
                                        const isSelected = item.name === selectedFile?.name;

                                        return (
                                            <TouchableOpacity
                                                style={[
                                                    styles.dropdownItem,
                                                    isSelected && styles.dropdownItemActive,
                                                ]}
                                                onPress={() => {
                                                    setSelectedFile(item);
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                <View style={styles.fileLeft}>
                                                    <CommonIcon
                                                        type="Ionicons"
                                                        name="document-text-outline"
                                                        size={18}
                                                        color={getFileColor(item.type)}
                                                    />

                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text numberOfLines={2} style={styles.dropdownTitle}>
                                                            {item.name}
                                                        </Text>

                                                        <Text style={styles.dropdownSubtitle}>
                                                            {item.size}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={styles.fileBadge}>
                                                    <Text style={styles.fileBadgeText}>
                                                        {item.type}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            )}

                        </View>
                    )}

                    {/* Output Format */}
                    <Text style={styles.label}>OUTPUT FORMAT</Text>

                    <View style={{ position: "relative" }}>

                        {/* Selected Box */}
                        <TouchableOpacity
                            style={[
                                styles.dropdown,
                                outputDropdownOpen && styles.fileCardActive,
                            ]}
                            onPress={() => setOutputDropdownOpen(!outputDropdownOpen)}
                        >
                            <Text style={{ color: "#0F172A", fontWeight: "500" }}>
                                {selectedOutput}
                            </Text>

                            <CommonIcon
                                type="Ionicons"
                                name={
                                    outputDropdownOpen
                                        ? "chevron-up-outline"
                                        : "chevron-down-outline"
                                }
                                size={18}
                                color="#64748B"
                            />
                        </TouchableOpacity>

                        {/* Dropdown List */}
                        {outputDropdownOpen && (
                            <FlatList
                                data={OUTPUT_FORMATS}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.outputDropdownList}
                                nestedScrollEnabled
                                renderItem={({ item }) => {
                                    const isSelected = item === selectedOutput;

                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.dropdownItem,
                                                isSelected && styles.dropdownItemActive,
                                            ]}
                                            onPress={() => {
                                                setSelectedOutput(item);
                                                setOutputDropdownOpen(false);
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.dropdownTitle,
                                                    { width: "100%" },
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        )}

                    </View>

                </View>

                {/* Generate Button */}

                <TouchableOpacity style={styles.generateButton} onPress={handleReportAnalyze}>
                    <CommonIcon
                        type="Ionicons"
                        name="flash-outline"
                        size={18}
                        color="#fff"
                    />
                    <Text style={styles.generateText}> Generate Report</Text>
                </TouchableOpacity>

                {/* ================= RECENT ACTIVITY ================= */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Recent Activity
                    </Text>

                    <View style={styles.emptyBox}>
                        <CommonIcon
                            type="Ionicons"
                            name="document-text-outline"
                            size={40}
                            color="#ccc"
                        />
                        <Text style={styles.emptyText}>
                            No reports yet.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </CommonView>
    );
};

export default Reports;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    mainContainer: {
        paddingBottom: 100,
    },

    /* HERO */
    heroContainer: {
        marginTop: 30,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#FF6B00",
        marginRight: 8,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#475569",
        letterSpacing: 1,
    },

    heroTitle: {
        fontSize: 30,
        fontWeight: "700",
        marginTop: 12,
        color: "#0F172A",
    },

    highlight: {
        color: "#FF6B00",
    },

    heroSubtitle: {
        marginTop: 10,
        fontSize: 14,
        color: "#64748B",
        lineHeight: 20,
    },

    /* STATS */
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#F8FAFC",
        borderRadius: 14,
        paddingVertical: 16,
        marginTop: 20,
        justifyContent: "space-around",
        alignItems: "center",
    },

    statItem: {
        alignItems: "center",
    },

    statLabel: {
        fontSize: 10,
        color: "#94A3B8",
        letterSpacing: 1,
    },

    statValue: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 4,
        color: "#0F172A",
    },

    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#E2E8F0",
    },

    /* CONFIG HEADER */
    configHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 28,
    },

    configIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#FFF1E6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    configTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
    },

    configSubtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 2,
    },

    /* CARD */
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
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
        borderColor: COLORS.dark4,
        color: COLORS.BLACK,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
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

    /* RECENT */
    section: {
        marginTop: 25,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
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

    emptyText: {
        color: "#aaa",
        marginTop: 10,
    },

    toggleButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },

    toggleText: {
        fontSize: 13,
        color: "#64748B",
        marginLeft: 6,
    },


    fileCardActive: {
        borderColor: "#3B82F6",
    },

    /* dropdown floating */
    dropdownList: {
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 14,
        elevation: 8,
        paddingVertical: 6,
        maxHeight: 300
    },

    dropdownItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    dropdownItemActive: {
        backgroundColor: "#EFF6FF",
        borderRadius: 10,
    },

    dropdownTitle: {
        fontSize: 14,
        width: 180,
        fontWeight: "600",
        color: "#334155",
    },

    dropdownSubtitle: {
        fontSize: 12,
        color: "#64748B",
    },
    paramCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        marginTop: 15,
        elevation: 4,
    },

    paramHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    paramIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#FF6B00",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    paramTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },

    paramSubtitle: {
        fontSize: 13,
        color: "#64748B",
    },

    /* toggle */

    toggleContainer: {
        // flex: 1,
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: 250,
        marginBottom: 20,
    },

    toggleInactive: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 14,
    },

    toggleActive: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 1,
    },

    toggleTextInactive: {
        fontSize: 13,
        color: "#64748B",
    },

    toggleTextActive: {
        fontSize: 13,
        color: "#0F172A",
        fontWeight: "600",
    },

    outputDropdownList: {
        marginTop: 8,
        backgroundColor: "#fff",
        borderRadius: 14,
        elevation: 10,
        paddingVertical: 6,
        maxHeight: 260,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    /* file */

    fileContainer: {
        backgroundColor: "#F8FAFC",
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },

    fileLabel: {
        fontSize: 11,
        color: "#64748B",
        letterSpacing: 1,
        marginBottom: 10,
    },

    fileCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        padding: 14,
        backgroundColor: "#fff",
    },

    fileLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    fileTitle: {
        width: 160,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },

    fileSubtitle: {
        fontSize: 12,
        color: "#64748B",
    },

    fileRight: {
        flexDirection: "row",
        alignItems: "center",
    },

    fileBadge: {
        backgroundColor: "#E2E8F0",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
        marginRight: 8,
    },

    fileBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#475569",
    },

    /* dropdown */

    dropdown: {
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    /* generate button */

    generateButton: {
        backgroundColor: "#0F172A",
        marginTop: 20,
        padding: 16,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    generateText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
});