import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import { insets } from "../theme/metrics";
import CommonIcon from "../components/CommonIcon";

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={[styles.wrapper, { bottom: insets.bottom }]}>
            <View style={styles.container}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        navigation.navigate(route.name);
                    };

                    let iconName: string;

                    if (route.name === "Dashboard") {
                        iconName = "grid";
                    } else if (route.name === "Reports") {
                        iconName = "document-text";
                    } else {
                        iconName = "search";
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={[
                                styles.tabItem,
                                isFocused && styles.activeTab,
                            ]}
                        >
                            <CommonIcon type="Ionicons" name={iconName} size={18} color={isFocused ? "#fff" : "#666"} />
                            <Text
                                style={[
                                    styles.label,
                                    { color: isFocused ? "#fff" : "#666" },
                                ]}
                            >
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        left: 20,
        right: 20,
    },
    container: {
        flexDirection: "row",
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.dark4,
        borderWidth: 0.5,
        borderRadius: 30,
        padding: 6,
        shadowColor: COLORS.dark1,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    tabItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 25,
    },
    activeTab: {
        backgroundColor: COLORS.Orange,
    },
    label: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "500",
    },
});
