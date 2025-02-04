import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Back, CrossReturn, PickPicker } from '../../assets/Svg/Svg'
import { useNavigation } from '@react-navigation/native'
import SessionContext from '../../context/SessionContext';


const FeedbackPopUp = ({ feedback, setOpenResPop, behavior }) => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (behavior == "responses") {
            fetch('https://alrahma.ammadec.com/backend/user/getUsers.php?all=true', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(json => {
                    return json.json();
                })
                .then(
                    (res => {
                        // console.log(res);
                        // let results = JSON.parse(res);
                        setUsers(res);
                    })
                )
                .catch(error => {
                    console.error(error);
                });
        }
    }, [behavior]);

    // SEND NOTIF TO ONE USER
    function sendNotifOne(oneSId) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic ODUzMTcxZGUtMTc4Zi00NGU4LThiN2UtNTVjYjE1Y2RhNDRl',
            },
            body: JSON.stringify({
                app_id: 'aaff5f36-71db-4333-9b65-3c44458bc10f',
                include_player_ids: [oneSId], // ext_id_user
                template_id: 'a3bd610c-d19c-4993-b1bf-2642d1a4be1b',
                // contents: { en: 'New Actualities', fr: 'Il y\'a du nouveau dans l\'actualité' },
                // name: 'Actualités',
            })
        };

        fetch('https://onesignal.com/api/v1/notifications', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    /*
        * SEND NOTIF ONE USER OR MULTIPLE
    */
    const SendAnswer = () => {
        if (feedback.idUser !== 0 && feedback.idUser !== null) {

            fetch('https://alrahma.ammadec.com/backend/user/updateUser.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state: "info",
                    idUser: feedback.idUser
                }),
            })
                .then(response => response.text())
                .then(data => {
                    let result = JSON.parse(data);
                    if (result.response) {
                        // console.log(result.user);
                        if (result.user.externalIdUser !== feedback.externalId) {
                            sendNotifOne(result.user.externalIdUser);
                            sendNotifOne(feedback.externalId);
                            // console.log("diff");
                        } else {
                            // console.log("noDiff");
                            sendNotifOne(feedback.externalId)
                        }
                    } else {
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

    }



    const { session, setSession } = useContext(SessionContext);


    const [inputState, setInputState] = useState({
        response: "",
    });

    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);

    const handleChangeInput = (name, value) => {
        // console.log(name);
        // console.log(value);
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        if (inputState.response.trim() !== "") {
            setDisableButton(false);
        } else {
            setDisableButton(true)
        }
    }, [inputState]);


    const checkLog = () => {
        const { response } = inputState;
        return fetch('https://sajda-back.vercel.app/responses', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "answer",
                idFeedback: feedback.idFeedback,
                response: response,
                initialIdAskUser: feedback.idUser,
                idUser: session.session.id
            }),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                let result = JSON.parse(data);
                if (result.response) {
                    setSuccessAction(true)
                    SendAnswer();
                    setTimeout(() => {
                        setSuccessAction(false);
                        setOpenResPop(false);
                    }, 5000);
                } else {
                    // console.log(data);
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
            <View ref={scrollView} style={styles.containerForm}>
            </View>
            {
                successAction
                &&
                <Text style={styles.successAction}>La réponse a bien été envoyée.</Text>
            }
            {
                errorAction
                &&
                <Text style={styles.errorAction}>La réponse n'a pas été envoyée.</Text>
            }
            <ScrollView style={styles.form}>
                <Pressable onPress={() => setOpenResPop(false)} style={[styles.crossReturn]}>
                    <CrossReturn />
                </Pressable>
                <Text style={styles.mainTitle}>
                    {feedback.title}
                </Text>
                <View className="fieldsForm">
                    <View style={styles.field}>
                        <Text style={[styles.titleForm, styles.noBold]}>Question :</Text>
                        <Text style={[styles.titleForm, behavior == "answer" ? styles.questions : styles.question]}>{feedback.detail}</Text>
                    </View>
                    {
                        behavior == "answer"
                            ?
                            <View style={styles.field}>
                                <Text style={[styles.titleForm, styles.noBold]}>Réponse :</Text>
                                <TextInput
                                    style={styles.value}
                                    value={inputState.response}
                                    placeholder="Le contenu de la réponse"
                                    numberOfLines={4}
                                    placeholderTextColor={'#777'}
                                    onChangeText={(valueE) => handleChangeInput('response', valueE)}
                                    ref={(input) => { this.thirdTextInput = input; }}
                                    onSubmitEditing={() => {
                                        checkLog()
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            :
                            <View style={styles.field}>
                                <Text style={[styles.titleForm, styles.noBold]}>Réponse{feedback.responses.length > 1 ? "s" : ""} :</Text>
                                {feedback.responses.map(response => (
                                    <View key={response.id}>
                                        {
                                            users.datas &&
                                                users.datas.length > 0 ?
                                                <Text style={[styles.titleForm, styles.noBold]}><Text style={{ fontWeight: "bold" }}>{users.datas.find((user) => response.userId == user.id).name}</Text></Text>
                                                :
                                                ""
                                        }
                                        <Text style={[styles.titleForm, styles.question, styles.answers]}>{response.response}</Text>
                                        <Text style={{ fontStyle: "italic", color: '#333', fontSize: 12, marginLeft: "auto" }}>{response.creationTimestamp.split(' ')[0].replaceAll('-', '/').split('/').reverse().join('/')} à {response.creationTimestamp.split(' ')[1].split(':')[0]}:{response.creationTimestamp.split(' ')[1].split(':')[1]}</Text>
                                    </View>
                                ))
                                }
                            </View>
                    }
                </View>
                {
                    behavior == "answer"
                        ?
                        <View style={styles.actionsForm}>
                            <Pressable style={[styles.button, { backgroundColor: "#ff4655" }]} onPress={() => setOpenResPop(false)}>
                                <Text style={[styles.buttonText]}>Annuler</Text>
                            </Pressable>
                            <Pressable disabled={disableButton} style={[styles.button, { backgroundColor: disableButton ? "grey" : "#04bf94" }]} onPress={checkLog}>
                                <Text style={[styles.buttonText]}>Répondre</Text>
                            </Pressable>
                        </View>
                        :
                        ""
                }
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
        paddingHorizontal: 20,
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
        borderRadius: 20,
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
        marginTop: 20
    },
    question: {
        color: "#fff",
        fontSize: 16,
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(4, 191, 148, 1)',
        borderRadius: 3
    },
    questions: {
        color: "#888",
        fontStyle: 'italic',
        fontSize: 16,
        marginTop: 15
    },
    answers: {
        marginTop: 7.5,
        marginBottom: 7.5,
    },
    noBold: {
        fontWeight: "normal"
    }
})

export default FeedbackPopUp