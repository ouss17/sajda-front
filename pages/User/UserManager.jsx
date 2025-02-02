import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Back, Edit } from '../../assets/Svg/Svg';
import { OneSignal } from 'react-native-onesignal';
import { useFocusEffect } from '@react-navigation/native';
import UserPopUp from './UserPopUp';

const UserManager = ({ handleMemoryClick }) => {
    const [currentMenu, setCurrentMenu] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // OneSignal.setAppId('aaff5f36-71db-4333-9b65-3c44458bc10f');
        OneSignal.initialize("aaff5f36-71db-4333-9b65-3c44458bc10f");

    }, [])

    const [roles, setRole] = useState([]);
    useEffect(() => {
        fetch("https://alrahma.ammadec.com/backend/user/getRoles.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .then(data => {
                let results = JSON.parse(data);
                // console.log(results);

                setRole(results)

            })
            .catch(error => console.error(error));
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

    const GetActu = () => {
        return fetch('https://alrahma.ammadec.com/backend/user/getUsers.php', {
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
    useEffect(() => {
        GetActu();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // console.log('Screen1 est monté');

            const intervalId = setInterval(() => {
                GetActu();
            }, 30000);

            return () => {
                // console.log('Screen1 est démonté (unmounted)');
                clearInterval(intervalId); // Nettoyer l'intervalle lorsque l'écran est démonté
            };
        }, [])
    );

    const [openPop, setOpenPop] = useState(false);
    const [user, setUser] = useState(null)

    const GoEdit = (id) => {
        setOpenPop(true);
        setUser(id);
    }


    return (
        <>
            <Pressable style={styles.buttonBack} onPress={() => currentMenu !== 3 ? handleMemoryClick('settings') : currentMenu == 3 && setCurrentMenu(0)}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#fff'} /></Text></Pressable>
            <Text style={styles.mainTitle}>
                Utilisateurs
            </Text>
            {
                openPop
                &&
                <UserPopUp user={user} setOpenPop={setOpenPop} roles={roles} GetActu={GetActu} />
            }
            <ScrollView style={styles.containerForm}>
                {
                    users.datas &&
                        users.datas.length > 0
                        ?
                        <View style={styles.fix}>
                            <View style={styles.list}>
                                <Text style={[styles.titleForm, styles.actuTitle]}>Pseudo</Text>
                                <Text style={styles.titleForm}>Email</Text>
                                <Text style={styles.titleForm}>Rôle</Text>
                                <Text style={styles.titleForm}>Action</Text>
                            </View>
                            {
                                users.datas.map((user, index) => (
                                    <View key={index} style={[styles.items, { backgroundColor: (index % 2) ? '#04bf94' : "rgba(4, 191, 148, 0.1)" }]}>
                                        <Text style={[styles.actuTitle, { color: (index % 2) ? "#fff" : "#04bf94" }]}>{user.name.length > 5 ? user.name.substring(0, 5) + "..." : user.name}</Text>
                                        <Text style={[styles.actuTitle, { color: (index % 2) ? "#fff" : "#04bf94" }]}>{user.email.length > 5 ? user.email.substring(0, 5) + "..." : user.email}</Text>
                                        {
                                            roles.datas
                                            &&
                                            roles.datas.length > 0
                                            &&
                                            <Text style={[styles.actuTitle, { color: (index % 2) ? "#fff" : "#04bf94" }]}>{roles.datas.find((role) => role.Id == user.role).name}</Text>
                                        }
                                        <View style={styles.actions}>
                                            <Pressable onPress={() => GoEdit(user)} style={styles.icons}>
                                                <Edit style={styles.icon} fill={index % 2 ? "#fff" : "#04bf94"} />
                                            </Pressable>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        :
                        <Text>Il n'y a pas d'utilisateurs</Text>
                }
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
    containerForm: {
        marginBottom: 120,
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 16,
        marginTop: 50,
    },
    fix: {
        marginBottom: 50
    },
    list: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
    items: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actuTitle: {
        width: 60,
        // fontWeight: 'bold',
    },
    titleForm: {
        color: "#333",
        fontWeight: 'bold',
        fontSize: 16,
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
    buttonBack: {
        position: 'absolute',
        zIndex: 99,
        paddingVertical: 36,
        paddingLeft: 10,
    },
})

export default UserManager