import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PokemonDetailResponse } from '../interfaces/pokemonResponse';

interface Props {
  pokemon: PokemonDetailResponse;
  types: string[];
}

export const PokemonCombate = ({ pokemon, types }: Props) => {
  const primaryColor = types[0] || '#78C850';
  const { stats } = pokemon;

  const getStat = (name: string) => stats.find(s => s.stat.name === name)?.base_stat || 0;

  const combate = {
    hp: getStat('hp'),
    attack: getStat('attack'),
    defense: getStat('defense'),
    spAtack: getStat('special-attack'),
    spDef: getStat('special-defense'),
    speed: getStat('speed'),
  };

  const habilidades = pokemon.abilities.map(a => ({
    nombre: a.ability?.name,
    esOculta: a.is_hidden,
  }));

  interface HeldItem {
    item: { name: string; url: string };
    version_details: { rarity: number; version: { name: string } }[];
  }

  const equipamiento = (pokemon.held_items as HeldItem[]).map(h => ({
    item: h.item.name,
    rareza: (h.version_details && h.version_details.length > 0) ? h.version_details[0].rarity : 0,
  }));

  const movimientos = pokemon.moves.map(m => ({
    nombre: m.move.name,
    metodo: m.version_group_details[0]?.move_learn_method.name,
  }));

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estadísticas Base</Text>
          
          {Object.entries(combate).map(([key, value]) => (
            <View key={key} style={styles.statRow}>
              <Text style={styles.statName}>
                {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
              </Text>
              <View style={styles.statBarContainer}>
                <View
                  style={[
                    styles.statBarFill,
                    {
                      width: `${Math.min((value / 200) * 100, 100)}%`,
                      backgroundColor: primaryColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Habilidades</Text>
          
          {habilidades.map((h, i) => (
            <View key={i} style={styles.abilityRow}>
              <Text style={styles.abilityName}>
                {h.nombre?.replace(/-/g, ' ').toUpperCase()}
              </Text>
              {h.esOculta && (
                <View style={styles.hiddenBadge}>
                  <Text style={styles.hiddenText}>OCULTA</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Equipamiento</Text>
          
          {equipamiento.length > 0 ? (
            equipamiento.map((e, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.itemName}>
                  {e.item.replace(/-/g, ' ').toUpperCase()}
                </Text>
                <Text style={styles.itemRarity}>Rareza: {e.rareza}%</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Sin equipamiento</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Movimientos (Top 10)</Text>
          
          {movimientos.slice(0, 10).map((m, i) => (
            <View key={i} style={styles.moveRow}>
              <Text style={styles.moveName}>
                {m.nombre.replace(/-/g, ' ').toUpperCase()}
              </Text>
              <Text style={styles.moveMethod}>
                {m.metodo?.replace(/-/g, ' ').toUpperCase()}
              </Text>
            </View>
          ))}
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
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 90,
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    width: 35,
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
    textAlign: 'right',
  },
  abilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  abilityName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textTransform: 'uppercase',
    flex: 1,
  },
  hiddenBadge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  hiddenText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textTransform: 'uppercase',
    flex: 1,
  },
  itemRarity: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  moveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  moveName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    textTransform: 'uppercase',
    flex: 1,
  },
  moveMethod: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
