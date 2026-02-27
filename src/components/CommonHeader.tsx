import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonIcon from './CommonIcon'
import { COLORS } from '../theme/colors'
import { useNavigation } from '@react-navigation/native'

type CommonHeaderType = {
    title: string
    rightIcon?: React.ReactElement
    rightIconPress?: () => void

}

const CommonHeader = (props: CommonHeaderType) => {
    const { title, rightIcon, rightIconPress } = props
    const Navigation = useNavigation()
    return (
        <View style={styles.header}>
            <View style={styles.headerSide}>
                <TouchableOpacity onPress={() => Navigation.goBack()}>
                    <CommonIcon
                        type="Ionicons"
                        name="arrow-back-outline"
                        size={22}
                        color={COLORS.BLACK}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>
                {title}
            </Text>

            <View
                style={[
                    styles.headerSide,
                    {
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    },
                ]}
            >
                {rightIcon &&
                    <TouchableOpacity
                        onPress={rightIconPress}
                        style={{ marginRight: 12 }}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    headerSide: {
        width: 80,
    },

    headerTitle: {
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.BLACK,
    },
    headerCenter: {
        flex: 1,
        alignItems: "center",
    },
})
export default CommonHeader