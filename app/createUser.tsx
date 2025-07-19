import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import Constants from "expo-constants";
import { Back, Eye, BarEye } from '../assets/Svg/Svg';
import { useOneSignal } from './contexts/OneSignalContext';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

const CreateUser = () => {
  const router = useRouter();
  const { usersId } = useOneSignal();

  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputState, setInputState] = useState({
    pseudo: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    birthdate: new Date().toISOString().split('T')[0],
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [errorAction, setErrorAction] = useState(false);
  const [msgError, setMsgError] = useState("");

  const secondTextInput = useRef<TextInput>(null);
  const thirdTextInput = useRef<TextInput>(null);
  const fourthTextInput = useRef<TextInput>(null);
  const fifthTextInput = useRef<TextInput>(null);
  const sixthTextInput = useRef<TextInput>(null);

  const handleChangeInput = (name: string, value: string) => {
    setInputState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthdate(currentDate);
    handleChangeInput('birthdate', currentDate.toISOString().split('T')[0]);
  };

  const checkRegister = async () => {
    const { pseudo, email, password, firstname, lastname, birthdate } = inputState;
    const externalIdToSend = usersId || "0264532";
    try {
      const res = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pseudo,
          email,
          password,
          lastname,
          firstname,
          birthDate: birthdate,
          externalId: externalIdToSend,
        }),
      });
      const response = await res.json();
      if (response.result) {
        router.replace('/loginUser');
      } else {
        setMsgError(response.error || "Erreur lors de l'inscription");
        setErrorAction(true);
        setTimeout(() => {
          setMsgError("");
          setErrorAction(false);
        }, 5000);
      }
    } catch (error) {
      setMsgError("Erreur réseau");
      setErrorAction(true);
      setTimeout(() => {
        setMsgError("");
        setErrorAction(false);
      }, 5000);
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
        <Text style={styles.errorAction}>{msgError}</Text>
      )}
      <View style={styles.fix} />
      <ScrollView style={styles.container}>
        <Pressable style={styles.buttonBack} onPress={() => router.back()}>
          <Back rotate={'0deg'} fill={'#333'} />
        </Pressable>
        <Text style={styles.mainTitle}>Je crée mon compte {usersId}</Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.labels}>Nom d'utilisateur</Text>
            <TextInput
              style={styles.inputs}
              value={inputState.pseudo}
              placeholder="moi123"
              placeholderTextColor={'#777'}
              onChangeText={value => handleChangeInput('pseudo', value)}
              onSubmitEditing={() => secondTextInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="none"
            />
            <Text style={styles.labels}>Adresse email</Text>
            <TextInput
              style={styles.inputs}
              value={inputState.email}
              placeholder="moi123@email.com"
              placeholderTextColor={'#777'}
              onChangeText={value => handleChangeInput('email', value)}
              ref={secondTextInput}
              onSubmitEditing={() => thirdTextInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View style={{ position: 'relative' }}>
              <Text style={styles.labels}>Mot de passe</Text>
              <TextInput
                style={styles.inputs}
                secureTextEntry={securePassword}
                placeholder="Mot2p@ssecomplexe"
                placeholderTextColor={'#777'}
                value={inputState.password}
                onChangeText={value => handleChangeInput("password", value)}
                ref={thirdTextInput}
                onSubmitEditing={() => fourthTextInput.current?.focus()}
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
            <Text style={styles.labels}>Nom</Text>
            <TextInput
              style={styles.inputs}
              value={inputState.lastname}
              placeholder="Doe"
              placeholderTextColor={'#777'}
              onChangeText={value => handleChangeInput('lastname', value)}
              ref={fourthTextInput}
              onSubmitEditing={() => fifthTextInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="words"
            />
            <Text style={styles.labels}>Prénom</Text>
            <TextInput
              style={styles.inputs}
              value={inputState.firstname}
              placeholder="John"
              placeholderTextColor={'#777'}
              onChangeText={value => handleChangeInput('firstname', value)}
              ref={fifthTextInput}
              onSubmitEditing={() => sixthTextInput.current?.focus()}
              blurOnSubmit={false}
              autoCapitalize="words"
            />
            <Text style={styles.labels}>Date de naissance</Text>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.inputs}
                value={inputState.birthdate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={'#777'}
                ref={sixthTextInput}
                onSubmitEditing={checkRegister}
                editable={false}
              />
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>
          <View style={styles.actionsForm}>
            <Pressable style={styles.button} onPress={checkRegister}>
              <Text style={styles.buttonText}>S'enregistrer</Text>
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
  hidePassword: {
    position: 'absolute',
    right: 20,
    top: 38,
    padding: 5,
    zIndex: 2,
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
});

export default CreateUser;
