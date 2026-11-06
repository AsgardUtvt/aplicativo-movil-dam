import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";

interface BtnProps {
  action: () => void;
  text: string;
  borderLeftColor?: string;
}

const BtnMenu = ({ action, text, borderLeftColor = 'green' }: BtnProps) => {
  return (
    <TouchableOpacity onPress={action}>
      <View style={{ ...style.textBg, borderLeftColor }}>
        <Text style={style.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => {
  const { authState } = useContext(AuthContext);
    console.log("Este es el auth state");
    
    console.log(authState);
    

  return (
    <DrawerContentScrollView>
      <View style={style.container}>
        
        {/* Avatar del usuario */}
        <View style={style.avatarBorder}>
          {authState.avatar ? (
            <Image
              style={style.avatar}
              source={{ uri: `data:image/jpeg;base64,${authState.avatar}` }}
            />
          ) : (
            <Image
              style={style.avatar}
              source={require('../../assets/logo-sd34.jpg')}
            />
          )}
        </View>

        {/* Nombre del usuario */}
        <Text style={style.username}>
          {authState.isLoggedIn 
            ? (authState.username || 'Usuario') 
            : 'SUPERDROY34'}
        </Text>

        <View style={style.container}>
          <BtnMenu
            text="Pokedex"
            borderLeftColor="orange"
            action={() => navigation.navigate('PokemonNavigator')}
          />
          <BtnMenu
            text="Palitos y bolitas"
            borderLeftColor="gray"
            action={() => navigation.navigate('StackNavigator')}
          />
          <BtnMenu
            text="Formulario"
            action={() => navigation.navigate('FormScreen')}
          />
          <BtnMenu
            text="Tareas"
            borderLeftColor="blue"
            action={() => navigation.navigate('TareaScreen')}
          />
          <BtnMenu
            text="Login"
            borderLeftColor="gray"
            action={() => navigation.navigate('LoginScreen')}
          />
          <BtnMenu
            text="Image"
            borderLeftColor="gray"
            action={() => navigation.navigate('ImagePickerScreen')}
          />
          <BtnMenu
            text="Location"
            borderLeftColor="gray"
            action={() => navigation.navigate('LocationScreen')}
          />
          <BtnMenu
            text="Estadisticas"
            borderLeftColor="rose"
            action={() => navigation.navigate('DataResponseScreen')}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBg: {
    backgroundColor: 'rgba(11, 9, 13, 1)',
    marginTop: 10,
    width: 297,
    borderLeftWidth: 4,
    borderLeftColor: 'green',
  },
  text: {
    color: "white",
    fontSize: 30,
    textAlign: 'left',
    marginTop: 20,
    alignContent: 'center',
    bottom: 10,
    left: 10
  },
  avatar: {
    borderColor: 'rgb(99.2, 40.8, 7.8)',
    borderRadius: 100,
    borderWidth: 10,
    height: 180,
    width: 180
  },
  avatarBorder: {
    borderColor: 'rgb(22.0, 47.1, 62.0)',
    borderRadius: 100,
    borderWidth: 10,
    height: 200,
    width: 200
  },
  username: {
    fontSize: 28,
    color: "white",
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center'
  },
});
