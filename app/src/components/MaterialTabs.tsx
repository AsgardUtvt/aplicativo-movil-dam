import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, View } from 'react-native';
import { useDetailPokemon } from '../hooks/useDetailPokemon';
import { useTypeColorPokemon } from '../hooks/useTypeColorPokemon';
import { PokemonCombate } from './PokemonCombate';
import { PokemonEspecie } from './PokemonEspecie';
import { PokemonFisico } from './PokemonFisico';

const Tab = createMaterialTopTabNavigator();

interface Props {
    id: string | number;
}

export const MyTabsPokemonDetail = ({ id }: Props) => {
    const { isLoading, color } = useTypeColorPokemon(id);
    const { detailPokemon } = useDetailPokemon(id);


    const activeColor = isLoading ? '#00d2ff' : color[0];
    const inactiveColor = 'rgba(255, 255, 255, 0.5)';
    const backgroundColor = '#0c1618'; 


    const LoadingView = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor }}>
            <ActivityIndicator size="large" color={activeColor} />
        </View>
    );

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                tabBarStyle: {
                    backgroundColor: backgroundColor,
                    shadowColor: 'transparent',
                    elevation: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0, 210, 255, 0.2)',
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: activeColor,
                    height: 3,
                    borderRadius: 3,
                },
                tabBarPressColor: 'rgba(255, 255, 255, 0.1)', // Efecto ripple al tocar
            }}
        >
            <Tab.Screen
                name="Físicos"
                component={() => (!detailPokemon) ? <LoadingView /> : (
                    <PokemonFisico pokemon={detailPokemon} types={color} />
                )}
            />
            <Tab.Screen
                name="Combate"
                component={() => (!detailPokemon) ? <LoadingView /> : (
                    <PokemonCombate pokemon={detailPokemon} types={color} />
                )}
            />
            <Tab.Screen
                name="Especie"
                component={() => (!detailPokemon) ? <LoadingView /> : (
                    <PokemonEspecie pokemon={detailPokemon} types={color} />
                )}
            />
        </Tab.Navigator>
    );
};
