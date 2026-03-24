import React, { useEffect, useState, useRef, useMemo } from 'react'
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS } from '../../../../theme/colors';
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from '../../../../utils/common';
import CommonHeader from '../../../../components/CommonHeader';
import { useAppSelector } from '../../../../store/hooks';
import { useFolderAnalyze } from '../FolderAnalyzeController';

const TypewriterText = ({ text = "", speed = 20 }: any) => {
    const [displayedText, setDisplayedText] = useState("");
    const timeoutRef = useRef<any>(null);
    const isMounted = useRef(true);

    useEffect(() => {
        let index = 0;
        isMounted.current = true;
        setDisplayedText("");

        const type = () => {
            if (!isMounted.current) return;

            index++;

            setDisplayedText(text.slice(0, index));

            if (index < text.length) {
                timeoutRef.current = setTimeout(type, speed);
            }
        };

        type();

        return () => {
            isMounted.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [text, speed]);

    const parsed = useMemo(() => {
        const parts: any[] = [];
        const regex = /\*\*(.*?)\*\*/g;

        let lastIndex = 0;
        let match;

        while ((match = regex.exec(displayedText)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    text: displayedText.slice(lastIndex, match.index),
                    bold: false,
                });
            }

            parts.push({
                text: match[1],
                bold: true,
            });

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < displayedText.length) {
            parts.push({
                text: displayedText.slice(lastIndex),
                bold: false,
            });
        }

        return parts;
    }, [displayedText]);

    return (
        <Text style={styles.content}>
            {parsed.map((part, index) => (
                <Text
                    key={index}
                    style={part.bold ? styles.boldText : undefined}
                >
                    {part.text}
                </Text>
            ))}
        </Text>
    );
};

const AnalyticalOverview = () => {
    const { fileAnalyzeWithTabData, loading } = useAppSelector(
        (state) => state.common
    );
    const { } = useFolderAnalyze()
    // const data: any = fileAnalyzeWithTabData?.data
    const data: any = folderAnaylzeData?.data
    // console.log("DATA====>", data)
    return (
        <CommonView>
            <CommonHeader title="Analytical Overview" style={styles.header} />
            {!loading &&
                <>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.title}>Summary Overview</Text>

                        <View style={styles.card}>
                            <TypewriterText
                                // text={data?.finalSummary ?? ""}
                                text={data?.result?.auto_summary ?? ""}
                                speed={15}
                            />
                        </View>

                        <View style={styles.statRow}>
                            <StatBox label="Total Files" value={data?.result?.total_files} />
                            <StatBox label="Entities" value={data?.result?.entities?.length} />
                            <StatBox label="Keywords" value={data?.result?.trends?.length} />
                        </View>
                    </ScrollView>
                </>
            }
        </CommonView>
    )
}


const StatBox = ({ label, value }: any) => (
    <View style={styles.statBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 280,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#0F172A",
        marginBottom: 12
    },
    card: {
        padding: 15,
        borderRadius: 12,
    },
    content: {
        color: "#1E293B",
        lineHeight: 22,
        fontWeight: '500'
    },
    boldText: {
        fontWeight: "bold",
        color: "#020617",
    },
    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
    statBox: {
        backgroundColor: "#1E293B",
        padding: 15,
        borderRadius: 12,
        width: "30%",
        alignItems: "center",
    },
    statValue: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontWeight: "bold"
    },
    statLabel: {
        color: COLORS.WHITE,
        marginTop: 5
    },
});

export default AnalyticalOverview;

