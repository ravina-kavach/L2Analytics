import React, { useMemo, useEffect, useRef } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
    Easing,
} from "react-native";
import Svg, { Rect, Line, Text as SvgText } from "react-native-svg";
import folderAnaylzeData from '../../../../utils/folderAnaylzeData.json'
import { CommonView } from "../../../../utils/common";
import CommonHeader from "../../../../components/CommonHeader";
import { useAppSelector } from "../../../../store/hooks";

const { width } = Dimensions.get("window");

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedText = Animated.createAnimatedComponent(SvgText);

export default function MindMap() {
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);
    const isMounted = useRef(false);
    const { fileAnalyzeWithTabData } = useAppSelector(
        (state) => state.common
    );
    const data: any = fileAnalyzeWithTabData?.data
    // const data = folderAnaylzeData?.data
    const graph = useMemo(() => {
        const entities = data?.result?.entities || [];

        return {
            label: "Case Analysis",
            children: entities.slice(0, 30).map((e: any) => ({
                label: e.id || "Unknown",
            })),
        };
    }, [data]);

    const nodeWidth = 160;
    const nodeHeight = 40;
    const spacing = 20;
    const rowGap = 90;

    const nodesPerRow = Math.max(
        1,
        Math.floor((width - spacing) / (nodeWidth + spacing))
    );

    const rows = Math.ceil(graph.children.length / nodesPerRow);

    const rootY = 40;
    const startY = 150;
    const canvasHeight = startY + rows * rowGap + 120;


    const rootAnim = useRef(new Animated.Value(0)).current;
    const lineAnim = useRef(new Animated.Value(0)).current;
    const nodesAnim = useMemo(
        () => graph.children.map(() => new Animated.Value(0)),
        [graph.children.length]
    );

    useEffect(() => {
        isMounted.current = true;
        if (!isMounted.current) return;

        const root = Animated.timing(rootAnim, {
            toValue: 1,
            duration: 1400,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        });

        const line = Animated.timing(lineAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        });

        const nodes = Animated.stagger(
            180,
            nodesAnim.map((anim: any) =>
                Animated.spring(anim, {
                    toValue: 1,
                    friction: 10,
                    tension: 40,
                    useNativeDriver: true,
                })
            )
        );

        animationRef.current = Animated.sequence([
            root,
            line,
            nodes,
        ]);

        animationRef.current.start();

        // ✅ CLEANUP (MOST IMPORTANT PART)
        return () => {
            isMounted.current = false;
            animationRef.current?.stop();
        };
    }, [nodesAnim]);

    return (
        <CommonView>
            <CommonHeader title={"Mind Map"} style={styles.header} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    <Svg width={width} height={canvasHeight}>

                        <AnimatedRect
                            x={width / 2 - nodeWidth / 2}
                            y={rootY}
                            width={nodeWidth}
                            height={nodeHeight}
                            rx={14}
                            ry={14}
                            fill="#3B82F6"
                            opacity={rootAnim}
                            transform={[{
                                scale: rootAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.6, 1],
                                }),
                            }]}
                        />

                        <AnimatedText
                            x={width / 2}
                            y={rootY + 25}
                            fill="#fff"
                            fontSize="14"
                            fontWeight="600"
                            textAnchor="middle"
                            opacity={rootAnim}
                        >
                            {graph.label}
                        </AnimatedText>

                        {/* ROOT DROP LINE */}
                        <AnimatedLine
                            x1={width / 2}
                            y1={rootY + nodeHeight}
                            x2={width / 2}
                            y2={lineAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [rootY + nodeHeight, startY],
                            })}
                            stroke="#CBD5E1"
                            strokeWidth="2"
                        />

                        {/* ROW LINES */}
                        {Array.from({ length: rows }).map((_, rowIndex) => {

                            const rowY = startY + rowIndex * rowGap;

                            return (
                                <AnimatedLine
                                    key={rowIndex}
                                    x1={spacing}
                                    y1={rowY}
                                    x2={lineAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [spacing, width - spacing],
                                    })}
                                    y2={rowY}
                                    stroke="#CBD5E1"
                                    strokeWidth="2"
                                />
                            );
                        })}

                        {/* ========= CHILD NODES ========= */}

                        {graph.children.map((node: any, i: number) => {

                            const row = Math.floor(i / nodesPerRow);
                            const col = i % nodesPerRow;

                            const itemsInRow = Math.min(
                                nodesPerRow,
                                graph.children.length - row * nodesPerRow
                            );

                            const rowWidth = itemsInRow * (nodeWidth + spacing);
                            const startX = width / 2 - rowWidth / 2;

                            const x = startX + col * (nodeWidth + spacing);
                            const rowY = startY + row * rowGap;
                            const nodeY = rowY + 20;

                            const anim = nodesAnim[i];

                            const translateY = anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [40, 0],
                            });

                            const scale = anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1],
                            });

                            return (
                                <React.Fragment key={i}>

                                    {/* DROP LINE */}
                                    <AnimatedLine
                                        x1={x + nodeWidth / 2}
                                        y1={rowY}
                                        x2={x + nodeWidth / 2}
                                        y2={nodeY}
                                        stroke="#CBD5E1"
                                        strokeWidth="2"
                                        opacity={anim}
                                    />

                                    {/* NODE */}
                                    <AnimatedRect
                                        x={x}
                                        y={nodeY}
                                        width={nodeWidth}
                                        height={nodeHeight}
                                        rx={12}
                                        ry={12}
                                        fill="#0F172A"
                                        opacity={anim}
                                        transform={[{ translateY }, { scale }]}
                                    />

                                    <AnimatedText
                                        x={x + nodeWidth / 2}
                                        y={nodeY + 25}
                                        fill="#fff"
                                        fontSize="14"
                                        textAnchor="middle"
                                        opacity={anim}
                                    >
                                        {String(node.label).slice(0, 18)}
                                    </AnimatedText>

                                </React.Fragment>
                            );
                        })}

                    </Svg>

                </ScrollView>
            </ScrollView>
        </CommonView>
    );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#F8FAFC",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50
    },
});