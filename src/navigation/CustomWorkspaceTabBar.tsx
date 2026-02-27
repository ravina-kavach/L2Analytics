import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";
import CommonIcon from "../components/CommonIcon";
import { insets } from "../theme/metrics";

const CustomWorkspaceTabBar = ({ state, descriptors, navigation }: any) => {
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

                    // 👇 Updated icon logic for your screens
                    let iconName: string;

                    switch (route.name) {
                        case "WorkspaceFolders":
                            iconName = "folder";
                            break;
                        case "WorkspaceFiles":
                            iconName = "document";
                            break;
                        case "WorkspaceLinks":
                            iconName = "link";
                            break;
                        default:
                            iconName = "ellipse";
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            activeOpacity={0.8}
                            style={[
                                styles.tabItem,
                                isFocused && styles.activeTab,
                            ]}
                        >
                            <CommonIcon
                                type="Ionicons"
                                name={iconName}
                                size={18}
                                color={isFocused ? "#fff" : "#666"}
                            />

                            <Text
                                style={[
                                    styles.label,
                                    { color: isFocused ? "#fff" : "#666" },
                                ]}
                            >
                                {label.replace("Workspace", "")}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default CustomWorkspaceTabBar;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    container: {
        flexDirection: "row",
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.dark4,
        borderWidth: 0.5,
        borderRadius: 30,
        padding: 6,
        shadowColor: COLORS.dark1,
        shadowOffset: { width: 2, height: 2 },
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