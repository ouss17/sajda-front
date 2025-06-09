import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Back, BarEye, Eye } from '../../assets/Svg/Svg';
import MemoryClickContext from '../../context/MemoryClickContext';
import { CheckUser } from '../../modules/CheckUser';
import { BASE_API_URL } from '@env';
import UserIdContext from '../../context/UserIdContext';

const CreateUser = () => {
  const { memoryClick, setMemoryClick } = useContext(MemoryClickContext);
  const { usersId, setUsersId } = useContext(UserIdContext);

  const [birthdate, setBirthdate] = useState(new Date());

  const [inputState, setInputState] = useState({
    pseudo: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    externalId: "",
  });

  const [errorAction, setErrorAction] = useState(false);
  const [msgError, setMsgError] = useState("");

  const user = useSelector((state) => state.userReducer.value);
  const navigation = useNavigation();
  const { isLogged } = CheckUser();

  const [securePassword, setSecurePassword] = useState(true);
  const secondTextInput = useRef(null);
  const thirdTextInput = useRef(null);
  const fourthTextInput = useRef(null);
  const fifthTextInput = useRef(null);
  const sixthTextInput = useRef(null);

  useEffect(() => {
    if (isLogged()) {
      navigation.navigate("Horaires");
    }
  }, [user]);

  const handleChangeInput = (name, value) => {
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showDatePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: birthdate,
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          const selectedDate = new Date(year, month, day);
          setBirthdate(selectedDate);
          handleChangeInput('birthdate', selectedDate.toISOString().split('T')[0]);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    } else if (Platform.OS === 'ios') {
      setShowDatePicker(true);
    }
  };

  const imageStyle = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
  };

  const checkLog = async () => {
    const { pseudo, email, password, firstname, lastname } = inputState;

    try {
       const request = await fetch(`${BASE_API_URL}/users/signup`, {
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
        birthDate: birthdate.toISOString().split('T')[0],
        externalId: 1234567891,
      }),
    });

    // console.log("Request => ", request);
    const response = await request.json();
    console.log("Response => ", response);

     if (response.result) {
          setMemoryClick("Login");
        } else {
          setMsgError(response.error);
          setErrorAction(true);
          setTimeout(() => {
            setMsgError("");
            setErrorAction(false);
          }, 5000);
        }
    } catch (error) {
      console.log("Error during fetch: ", error);
      
    }

   
    
    
    // return fetch(`${BASE_API_URL}/users/signup`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     pseudo,
    //     email,
    //     password,
    //     lastname,
    //     firstname,
    //     birthDate: birthdate,
    //     external_id: usersId,
    //   }),
    // })
    //   .then((json) => {
    //     console.log("JSON => "+json.json());
        
    //     return json.json();
    //   })
    //   .then((res) => {
    //     console.log("RES => "+res);
    //     if (res.result) {
    //       setMemoryClick("Login");
    //     } else {
    //       setMsgError(res.error);
    //       setErrorAction(true);
    //       setTimeout(() => {
    //         setMsgError("");
    //         setErrorAction(false);
    //       }, 5000);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <>
      <Image style={[styles.bg2, imageStyle]} source={require('../../assets/ressources/pages/userAction.png')} />
      {
        errorAction &&
        <Text style={styles.errorAction}>{msgError}</Text>
      }
      <View style={[styles.fix]}></View>
      <ScrollView style={[styles.container]}>
        <Pressable style={styles.buttonBack} onPress={() => setMemoryClick('Login')}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#333'} /></Text></Pressable>
        <Text style={[styles.mainTitle]}>Je crée mon compte</Text>
        <View style={styles.form}>
          <View>
            <View>
              <Text style={[styles.labels]}>Nom d'utilisateur</Text>
              <TextInput
                style={[styles.inputs]}
                value={inputState.pseudo}
                placeholder="moi123"
                placeholderTextColor={'#777'}
                onChangeText={(valueN) => handleChangeInput('pseudo', valueN)}
                onSubmitEditing={() => { secondTextInput.current.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <Text style={[styles.labels]}>Adresse email</Text>
              <TextInput
                style={[styles.inputs]}
                value={inputState.email}
                placeholder="moi123@email.com"
                placeholderTextColor={'#777'}
                onChangeText={(valueN) => handleChangeInput('email', valueN)}
                ref={secondTextInput}
                onSubmitEditing={() => { thirdTextInput.current.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View style={{ position: 'relative' }}>
              <Text style={[styles.labels]}>Mot de passe</Text>
              <TextInput
                style={[styles.inputs]}
                secureTextEntry={securePassword}
                type="password"
                name="password"
                placeholder="123456789"
                placeholderTextColor={'#777'}
                value={inputState.password}
                onChangeText={(value) => handleChangeInput("password", value)}
                ref={thirdTextInput}
                onSubmitEditing={() => { fourthTextInput.current.focus(); }}
              />
              <Pressable style={styles.hidePassword} onPress={() => setSecurePassword(!securePassword)}>
                {
                  securePassword
                    ? <Eye fill={"#333"} />
                    : <BarEye fill={"#333"} />
                }
              </Pressable>
            </View>
            <View>
              <Text style={[styles.labels]}>Nom</Text>
              <TextInput
                style={[styles.inputs]}
                value={inputState.lastname}
                placeholder="Doe"
                placeholderTextColor={'#777'}
                onChangeText={(valueN) => handleChangeInput('lastname', valueN)}
                ref={fourthTextInput}
                onSubmitEditing={() => { fifthTextInput.current.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <Text style={[styles.labels]}>Prénom</Text>
              <TextInput
                style={[styles.inputs]}
                value={inputState.firstname}
                placeholder="Jhon"
                placeholderTextColor={'#777'}
                onChangeText={(valueN) => handleChangeInput('firstname', valueN)}
                ref={fifthTextInput}
                onSubmitEditing={() => { sixthTextInput.current.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View>
              <Text style={[styles.labels]}>Date de naissance</Text>
              <Pressable onPress={showDatePicker}>
                <TextInput
                  style={[styles.inputs]}
                  value={birthdate.toISOString().split('T')[0]}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={'#777'}
                ref={sixthTextInput}
                onSubmitEditing={checkLog}
                editable={false}
                />
              </Pressable>
              {Platform.OS === 'ios' && showDatePicker && (
                <DatePickerIOS
                  date={birthdate}
                  mode="date"
                  onDateChange={(selectedDate) => {
                    setBirthdate(selectedDate);
                    handleChangeInput('birthdate', selectedDate.toISOString().split('T')[0]);
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.actionsForm}>
            <Pressable style={[styles.button]} id="logIn" onPress={checkLog}>
              <Text style={[styles.buttonText]}>S'enregister</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  hidePassword: {
    flex: 1,
    position: "absolute",
    top: 20,
    right: 15,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  bg2: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  fix: {
    padding: 60,
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
    marginBottom: 120,
  },
  form: {
    marginHorizontal: 50,
  },
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
  actionsForm: {
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#04bf94",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    width: 150,
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
  successAction: {
    color: "#04bf94",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5f9f4",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
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
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default CreateUser;
