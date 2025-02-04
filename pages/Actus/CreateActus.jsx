import React, { useState, useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { OneSignal } from 'react-native-onesignal';
import { PickPicker } from '../../assets/Svg/Svg';

const CreateActus = ({ handleMemoryClick, categories }) => {

  useEffect(() => {
    // OneSignal.setAppId('aaff5f36-71db-4333-9b65-3c44458bc10f');
    OneSignal.initialize("aaff5f36-71db-4333-9b65-3c44458bc10f");

  }, [])

  function sendNotif() {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ODUzMTcxZGUtMTc4Zi00NGU4LThiN2UtNTVjYjE1Y2RhNDRl',
      },
      body: JSON.stringify({
        app_id: 'aaff5f36-71db-4333-9b65-3c44458bc10f',
        included_segments: ['Subscribed Users'],
        template_id: '02711f37-17b2-44ce-aa43-5b8dbffa7bcc',
        // contents: { en: 'New Actualities', fr: 'Il y\'a du nouveau dans l\'actualité' },
        // name: 'Actualités',
      })
    };

    fetch('https://onesignal.com/api/v1/notifications', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }




  const [inputState, setInputState] = useState({
    title: "",
    content: "",
    image: "",
    category: 1,
  });
  const [disableButton, setDisableButton] = useState(true);
  useEffect(() => {
    if (inputState.title.trim() !== "" && inputState.content.trim() !== "") {
      setDisableButton(false);
    } else {
      setDisableButton(true)
    }
  }, [inputState]);

  const [successAction, setSuccessAction] = useState(false);
  const [errorAction, setErrorAction] = useState(false);

  const emptyValue = () => {
    setInputState({
      title: "",
      content: "",
      image: "",
      category: 1,
    });
  };

  const handleChangeInput = (name, value) => {
    // console.log(name);
    // console.log(value);
    setInputState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const checkLog = () => {
    const { title, content, image, category } = inputState;
    return fetch('https://sajda-back.vercel.app/actus', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state: 'create',
        title: title,
        content: content,
        image: image,
        category: category,
      }),
    })
      .then(response => response.text())
      .then(data => {
        // console.log('test,' + data);
        let result = JSON.parse(data);
        if (result.send) {
          setSuccessAction(true)
          setTimeout(() => {
            setSuccessAction(false)
          }, 5000);
          if (inputState.category == 1) {
            sendNotif();
          }
          emptyValue();
        } else {
          setErrorAction(true)
          setTimeout(() => {
            setErrorAction(false)
          }, 5000);
        }
        // console.log(JSON.parse(data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const scrollView = useRef(null);

  return (
    <>
      {
        successAction
        &&
        <Text style={styles.successAction}>La publication a bien été enregistrée.</Text>
      }
      {
        errorAction
        &&
        <Text style={styles.errorAction}>La publication n'a pas été enregistrée.</Text>
      }
      <ScrollView ref={scrollView} style={styles.containerForm}>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.titleForm}>Catégorie</Text>
            <View style={styles.pickerCss}>
              <Picker
                style={styles.picker}
                color='#333'
                selectedValue={inputState.category}
                onValueChange={(itemValue) => handleChangeInput('category', itemValue)}
              >
                {
                  categories.length > 0 &&
                  categories.map((category) => (
                    <Picker.Item
                      style={styles.pickers}
                      key={category.id}
                      label={category.name.toLowerCase()
                        .charAt(0)
                        .toUpperCase() +
                        category.name.slice(1).toLowerCase()} value={category.id} />
                  ))}
              </Picker>
              <View style={[styles.pickPicker]}>
                <PickPicker fill={"black"} stroke={"none"} />
              </View>
            </View>
          </View>
          <View className="fieldsForm">
            <View style={styles.field}>
              <Text style={styles.titleForm}>Titre <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.value}
                value={inputState.title}
                placeholder="Titre"
                placeholderTextColor={'#777'}
                onChangeText={(valueN) => handleChangeInput('title', valueN)}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.titleForm}>Contenu <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={[styles.value, styles.desc]}
                editable
                multiline
                numberOfLines={4}
                placeholder="Le contenu du post"
                placeholderTextColor={'#777'}
                value={inputState.content}
                onChangeText={(value) => handleChangeInput("content", value)}
                ref={(input) => { this.secondTextInput = input; }}
                onSubmitEditing={() => {
                  inputState.category !== 1
                    ?
                    checkLog()
                    :
                    this.thirdTextInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            {
              inputState.category !== 1
              &&
              <View style={styles.field}>
                <Text style={styles.titleForm}>Media</Text>
                <TextInput
                  style={styles.value}
                  value={inputState.image}
                  placeholder="Url de la vidéo youtube"
                  placeholderTextColor={'#777'}
                  onChangeText={(valueI) => handleChangeInput('image', valueI)}
                  ref={(input) => { this.thirdTextInput = input; }}
                  onSubmitEditing={() => { checkLog() }}
                />
              </View>
            }
          </View>
          <View className="actionsForm">
            <Pressable disabled={disableButton} style={[styles.button, { backgroundColor: disableButton ? "grey" : "#04bf94" }]} onPress={checkLog}>
              <Text style={[styles.buttonText]}>Créer</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  mainTitle: {
    textAlign: "center",
    padding: 32,
    backgroundColor: "#04bf94",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  containerForm: {
    // width: "100%",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: 120,
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
  pickers: {
    color: '#333',
    backgroundColor: '#fff',
  },
  pickPicker: {
    position: 'absolute',
    right: 30,
    top: 12,
    pointerEvents: 'none',
  },
  form: {
    // width: "75%",
    // marginTop: 30,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  field: {
    marginBottom: 15,
  },
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
  desc: {
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#04bf94',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // width: 150,
    marginHorizontal: 50,
    marginBottom: 20
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonBack: {
    position: 'absolute',
    zIndex: 99,
    paddingVertical: 36,
    paddingLeft: 10,
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
    shadowOffset: {
      width: 0,
      height: 10
    },
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
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  }

})

export default CreateActus