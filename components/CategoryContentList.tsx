import { Back } from '@/assets/Svg/Svg';
import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';

interface Content {
  id: number;
  title: string;
  content: string;
}

interface Props {
  contents: Content[];
  loading: boolean;
  onSelect: (content: Content) => void;
  onBack: () => void;
  categoryName?: string;
}

const CategoryContentList: React.FC<Props> = ({ contents, loading, onSelect, onBack, categoryName }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.header}>
      <Pressable style={styles.buttonBack} onPress={onBack}>
        <Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#000'} /></Text>
      </Pressable>
    </View>
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        {loading ? (
          <Text style={styles.loading}>Chargement...</Text>
        ) : contents.length > 0 ? (
          contents.map((content, index) => (
            <React.Fragment key={content.id}>
              <TouchableOpacity
                style={styles.containCategory}
                onPress={() => onSelect(content)}
              >
                <View style={styles.numberMediaContent}>
                  <Text style={styles.numberMedia}>{index + 1}</Text>
                </View>
                <Text style={styles.nameCategory}>
                  {content.title.length < 30 ? content.title : content.title.substring(0, 27) + "..."}
                </Text>
              </TouchableOpacity>
              {index + 1 !== contents.length && (
                <View style={styles.sep}></View>
              )}
            </React.Fragment>
          ))
        ) : (
          <Text style={styles.loading}>Aucun contenu pour cette catégorie</Text>
        )}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  titles: {
    fontWeight: "bold"
  },
  mainTitle: {
    flex: 1,
    textAlign: "center",
    padding: 32,
    marginBottom: 0,
    color: "white",
    fontSize: 28,
    backgroundColor: "#04bf94",
    textTransform: "capitalize"
  },
  container: {
    marginHorizontal: 30,
    marginBottom: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  containCategory: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 10
  },
  numberMediaContent: {
    backgroundColor: 'rgba(4, 191, 148, 0.1)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  numberMedia: {
    color: '#04bf94',
    transform: [{ scale: 1.5 }],
    width: 20,
    height: 20,
    textAlign: 'center'
  },
  nameCategory: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 5,
    marginRight: 'auto',
    marginLeft: 20,
  },
  buttonBack: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonBackText: {
    color: "#04bf94",
    fontWeight: "bold",
    fontSize: 16,
  },
  sep: {
    width: '85%',
    height: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(4, 191, 148, 0.4)',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
});

export default CategoryContentList;