import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, Pressable, Switch } from 'react-native';
import { Annonce, Back, Feedback, Logout, Masjid, User, Bell } from '../../assets/Svg/Svg';
import OneSignal from 'react-native-onesignal';

const Notif = ({ handleMemoryClick }) => {
    const [currentMenu, setCurrentMenu] = useState(0);
    function resubscribeUser() {
        OneSignal.disablePush(false);
    }
    function unsubscribeUser() {
        OneSignal.disablePush(true);
    }
    const [sub, setSub] = useState(false);
    async function getDeviceStateInfo() {
        try {
            const deviceState = await OneSignal.getDeviceState();
            if (deviceState.isSubscribed) {
                // console.log('L\'utilisateur est actuellement abonné aux notifications.');
                setSub(true);
            } else {
                // console.log('L\'utilisateur n\'est pas actuellement abonné aux notifications.');
                setSub(false);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des informations de l\'état du périphérique:', error);
        }
        console.log(sub);
    }
    const toggleSwitch = () => {
        if (sub) {
            unsubscribeUser();
            setSub(false);
        } else {
            resubscribeUser();
            setSub(true);
        }
    };

    useEffect(() => {
        getDeviceStateInfo();
    }, [sub]);
    const scrollView = useRef(null);

    // SEND NOTIF TO ONE USER
    // function sendNotifOne() {
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: 'Basic ODUzMTcxZGUtMTc4Zi00NGU4LThiN2UtNTVjYjE1Y2RhNDRl',
    //         },
    //         body: JSON.stringify({
    //             app_id: 'aaff5f36-71db-4333-9b65-3c44458bc10f',
    //             include_player_ids: ["398b87f7-ab1f-4cf9-a9e3-619c5b905f12"], // ext_id_user
    //             template_id: '02711f37-17b2-44ce-aa43-5b8dbffa7bcc',
    //             // contents: { en: 'New Actualities', fr: 'Il y\'a du nouveau dans l\'actualité' },
    //             // name: 'Actualités',
    //         })
    //     };

    //     fetch('https://onesignal.com/api/v1/notifications', options)
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err));
    // }

    // sendNotifOne();
    return (
        <>
            <Pressable style={styles.buttonBack} onPress={() => currentMenu !== 3 ? handleMemoryClick('settings') : currentMenu == 3 && setCurrentMenu(0)}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#fff'} /></Text></Pressable>
            <Text style={styles.mainTitle}>
                Notifications
            </Text>
            <ScrollView ref={scrollView} style={styles.containerForm}>
                <View style={styles.form}>
                    <View style={[styles.params]}>
                        <Text style={[styles.titleForm]}>Toutes les notifications</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#017a5f' }}
                            thumbColor={sub ? '#04bf94' : '#f4f3f4'}
                            ios_backgroundColor="#04bf94"
                            onValueChange={toggleSwitch}
                            value={sub}
                        />
                    </View>
                </View>
            </ScrollView >
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
    list: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    items: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 15,
        fontWeight: 'bold'
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
    },
    params:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pickers: {
        color: '#333',
        // backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 5,
        // borderColor: 'red',
    },
    form: {
        // width: "75%",
        marginTop: 50,
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
        color: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: "green",
        textAlign: "center",
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    errorAction: {
        color: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: "red",
        textAlign: "center",
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    }
})


export default Notif