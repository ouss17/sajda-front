import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import Constants from "expo-constants";
import { useSelector } from 'react-redux';
import { Back, Check } from '../assets/Svg/Svg';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRedirectIfNoRole } from '@/hooks/useRedirectIfNoRole';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const MyFeedbacks = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.value);

  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([]);
  const [openedContentIndex, setOpenedContentIndex] = useState<number | null>(null);
  const [responses, setResponses] = useState<{ [key: number]: { response: string, pseudo: string } }>({});
  const scrollView = useRef<ScrollView>(null);

useRedirectIfNoRole(user);


  const getFeedbacks = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${API_URL}/feedbacks/user/${user.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setAllFeedbacks(data.data || []);
    } catch (err) {
      setAllFeedbacks([]);
    }
  };

  useEffect(() => {
    getFeedbacks();
    const intervalId = setInterval(getFeedbacks, 10000);
    return () => clearInterval(intervalId);
  }, [user?.id]);

  const handleClick = async (feedback: any) => {
    const isOpen = feedback.id === openedContentIndex;
    setOpenedContentIndex(isOpen ? null : feedback.id);

    if (!isOpen && feedback.responded === 1 && !responses[feedback.id]) {
      try {
        const res = await fetch(`${API_URL}/responses/feedback/${feedback.id}`);
        const data = await res.json();
        
        if (data.data && data.data.length > 0) {
          const responseText = data.data[0].response;
          const responderId = data.data[0].id_user;
          let pseudo = '';
          if (responderId) {
            const userRes = await fetch(`${API_URL}/users/${responderId}`);
            const userData = await userRes.json();
            pseudo = userData.data?.pseudo || '';
          }
          setResponses(prev => ({
            ...prev,
            [feedback.id]: { response: responseText, pseudo }
          }));
        }
      } catch (err) {
        setResponses(prev => ({
          ...prev,
          [feedback.id]: { response: "Erreur lors de la récupération de la réponse.", pseudo: "" }
        }));
      }
    }
  };

  // Format la date en "DD/MM/YYYY HH:mm"
  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.replace(' ', 'T'));
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hour = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const sec = String(d.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${min}:${sec}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
        <Back rotate={'0deg'} fill={'#fff'} />
      </Pressable>
      <Text style={styles.mainTitle}>Mes retours</Text>
      <ScrollView ref={scrollView} style={styles.scrollView}>
        {allFeedbacks && allFeedbacks.length > 0 ? (
          allFeedbacks.map((feedback: any) => (
            <Pressable key={feedback.id} style={styles.actuContainer} onPress={() => handleClick(feedback)}>
              <View style={styles.dateAndBadge}>
                <Text style={styles.date}>
                  {formatDateTime(feedback.created_at || feedback.creationTimestamp)}
                </Text>
                {feedback.checked ? (
                  <View style={{ marginLeft: 10, width: 30, height: 30 }}>
                    <Check fill="#04bf94" stroke="#fff" />
                  </View>
                ) : ""}
                {feedback.responded ? (
                  <Text style={styles.texts}>Réponse disponible</Text>
                ) : ""}
              </View>
              <Text style={styles.title}>{feedback.title}</Text>
              <View style={styles.contentContainer}>
                <View style={styles.more}>
                  {openedContentIndex === feedback.id
                    ? <Text style={styles.moreText}>Voir moins</Text>
                    : <Text style={styles.moreText}>Voir plus</Text>
                  }
                  <View style={[styles.moreIcon, openedContentIndex === feedback.id && styles.moreIconActive]}>
                    <Back rotate={openedContentIndex === feedback.id ? '-90deg' : '90deg'} fill={'#fff'} />
                  </View>
                </View>
                {openedContentIndex === feedback.id && (
                  <>
                    <Text style={styles.content}>{feedback.detail}</Text>
                    <Text style={styles.target}>
                      Adressé à : {feedback.target === "masdjid" ? "Mosquée" :
                                   feedback.target === "developper" ? "Application" :
                                   feedback.target === "imam" ? "Imam" :
                                   feedback.target}
                    </Text>
                    {feedback.responded === 1 && responses[feedback.id] && (
                      <View style={styles.responseContainer}>
                        <Text style={styles.responseTitle}>Réponse de {responses[feedback.id].pseudo} :</Text>
                        <Text style={styles.responseText}>{responses[feedback.id].response}</Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noRes}>Aucun retours d'utilisateurs pour le moment.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  mainTitle: {
    textAlign: "center",
    padding: 32,
    backgroundColor: "#04bf94",
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },
  dateAndBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0,
  },
  date: {
    color: '#04bf94',
    fontWeight: 'bold',
    opacity: 0.6,
  },
  actuContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    marginHorizontal: 30,
    position: 'relative',
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    top: 55,
    paddingLeft: 10,
  },
  buttonBackText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollView: {
    marginBottom: 120,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  contentContainer: {
    backgroundColor: '#04bf94',
    padding: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  more: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  moreText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 16
  },
  moreIcon: {},
  moreIconActive: {},
  content: {
    textAlign: "justify",
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 5,
    fontWeight: 'bold'
  },
  texts: {
    color: '#888',
    marginLeft: "auto",
    fontStyle: "italic",
    fontSize: 12
  },
  responseContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  responseTitle: {
    color: '#04bf94',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseText: {
    color: '#333',
    fontSize: 16,
  },
  target: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});

export default MyFeedbacks;
