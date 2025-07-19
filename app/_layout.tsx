import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import { OneSignalContext } from './contexts/OneSignalContext';

export default function RootLayout() {
  const [usersId, setUsersId] = useState<string | null>(null);

  // Définit l'externalUserId dans OneSignal
  // const setExternalUserId = async (externalUserId: string) => {
  //   try {
  //     await OneSignal.setExternalUserId(externalUserId);
  //     console.log("External UserID défini avec succès :", externalUserId);
  //   } catch (error) {
  //     console.log("Erreur lors de la définition de l'External UserID :", error);
  //   }
  // };

  // useEffect(() => {
  //   OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  //   OneSignal.initialize('aaff5f36-71db-4333-9b65-3c44458bc10f');
  //   OneSignal.Notifications.requestPermission(false);

  //   const getUserId = async () => {
  //     try {
  //       const deviceState = await OneSignal.getDeviceState();
  //       console.log('DeviceState:', deviceState);
  //       const userId = deviceState?.userId;
  //       setUsersId(userId || null);
  //     } catch (error) {
  //       console.log('Erreur OneSignal:', error);
  //     }
  //   };
  //   getUserId();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OneSignalContext.Provider value={{ usersId }}>
          <Slot />
        </OneSignalContext.Provider>
      </PersistGate>
    </Provider>
  );
}