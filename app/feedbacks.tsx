import Constants from "expo-constants";
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Back, Check } from '../assets/Svg/Svg';
import { useRedirectIfRoleNotAllowed } from "@/hooks/useRedirectIfRoleNotAllowed";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Feedbacks = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.value);
  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([]);
  const [openedContentIndex, setOpenedContentIndex] = useState<number | null>(null);
  const [authors, setAuthors] = useState<{ [key: number]: string }>({});
  const [responses, setResponses] = useState<{ [key: number]: { response: string, pseudo: string } }>({});
  const [responseInput, setResponseInput] = useState<{ [key: number]: string }>({});
  const [sending, setSending] = useState<{ [key: number]: boolean }>({});
  const [targetFilter, setTargetFilter] = useState<'all' | 'mosquee' | 'admin' | 'imam'>('all');
  const scrollView = useRef<ScrollView>(null);

useRedirectIfRoleNotAllowed(user, ["admin", "gerant", "imam", "dev"]);


  const roleTargets: { [key: string]: Array<'mosquee' | 'admin' | 'imam'> } = {
    admin: ['mosquee', 'admin', 'imam'],
    dev : ['mosquee', 'admin', 'imam'],
    gerant: ['mosquee', 'imam'],
    imam: ['imam'],
  };

  const availableTargets = roleTargets[user?.role] || [];
  

  const getFeedbacks = async () => {
    try {
      const res = await fetch(`${API_URL}/feedbacks/mosquee/1`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setAllFeedbacks(data.data || []);

      if (data.data) {
        data.data.forEach(async (feedback: any) => {
          if (feedback.id_user && !authors[feedback.id]) {
            try {
              const userRes = await fetch(`${API_URL}/users/${feedback.id_user}`);
              const userData = await userRes.json();
              setAuthors(prev => ({
                ...prev,
                [feedback.id]: userData.data?.pseudo || 'Anonyme'
              }));
            } catch {
              setAuthors(prev => ({
                ...prev,
                [feedback.id]: 'Anonyme'
              }));
            }
          }
        });
      }
    } catch (err) {
      setAllFeedbacks([]);
    }
  };

  useEffect(() => {
    getFeedbacks();
    const intervalId = setInterval(getFeedbacks, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = async (feedback: any) => {
    const isOpen = feedback.id === openedContentIndex;
    setOpenedContentIndex(isOpen ? null : feedback.id);

    if (!feedback.checked) {
      try {
        
        await fetch(`${API_URL}/feedbacks/update/${feedback.id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ checked: "1", responded: "0"}),
        });
        setAllFeedbacks(prev =>
          prev.map(f =>
            f.id === feedback.id ? { ...f, checked: true } : f
          )
        );
      } catch (err) {
      }
    }

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

  const filteredFeedbacks = allFeedbacks.filter(fb => fb.target === targetFilter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Pressable style={styles.buttonBack} onPress={() => router.back()}>
        <Back rotate={'0deg'} fill={'#fff'} />
      </Pressable>
      <Text style={styles.mainTitle}>Retours utilisateurs</Text>
      <View style={styles.menu}>
        {availableTargets.map(target => (
          <Pressable key={target} onPress={() => setTargetFilter(target)}>
            <Text style={[
              styles.menuItem,
              { backgroundColor: targetFilter === target ? "#04bf94" : 'rgba(4, 191, 148, 0.1)', color: targetFilter === target ? "#fff" : "#04bf94" }
            ]}>
              {target === 'mosquee' ? 'Mosquée' : target === 'admin' ? 'Application' : 'Imam'}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView ref={scrollView} style={styles.scrollView}>
        {filteredFeedbacks && filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback: any) => (
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
              <Text style={styles.author}>Par : {authors[feedback.id] || "..."}</Text>
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
                      adressé à : {feedback.target === "mosquee" ? "Mosquée" :
                                   feedback.target === "admin" ? "Application" :
                                   feedback.target === "imam" ? "Imam" :
                                   feedback.target}
                    </Text>
                    {feedback.responded === 1 && responses[feedback.id] && (
                      <View style={styles.responseContainer}>
                        <Text style={styles.responseTitle}>Réponse de {responses[feedback.id].pseudo} :</Text>
                        <Text style={styles.responseText}>{responses[feedback.id].response}</Text>
                      </View>
                    )}
                    {feedback.responded !== 1 && (
                      <View style={styles.replyContainer}>
                        <Text style={styles.replyLabel}>Répondre :</Text>
                        <TextInput
                          style={styles.replyInput}
                          value={responseInput[feedback.id] || ""}
                          onChangeText={text =>
                            setResponseInput(prev => ({ ...prev, [feedback.id]: text }))
                          }
                          placeholder="Votre réponse..."
                          multiline
                        />
                        <Pressable
                          style={styles.replyButton}
                          onPress={async () => {
                            setSending(prev => ({ ...prev, [feedback.id]: true }));
                            try {
                              await fetch(`${API_URL}/responses`, {
                                method: 'POST',
                                headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify({
                                  response: responseInput[feedback.id],
                                  idFeedback: feedback.id,
                                  idUserWhoAsk: feedback.id_user,
                                }),
                              });

                              await fetch(`${API_URL}/feedbacks/update/${feedback.id}`, {
                                method: 'PUT',
                                headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify({ checked : 1, responded: "1" }),
                              });

                              setResponseInput(prev => ({ ...prev, [feedback.id]: "" }));
                              getFeedbacks();
                            } catch (err) {
                            }
                            setSending(prev => ({ ...prev, [feedback.id]: false }));
                          }}
                          disabled={sending[feedback.id] || !responseInput[feedback.id]}
                        >
                          <Text style={styles.replyButtonText}>
                            {sending[feedback.id] ? "Envoi..." : "Répondre"}
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </>
                )}
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noRes}>Aucun retour utilisateur pour le moment.</Text>
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
  scrollView: {
    marginBottom: 120,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  author: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginBottom: 10,
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
  replyContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  replyLabel: {
    color: '#04bf94',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  replyInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    minHeight: 40,
    maxHeight: 100,
    marginBottom: 10,
  },
  replyButton: {
    backgroundColor: '#04bf94',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  menuItem: {
    minWidth: 90,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default Feedbacks;
