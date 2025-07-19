import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, TextInput, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Back } from '../assets/Svg/Svg';
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const ProfilUser = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user.value);
  

  const [inputState, setInputState] = useState({
    pseudo: "",
    email: "",
    firstname: "",
    lastname: "",
    birthDate: "",
  });

  const [successAction, setSuccessAction] = useState(false);
  const [errorAction, setErrorAction] = useState(false);
  const [error, setError] = useState("");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const emailInput = useRef<TextInput>(null);
  const firstnameInput = useRef<TextInput>(null);
  const lastnameInput = useRef<TextInput>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users/getMe`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const response = await res.json();
        
        if (response.result && response.data) {
          setInputState({
            pseudo: response.data.pseudo || "",
            email: response.data.email || "",
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            birthDate: response.data.birthDate || "",
          });
        }
      } catch (err) {
      }
    };
    fetchUser();
  }, []);

  const handleChangeInput = (name: string, value: string) => {
    setInputState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/users/update/${user.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo: inputState.pseudo,
          firstname: inputState.firstname,
          lastname: inputState.lastname,
          email: inputState.email,
          birthdate: inputState.birthDate,
        }),
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setSuccessAction(true);
        setTimeout(() => setSuccessAction(false), 4000);
      } else {
        setError(response.error || "Erreur lors de la modification");
        setErrorAction(true);
        setTimeout(() => {
          setErrorAction(false);
          setError("");
        }, 4000);
      }
    } catch (err) {
      setError("Erreur réseau");
      setErrorAction(true);
      setTimeout(() => {
        setErrorAction(false);
        setError("");
      }, 4000);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${API_URL}/user/delete/${user.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        router.replace('/loginUser');
      } else {
        setError("Erreur lors de la suppression du compte");
        setErrorAction(true);
        setTimeout(() => {
          setErrorAction(false);
          setError("");
        }, 4000);
      }
    } catch (err) {
      setError("Erreur réseau");
      setErrorAction(true);
      setTimeout(() => {
        setErrorAction(false);
        setError("");
      }, 4000);
    }
    setDeleteModalVisible(false);
  };

  const imageStyle = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch' as const,
  };

  return (
    <>
      <Image style={[styles.bg2, imageStyle]} source={require('../assets/ressources/pages/userInterface.png')} />
      <View style={styles.fix} />
      {successAction && (
        <Text style={styles.successAction}>Le profil a bien été modifié.</Text>
      )}
      {errorAction && (
        <Text style={styles.errorAction}>{error}</Text>
      )}
      <ScrollView style={styles.form}>
        <Pressable style={styles.buttonBack} onPress={() => router.back()}>
          <Back rotate={'0deg'} fill={'#333'} />
        </Pressable>
        <Text style={styles.mainTitle}>Profil</Text>
        <View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Identifiant</Text>
            <TextInput
              style={styles.value}
              value={inputState.pseudo}
              placeholder="Identifiant"
              onChangeText={v => handleChangeInput('pseudo', v)}
              onSubmitEditing={() => emailInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Email</Text>
            <TextInput
              style={styles.value}
              value={inputState.email}
              placeholder="email@gmail.com"
              onChangeText={v => handleChangeInput('email', v)}
              ref={emailInput}
              onSubmitEditing={() => firstnameInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Prénom</Text>
            <TextInput
              style={styles.value}
              value={inputState.firstname}
              placeholder="Prénom"
              onChangeText={v => handleChangeInput('firstname', v)}
              ref={firstnameInput}
              onSubmitEditing={() => lastnameInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Nom</Text>
            <TextInput
              style={styles.value}
              value={inputState.lastname}
              placeholder="Nom"
              onChangeText={v => handleChangeInput('lastname', v)}
              ref={lastnameInput}
              blurOnSubmit={false}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Date de naissance</Text>
            <TextInput
              style={[styles.value, { backgroundColor: '#eee', color: '#888' }]}
              value={inputState.birthDate ? inputState.birthDate.split('T')[0] : ''}
              placeholder="YYYY-MM-DD"
              editable={false}
            />
          </View>
        </View>
        <View style={styles.actionsForm}>
          <Pressable style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Modifier</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Pressable onPress={() => router.push('/changePassword')}>
            <Text style={{ color: '#04bf94', fontWeight: 'bold', textDecorationLine: 'underline' }}>
              Modifier mon mot de passe
            </Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Pressable
            style={{
              backgroundColor: '#ff4655',
              borderRadius: 30,
              paddingVertical: 16,
              paddingHorizontal: 32,
              marginHorizontal: 50,
              marginTop: 0,
              width: '80%',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
            }}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Text style={[styles.buttonText, { fontSize: 16 }]}>Supprimer mon compte</Text>
          </Pressable>
        </View>
      </ScrollView>
      {deleteModalVisible && (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center', color: '#ff4655' }}>
              Êtes-vous sûr de vouloir supprimer votre compte ?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Pressable
                style={[styles.button, { backgroundColor: '#ccc', flex: 1, marginRight: 10 }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: '#ff4655', flex: 1 }]}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.buttonText}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  hidePassword: {
    position: 'absolute',
    top: 20,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  fix: { padding: 20 },
  mainTitle: {
    textAlign: "center",
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 120,
  },
  field: {},
  titleForm: {
    color: "#333",
    fontSize: 18,
    fontWeight: 'bold'
  },
  value: {
    borderRadius: 100,
    borderWidth: 2,
    paddingHorizontal: 20,
    borderColor: 'rgba(4, 191, 148, 0.3)',
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 15,
    color: '#333'
  },
  actionsForm: {
    justifyContent: 'center',
    backgroundColor: '#04bf94',
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 50,
  },
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    paddingLeft: 15,
  },
  successAction: {
    color: "#04bf94",
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e5f9f4",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
  errorAction: {
    color: "#ff4655",
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffecee",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  }
});

export default ProfilUser;
