import React from 'react';
import { ScrollView, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Category } from '../types';

interface Props {
  categories: Category[];
  loading: boolean;
  onSelect: (category: Category) => void;
}

const CategoryList: React.FC<Props> = ({ categories, loading, onSelect }) => (
  <ScrollView style={styles.container}>
    <View style={styles.list}>
      {loading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : categories.length > 0 ? (
        categories
          .filter(category => category.name.toLowerCase() !== "actualités")
          .map(category => (
            <TouchableOpacity
              style={styles.containCategory}
              key={category.id}
              onPress={() => onSelect(category)}
            >
              <Image
                style={styles.imageMedia}
                source={require('../assets/ressources/pics/media.png')}
              />
              <Text style={styles.nameCategory}>{category.name}</Text>
            </TouchableOpacity>
          ))
      ) : (
        <Text style={styles.loading}>Aucune catégorie</Text>
      )}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 120,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containCategory: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  imageMedia: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  nameCategory: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
});

export default CategoryList;