// components/CommonIcon.tsx

import React from "react";
import { StyleProp, TextStyle } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type IconType =
    | "Entypo"
    | "Ionicons"
    | "MaterialIcons"
    | "Feather"
    | "AntDesign"
    | "FontAwesome"
    | "MaterialCommunityIcons";

interface CommonIconProps {
    type?: IconType;
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const ICON_TYPES = {
    Entypo,
    Ionicons,
    MaterialIcons,
    Feather,
    AntDesign,
    FontAwesome,
    MaterialCommunityIcons,
};

const CommonIcon: React.FC<CommonIconProps> = ({
    type = "Entypo",
    name,
    size = 20,
    color = "#777",
    style,
    onPress,
}) => {
    const SelectedIcon = ICON_TYPES[type];

    if (!SelectedIcon) return null;

    return (
        <SelectedIcon
            name={name}
            size={size}
            color={color}
            style={style}
            onPress={onPress}
        />
    );
};

export default CommonIcon;
