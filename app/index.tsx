import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';


import lottiePlayer from '../assets/ressources/lotties/noNet.json';
import lottiePlayerStart from '../assets/ressources/lotties/start.json';

const Index = () => {
  const netInfo = useNetInfo();
  const [isOk, setIsOk] = useState(false);
  const lottieViewRefStart = useRef<LottieView>(null);
  const lottieViewRef = useRef<LottieView>(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsOk(true), 2000);
  }, []);

  useEffect(() => {
    if (isOk && netInfo.isConnected) {
      router.replace('/horaires');
    }
  }, [isOk, netInfo.isConnected, router]);

  if (!isOk) {
    return (
      <View style={styles.loadApp}>
        <LottieView
          ref={lottieViewRefStart}
          onLayout={() => lottieViewRefStart.current?.play()}
          source={lottiePlayerStart}
          style={styles.lottie}
          loop
          speed={1.5}
        />
      </View>
    );
  }

  if (!netInfo.isConnected) {
    return (
      <View style={styles.nowifi}>
        <LottieView
          ref={lottieViewRef}
          onLayout={() => lottieViewRef.current?.play()}
          source={lottiePlayer}
          style={styles.lottie}
          loop
        />
        <View style={styles.netTextContainer}>
          <Text style={[styles.nowifiText, styles.noWifiGranText]}>
            Erreur de connexion.
          </Text>
          <Text style={styles.nowifiText}>
            Veuillez vérifier votre connexion internet.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenue sur Sajda !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  menuContainer: { marginBottom: 32 },
  button: {
    backgroundColor: '#04bf94',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  welcome: { textAlign: 'center', marginTop: 20, fontSize: 18 },
  loadApp: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowifi: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  netTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  noWifiGranText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#04bf94',
  },
  nowifiText: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
  },
  lottie: {
    width: 400,
    height: 400,
  },
});

export default Index;
