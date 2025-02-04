import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Back, CrossReturn, PickPicker } from '../../assets/Svg/Svg'
import { useNavigation } from '@react-navigation/native'


const UserPopUp = ({ user, setOpenPop, roles, GetActu }) => {


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


    const [inputState, setInputState] = useState({
        idRole: user.role,
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



    const checkLog = () => {
        const { idRole } = inputState;
        return fetch('https://sajda-back.vercel.app/users/updateRole/'+user.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "update",
                role: idRole
            }),
        })
            .then(response => response.text())
            .then(data => {
                // console.log('test,' + data);
                let result = JSON.parse(data);
                if (result.response) {
                    setSuccessAction(true)
                    // sendNotif();
                    GetActu();
                    setTimeout(() => {
                        setSuccessAction(false);
                        setOpenPop(false);
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

    const [successDelete, setSuccessDelete] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)

    const DeleteUser = (user) => {
        return fetch('https://sajda-back.vercel.app/users/delete/'+user.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "delete",
            }),
        })
            .then(response => response.text())
            .then(data => {
                // console.log('test,' + data);
                let result = JSON.parse(data);
                if (result.response) {
                    setSuccessDelete(true)
                    // sendNotif();
                    GetActu();
                    setOpenPop(false);
                    setTimeout(() => {
                        setSuccessDelete(false)
                    }, 5000);
                } else {
                    setErrorDelete(true)
                    setTimeout(() => {
                        setErrorDelete(false)
                    }, 5000);
                }
                // console.log(JSON.parse(data));
            })
            .catch(error => {
                console.error(error);
            });
    }

    const scrollView = useRef(null);

    return (
        <>
            <View ref={scrollView} style={styles.containerForm}>
            </View>
            {
                successAction
                &&
                <Text style={styles.successAction}>L'utilisateur a bien été modifié.</Text>
            }
            {
                errorAction
                &&
                <Text style={styles.errorAction}>L'utilisateur n'a pas été modifié.</Text>
            }
            {
                successDelete
                &&
                <Text style={styles.successAction}>L'utilisateur a bien été supprimé.</Text>
            }
            {
                errorDelete
                &&
                <Text style={styles.errorAction}>L'utilisateur n'a pas été supprimé.</Text>
            }
            <ScrollView style={styles.form}>
                <Pressable onPress={() => setOpenPop(false)} style={[styles.crossReturn]}>
                    <CrossReturn />
                </Pressable>
                <Text style={styles.mainTitle}>
                    {user.name}
                </Text>
                <View className="fieldsForm">
                    <View style={styles.field}>
                        <Text style={styles.titleForm}>Rôle <Text style={styles.required}>*</Text></Text>
                        <View style={styles.pickerCss}>
                            <Picker
                                style={styles.picker}
                                color='#333'
                                selectedValue={inputState.idRole}
                                onValueChange={(itemValue) => handleChangeInput('idRole', itemValue)}
                            >
                                <Picker.Item
                                    style={styles.pickers}
                                    label={roles.datas.find(role => role.Id == inputState.idRole).name.toLowerCase()
                                        .charAt(0)
                                        .toUpperCase() +
                                        roles.datas.find(role => role.Id == inputState.idRole).name.slice(1).toLowerCase()}
                                    value={roles.datas.find(role => role.Id == inputState.idRole).id}
                                />
                                {
                                    roles.datas.length > 0 && inputState.idRole !== "" &&
                                    roles.datas.map((role) => (

                                        role.Id != inputState.idRole &&
                                        <Picker.Item
                                            style={styles.pickers}
                                            key={role.Id}
                                            label={role.name.toLowerCase()
                                                .charAt(0)
                                                .toUpperCase() +
                                                role.name.slice(1).toLowerCase()}
                                            value={role.Id}
                                        />

                                    ))}

                            </Picker>
                            <View style={[styles.pickPicker]}>
                                <PickPicker fill={"black"} stroke={"none"} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.actionsForm}>
                    <Pressable style={[styles.button, { backgroundColor: "#ff4655" }]} onPress={() => setOpenPop(false)}>
                        <Text style={[styles.buttonText]}>Annuler</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: "#04bf94" }]} onPress={checkLog}>
                        <Text style={[styles.buttonText]}>Changer</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: "#ff4655" }]} onPress={() => DeleteUser(user)}>
                        <Text style={[styles.buttonText]}>Supprimer</Text>
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

export default UserPopUp