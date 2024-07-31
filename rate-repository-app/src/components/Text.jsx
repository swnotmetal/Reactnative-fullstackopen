import {Text as NativeText, StyleSheet} from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextThird: {
        color: theme.colors.textThird,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBlod: {
        fontWeight: theme.fontWeights.bold,
    },
    fontSizeHeading: {
        fontSize: theme.fontSizes.heading,
    }

});

const Text = ({ color, fontSize, fontWeight, style, ...props}) => {
    const textStyle = [
        styles.text,
        color === 'textThird' && styles.colorTextThird,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'heading' && styles.fontSizeHeading,
        fontWeight === 'bold' && styles.fontWeightBlod,
        style,
    ]

    return <NativeText style={textStyle} {...props}/>;
};

export default Text;