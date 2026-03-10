import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { COLORS } from "../theme/colors";
import CommonIcon from "../components/CommonIcon";
import { CommonView } from "../utils/common";
import { useNavigation } from "@react-navigation/native";

interface Props {
    fileDetails: any;
}

export const AnalyzeFileMenu: React.FC<Props> = ({ fileDetails }) => {
    const Navigation: any = useNavigation();

    const ANALYZE_TABS = [
        { name: "Analytical Overview", iconName: "grid-outline" },
        { name: "Mind Map", iconName: "git-network-outline" },
        { name: "Semantic Graph", iconName: "share-social-outline" },
        { name: "Top Entities", iconName: "trophy-outline" },
        { name: "Link Analysis", iconName: "link-outline" },
        { name: "Keyword Cloud", iconName: "cloud-outline" },
        { name: "Density Map", iconName: "map-outline" },
        { name: "Bank Analysis", iconName: "business-outline" },
    ];

    const onTabPress = (navigateScreen: string) => {
        Navigation.navigate(navigateScreen);
    };

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.card}
                onPress={() => onTabPress(item.name)}
            >
                <View style={styles.iconContainer}>
                    <CommonIcon
                        type="Ionicons"
                        name={item.iconName}
                        size={25}
                        color={COLORS.Orange}
                    />
                </View>

                <Text style={styles.label}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <CommonView>
            <FlatList
                data={ANALYZE_TABS}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                numColumns={2}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
        </CommonView>
    );
};

const styles = StyleSheet.create({
    grid: {
        paddingVertical: 10,
    },

    card: {
        flex: 1,
        margin: 8,
        height: 120,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 4,
    },

    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: COLORS.LightOrange,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    label: {
        fontSize: 12.5,
        textAlign: "center",
        color: "#374151",
        fontWeight: "500",
        paddingHorizontal: 6,
    },
});