import { StyleSheet, Platform } from 'react-native';

export const font = (name: any) =>
    Platform.OS === 'ios' ? `Inter-${name}` : `Inter_18pt-${name}`;

export const GlobalFonts = StyleSheet.create({
    BOLD: {
        fontFamily: font('Bold'),
        lineHeight: 30,
        letterSpacing: 1,
        fontWeight: '600'
    },
    SEMI_BOLD: {
        fontFamily: font('SemiBold'),
        lineHeight: 22,
        fontWeight: '600'
    },
    MEDIUM: {
        fontFamily: font('Medium'),
        lineHeight: 22,
        fontWeight: '500'
    },
    REGULAR: {
        fontFamily: font('Regular'),
        lineHeight: 22,
    },
});
