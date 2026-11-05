import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

interface Props {
    backgroundColor?: string;
    fontSize?: number;
    height?: number;
    onPress: () => void;
    text: string;
    width?: number;
    color?: string;

}

export const BtnMotal = ( { text="txt", fontSize=20, onPress, backgroundColor='blue', height=20, width=20, color='black' }: Props) => {
    return (
        <View>
            <TouchableOpacity
                style={{...style.container,
                        backgroundColor: backgroundColor,
                        height: height,
                        width: width, 
                }}
            >
                <Text
                    style={{...style.text,
                            fontSize: fontSize,
                            color:color
                    }}
                    onPress={onPress}

            >
                {text}
            </Text>
        </TouchableOpacity>
    </View>
);
}

const style = StyleSheet.create({
    text: {
        fontSize: undefined,  
        color: undefined
    },
    container: {
        backgroundColor: undefined,
        width: undefined,
        height: undefined,

    }
})
