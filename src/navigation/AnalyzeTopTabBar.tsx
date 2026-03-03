import React, { useRef, useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    LayoutChangeEvent,
    Dimensions,
} from "react-native";
import CommonIcon from "../components/CommonIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TAB_ICONS: Record<string, string> = {
    "Analytical Overview": "grid-outline",
    "Mind Map": "git-network-outline",
    "Semantic Graph": "share-social-outline",
    "Top Entities": "trophy-outline",
    "Link Analysis": "link-outline",
    "Keyword Cloud": "cloud-outline",
    "Density Map": "map-outline",
    "Bank Analysis": "business-outline",
};

const AnalyzeTopTabBar = ({ state, navigation }: any) => {
    const scrollRef = useRef<ScrollView>(null);

    // Store layout position of each tab
    const [tabLayouts, setTabLayouts] = useState<
        { x: number; width: number }[]
    >([]);

    // 🔥 Auto scroll when tab changes
    useEffect(() => {
        const layout = tabLayouts[state.index];

        if (layout && scrollRef.current) {
            const offset =
                layout.x - SCREEN_WIDTH / 2 + layout.width / 2;

            scrollRef.current.scrollTo({
                x: offset > 0 ? offset : 0,
                animated: true,
            });
        }
    }, [state.index, tabLayouts]);

    const handleLayout =
        (index: number) => (event: LayoutChangeEvent) => {
            const { x, width } = event.nativeEvent.layout;

            setTabLayouts((prev) => {
                const updated = [...prev];
                updated[index] = { x, width };
                return updated;
            });
        };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;
                    const iconName =
                        TAB_ICONS[route.name] || "ellipse-outline";

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onLayout={handleLayout(index)}
                            onPress={() => navigation.navigate(route.name)}
                            style={[
                                styles.tabItem,
                                isFocused && styles.activeTab,
                            ]}
                            activeOpacity={0.8}
                        >
                            <CommonIcon
                                type="Ionicons"
                                name={iconName}
                                size={16}
                                color={isFocused ? "#fff" : "#6B7280"}
                            />

                            <Text
                                style={[
                                    styles.label,
                                    { color: isFocused ? "#fff" : "#6B7280" },
                                ]}
                            >
                                {route.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 8,
    },

    scrollContainer: {
        paddingHorizontal: 16,
        alignItems: "center",
    },

    tabItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 25,
    },

    activeTab: {
        backgroundColor: "#FF6B00",
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 6,
    },
});

export default AnalyzeTopTabBar;