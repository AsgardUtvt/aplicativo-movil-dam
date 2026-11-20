import { ReactNode, useEffect } from "react";
//import { PositionScreen } from "./src/screens/PositionScreen";
//import { BoxObjectModelScreen } from "./src/screens/BoxObjectModelScreen";
//import { CounterScreen } from "./src/screens/CounterScreen";
//import { CounterReducerScreen } from "./src/screens/CounterReducerScreen";
//import { UseEffectScreen } from "./src/screens/UseEffectScreen";
//import { StackNavigator } from "./src/navigator/StackNavigator";
//import { PokemonNavigator } from "./src/navigator/PokemonNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./src/navigator/DrawerNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import {getDeviceIPv4, setDeviceIPv4} from "./src/utils/singleton";
import * as Network from 'expo-network';
const App = () => {
  useEffect(() => {
    const obtenerYGuardarIP = async () => {
      try {
        const ip = await Network.getIpAddressAsync();
          console.log("se obtuvo la ip ", ip);
          
        setDeviceIPv4(ip);

      } catch (error) {
        console.error("No se pudo obtener la IP:", error);
      }
    };

    obtenerYGuardarIP();
  }, []);
  return (
    <AppState>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </AppState>
  );

}

const AppState = ( { children }: { children: ReactNode } ) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}

export default App;
