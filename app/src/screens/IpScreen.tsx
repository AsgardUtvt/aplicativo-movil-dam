import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {getDeviceIPv4, setDeviceIPv4} from "../utils/singleton";
import {useState} from "react";

export const IpScreen = () => {
   const [ ip, setIp ] = useState("");
    return (
        
        <View>
            <Text>
                Ingresa la dirección ip
            </Text>
            <TextInput
                placeholder="192.xxx.xxx.xxx"
                value={ip}
                onChangeText={(text) => setIp(text)}
            />

            <TouchableOpacity
                onPress={() => setDeviceIPv4(ip)}
            >
                <Text> Guardar ip</Text>
            </TouchableOpacity>
        </View>

    );

}
