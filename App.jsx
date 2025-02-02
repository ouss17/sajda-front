import React, { useEffect, useState, useRef } from 'react';
import {
  AppRegistry,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Lottie from 'lottie-react-native';

import { useNetInfo } from "@react-native-community/netinfo";

import 'react-native-gesture-handler';
import { OneSignal, LogLevel } from 'react-native-onesignal';
// import { ONESIGNAL_APP_ID } from '@env';

import Menu from './components/Menu/Menu.jsx';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

import lottiePlayer from './assets/ressources/lotties/noNet.json'
import lottiePlayerStart from './assets/ressources/lotties/start.json'
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize("aaff5f36-71db-4333-9b65-3c44458bc10f");
  OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });

  // useEffect(() => {
  //   // OneSignal Initialization
  //   OneSignal.setAppId("aaff5f36-71db-4333-9b65-3c44458bc10f");

  //   //Method for handling notifications opened
  //   OneSignal.setNotificationOpenedHandler(notification => {
  //     console.log("OneSignal: notification opened:", notification);
  //   });
  // }, [])

  const netInfo = useNetInfo();

  // useEffect(() => {
  //   console.log(netInfo, "netInfo");
  //   console.log(netInfo.type, "netInfo type ");
  //   console.log(netInfo.isConnected, "netInfo isConnected ");
  // }, [netInfo])

  const [isOk, setIsOk] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsOk(true)
    }, 2000);
  }, []);

  // const ref = useRef<AnimatedLottieView>(null);
  // useEffect(() => {
  //     setTimeout(() => ref.current?.play());

  //     return () => {
  //         ref.current?.reset();
  //     }
  // }, []);
  const lottieViewRefStart = useRef(null);
  const lottieViewRef = useRef(null);


  return (
    <>
      {/* <StatusBar hidden /> */}
      <SafeAreaView style={styles.containerBar}>
        {
          isOk ?
            <>
              {
                netInfo.isConnected
                  ?
                  <Menu />
                  :
                  <View style={styles.nowifi}>
                    {/* <Lottie style={styles.lottie} source={lottiePlayer} autoPlay loop /> */}
                    <Lottie ref={lottieViewRef} onLayout={() => { lottieViewRef.current?.play() }} source={lottiePlayer} style={styles.lottie} loop />
                    <View style={styles.netTextContainer}>
                      <Text style={[styles.nowifiText, styles.noWifiGranText]}>Erreur de connection.</Text>
                      <Text style={styles.nowifiText}>Veuillez vérifier votre connexion internet.</Text>
                    </View>
                  </View>
              }
            </>
            :
            <View style={styles.loadApp}>
              <Lottie ref={lottieViewRefStart} onLayout={() => { lottieViewRefStart.current?.play() }} source={lottiePlayerStart} style={styles.lottie} loop speed={1.5} />
              {/* <Lottie style={styles.lottie} source={lottiePlayerStart} autoPlay loop /> */}
            </View>
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  containerBar: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadApp: {
    backgroundColor: "#fff",
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  noWifiGranText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#04bf94'
  },
  nowifiText: {
    color: "#333",
    fontSize: 18,
    textAlign: 'center'
  }
})

export default App;
AppRegistry.registerComponent('App', () => App)