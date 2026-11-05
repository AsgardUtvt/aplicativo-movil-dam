import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    text: string;
    variant?: 'primary' | 'link';
    width?: number | string;
    height?: number;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: '400' | '500' | '600' | '700';
    borderRadius?: number;
    alignSelf?: 'center' | 'flex-start' | 'flex-end' | 'auto';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
    disabled?: boolean;
    onPress?: () => void;
}

export const BtnLogin = ({
    text,
    variant = 'primary',
    width = '100%',
    height = 56,
    backgroundColor = '#E5E7EB',
    textColor = '#9CA3AF',
    fontSize = 16,
    fontWeight = '600',
    borderRadius = 28,
    alignSelf = 'center',
    textDecorationLine = 'none',
    disabled = false,
    onPress
}: Props) => {

    if (variant === 'link') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.7}
            >
                <Text
                    style={{
                        color: textColor,
                        fontSize: fontSize,
                        fontWeight: '500',
                        textDecorationLine: textDecorationLine,
                        alignSelf: alignSelf
                    }}
                >
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={{
                ...style.button,
                width: width,
                height: height,
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                alignSelf: alignSelf,
                opacity: disabled ? 1 : 1
            }}
        >
            <Text
                style={{
                    ...style.buttonText,
                    color: textColor,
                    fontSize: fontSize,
                    fontWeight: fontWeight
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    buttonText: {
        textAlign: 'center'
    }
});
