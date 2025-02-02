import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Eye, Edit, BarEye } from '../../assets/Svg/Svg';
import { OneSignal } from 'react-native-onesignal';


const AllActus = ({ categories, setIdActu, setCurrentMenu }) => {
    const [allActus, setAllActus] = useState([]);

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


    const GetActu = () => {
        return fetch('https://alrahma.ammadec.com/backend/actualites/getActus.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "all",
            }),
        })
            .then(json => {
                return json.json();
            })
            .then(
                (res => {
                    // console.log(res);
                    setAllActus(res);
                })
            )
            .catch(error => {
                console.error(error);
            });
    }
    useEffect(() => {
        GetActu()
    }, []);

    const ChangeActive = (visible, id, idCategory) => {
        switch (visible) {
            case 'hide':
                fetch('https://alrahma.ammadec.com/backend/actualites/getActus.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        state: "active",
                        active: 0,
                        id: id
                    }),
                })
                    .then(json => {
                        return json.json();
                    })
                    .then(
                        (res => {
                            // console.log(res);
                            if (!res.error) {
                                GetActu()
                            }
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
                break;

            case 'show':
                fetch('https://alrahma.ammadec.com/backend/actualites/getActus.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        state: "active",
                        active: 1,
                        id: id
                    }),
                })
                    .then(json => {
                        return json.json();
                    })
                    .then(
                        (res => {
                            // console.log(res);
                            if (!res.error) {
                                GetActu()
                                if (idCategory == 1) {
                                    sendNotif()
                                }
                            }
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
                break;

            default:
                break;
        }
    }

    const GoEdit = (id, menu) => {
        setIdActu(id);
        setCurrentMenu(menu);
    }

    return (
        <ScrollView style={styles.containerForm}>
            {
                allActus.length > 0 && categories.length > 0
                    ?
                    <View style={styles.fix}>
                        <View style={styles.list}>
                            <Text style={[styles.titleForm, styles.actuTitle]}>Titre</Text>
                            <Text style={styles.titleForm}>Catégorie</Text>
                            <Text style={styles.titleForm}>Action</Text>
                        </View>
                        {
                            allActus.map((actu, index) => (
                                <View key={index} style={[styles.items, { backgroundColor: (index % 2) ? '#04bf94' : "rgba(4, 191, 148, 0.1)" }]}>
                                    <Text style={[styles.actuTitle, { color: (index % 2) ? "#fff" : "#04bf94" }]}>{actu.title.length > 5 ? actu.title.substring(0, 5) + "..." : actu.title}</Text>
                                    <Text style={[{ color: (index % 2) ? "#fff" : "#04bf94" }]}>{categories.find((cat) => cat.id == actu.idCategory).name}</Text>
                                    <View style={styles.actions}>
                                        {
                                            actu.active == 1
                                                ?
                                                <Pressable onPress={() => ChangeActive('hide', actu.id, actu.idCategory)} style={styles.icons}>
                                                    <Eye style={styles.icon} fill={index % 2 ? "#fff" : "#04bf94"} margin={10} />
                                                </Pressable>
                                                :
                                                <Pressable style={styles.icons} onPress={() => ChangeActive('show', actu.id, actu.idCategory)} >
                                                    <BarEye style={styles.icon} fill={index % 2 ? "#fff" : "#04bf94"} margin={10} />
                                                </Pressable>
                                        }
                                        <Pressable onPress={() => GoEdit(actu.id, 3)} style={styles.icons}>
                                            <Edit style={styles.icon} fill={index % 2 ? "#fff" : "#04bf94"} />
                                        </Pressable>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    :
                    <Text>Il n'y a pas de publication</Text>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerForm: {
        marginBottom: 120,
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 16,
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

export default AllActus