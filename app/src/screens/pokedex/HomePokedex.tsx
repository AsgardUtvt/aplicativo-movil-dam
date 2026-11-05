import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { usePokemonPaginated } from '../../hooks/usePokemonPaginated';
import { PokemonCard } from '../../components/PokemonCard';
import { homePokedexTheme } from '../../theme/homePokedexTheme'; // Ajusta la ruta según tu estructura

export const HomePokedex = () => {
  const { pokemonList, loadPokemon } = usePokemonPaginated();

  return (
    <View style={homePokedexTheme.container}>
      <View style={homePokedexTheme.backgroundPattern} />

      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon, index) => `${pokemon.id}${index}`}
        ListHeaderComponent={(
          <View style={homePokedexTheme.headerContainer}>
            <Text style={homePokedexTheme.title}>POKÉDEX</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={homePokedexTheme.listContent}
        renderItem={({ item }) => (
          <View style={homePokedexTheme.cardContainer}>
            <PokemonCard pokemon={item} />
          </View>
        )}
        onEndReached={loadPokemon}
        onEndReachedThreshold={0.2}
        ListFooterComponent={(
          <ActivityIndicator
            style={{ height: 80 }}
            size="large"
            color="#00d2ff"
          />
        )}
      />
    </View>
  );
};
