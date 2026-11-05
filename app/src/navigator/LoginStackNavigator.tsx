import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen"; 
import { GenerarCuentaScreen } from "../screens/GenerarCuentaScreen";
import { UsuarioScreen } from "../screens/UsuarioScreen";
import { AutoFormScreen } from "../screens/AutoFormScreen";

export type LoginParams = {
    LoginScreen: undefined;
    GenerarCuentaScreen: {
        id_user: number;
        username: string;
        email: string;
        image: string;
        location?: string;
    } | undefined;
    UsuarioScreen: undefined;
    AutoFormScreen: {
        id_propietario: number;
        marca: string;
        modelo: string;
        ano: string;
        placas: string;
        numero_serie: string;
        color: string;
        kilometraje: string;
        fecha_revision: string;
        imagen1?: string;
        imagen2?: string;
        imagen3?: string;
        imagen4?: string;
    } | undefined;
}

const Stack = createStackNavigator<LoginParams>();

export const LoginNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="GenerarCuentaScreen" component={GenerarCuentaScreen} />
            <Stack.Screen name="UsuarioScreen" component={UsuarioScreen} />
            <Stack.Screen name="AutoFormScreen" component={AutoFormScreen} />
        </Stack.Navigator>
    ); 
}
