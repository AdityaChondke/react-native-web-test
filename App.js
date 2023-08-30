import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  useWindowDimensions,
} from 'react-native';
import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: 'cacec0d9-7012-45ad-bddb-aa8aa78cb636' });

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const [pokemonCards, setPokemonCards] = useState([]);

  useEffect(() => {
    pokemon.card.where({ q: 'name:charizard'})
      .then(result => {
        setPokemonCards(result.data);
      });
  }, []);

  const numColumns = windowWidth >= 768 ? 5 : 2; 

  return (
    <View style={styles.container}>
    <Text style={styles.title}> Charizard Pokémon Cards</Text>
    <FlatList
      data={pokemonCards}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.cardContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.images.small }}
            style={styles.cardImage}
          />
        </View>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 50,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});
