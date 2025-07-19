import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable, Linking } from 'react-native';
import { Back } from '../assets/Svg/Svg';

interface Content {
  id: number;
  title: string;
  content: string;
  media?: string | null;
}

interface Props {
  content: Content;
  loading: boolean;
  categoryName?: string;
  onBack: () => void;
}

const CategoryContentDetail: React.FC<Props> = ({ content, loading, categoryName, onBack }) => {
  const GoYt = (media: string) => {
    Linking.openURL(media);
  };

  if (loading) {
    return <Text style={styles.loading}>Chargement...</Text>;
  }

  return (
    <View style={styles.bg}>
      <Pressable style={styles.buttonBack} onPress={onBack}><Back rotate={'0deg'} fill={'#000'} />
      </Pressable>
      {content.content && content.media ? (
        <>
          <TouchableOpacity onPress={() => GoYt(content.media!)}>
            <Text style={[styles.items]}>Voir la vidéo</Text>
          </TouchableOpacity>
          <ScrollView style={styles.container}>
            <View style={styles.list}>
              <Text style={styles.nameCategory}>{'\t\t\t\t\t'}{content.content}</Text>
            </View>
          </ScrollView>
        </>
      ) : content.content && !content.media ? (
        <ScrollView style={[styles.container, styles.noVidContainer]}>
          <View style={styles.list}>
            <Text style={styles.nameCategory}>{'\t\t\t\t\t'}{content.content}</Text>
          </View>
        </ScrollView>
      ) : !content.content && content.media ? (
        <TouchableOpacity onPress={() => GoYt(content.media!)}>
          <Text style={[styles.items, styles.Granditems]}>Voir la vidéo</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.noRes}>Il n'y pas d'information pour ce contenu.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  titles: {
    fontWeight: "bold"
  },
  mainTitle: {
    textAlign: "center",
    padding: 32,
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
  noVidContainer: {
    marginTop: 45,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  nameCategory: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 30
  },
  buttonBack: {
    position: 'absolute',
    top: -15,
    zIndex: 99,
    paddingVertical: 36,
    paddingLeft: 10,
  },
  buttonBackText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  items: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#04bf94',
    width: 100,
    marginLeft: 'auto',
    marginRight: 30
  },
  Granditems: {
    width: "auto",
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20
  },
  noRes: {
    color: '#333',
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 50,
    marginVertical: 25,
    textAlign: 'center',
    fontStyle: 'italic',
    borderRadius: 5
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
});

export default CategoryContentDetail;