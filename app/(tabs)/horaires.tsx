import { useNetInfo } from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Feedback } from '../../assets/Svg/Svg';
import { addMasdjid } from '../../reducers/masdjidReducer';
import { removeUser } from '../../reducers/userReducer';
import CreateFeedback from '../createFeedback';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const daysArabic: Record<string, string> = {
  dimanche: "Al-Ahad",
  lundi: "Al-Ithnayn",
  mardi: "Ath-Thulatha",
  mercredi: "Al-Arbaa",
  jeudi: "Al-Khamees",
  vendredi: "Al-Jumuah",
  samedi: "As-Sabt",
};

const Horaires = () => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();


  const user = useSelector((state: any) => state.user.value);
  const masdjid = useSelector((state: any) => state.masdjid.value);
  const masdjidConfig = useSelector((state: any) => state.masdjid.config);


  const [date, setDate] = useState(new Date());
  const [currentFrDate, setCurrentFrDate] = useState('');
  const [currentHour, setCurrentHour] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [currentPrayer, setCurrentPrayer] = useState('none');
  const [horaires, setHoraires] = useState<string[]>([]);
  const [isFeedback, setIsFeedback] = useState(false);

  // Dates formatting
  useEffect(() => {
    setCurrentFrDate(
      new Intl.DateTimeFormat('fr-TN-u-ca-islamic', {
        day: 'numeric', month: 'long', weekday: 'long', year: 'numeric'
      })
        .format(Date.now())
        .split(' ')
        .map((v, i) => i === 0 ? daysArabic[v] : v)
        .join(' ')
    );
    setCurrentHour(
      `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    );
    setHijriDate(
      new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
        day: 'numeric', month: 'long', weekday: 'long', year: 'numeric'
      }).format(Date.now())
    );
  }, [date]);


  const fetchMasdjid = useCallback(async () => {
    try {
        
      const res = await fetch(`${API_URL}/mosquees/1`);
      const data = await res.json();
      dispatch(addMasdjid(data.data));
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => { fetchMasdjid(); }, [fetchMasdjid]);

  // Rafraîchissement auto
  useEffect(() => {
    const interval = setInterval(() => fetchMasdjid(), 10000);
    return () => clearInterval(interval);
  }, [fetchMasdjid]);


  useEffect(() => {
    const fetchHoraires = async () => {
      try {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;

        const res = await fetch(`${API_URL}/mosquees/csv/1/${year}`);
        const data = await res.json();
        setHoraires(data.data[formattedDate] || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHoraires();
  }, [date, netInfo.isConnected]);

  // Rafraîchit l'heure et la prière courante
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDate(now);

      if (horaires.length > 0) {
        const hourStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        if (hourStr === horaires[0]) setCurrentPrayer('fajr');
        else if (hourStr === horaires[2]) setCurrentPrayer('dhuhr');
        else if (hourStr === horaires[3]) setCurrentPrayer('asr');
        else if (hourStr === horaires[4]) setCurrentPrayer('maghrib');
        else if (hourStr === horaires[5]) setCurrentPrayer('isha');
        else setCurrentPrayer('none');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [horaires]);

  // Vérification de la date de connexion
  useEffect(() => {
    if (!user?.lastLogin) {
      dispatch(removeUser(null));
      return;
    }
    const lastLoginDate = new Date(user.lastLogin);
    const now = new Date();
    const diff = now.getTime() - lastLoginDate.getTime();
    if (diff > 24 * 60 * 60 * 1000) {
      dispatch(removeUser(null));
    }
  }, [dispatch, user?.lastLogin]);

  const imageStyle = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch' as const,
    position: 'absolute' as const,
    top: 0, left: 0, right: 0, bottom: 0, zIndex: -1,
  };
const nextPrayerIdx = getNextPrayerIndex(horaires, date);
  return (
    <SafeAreaView>
      <Image style={[styles.bg2, imageStyle]} source={require('../../assets/ressources/pages/horaires.png')} />
      {isFeedback && <CreateFeedback setIsFeedback={setIsFeedback} />}
      <View style={styles.containerDate}>
        <Text style={[styles.title, styles.titleFr]}>{currentFrDate}</Text>
        <Text style={[styles.title, styles.titleHour]}>{currentHour}</Text>
        <Text style={[styles.title, styles.titleAr]}>{hijriDate}</Text>
      </View>
      {user?.id && (
        <Pressable onPress={() => setIsFeedback(true)} style={styles.feedBack}>
          <Feedback width={35} height={35} fill="#fff" />
        </Pressable>
      )}
      <ScrollView style={styles.scrollView}>
        {masdjid?.name && (
          <Text style={[styles.masjidName, styles.texts]}>Mosquée {masdjid.name}</Text>
        )}
        <View style={[styles.hourSalat, styles.noPad]}>
          <Text style={styles.texts}>Prière</Text>
          <Text style={styles.texts}>Adhan (+iqama)</Text>
          <Text style={styles.texts}>صلاة</Text>
        </View>
        {horaires.length > 0 && (
          <View style={styles.salatHoursPage}>
            <View style={[styles.hourSalat, currentPrayer === 'fajr' && styles.prayIt, nextPrayerIdx === 0 && styles.nextPrayer]}>
              <Text style={[styles.text, styles.nameFrench, currentPrayer === 'fajr' && styles.prayItText]}>Fajr</Text>
              <Text style={[styles.text, styles.timeSalat, currentPrayer === 'fajr' && styles.prayItText]}>
                {horaires[0]}{masdjidConfig?.iqamaFajr ? ` (+${masdjidConfig.iqamaFajr})` : ''}
              </Text>
              <Text style={[styles.text, styles.nameArabic, currentPrayer === 'fajr' && styles.prayItText]}>الفجر</Text>
            </View>
            <View style={[styles.hourSalat, currentPrayer === 'dhuhr' && styles.prayIt, nextPrayerIdx === 2 && styles.nextPrayer]}>
              <Text style={[styles.text, styles.nameFrench, currentPrayer === 'dhuhr' && styles.prayItText]}>Dhuhr</Text>
              <Text style={[styles.text, styles.timeSalat, currentPrayer === 'dhuhr' && styles.prayItText]}>
                {horaires[2]}{masdjidConfig?.iqamaDhuhr ? ` (+${masdjidConfig.iqamaDhuhr})` : ''}
              </Text>
              <Text style={[styles.text, styles.nameArabic, currentPrayer === 'dhuhr' && styles.prayItText]}>الظهر</Text>
            </View>
            <View style={[styles.hourSalat, currentPrayer === 'asr' && styles.prayIt, nextPrayerIdx === 3 && styles.nextPrayer]}>
              <Text style={[styles.text, styles.nameFrench, currentPrayer === 'asr' && styles.prayItText]}>Asr</Text>
              <Text style={[styles.text, styles.timeSalat, currentPrayer === 'asr' && styles.prayItText]}>
                {horaires[3]}{masdjidConfig?.iqamaAsr ? ` (+${masdjidConfig.iqamaAsr})` : ''}
              </Text>
              <Text style={[styles.text, styles.nameArabic, currentPrayer === 'asr' && styles.prayItText]}>العصر</Text>
            </View>
            <View style={[styles.hourSalat, currentPrayer === 'maghrib' && styles.prayIt, nextPrayerIdx === 4 && styles.nextPrayer]}>
              <Text style={[styles.text, styles.nameFrench, currentPrayer === 'maghrib' && styles.prayItText]}>Maghrib</Text>
              <Text style={[styles.text, styles.timeSalat, currentPrayer === 'maghrib' && styles.prayItText]}>
                {horaires[4]}{masdjidConfig?.iqamaMaghrib ? ` (+${masdjidConfig.iqamaMaghrib})` : ''}
              </Text>
              <Text style={[styles.text, styles.nameArabic, currentPrayer === 'maghrib' && styles.prayItText]}>المغرب</Text>
            </View>
            <View style={[styles.hourSalat, currentPrayer === 'isha' && styles.prayIt, nextPrayerIdx === 5 && styles.nextPrayer]}>
              <Text style={[styles.text, styles.nameFrench, currentPrayer === 'isha' && styles.prayItText]}>Isha</Text>
              <Text style={[styles.text, styles.timeSalat, currentPrayer === 'isha' && styles.prayItText]}>
                {horaires[5]}{masdjidConfig?.iqamaIsha ? ` (+${masdjidConfig.iqamaIsha})` : ''}
              </Text>
              <Text style={[styles.text, styles.nameArabic, currentPrayer === 'isha' && styles.prayItText]}>العشاء</Text>
            </View>
          </View>
        )}
        {masdjidConfig?.jumuas && (
          <>
            <View style={styles.juumua}>
              <View style={[{ borderStyle: 'dashed', borderBottomWidth: 2, borderBottomColor: "#04bf94" }, styles.dashed]} />
              <Text style={styles.juumuaTitle}>Juumua(s) | الجمعة</Text>
            </View>
            <View style={styles.jumuasShow}>
              {(masdjidConfig.jumuas.includes(',') ?
                masdjidConfig.jumuas.split(',').map((jumua: string, idx: number) => (
                  <Text style={styles.jumuaShowTxt} key={idx}>{jumua}</Text>
                )) :
                <Text style={styles.jumuaShowTxt}>{masdjidConfig.jumuas}</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

function getNextPrayerIndex(horaires: string[], now: Date) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < horaires.length; i++) {
    const [h, m] = horaires[i].split(':').map(Number);
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > nowMinutes) return i;
  }
  return -1;
}

const styles = StyleSheet.create({
  feedBack: {
    flex: 1,
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4, 191, 148, 0.7)',
    padding: 10,
    borderRadius: 100
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  containerDate: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  scrollView: {
    marginBottom: 120,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginHorizontal: 25,
    borderRadius: 25,
    padding: 15,
  },
  hourSalat: {
    paddingHorizontal: 35,
    paddingVertical: 8,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  noPad: {
    paddingVertical: 0
  },
  text: {
    fontWeight: 'bold',
    color: '#333'
  },
  texts: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#333'
  },
  masjidName: {
    fontSize: 18,
  },
  titleFr: {
    fontSize: 18,
    marginBottom: '20%',
  },
  titleHour: {
    color: '#fff',
    marginBottom: '15%',
    fontSize: 30
  },
  titleAr: {
    color: '#fff',
    fontSize: 23,
  },
  prayIt: {
    backgroundColor: '#04bf94',
  },
  bg2: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  prayItText: {
    color: '#fff'
  },
  nameFrench: {
    color: '#333',
    flex: 1,
    textAlign: "left",
  },
  timeSalat: {
    color: '#333',
    flex: 1,
    textAlign: "center",
  },
  nameArabic: {
    color: '#333',
    flex: 1,
    textAlign: "right",
  },
  title: {
    color: '#333',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  juumua: {
    position: 'relative',
    height: 36,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column"
  },
  dashed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 19.5
  },
  juumuaTitle: {
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 2.5,
    color: '#04bf94',
    fontSize: 18,
    backgroundColor: '#e5f9f4',
    borderRadius: 5
  },
  jumuasShow: {
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  jumuaShowTxt: {
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 35,
    paddingVertical: 8,
  },
  salatHoursPage: {
    marginTop: 10,
    marginBottom: 20,
  },
  nextPrayer: {
    backgroundColor: '#43ea9c',
    borderWidth: 2,
    borderColor: '#04bf94',
  },
});

export default Horaires;
