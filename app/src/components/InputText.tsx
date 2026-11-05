import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

interface Props {
    placeholderProp?: string;
    textTitle: string;
    borderColor?: string;
    backgroundColor?: string;
    width?: number | string;
    height?: number;
    borderRadius?: number;
    titleColor?: string;
    titleSize?: number;
    inputColor?: string;
    inputSize?: number;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    showPasswordToggle?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
}

export const InputText = ({
    placeholderProp = "Ingresa texto.",
    textTitle,
    borderColor = '#D1D5DB',
    backgroundColor = '#FFFFFF',
    width = '100%',
    height = 56,
    borderRadius = 12,
    titleColor = '#6B7280',
    titleSize = 14,
    inputColor = '#1A1A1A',
    inputSize = 16,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    showPasswordToggle = false,
    value,
    onChangeText
}: Props) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    return (
        <View style={{ ...style.container,
                width: width,
                marginBottom: 24 
        }}>
            <Text
                style={{
                    ...style.titleText,
                    color: titleColor,
                    fontSize: titleSize
                }}
            >
                {textTitle}
            </Text>
            <View
                style={{
                    ...style.inputWrapper,
                    height: height,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderRadius: borderRadius
                }}
            >
                <TextInput
                    style={{
                        ...style.inputText,
                        color: inputColor,
                        fontSize: inputSize,
                        paddingRight: showPasswordToggle ? 48 : 16
                    }}
                    placeholder={placeholderProp}
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={isSecure}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    value={value}
                    onChangeText={onChangeText}
                />
                {showPasswordToggle && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(!isSecure)}
                        style={style.eyeButton}
                        activeOpacity={0.7}
                    >
                        <Text style={{ fontSize: 20, color: '#6B7280' }}>
                            {isSecure ? '🔒' : '👀'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 16,
        marginTop: 8
    },
    inputText: {
        flex: 1,
        height: '100%'
    },
    titleText: {
        fontWeight: '500'
    },
    eyeButton: {
        position: 'absolute',
        right: 16,
        padding: 8
    }
});
