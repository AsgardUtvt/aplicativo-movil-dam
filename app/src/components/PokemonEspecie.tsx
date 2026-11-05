import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PokemonDetailResponse } from '../interfaces/pokemonResponse';
import { useEffect, useState } from 'react';

interface Props {
  pokemon: PokemonDetailResponse;
  types: string[];
}

interface PokemonSpeciesResponse {
  color: { name: string };
  habitat: { name: string } | null;
  gender_rate: number;
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

export const PokemonEspecie = ({ pokemon, types }: Props) => {
  const [detalleEspecie, setDetalleEspecie] = useState<any>(null);
  const primaryColor = types[0] || '#78C850';

  const tipos = pokemon.types.map(t => t.type.name);
  const especieBase = pokemon.species.name;
  const urlEspecie = pokemon.species.url;

  useEffect(() => {
    const obtenerEspecie = async () => {
      const detalles = await getSpeciesDetails(urlEspecie);
      setDetalleEspecie(detalles);
    };

    obtenerEspecie();
  }, [urlEspecie]);

  const getSpeciesDetails = async (url: string) => {
    const res = await fetch(url);
    const data: PokemonSpeciesResponse = await res.json();
    return {
      color: data.color.name,
      habitat: data.habitat?.name || 'Desconocido',
      genero: data.gender_rate === -1 ? 'Sin género' : 'Con género',
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información de Especie</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Especie Base:</Text>
            <Text style={styles.dataValue}>{especieBase.toUpperCase()}</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Orden:</Text>
            <Text style={styles.dataValue}>#{pokemon.order}</Text>
          </View>
        </View>

        {/* Tipos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tipos</Text>
          
          <View style={styles.typesContainer}>
            {tipos.map((tipo, i) => (
              <View
                key={i}
                style={[
                  styles.typeBadge,
                  { borderColor: primaryColor },
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    { color: primaryColor },
                  ]}
                >
                  {tipo.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalles de Especie</Text>
          
          {detalleEspecie ? (
            <>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Color:</Text>
                <Text style={styles.dataValue}>{detalleEspecie.color.toUpperCase()}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Hábitat:</Text>
                <Text style={styles.dataValue}>{detalleEspecie.habitat.toUpperCase()}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Género:</Text>
                <Text style={styles.dataValue}>{detalleEspecie.genero}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Cargando detalles...</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

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
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  typeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
