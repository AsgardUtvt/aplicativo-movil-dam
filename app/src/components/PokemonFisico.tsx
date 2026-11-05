import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PokemonDetailResponse } from '../interfaces/pokemonResponse';

interface Props {
  pokemon: PokemonDetailResponse;
  types: string[];
}

export const PokemonFisico = ({ pokemon, types }: Props) => {
  //const primaryColor = types[0] || '#78C850';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Datos físicos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos Físicos</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Peso:</Text>
            <Text style={styles.dataValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Altura:</Text>
            <Text style={styles.dataValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Experiencia Base:</Text>
            <Text style={styles.dataValue}>{pokemon.base_experience}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Apariencia</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.spritesContainer}
          >
            {pokemon.sprites?.front_default && (
              <View style={styles.spriteBox}>
                <Text style={styles.spriteLabel}>Front</Text>
                <Image
                  style={styles.sprite}
                  source={{ uri: pokemon.sprites.front_default }}
                  resizeMode="contain"
                />
              </View>
            )}
            
            {pokemon.sprites?.back_default && (
              <View style={styles.spriteBox}>
                <Text style={styles.spriteLabel}>Back</Text>
                <Image
                  style={styles.sprite}
                  source={{ uri: pokemon.sprites.back_default }}
                  resizeMode="contain"
                />
              </View>
            )}

            {pokemon.sprites?.front_shiny && (
              <View style={styles.spriteBox}>
                <Text style={styles.spriteLabel}>Shiny</Text>
                <Image
                  style={styles.sprite}
                  source={{ uri: pokemon.sprites.front_shiny }}
                  resizeMode="contain"
                />
              </View>
            )}

            {pokemon.sprites?.back_shiny && (
              <View style={styles.spriteBox}>
                <Text style={styles.spriteLabel}>Shiny Back</Text>
                <Image
                  style={styles.sprite}
                  source={{ uri: pokemon.sprites.back_shiny }}
                  resizeMode="contain"
                />
              </View>
            )}

            {pokemon.sprites?.other?.['official-artwork']?.front_default && (
              <View style={styles.spriteBox}>
                <Text style={styles.spriteLabel}>Artwork</Text>
                <Image
                  style={styles.spriteLarge}
                  source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
                  resizeMode="contain"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  dataValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },
  spritesContainer: {
    paddingHorizontal: 5,
  },
  spriteBox: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    minWidth: 120,
  },
  spriteLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  sprite: {
    width: 100,
    height: 100,
  },
  spriteLarge: {
    width: 150,
    height: 150,
  },
});
