import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, Image, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Pin } from '../../assets/Svg/Svg';

const lottiePlayer = require('../../assets/ressources/lotties/loca.json');

const { width, height } = Dimensions.get('window');

const Localisation = () => {
  const masdjid = useSelector((state: any) => state.masdjid.value);

  const ouvrirGoogleMaps = () => {
    if (!masdjid?.address) return;
    const adresse = `${masdjid.address} ${masdjid.city}, ${masdjid.zip} ${masdjid.country}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;
    Linking.openURL(url);
  };

  const openSocial = (adrs: string) => {
    if (adrs) Linking.openURL(adrs);
  };

  return (
    <View style={styles.container}>
      <LottieView style={styles.lottie} source={lottiePlayer} autoPlay loop />
      {masdjid && (
        <View style={styles.localisation}>
          <Text style={styles.texts}>Mosquée : {masdjid.name}</Text>
          <Text style={styles.texts}>
            Adresse : {masdjid.address} {masdjid.city}, {masdjid.zip} {masdjid.country}
          </Text>
          <Text style={styles.texts}>Téléphone : {masdjid.numero}</Text>
          {(masdjid.facebook || masdjid.instagram || masdjid.twitter) && (
            <View style={styles.socialContent}>
              {masdjid.facebook ? (
                <Pressable onPress={() => openSocial(masdjid.facebook)}>
                  <Image style={styles.social} source={require('../../assets/ressources/pics/fb.png')} />
                </Pressable>
              ) : null}
              {masdjid.instagram ? (
                <Pressable onPress={() => openSocial(masdjid.instagram)}>
                  <Image style={styles.social} source={require('../../assets/ressources/pics/insta.png')} />
                </Pressable>
              ) : null}
              {masdjid.twitter ? (
                <Pressable onPress={() => openSocial(masdjid.twitter)}>
                  <Image style={styles.social} source={require('../../assets/ressources/pics/tw.png')} />
                </Pressable>
              ) : null}
            </View>
          )}
          <TouchableOpacity style={styles.pin} onPress={ouvrirGoogleMaps}>
            <Text style={styles.pinText}>Localiser la mosquée</Text>
            <Pin />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localisation: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    position: "absolute",
    bottom: 135,
    left: 10,
    zIndex: 1,
    width: "95%",
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  texts: {
    color: '#333'
  },
  lottie: {
    position: 'absolute',
    top: -500,
    bottom: -50,
    right: -50,
    left: -75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 1.35,
    height: height * 2
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  social: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  pinText: {
    color: '#04bf94',
    marginRight: 8,
  },
  pin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default Localisation;
