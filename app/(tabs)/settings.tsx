import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Logout, User, UserManage, Annonce, Masjid, Feedback, MyFeed, Bell, Back } from '../../assets/Svg/Svg';
import Constants from "expo-constants";
import { removeUser } from '../../reducers/userReducer';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const Settings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/users/logout`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      await res.json();
      dispatch(removeUser({}));
      Alert.alert('Déconnexion', 'Vous êtes déconnecté.');
      router.replace('/');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Erreur lors de la déconnexion.');
    }
  };

  return (
    <ImageBackground
      style={styles.bg}
      source={require('../../assets/ressources/pages/template.png')}
      resizeMode="cover"
    >
      <Text style={[styles.titles, styles.mainTitle]}>Paramètres</Text>
      {user?.pseudo && (
        <View style={styles.accountSecure}>
          <TouchableOpacity style={styles.account} onPress={() => router.push('/profilUser')}>
            <View style={styles.accountIcon}>
              <User />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={styles.container}>
        <View style={styles.param}>
          <Text style={[styles.texts, styles.infoParam]}>Compte</Text>
          {user?.pseudo ? (
            <TouchableOpacity style={styles.params} onPress={handleLogout}>
              <View style={styles.menuBox}><Logout /></View>
              <Text style={[styles.texts, styles.info]}>Déconnexion</Text>
              <Back rotate={'180deg'} fill={'#c6c8c7'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.params} onPress={() => router.push('/loginUser')}>
              <View style={styles.menuBox}><User /></View>
              <Text style={[styles.texts, styles.info]}>Connexion</Text>
              <Back rotate={'180deg'} fill={'#c6c8c7'} />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.param, styles.endParam]}>
          <Text style={[styles.texts, styles.infoParam]}>Gestion</Text>
          {user?.pseudo && (['admin', 'gerant', 'imam', 'dev'].includes(user.role)) && (
            <>
              {(user.role === 'admin' || user.role === 'dev') && (
                <>
                <TouchableOpacity style={styles.params} onPress={() => router.push('/users')}>
                  <View style={styles.menuBox}><UserManage /></View>
                  <Text style={[styles.texts, styles.info]}>Utilisateurs</Text>
                  <Back rotate={'180deg'} fill={'#c6c8c7'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.params} onPress={() => router.push('/listCategories')}>
                <View style={styles.menuBox}><Annonce /></View>
                <Text style={[styles.texts, styles.info]}>Catégories</Text>
                <Back rotate={'180deg'} fill={'#c6c8c7'} />
              </TouchableOpacity>
                </>
              )}
              
              {(user.role === 'admin' || user.role === 'dev' || user.role === 'gerant') && (
              <TouchableOpacity style={styles.params} onPress={() => router.push('/posts')}>
                <View style={styles.menuBox}><Annonce /></View>
                <Text style={[styles.texts, styles.info]}>Publications</Text>
                <Back rotate={'180deg'} fill={'#c6c8c7'} />
              </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.params} onPress={() => router.push('/masdjid')}>
                <View style={styles.menuBox}><Masjid /></View>
                <Text style={[styles.texts, styles.info]}>Mosquée</Text>
                <Back rotate={'180deg'} fill={'#c6c8c7'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.params} onPress={() => router.push('/feedbacks')}>
                <View style={styles.menuBox}><Feedback width={25} height={25} fill={"#04bf94"} /></View>
                <Text style={[styles.texts, styles.info]}>Retours d'utilisateurs</Text>
                <Back rotate={'180deg'} fill={'#c6c8c7'} />
              </TouchableOpacity>
            </>
          )}
          {user?.pseudo && (
            <TouchableOpacity style={styles.params} onPress={() => router.push('/myFeedbacks')}>
              <View style={styles.menuBox}><MyFeed width={25} height={25} fill={"#04bf94"} /></View>
              <Text style={[styles.texts, styles.info]}>Mes retours</Text>
              <Back rotate={'180deg'} fill={'#c6c8c7'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.params} onPress={() => router.push('/notifications')}>
            <View style={styles.menuBox}><Bell /></View>
            <Text style={[styles.texts, styles.info]}>Notifications</Text>
            <Back rotate={'180deg'} fill={'#c6c8c7'} />
          </TouchableOpacity>
        </View>
        <View style={[styles.param, styles.endParam]}>
          <Text style={[styles.texts, styles.infoParam]}>Application</Text>
          <TouchableOpacity style={styles.params} onPress={() => router.push('/mentionsLegales')}>
            <View style={styles.menuBox}><Text style={{ fontWeight: 'bold', color: '#04bf94' }}>ML</Text></View>
            <Text style={[styles.texts, styles.info]}>Mentions légales</Text>
            <Back rotate={'180deg'} fill={'#c6c8c7'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.params} onPress={() => router.push('/politiqueConfidentialite')}>
            <View style={styles.menuBox}><Text style={{ fontWeight: 'bold', color: '#04bf94' }}>PC</Text></View>
            <Text style={[styles.texts, styles.info]}>Politique de confidentialité</Text>
            <Back rotate={'180deg'} fill={'#c6c8c7'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  texts: { color: "#333", fontWeight: "bold" },
  titles: { fontWeight: "bold" },
  accountSecure: {
    flex: 1,
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 82.5,
    width: "100%",
    height: 40,
  },
  account: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
  },
  accountIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  mainTitle: {
    textAlign: "center",
    padding: 30,
    paddingBottom: 45,
    marginBottom: 45,
    color: "white",
    fontSize: 28,
    backgroundColor: "#04bf94",
  },
  container: {
    paddingTop: 40,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 120,
  },
  infoParam: {
    color: '#c6c8c7',
    textTransform: 'uppercase',
    marginHorizontal: 20,
  },
  params: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    width: '85%',
    marginVertical: 5,
  },
  param: { marginBottom: 10 },
  endParam: { paddingBottom: 60 },
  menuBox: {
    backgroundColor: 'rgba(4, 191, 148, 0.1)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  info: {
    fontSize: 14,
    color: '#696969',
    textAlign: 'center'
  },
});

export default Settings;
