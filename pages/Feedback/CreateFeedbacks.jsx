import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'
import SessionContext from '../../context/SessionContext'
import { Picker } from '@react-native-picker/picker';
import { Back, CrossReturn, PickPicker } from '../../assets/Svg/Svg'
import { useNavigation } from '@react-navigation/native'
import UserIdContext from '../../context/UserIdContext'
import ConfirmActus from './ConfirmActus';
const CreateFeedbacks = ({ setIsFeedback }) => {

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
                included_segments: ['Admins'],
                template_id: '6dc770e2-d8e6-4c84-b387-437ac406aab6',
                // contents: { en: 'New Actualities', fr: 'Il y\'a du nouveau dans l\'actualité' },
                // name: 'Actualités',
            })
        };

        fetch('https://onesignal.com/api/v1/notifications', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    const { usersId, setUsersId } = useContext(UserIdContext);
    const { session, setSession } = useContext(SessionContext);

    const [inputState, setInputState] = useState({
        idUser: "",
        idMasdjid: 1,
        target: "masdjid",
        title: "",
        detail: "",
        emailUser: "",
    });

    useEffect(() => {
        if (session.log) {
            setInputState({ ...inputState, idUser: session.session.id, emailUser: session.session.email })
        }
    }, [session])

    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (inputState.title.trim() !== "" && inputState.detail.trim() !== "" && inputState.emailUser.trim() !== "") {
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
            detail: "",
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
    
    const [confirmAction, setConfirmAction] = useState(false);


    const checkLog = (action) => {
        if (action == true) {
            const { title, detail, idUser, target, idMasdjid, emailUser } = inputState;
            return fetch('https://sajda-back.vercel.app/feedbacks', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state: 'create',
                    title: title,
                    detail: detail,
                    idUser: idUser,
                    target: target,
                    idMasdjid: idMasdjid,
                    emailUser: emailUser,
                    extId: usersId
                }),
            })
                .then(response => response.text())
                .then(data => {
                    // console.log('test,' + data);
                    let result = JSON.parse(data);
                    if (result.send) {
                        setSuccessAction(true)
                        sendNotif();
                        setConfirmAction(false)
                        setTimeout(() => {
                            setSuccessAction(false)
                            setIsFeedback(false)
                        }, 2000);
                        emptyValue();
                    } else {
                        setErrorAction(true)
                        setTimeout(() => {
                            setErrorAction(false)
                        }, 2000);
                    }
                    // console.log(JSON.parse(data));
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setConfirmAction(false)

        }
    };

    const scrollView = useRef(null);
    const navigation = useNavigation();

    const GoToHome = () => {
        navigation.navigate('Horaires');

    }



    return (
        <>
            <View ref={scrollView} style={styles.containerForm}>
            </View>
            {
                successAction
                &&
                <Text style={styles.successAction}>Le commentaire a bien été envoyé.</Text>
            }
            {
                errorAction
                &&
                <Text style={styles.errorAction}>La commentaire n'a pas été envoyé.</Text>
            }
            {
                confirmAction
                &&
                <ConfirmActus checkLog={checkLog} />
            }
            <ScrollView style={styles.form}>
                <Pressable onPress={() => setIsFeedback(false)} style={[styles.crossReturn]}>
                    <CrossReturn />
                </Pressable>
                <Text style={styles.mainTitle}>
                    Un commentaire ?
                </Text>
                <View className="fieldsForm">
                    <View style={styles.field}>
                        <Text style={styles.titleForm}>Ce commentaire concerne <Text style={styles.required}>*</Text></Text>
                        <View style={styles.pickerCss}>
                            <Picker
                                style={styles.picker}
                                color='#333'
                                selectedValue={inputState.target}
                                onValueChange={(itemValue) => handleChangeInput('target', itemValue)}
                            >

                                <Picker.Item
                                    style={styles.pickers}
                                    label={"Mosquée"}
                                    value={"masdjid"}
                                />
                                <Picker.Item
                                    style={styles.pickers}
                                    label={"Application"}
                                    value={"developper"}
                                />
                                <Picker.Item
                                    style={styles.pickers}
                                    label={"Question pour l'imam"}
                                    value={"imam"}
                                />
                            </Picker>
                            <View style={[styles.pickPicker]}>
                                <PickPicker fill={"black"} stroke={"none"} />
                            </View>
                        </View>
                    </View>
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
                            placeholder="Dîtes-nous tout"
                            placeholderTextColor={'#777'}
                            value={inputState.detail}
                            onChangeText={(value) => handleChangeInput("detail", value)}
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                    </View>
                    {/* <View style={styles.field}>
                        <Text style={styles.titleForm}>Email <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.value}
                            value={inputState.emailUser}
                            placeholder="email@email.com"
                            placeholderTextColor={'#777'}
                            onChangeText={(valueE) => handleChangeInput('emailUser', valueE)}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => {
                                checkLog()
                            }}
                            blurOnSubmit={false}
                        />
                    </View> */}
                </View>
                <View style={styles.actionsForm}>
                    <Pressable style={[styles.button, { backgroundColor: "#ff4655" }]} onPress={() => setIsFeedback(false)}>
                        <Text style={[styles.buttonText]}>Annuler</Text>
                    </Pressable>
                    <Pressable disabled={disableButton} style={[styles.button, { backgroundColor: disableButton ? "grey" : "#04bf94" }]} onPress={() => setConfirmAction(true)}>
                        <Text style={[styles.buttonText]}>Envoyer</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    mainTitle: {
        textAlign: "center",
        marginBottom: 15,
        // backgroundColor: "#04bf94",
        color: "#333",
        fontSize: 28,
        fontWeight: "bold",
    },
    containerForm: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        // justifyContent: 'center',
        // alignItems: 'center',
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
        // flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 101,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        backgroundColor: "white",
        padding: 20,
        // marginHorizontal: 20,
        borderRadius: 16,
        marginBottom: 120,
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
        padding: 10,
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
    actionsForm: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    successAction: {
        color: "#04bf94",
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 102,
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
        zIndex: 102,
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
    },
    crossReturn: {
        marginLeft: "auto",
    }

})

export default CreateFeedbacks