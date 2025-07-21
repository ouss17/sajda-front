import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, TextInput, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Back } from '../assets/Svg/Svg';
import Constants from "expo-constants";
import { useRedirectIfNoRole } from '@/hooks/useRedirectIfNoRole';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const ChangePassword = () => {
  const user = useSelector((state: any) => state.user.value);
  const router = useRouter();
  const [inputState, setInputState] = useState({
    lastPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChangeInput = (name: string, value: string) => {
    setInputState(prev => ({ ...prev, [name]: value }));
  };

useRedirectIfNoRole(user);

  const handleUpdatePassword = async () => {
    try {
      const res = await fetch(`${API_URL}/users/updatePassword/${user.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputState),
        credentials: 'include',
      });
      const response = await res.json();
      if (response.result) {
        setSuccess(true);
        setError("");
        setTimeout(() => setSuccess(false), 4000);
        setInputState({ lastPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setError(response.error || "Erreur lors de la modification");
        setSuccess(false);
        setTimeout(() => setError(""), 4000);
      }
    } catch (err) {
      setError("Erreur réseau");
      setSuccess(false);
      setTimeout(() => setError(""), 4000);
    }
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
      {success && (
        <Text style={styles.successAction}>Mot de passe modifié !</Text>
      )}
      {error !== "" && (
        <Text style={styles.errorAction}>{error}</Text>
      )}
      <ScrollView style={styles.form}>
        <Pressable style={styles.buttonBack} onPress={() => router.back()}>
          <Back rotate={'0deg'} fill={'#333'} />
        </Pressable>
        <Text style={styles.mainTitle}>Changer mon mot de passe</Text>
        <View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Ancien mot de passe</Text>
            <TextInput
              style={styles.value}
              placeholder="Ancien mot de passe"
              secureTextEntry
              value={inputState.lastPassword}
              onChangeText={v => handleChangeInput('lastPassword', v)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Nouveau mot de passe</Text>
            <TextInput
              style={styles.value}
              placeholder="Nouveau mot de passe"
              secureTextEntry
              value={inputState.newPassword}
              onChangeText={v => handleChangeInput('newPassword', v)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Confirmer le nouveau mot de passe</Text>
            <TextInput
              style={styles.value}
              placeholder="Confirmer le nouveau mot de passe"
              secureTextEntry
              value={inputState.confirmPassword}
              onChangeText={v => handleChangeInput('confirmPassword', v)}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.actionsForm}>
          <Pressable style={styles.button} onPress={handleUpdatePassword}>
            <Text style={styles.buttonText}>Valider</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  button: {},
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    left: -10
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

export default ChangePassword;