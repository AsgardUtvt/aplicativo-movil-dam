import { createDrawerNavigator } from "@react-navigation/drawer";

import { StackNavigator } from "./StackNavigator";
import { PokemonNavigator } from "./PokemonNavigator";
import { useWindowDimensions } from "react-native";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";
import { TareaScreen } from "../screens/TareasScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { LoginNavigator } from "./LoginStackNavigator";
import {ImagePickerScreen} from "../screens/ImagePickerScreen";
import { LocationScreen } from "../screens/LocationScreen";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { DataResponseScreen } from "../screens/DataResponseScreen";

export type RootDrawerParams = {
    StackNavigator: undefined;
    PokemonNavigator: undefined;
    FormScreen: undefined;
    TareaScreen: undefined;
    LoginScreen: undefined;
    ImagePickerScreen: undefined;
    LocationScreen: undefined;
    DataResponseScreen: undefined;
}

const Drawer = createDrawerNavigator<RootDrawerParams>();


export const DrawerNavigator = () => {

    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator
            initialRouteName='PokemonNavigator'
            screenOptions={{
                headerShown: true,
                    drawerType: width > 720 ? 'permanent': 'front',
                    drawerPosition: 'right',
                    overlayColor: 'rgba(225, 225, 225, 0.5)',
                    drawerStyle: {
                        backgroundColor: 'rgba(11, 9, 13, 1)',
                            width: width * 0.7
                    }
            }}
            drawerContent={ (props) => <DrawerMenu {...props} /> }
        >
            <Drawer.Screen
                name='StackNavigator'
                component={StackNavigator}
                options={{ title:"Navegacion por pantallas" }}
            />
            <Drawer.Screen
                name='PokemonNavigator'
                component={PokemonNavigator}
                options={{ title:"Pokemon Api" }}
            />
            <Drawer.Screen
                name='FormScreen'
                component={FormScreen}
                options={{ title:"Ejemplo de formulario" }}
            />
            <Drawer.Screen   

                name="TareaScreen"
                component={TareaScreen}
                options={{ title:"To Do List" }}
            />
            <Drawer.Screen 
                name='LoginScreen'
                options={{ title:"Login" }}
                component={LoginNavigator}
            />
            <Drawer.Screen 
                name='ImagePickerScreen'
                component={ImagePickerScreen}
            />
            <Drawer.Screen
                name="LocationScreen"
                component={LocationScreen}
            />
            <Drawer.Screen
                name="DataResponseScreen"
                options={{ title: "Estadisticas"}}
                component={DataResponseScreen}
            />
        </Drawer.Navigator>
    );

}
   export const LoggedDreawer = () => {
        const { authState } = useContext(AuthContext);

        return (authState.isLoggedIn) ? <DrawerNavigator /> : <LoginNavigator/>
    }
