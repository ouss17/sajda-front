import React, { useContext, useEffect, useRef } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Annonce, Back, Bell, Feedback, Logout, Masjid, MyFeed, User, UserManage } from '../../assets/Svg/Svg';
import MemoryClickContext from '../../context/MemoryClickContext';
import Actus from '../Actus/Actus';
import CreateActus from '../Actus/CreateActus';
import Feedbacks from '../Feedback/Feedbacks';
import MyFeedbacks from '../Feedback/MyFeedbacks';
import Masdjid from '../Masdjid/Masdjid';
import CreateUser from '../User/CreateUser';
import LoginUser from '../User/LoginUser';
import ProfilUser from '../User/ProfilUser';
import UserManager from '../User/UserManager';
import Notif from './Notif';
import { useDispatch, useSelector } from 'react-redux';
import { CheckUser } from '../../modules/CheckUser';
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const API_URL = extra.API_URL || "http://localhost:3003";
import SessionContext from '../../context/SessionContext';
import { removeUser } from '../../reducers/userReducer';

const Settings = () => {
    const { memoryClick, setMemoryClick } = useContext(MemoryClickContext);
  const { session, setSession } = useContext(SessionContext);

    const handleMemoryClick = (page) => {
        setMemoryClick(page);
    }

    const dispatch = useDispatch();

    const {isLogged} = CheckUser();

    const user = useSelector((state) => state.userReducer.value);

    const destroySession = () => {
        return fetch(`${API_URL}/users/logout`, {
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
                (res) => {
                    // console.log(res);
                    setSession(false);
                    dispatch(removeUser());
                }
            )
            .catch(error => {
                console.error(error);
            });
    };
    const scrollView = useRef(null);

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
                            user.pseudo &&
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
                                user.pseudo ?
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
                                     * 3 = dev
                                     * 4 = user
                                     * 5 = imam
                                     */
                                    user.pseudo && (user.role == "admin" || user.role == "gerant" || user.role == "dev") &&
                                    <>
                                        {
                                            (user.role == 'admin' || user.role == "dev") &&
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
                                    user.pseudo ?
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