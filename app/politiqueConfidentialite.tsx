import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Back } from '../assets/Svg/Svg';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const PolitiqueConfidentialite = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.bgGray}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
        <Text style={styles.buttonBackText}>
          <Back rotate={'0deg'} fill={'#fff'} />
        </Text>
      </Pressable>
      <Text style={styles.mainTitle}>
        Politique de confidentialité
      </Text>
      <ScrollView style={styles.containerForm}>
        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Collecte des données</Text>
          <Text style={styles.texts}>
            L’application Sajda collecte uniquement les données nécessaires à son fonctionnement et à l’amélioration de l’expérience utilisateur. Aucune donnée sensible n’est enregistrée sans votre consentement.
          </Text>
          <Text style={styles.sectionTitle}>Utilisation des données</Text>
          <Text style={styles.texts}>
            Les données collectées sont utilisées pour personnaliser les notifications, améliorer les services et garantir la sécurité de l’application.
          </Text>
          <Text style={styles.sectionTitle}>Partage des données</Text>
          <Text style={styles.texts}>
            Vos données ne sont jamais vendues ni partagées à des tiers, sauf obligation légale ou demande des autorités compétentes.
          </Text>
          <Text style={styles.sectionTitle}>Sécurité</Text>
          <Text style={styles.texts}>
            Nous mettons en œuvre des mesures de sécurité pour protéger vos informations contre tout accès non autorisé, altération ou destruction.
          </Text>
          <Text style={styles.sectionTitle}>Droits de l’utilisateur</Text>
          <Text style={styles.texts}>
            Vous pouvez demander la suppression ou la modification de vos données à tout moment en contactant : contact@sajda.fr.
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

export default PolitiqueConfidentialite;
