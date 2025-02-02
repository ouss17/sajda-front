import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, Switch } from 'react-native';
import LoginUser from '../User/LoginUser';
import CreateActus from '../Actus/CreateActus';
import SessionContext from '../../context/SessionContext';
import MemoryClickContext from '../../context/MemoryClickContext';
import CreateUser from '../User/CreateUser';
import { Annonce, Back, Feedback, Logout, Masjid, User, Bell, UserManage, MyFeed } from '../../assets/Svg/Svg';
import ProfilUser from '../User/ProfilUser';
import Actus from '../Actus/Actus';
import GetFeedbacks from '../Feedback/GetFeedbacks';
import Masdjid from '../Masdjid/Masdjid';
import OneSignal from 'react-native-onesignal';
import Notif from './Notif';
import UserManager from '../User/UserManager';
import Feedbacks from '../Feedback/Feedbacks';
import MyFeedbacks from '../Feedback/MyFeedbacks';

const Settings = () => {
    const { memoryClick, setMemoryClick } = useContext(MemoryClickContext);

    const handleMemoryClick = (page) => {
        setMemoryClick(page);
    }
    const { session, setSession } = useContext(SessionContext);
    const checkSession = () => {
        return fetch('https://alrahma.ammadec.com/backend/user/connectUser.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "check",
            }),
        })
            .then(json => {
                return json.json();
            })
            .then(
                (res) => {
                    // console.log(res);
                    setSession(res);
                }
            )
            .catch(error => {
                console.error(error);
            });
    };

    const destroySession = () => {
        return fetch('https://alrahma.ammadec.com/backend/user/connectUser.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "logout",
            }),
        })
            .then(json => {
                return json.json();
            })
            .then(
                (res) => {
                    // console.log(res);
                    setSession(false);
                }
            )
            .catch(error => {
                console.error(error);
            });
    };
    const scrollView = useRef(null);
    useEffect(() => {
        checkSession();
    }, []);
    return (
        <>
            {
                memoryClick == 'settings' ?
                    <ImageBackground
                        style={styles.bg}
                        source={require('../../assets/ressources/pages/template.png')}
                        resizeMode="cover"
                    >
                        <Text style={[styles.titles, styles.mainTitle]}>Paramètres</Text>
                        {
                            session.log &&
                            <View style={[styles.accountSecure]}>
                                <TouchableOpacity style={[styles.account]} onPress={() => handleMemoryClick('ProfilUser')}>
                                    <View style={styles.accountIcon} >
                                        <User />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        <ScrollView ref={scrollView} style={styles.container}>
                            {
                                session.log ?
                                    <View style={[styles.param]}>
                                        <Text style={[styles.texts, styles.infoParam]}>Compte</Text>
                                        <TouchableOpacity style={[styles.params]} onPress={destroySession}>
                                            <View style={styles.menuBox} >
                                                <Logout />
                                            </View>
                                            <Text style={[styles.texts, styles.info]}>Déconnexion</Text>
                                            <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={[styles.param]}>
                                        <Text style={[styles.texts, styles.infoParam]}>Compte</Text>
                                        <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('Login')}>
                                            <View style={styles.menuBox} >
                                                <User />
                                            </View>
                                            <Text style={[styles.texts, styles.info]}>Connexion</Text>
                                            <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                        </TouchableOpacity>
                                    </View>
                            }
                            {/* <TouchableOpacity style={styles.menuBox} onPress={() => handleMemoryClick('Quran')}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4004/4004500.png' }}
                            />
                            <Text style={styles.info}>Quran</Text>
                        </TouchableOpacity> */}

                            <View style={[styles.param, styles.endParam]}>
                                <Text style={[styles.texts, styles.infoParam]}>Gestion</Text>
                                {
                                    /**
                                     * 1 = admin
                                     * 2 = gerant
                                     * 3 = développeur
                                     * 4 = user
                                     * 5 = imam
                                     */
                                    session.log && (session.session.role == 3 || session.session.role == 1 || session.session.role == 2) &&
                                    <>
                                        {
                                            (session.session.role == '3') &&
                                            <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('UserManage')}>
                                                <View style={styles.menuBox} >
                                                    <UserManage />
                                                </View>
                                                <Text style={[styles.texts, styles.info]}>Utilisateurs</Text>
                                                <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                            </TouchableOpacity>
                                        }
                                        <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('Actus')}>
                                            <View style={styles.menuBox} >
                                                <Annonce />
                                            </View>
                                            <Text style={[styles.texts, styles.info]}>Publications</Text>
                                            <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('masdjid')}>
                                            <View style={styles.menuBox} >
                                                <Masjid />
                                            </View>
                                            <Text style={[styles.texts, styles.info]}>Mosquée</Text>
                                            <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('feedbacks')}>
                                            <View style={styles.menuBox} >
                                                <Feedback width={25} height={25} fill={"#04bf94"} />
                                            </View>
                                            <Text style={[styles.texts, styles.info]}>Retours d'utilisateurs</Text>
                                            <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                        </TouchableOpacity>
                                    </>
                                }
                                {
                                    session.log ?
                                        <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('MyFeedbacks')}>
                                            <View style={styles.menuBox} >
                                                <MyFeed width={25} height={25} fill={"#04bf94"} />
                                            </View>
                                            <Text style={[styles.texts, styles.info]}>Mes retours</Text>
                                            <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                        </TouchableOpacity>
                                        :
                                        ""
                                }
                                <TouchableOpacity style={[styles.params]} onPress={() => handleMemoryClick('Notif')}>
                                    <View style={styles.menuBox} >
                                        <Bell />
                                    </View>
                                    <Text style={[styles.texts, styles.info]}>Notifications</Text>
                                    <Back rotate={'180deg'} fill={'#c6c8c7'} />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={[styles.param]}>
                                <Text style={[styles.texts, styles.infoParam]}>Gestion</Text>
                                <View style={[styles.params]}>
                                    <Text style={[styles.texts, styles.info]}>Toutes les notifications</Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#017a5f' }}
                                        thumbColor={sub ? '#04bf94' : '#f4f3f4'}
                                        ios_backgroundColor="#04bf94"
                                        onValueChange={toggleSwitch}
                                        value={sub}
                                    />
                                </View>
                            </View> */}
                            {/* <TouchableOpacity style={styles.menuBox} onPress={() => handleMemoryClick('Create Category')}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                            />
                            <Text style={styles.info}>Create Category</Text>
                        </TouchableOpacity> */}

                            {/* <TouchableOpacity style={styles.menuBox} onPress={() => handleMemoryClick('Create Config')}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                            />
                            <Text style={styles.info}>Create Config</Text>
                        </TouchableOpacity> */}

                            {/* <TouchableOpacity style={styles.menuBox} onPress={() => handleMemoryClick('Create User')}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                            />
                            <Text style={styles.info}>Create User</Text>
                        </TouchableOpacity> */}
                        </ScrollView>
                    </ImageBackground>
                    : memoryClick == 'Login' ?
                        <LoginUser handleMemoryClick={handleMemoryClick} />
                        : memoryClick == 'Actus' ?
                            <Actus handleMemoryClick={handleMemoryClick} />
                            : memoryClick == 'Create Actus' ?
                                <CreateActus handleMemoryClick={handleMemoryClick} />
                                : memoryClick == 'ProfilUser' ?
                                    <ProfilUser handleMemoryClick={handleMemoryClick} />
                                    : memoryClick == 'register' ?
                                        <CreateUser handleMemoryClick={handleMemoryClick} />
                                        : memoryClick == 'feedbacks' ?
                                            <Feedbacks handleMemoryClick={handleMemoryClick} />
                                            : memoryClick == 'masdjid' ?
                                                <Masdjid handleMemoryClick={handleMemoryClick} />
                                                : memoryClick == 'Notif' ?
                                                    <Notif handleMemoryClick={handleMemoryClick} />
                                                    : memoryClick == 'UserManage' ?
                                                        <UserManager handleMemoryClick={handleMemoryClick} />
                                                        : memoryClick == 'MyFeedbacks' &&
                                                        <MyFeedbacks handleMemoryClick={handleMemoryClick} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // zIndex: -1
    },
    texts: {
        color: "#333",
        fontWeight: "bold"
    },
    titles: {
        fontWeight: "bold"
    },
    accountSecure: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
        marginTop: 82.5,
        width: "100%",
        height: 40,
    },
    account: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 60,
    },
    mainTitle: {
        textAlign: "center",
        padding: 30,
        paddingBottom: 45,
        marginBottom: 45,
        color: "white",
        fontSize: 28,
        backgroundColor: "#04bf94",
    },
    container: {
        paddingTop: 40,
        // flexWrap: 'wrap',
        marginHorizontal: 30,
        backgroundColor: '#fff',
        borderRadius: 30,
        marginBottom: 120,
    },
    infoParam: {
        color: '#c6c8c7',
        textTransform: 'uppercase',
        marginHorizontal: 20,
        // marginBottom: 15,
    },
    params: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        width: '85%',
        marginVertical: 5,
    },
    param: {
        marginBottom: 10,
    },
    endParam: {
        paddingBottom: 60
    },
    paramSwitch: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        width: '80%',
        marginVertical: 5,
    },
    menuBox: {
        backgroundColor: 'rgba(4, 191, 148, 0.1)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    icon: {
        width: 60,
        height: 60,
    },
    info: {
        fontSize: 14,
        color: '#696969',
        textAlign: 'center'
    },
})

export default Settings