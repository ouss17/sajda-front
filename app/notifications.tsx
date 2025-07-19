import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Switch, Alert } from 'react-native';
import { Back } from '../assets/Svg/Svg';
import { useRouter } from 'expo-router';
import Constants from "expo-constants";
import { SafeAreaView } from 'react-native-safe-area-context';

const PRAYERS = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'dhuhr', label: 'Dhor' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
];

type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
type SubsType = Record<PrayerKey, boolean>;

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Notifications = () => {
  const [subAll, setSubAll] = useState(false);
  const [subs, setSubs] = useState<SubsType>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const scrollView = useRef(null);
  const router = useRouter();

  const externalId = "USER_EXTERNAL";

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch(`${API_URL}/notifications/external/${externalId}`);
        const data = await res.json();
        if (data.result && data.data) {
          setSubs({
            fajr: !!data.data.fajr,
            dhuhr: !!data.data.dhuhr,
            asr: !!data.data.asr,
            maghrib: !!data.data.maghrib,
            isha: !!data.data.isha,
          });
          setSubAll(!!data.data.all);
        }
      } catch (err) {
      }
    };
    fetchPreferences();
  }, [externalId]);

  const toggleAll = () => {
    const newValue = !subAll;
    setSubAll(newValue);
    setSubs({
      fajr: newValue,
      dhuhr: newValue,
      asr: newValue,
      maghrib: newValue,
      isha: newValue,
    });
  };

  const togglePrayer = (key: PrayerKey) => {
    setSubs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalId,
          all: subAll,
          ...subs,
        }),
      });
      
      if (res.ok) {
        setSaveMessage("Préférences enregistrées !");
      } else {
        setSaveMessage("Erreur lors de l'enregistrement");
      }
    } catch (err) {
      setSaveMessage("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  return (
    <SafeAreaView style={styles.bgGray}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
          <Back rotate={'0deg'} fill={'#fff'} />
      </Pressable>
      <Text style={styles.mainTitle}>
        Notifications
      </Text>
      <ScrollView ref={scrollView} style={styles.containerForm}>
        <View style={styles.form}>
          <View style={styles.params}>
            <Text style={styles.titleForm}>Toutes les notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#017a5f' }}
              thumbColor={subAll ? '#04bf94' : '#f4f3f4'}
              ios_backgroundColor="#04bf94"
              onValueChange={toggleAll}
              value={subAll}
            />
          </View>
          {PRAYERS.map(prayer => (
            <View style={styles.params} key={prayer.key}>
              <Text style={styles.titleForm}>{prayer.label}</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#017a5f' }}
                thumbColor={subs[prayer.key as PrayerKey] ? '#04bf94' : '#f4f3f4'}
                ios_backgroundColor="#04bf94"
                onValueChange={() => togglePrayer(prayer.key as PrayerKey)}
                value={subs[prayer.key as PrayerKey]}
              />
            </View>
          ))}
          <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Enregistrement..." : "Enregistrer"}</Text>
          </Pressable>
          {saveMessage && (
            <Text style={styles.successAction}>{saveMessage}</Text>
          )}
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
  params: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  titleForm: {
    color: "#333",
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    top: 55,
    paddingLeft: 10,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#04bf94',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 50,
    marginBottom: 20
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold'
  },
  successAction: {
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: "#04bf94",
    textAlign: "center",
    borderRadius: 16,
    marginTop: 10,
  },
});

export default Notifications;
