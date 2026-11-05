import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PokemonParams } from '../../navigator/PokemonNavigator';
import { useTypeColorPokemon } from '../../hooks/useTypeColorPokemon';
import { useDetailPokemon } from '../../hooks/useDetailPokemon';
import { PokemonFull } from '../../components/PokemonFull';
import { MyTabsPokemonDetail } from '../../components/MaterialTabs';
import { detailPoekmonTheme } from '../../theme/detailPokemonTheme';



interface Props extends StackScreenProps<PokemonParams, 'PokemonDetail'>{};

export const PokemonDetail = ( { navigation, route }:Props ) => {

  const data = route.params.NewPokemon;
  const { id, name, image } = data;
  
  const { isLoading, color } = useTypeColorPokemon(id);
  const { detailPokemon } = useDetailPokemon(id);

  const bgColor = (isLoading) ? '#555' : (color.length > 1 ? color[1] : color[0]);
  const mainColor = (isLoading) ? '#555' : color[0];

  const types = detailPokemon?.types || [];

  return (
    <View style={detailPoekmonTheme.container}>
      
      <View style={detailPoekmonTheme.headerSection}>
        
        <View 
          style={[
            detailPoekmonTheme.bgLayerLeft, 
            { backgroundColor: bgColor }
          ]} 
        />
        <View 
          style={[
            detailPoekmonTheme.bgLayerRight, 
            { backgroundColor: mainColor }
          ]} 
        />

        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={detailPoekmonTheme.backButton}
        >
          <Text style={detailPoekmonTheme.backText}>✕</Text>
        </TouchableOpacity>

        <View style={detailPoekmonTheme.infoContainer}>
          <Text style={detailPoekmonTheme.idText}>Nº {id.toString().padStart(3, '0')}</Text>
          <Text style={detailPoekmonTheme.nameText}>{name}</Text>
        </View>

        <View style={detailPoekmonTheme.typesContainer}>
          {types.map((t, index) => (
            <View key={index} style={detailPoekmonTheme.typeChip}>
              <Text style={detailPoekmonTheme.typeText}>{t.type.name}</Text>
            </View>
          ))}
        </View>

        <Image
          source={{ uri: image }}
          style={detailPoekmonTheme.pokemonImage}
          resizeMode="contain"
        />
      </View>

      <View style={detailPoekmonTheme.tabsContainer}>
        <MyTabsPokemonDetail id={id} />
      </View>

    </View>
  );
}

