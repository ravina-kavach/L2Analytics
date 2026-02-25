import React, { ReactNode } from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontSize } from '../theme/metrics';
import { COLORS } from '../theme/colors';
import { GlobalFonts } from '../theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

interface CommonViewProps {
  children?: ReactNode;
  statusBarColor?: string;
}

interface TextPropsType {
  children?: ReactNode;
  style?: TextStyle | TextStyle[];
}

interface ViewPropsType {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const CommonView: React.FC<CommonViewProps> = ({
  children,
  statusBarColor,
}) => {
  const insets = useSafeAreaInsets();

  return (

    <LinearGradient
      colors={["#f8e9d8", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >

      <StatusBar
        translucent
        backgroundColor={statusBarColor ?? COLORS.WHITE}
        barStyle="dark-content"
      />
      {children}
    </LinearGradient>

  );
};

export const H3: React.FC<TextPropsType> = ({ children, style }) => (
  <Text style={[commonStyle.titleText, style]}>{children}</Text>
);

export const H4: React.FC<TextPropsType> = ({ children, style }) => (
  <Text style={[commonStyle.subtitleText, style]}>{children}</Text>
);

export const H5: React.FC<TextPropsType> = ({ children, style }) => (
  <Text style={[commonStyle.normalText, style]}>{children}</Text>
);

export const H6: React.FC<TextPropsType> = ({ children, style }) => (
  <Text style={[commonStyle.descText, style]}>{children}</Text>
);

export const Label: React.FC<TextPropsType> = ({ children, style }) => (
  <Text style={[commonStyle.Label, style]}>{children}</Text>
);

export const Valide: React.FC<TextPropsType> = ({ children, style }) => (
  <Text style={[commonStyle.Valide, style]}>{children}</Text>
);

export const RowView: React.FC<ViewPropsType> = ({ children, style }) => (
  <View style={[commonStyle.row, style]}>{children}</View>
);

export const ColView: React.FC<ViewPropsType> = ({ children, style }) => (
  <View style={[commonStyle.col, style]}>{children}</View>
);

//-----------

export const commonStyle = StyleSheet.create({
  titleText: {
    marginBottom: 6,
    color: COLORS.BLACK,

    ...GlobalFonts.BOLD,
  },
  subtitleText: {
    marginBottom: 6,
    color: COLORS.BLACK,
    ...GlobalFonts.SEMI_BOLD,
  },
  normalText: {
    marginBottom: 5,
    color: COLORS.BLACK,
    ...GlobalFonts.MEDIUM,
  },



  descText: {
    marginBottom: 4,
    fontSize: FontSize.Font14,
    color: COLORS.BLACK,
    ...GlobalFonts.MEDIUM,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -5,
    alignItems: 'center',
  },
  col: {
    flex: 1,
    paddingHorizontal: 5,
  },
  Label: {
    fontSize: 17,
    textTransform: 'capitalize',
    color: COLORS.dark2,
    marginBottom: 3,
    fontWeight: '400',
  },
  Valide: {
    fontSize: 15,
    color: COLORS.Red,
    fontWeight: '400',
  },
  input: {
    height: 50,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.BLACK,
    paddingVertical: 3,
    paddingLeft: 15,
    paddingRight: 35,
    borderColor: COLORS.dark2,
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  btn_primary: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 15,
    color: COLORS.WHITE,
    alignItems: 'center',
    textTransform: 'capitalize',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: '600',
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden',
  },
  shodowBox: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btn_primary_round: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: COLORS.WHITE,
    alignItems: 'center',
    textTransform: 'capitalize',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden',
  },
});
