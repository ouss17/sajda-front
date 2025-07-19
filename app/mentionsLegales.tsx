import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Back } from '../assets/Svg/Svg';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const MentionsLegales = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.bgGray}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
        <Text style={styles.buttonBackText}>
          <Back rotate={'0deg'} fill={'#fff'} />
        </Text>
      </Pressable>
      <Text style={styles.mainTitle}>
        Mentions légales
      </Text>
      <ScrollView style={styles.containerForm}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Éditeur de l’application</Text>
          <Text style={styles.texts}>
            Sajda, éditée par Ousmane Diarra.
          </Text>
          <Text style={styles.sectionTitle}>Responsable de la publication</Text>
          <Text style={styles.texts}>
            Ousmane Diarra, mr.ousmanediarra@gmail.com
          </Text>
          <Text style={styles.sectionTitle}>Propriété intellectuelle</Text>
          <Text style={styles.texts}>
            Tous les contenus présents sur l’application Sajda sont protégés par le droit d’auteur. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Doranco.
          </Text>
          <Text style={styles.sectionTitle}>Données personnelles</Text>
          <Text style={styles.texts}>
            Les informations recueillies font l’objet d’un traitement informatique destiné à améliorer l’expérience utilisateur. Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d’accès aux données vous concernant et les faire rectifier en contactant : contact@sajda.fr.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgGray: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainTitle: {
    textAlign: "center",
    padding: 32,
    backgroundColor: "#04bf94",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  containerForm: {
    marginBottom: 120,
  },
  form: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    color: "#04bf94",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  texts: {
    color: "#333",
    fontSize: 16,
    marginBottom: 10,
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    top: 55,
    paddingLeft: 10,
  },
  buttonBackText: {
    color: "#fff",
  },
});

export default MentionsLegales;
