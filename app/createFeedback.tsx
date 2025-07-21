import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import Constants from "expo-constants";
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useRedirectIfNoRole } from '@/hooks/useRedirectIfNoRole';

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.1.25:3003";

interface Props {
  setIsFeedback: (v: boolean) => void;
}

const CreateFeedback: React.FC<Props> = ({ setIsFeedback }) => {
  const [inputState, setInputState] = useState({
    target: "mosquee",
    title: "",
    detail: "",
  });
    const user = useSelector((state: any) => state.user.value);
useRedirectIfNoRole(user);


  const [disableButton, setDisableButton] = useState(true);
  const [successAction, setSuccessAction] = useState(false);
  const [errorAction, setErrorAction] = useState(false);

  useEffect(() => {
    if (
      inputState.title.trim() !== "" &&
      inputState.detail.trim() !== ""
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [inputState]);

  const handleChangeInput = (name: string, value: string) => {
    setInputState(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = async () => {
    try {
      const res = await fetch(`${API_URL}/feedbacks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: 'create',
          title: inputState.title,
          detail: inputState.detail,
          target: inputState.target,
        }),
      });
      const data = await res.json();
      
      if (data.result) {
        setSuccessAction(true);
        // await sendNotif();
        setTimeout(() => {
          setSuccessAction(false);
          setIsFeedback(false);
        }, 2000);
        setInputState({ target: "mosquee", title: "", detail: "" });
      } else {
        setErrorAction(true);
        setTimeout(() => setErrorAction(false), 2000);
      }
    } catch (err) {
      setErrorAction(true);
      setTimeout(() => setErrorAction(false), 2000);
    }
  };

  // const sendNotif = async () => {
  //   try {
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: 'Basic ODUzMTcxZGUtMTc4Zi00NGU4LThiN2UtNTVjYjE1Y2RhNDRl', // ta clé REST OneSignal
  //       },
  //       body: JSON.stringify({
  //         app_id: 'aaff5f36-71db-4333-9b65-3c44458bc10f',
  //         included_segments: ['Admins'],
  //         template_id: '6dc770e2-d8e6-4c84-b387-437ac406aab6',
  //         // contents: { en: 'Nouveau feedback', fr: 'Un nouvel avis a été envoyé.' },
  //       }),
  //     };
  //     await fetch('https://onesignal.com/api/v1/notifications', options);
  //   } catch (err) {
  //     console.error('Erreur lors de l\'envoi de la notification OneSignal', err);
  //   }
  // };

  return (
    <View style={styles.modalBg}>
      <View style={styles.form}>
        <Pressable style={styles.closeBtn} onPress={() => setIsFeedback(false)}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
        <Text style={styles.mainTitle}>Un commentaire ?</Text>
        {successAction && <Text style={styles.successAction}>Le commentaire a bien été envoyé.</Text>}
        {errorAction && <Text style={styles.errorAction}>Le commentaire n'a pas été envoyé.</Text>}
        <View style={styles.field}>
          <Text style={styles.titleForm}>Ce commentaire concerne <Text style={styles.required}>*</Text></Text>
          <View style={styles.pickerCss}>
            <Picker
              style={styles.picker}
              selectedValue={inputState.target}
              onValueChange={value => handleChangeInput('target', value)}
            >
              <Picker.Item label="Mosquée" value="mosquee" />
              <Picker.Item label="Application" value="admin" />
              <Picker.Item label="Question pour l'imam" value="imam" />
            </Picker>
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.titleForm}>Titre <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.value}
            value={inputState.title}
            placeholder="Titre"
            placeholderTextColor={'#777'}
            onChangeText={value => handleChangeInput('title', value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.titleForm}>Contenu <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.value, styles.desc]}
            editable
            multiline
            numberOfLines={4}
            placeholder="Dîtes-nous tout"
            placeholderTextColor={'#777'}
            value={inputState.detail}
            onChangeText={value => handleChangeInput("detail", value)}
          />
        </View>
        <View style={styles.actionsForm}>
          <Pressable
            disabled={disableButton}
            style={[styles.button, { backgroundColor: disableButton ? "grey" : "#04bf94" }]}
            onPress={handleSend}
          >
            <Text style={styles.buttonText}>Envoyer</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  closeBtnText: {
    fontSize: 28,
    color: '#04bf94',
    fontWeight: 'bold',
  },
  mainTitle: {
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
  },
  form: {
    width: '90%',
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 120,
    justifyContent: 'center',
    position: 'relative',
  },
  field: {
    marginBottom: 15,
  },
  titleForm: {
    color: "#333",
    fontSize: 18,
    fontWeight: 'bold'
  },
  required: {
    color: 'red',
  },
  pickerCss: {
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(4, 191, 148, 0.3)',
    paddingHorizontal: 30,
    marginTop: 10,
    position: 'relative',
  },
  picker: {
    color: '#333',
    backgroundColor: '#fff',
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
  desc: {
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#04bf94',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 50,
    marginBottom: 20
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold'
  },
  actionsForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successAction: {
    color: "#04bf94",
    backgroundColor: "#e5f9f4",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorAction: {
    color: "#ff4655",
    backgroundColor: "#ffecee",
    margin: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateFeedback;
