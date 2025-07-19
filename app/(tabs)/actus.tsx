import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, ImageBackground, Pressable, View } from 'react-native';
import { Back } from '../../assets/Svg/Svg';
import Constants from "expo-constants";
import moment from "moment";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Actus = () => {
  const [allActus, setAllActus] = useState<any[]>([]);
  const [openedContentIndex, setOpenedContentIndex] = useState<number | null>(null);
  const scrollView = useRef<ScrollView>(null);

  const getActus = useCallback(async () => {
    try {
      
      const res = await fetch(`${API_URL}/posts/category/${1}/${4}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      setAllActus(json.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getActus();
  }, [getActus]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getActus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [getActus]);

  const handleClick = (index: number) => {
    setOpenedContentIndex(index === openedContentIndex ? null : index);
  };

  return (
    <ImageBackground
      style={styles.bg}
      source={require('../../assets/ressources/pages/template.png')}
      resizeMode="cover"
    >
      <Text style={styles.mainTitle}>Actualités</Text>
      <ScrollView ref={scrollView} style={styles.scrollView}>
        {allActus.length > 0 ? (
          allActus.map(actu => (
            <Pressable key={actu.id} style={styles.actuContainer} onPress={() => handleClick(actu.id)}>
              <Text style={styles.date}>
                {moment(actu.created_at).format("DD/MM/YYYY HH[h]mm")}
              </Text>
              <Text style={styles.title}>{actu.title}</Text>
              <View style={styles.contentContainer}>
                <View style={styles.more}>
                  {openedContentIndex === actu.id ? (
                    <Text style={styles.moreText}>Voir moins</Text>
                  ) : (
                    <Text style={styles.moreText}>Voir plus</Text>
                  )}
                  <Text style={[styles.moreIcon, openedContentIndex === actu.id && styles.moreIconActive]}>
                    <Back rotate={openedContentIndex === actu.id ? '-90deg' : '90deg'} fill={'#fff'} />
                  </Text>
                </View>
                {openedContentIndex === actu.id && (
                  <Text style={styles.content}>{actu.content}</Text>
                )}
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noRes}>
            Il n'y a pas d'actualité pour le moment.
          </Text>
        )}
      </ScrollView>
    </ImageBackground>
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
  date: {
    color: '#04bf94',
    fontWeight: 'bold',
    padding: 15,
    paddingBottom: 0,
    opacity: 0.6
  },
  actuContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    marginHorizontal: 30
  },
  scrollView: {
    marginBottom: 120,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15
  },
  contentContainer: {
    backgroundColor: '#04bf94',
    padding: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  more: {
    display: 'flex',
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
  bg: {
    flex: 1,
  },
});

export default Actus;
