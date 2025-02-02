import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'
import MasdjidContext from '../../context/MasdjidContext';

const UpdateMasdjid = () => {

    const { masdjid, setMasdjid } = useContext(MasdjidContext);

    const [inputState, setInputState] = useState({
        id: 1,
        name: "",
        localisation: "",
        num: "",
        facebook: "",
        twitter: "",
        instagram: "",
    });

    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (inputState.name.trim() !== "" && inputState.localisation.trim() !== "" && inputState.num.trim() !== "") {
            setDisableButton(false);
        } else {
            setDisableButton(true)
        }
    }, [inputState]);

    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);

    const handleChangeInput = (name, value) => {
        // console.log(name);
        // console.log(value);
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // console.log(categories.find(categ => categ.id == inputState.category).name)
    };


    useEffect(() => {
        fetch('https://alrahma.ammadec.com/backend/masdjid/getMasdjid.php?id=1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(data => {
                let datas = JSON.parse(data);
                // console.log(datas);
                // console.log('test,' + data);
                setInputState({
                    ...inputState,
                    name: datas.datas.name,
                    localisation: datas.datas.localisation,
                    num: datas.datas.num,
                    facebook: datas.datas.facebook,
                    twitter: datas.datas.twitter,
                    instagram: datas.datas.instagram,
                })

            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const checkLog = () => {
        const { id, name, localisation, num, facebook, instagram, twitter } = inputState;
        return fetch('https://alrahma.ammadec.com/backend/masdjid/createMasdjid.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: 'update',
                name: name,
                localisation: localisation,
                num: num,
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                id: id,
            }),
        })
            .then(response => response.text())
            .then(data => {
                // console.log('test,' + data);
                let result = JSON.parse(data);
                if (result.send) {
                    setSuccessAction(true)
                    setMasdjid({
                        ...masdjid,
                        name: name,
                        localisation: localisation,
                        num: num,
                        facebook: facebook,
                        twitter: twitter,
                        instagram: instagram,
                        id: id,
                    })
                    setTimeout(() => {
                        setSuccessAction(false)
                    }, 5000);
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
                <Text style={styles.successAction}>Les données ont bien été modifiées.</Text>
            }
            {
                errorAction
                &&
                <Text style={styles.errorAction}>Les données n'ont pas été mofdifiées.</Text>
            }
            <ScrollView ref={scrollView} style={styles.containerForm}>
                <View style={styles.form}>
                    <View className="fieldsForm">
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Nom <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.value}
                                value={inputState.name}
                                placeholder="Nom de la mosquée"
                                placeholderTextColor={'#777'}
                                onChangeText={(valueN) => handleChangeInput('name', valueN)}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Adresse <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={[styles.value]}
                                placeholder="52 Av. du Dr Schaffner, 93270 Sevran"
                                placeholderTextColor={'#777'}
                                value={inputState.localisation}
                                onChangeText={(value) => handleChangeInput("localisation", value)}
                                ref={(input) => { this.secondTextInput = input; }}
                                onSubmitEditing={() => {
                                    this.thirdTextInput.focus();
                                }}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Numéro</Text>
                            <TextInput
                                style={styles.value}
                                keyboardType='numeric'
                                value={inputState.num}
                                placeholder="0143851109"
                                maxLength={14}
                                placeholderTextColor={'#777'}
                                onChangeText={(valueI) => handleChangeInput('num', valueI)}
                                ref={(input) => { this.thirdTextInput = input; }}
                                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Facebook</Text>
                            <TextInput
                                style={styles.value}
                                value={inputState.facebook}
                                placeholder="Lien facebook"
                                placeholderTextColor={'#777'}
                                onChangeText={(valueF) => handleChangeInput('facebook', valueF)}
                                ref={(input) => { this.fourthTextInput = input; }}
                                onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Twitter</Text>
                            <TextInput
                                style={styles.value}
                                value={inputState.twitter}
                                placeholder="Lien twitter"
                                placeholderTextColor={'#777'}
                                onChangeText={(valueT) => handleChangeInput('twitter', valueT)}
                                ref={(input) => { this.fifthTextInput = input; }}
                                onSubmitEditing={() => { this.sixthTextInput.focus(); }}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Instagram</Text>
                            <TextInput
                                style={styles.value}
                                value={inputState.instagram}
                                placeholder="Lien instagram"
                                placeholderTextColor={'#777'}
                                onChangeText={(valueM) => handleChangeInput('instagram', valueM)}
                                ref={(input) => { this.sixthTextInput = input; }}
                                onSubmitEditing={() => { checkLog() }}
                            />
                        </View>

                    </View>
                    <View style={styles.actionsForm}>
                        <Pressable disabled={disableButton} style={[styles.button, { backgroundColor: disableButton ? "grey" : "#04bf94" }]} onPress={checkLog}>
                            <Text style={[styles.buttonText]}>Modifier</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView >
        </>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        textAlign: "center",
        padding: 30,
        paddingBottom: 45,
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
        paddingHorizontal: 10,
        marginTop: 10,
    },
    picker: {
        color: '#333',
        textTransform: 'capitalize'
    },
    pickers: {
        color: '#333',
        textTransform: 'capitalize'
        // backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 5,
        // borderColor: 'red',
    },
    containDelete: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 20
    },
    confirmDelete: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        width: '100%',
    },
    confirmText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
    containPress: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    press: {
        padding: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    confirmPress: {
        backgroundColor: "#ff4655",
    },
    confirmButtonText: {
        color: "#fff"
    },
    textIndt: {
        marginBottom: 10,
        fontSize: 18
    },
    notOkPress: {
        backgroundColor: "#04bf94",
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
        // flex:1,
        flexDirection: "row",
        justifyContent: 'space-around'
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

export default UpdateMasdjid