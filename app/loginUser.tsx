import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import Constants from "expo-constants";
import { addUser } from '../reducers/userReducer';
import { Back, Eye, BarEye } from '../assets/Svg/Svg';
import { useOneSignal } from './contexts/OneSignalContext';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const LoginUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { usersId } = useOneSignal();
  const [inputState, setInputState] = useState({ pseudo: '', password: '' });
  const [securePassword, setSecurePassword] = useState(true);
  const [errorAction, setErrorAction] = useState(false);
  const secondTextInput = useRef<TextInput>(null);

  const handleChangeInput = (name: string, value: string) => {
    setInputState(prev => ({ ...prev, [name]: value }));
  };

  const checkLog = async () => {
    const { pseudo, password } = inputState;
    const externalIdToSend = usersId || "0264532";
    try {
      const res = await fetch(`${API_URL}/users/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, password, externalId: externalIdToSend }),
      });
      const response = await res.json();
      
      if (response.result) {
        dispatch(addUser({
          ...response.data,
          lastLogin: new Date().toISOString(),
        }));
        router.replace('/horaires');
      } else {
        setErrorAction(true);
        setTimeout(() => setErrorAction(false), 5000);
      }
    } catch (error) {
      setErrorAction(true);
      setTimeout(() => setErrorAction(false), 5000);
    }
  };

  return (
    <>
      <Image
        style={[styles.bg2, {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -1,
        }]}
        source={require("../assets/ressources/pages/userAction.png")}
      />
      {errorAction && (
        <Text style={styles.errorAction}>
          Identifiant ou Mot de passe incorrect
        </Text>
      )}
      <View style={styles.fix} />
      <ScrollView style={styles.container}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => router.back()}
        >
          <Back rotate={"0deg"} fill={"#333"} />
        </Pressable>
        <Text style={styles.mainTitle}>Je me connecte</Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.labels}>Identifiant ou email</Text>
            <TextInput
              style={styles.inputs}
              value={inputState.pseudo}
              placeholder="moi123 ou moi123@email.com"
              placeholderTextColor="#777"
              onChangeText={value => handleChangeInput("pseudo", value)}
              onSubmitEditing={() => secondTextInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="none"
            />
            <View style={{ position: "relative" }}>
              <Text style={styles.labels}>Mot de passe</Text>
              <TextInput
                style={styles.inputs}
                secureTextEntry={securePassword}
                placeholder="Mot2p@ssecomplexe"
                placeholderTextColor="#777"
                value={inputState.password}
                onChangeText={value => handleChangeInput("password", value)}
                ref={secondTextInput}
                onSubmitEditing={checkLog}
                autoCapitalize="none"
              />
              <Pressable
                style={styles.hidePassword}
                onPress={() => setSecurePassword(!securePassword)}
              >
                {securePassword ? (
                  <Eye fill="#333" margin={0} />
                ) : (
                  <BarEye fill="#333" margin={0} />
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.actionsForm}>
            <Text
              style={styles.texts}
              onPress={() => router.push('/createUser')}
            >
              Pas de compte ? Enregistrez-vous ici !
            </Text>
            <Pressable style={styles.button} onPress={checkLog}>
              <Text style={styles.buttonText}>Connexion</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bg2: {
    flex: 1,
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  fix: { padding: 60 },
  container: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
    marginBottom: 120,
  },
  form: { marginHorizontal: 50 },
  mainTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#333",
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
  labels: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  texts: {
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  inputs: {
    borderRadius: 100,
    borderWidth: 2,
    paddingHorizontal: 20,
    borderColor: "rgba(4, 191, 148, 0.3)",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 15,
    color: "#333",
  },
  actionsForm: { justifyContent: "center" },
  button: {
    borderRadius: 20,
    backgroundColor: "#04bf94",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 50,
    marginBottom: 20,
  },
  buttonText: {
    textTransform: "uppercase",
    color: "#fff",
    fontWeight: "bold",
  },
  buttonBack: {
    position: "absolute",
    zIndex: 99,
    paddingVertical: 15,
    paddingLeft: 15,
  },
  errorAction: {
    color: "#ff4655",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffecee",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
  hidePassword: {
    position: 'absolute',
    right: 20,
    top: 38,
    padding: 5,
    zIndex: 2,
  },
});

export default LoginUser;
