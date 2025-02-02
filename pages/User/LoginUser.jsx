import React, { useEffect, useContext } from 'react'
import { Button, Text, View, StyleSheet, Pressable, ImageBackground, ScrollView, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
// import { LogSuccess, LogFail } from '../../assets/Svg/Svg'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Back, Eye, BarEye } from '../../assets/Svg/Svg'
import SessionContext from '../../context/SessionContext'
import MemoryClickContext from '../../context/MemoryClickContext'
import OneSignal from 'react-native-onesignal';
import UserIdContext from '../../context/UserIdContext'

const LoginUser = () => {

    const { usersId, setUsersId } = useContext(UserIdContext);
    const { memoryClick, setMemoryClick } = useContext(MemoryClickContext);
    const { session, setSession } = useContext(SessionContext);
    const [inputState, setInputState] = useState({
        userName: "",
        userPass: "",
    });

    const [loginResult, setLoginResult] = useState(false);

    const [errorAction, setErrorAction] = useState(false);

    const navigation = useNavigation();

    // const emptyValue = () => {
    //     setInputState({
    //         userName: "",
    //         userPass: "",
    //     });
    // };

    const imageStyle = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch',
    }

    const handleChangeInput = (name, value) => {
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    const checkLog = () => {
        const { userName, userPass } = inputState;
        return fetch('https://alrahma.ammadec.com/backend/user/connectUser.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "log",
                userName: userName,
                userPass: userPass,
                extId: usersId
            }),
        })
            .then(json => {
                return json.json();
            })
            .then(
                (res) => {
                    // console.log(res);
                    setSession(res);
                    if (res.log) {
                        setLoginResult(true);
                        setMemoryClick('settings');
                        if (res.session.role == 1) {
                            const options = {
                                method: 'PUT',
                                headers: { accept: 'text/plain', 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    tags: {
                                        role: 'admin',
                                    }
                                })
                            };

                            fetch(`https://onesignal.com/api/v1/apps/aaff5f36-71db-4333-9b65-3c44458bc10f/users/${usersId}`, options)
                                .then(response => response.json())
                                .then(response => console.log(response))
                                .catch(err => console.error(err));
                        } else if (res.session.role == 2) {
                            const options = {
                                method: 'PUT',
                                headers: { accept: 'text/plain', 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    tags: {
                                        role: 'gerant',
                                    }
                                })
                            };

                            fetch(`https://onesignal.com/api/v1/apps/aaff5f36-71db-4333-9b65-3c44458bc10f/users/${usersId}`, options)
                                .then(response => response.json())
                                .then(response => console.log(response))
                                .catch(err => console.error(err));
                        } else if (res.session.role == 3) {
                            const options = {
                                method: 'PUT',
                                headers: { accept: 'text/plain', 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    tags: {
                                        role: 'dev',
                                    }
                                })
                            };

                            fetch(`https://onesignal.com/api/v1/apps/aaff5f36-71db-4333-9b65-3c44458bc10f/users/${usersId}`, options)
                                .then(response => response.json())
                                .then(response => console.log(response))
                                .catch(err => console.error(err));
                        } else {
                            const options = {
                                method: 'PUT',
                                headers: { accept: 'text/plain', 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    tags: {
                                        role: 'user',
                                    }
                                })
                            };

                            fetch(`https://onesignal.com/api/v1/apps/aaff5f36-71db-4333-9b65-3c44458bc10f/users/${usersId}`, options)
                                .then(response => response.json())
                                .then(response => console.log(response))
                                .catch(err => console.error(err));
                        }

                        navigation.navigate('Horaires');
                    } else {
                        setErrorAction(true)
                        setTimeout(() => {
                            setErrorAction(false)
                        }, 5000);
                    }
                }
            )
            .catch(error => {
                console.error(error);
            });
    };

    const [securePassword, setSecurePassword] = useState(true);


    return (
        <>
            {/* <ImageBackground
            style={styles.bg}
            source={require('../../assets/ressources/pages/template.png')}
            resizeMode="cover"
        > */}
            <Image style={[styles.bg2, imageStyle]} source={require('../../assets/ressources/pages/userAction.png')} />
            {
                errorAction &&
                <Text style={styles.errorAction}>Identifiant ou Mot de passe incorrect</Text>
            }
            <View style={[styles.fix]}></View>
            <ScrollView style={[styles.container]}>
                <Pressable style={styles.buttonBack} onPress={() => setMemoryClick('settings')}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#333'} /></Text></Pressable>
                <Text style={[styles.mainTitle]}>Je me connecte</Text>
                <View style={styles.form}>
                    <View>
                        <View>
                            <Text style={[styles.labels]}>Identifiant ou email</Text>
                            <TextInput
                                style={[styles.inputs]}
                                value={inputState.userName}
                                placeholder="moi123 ou moi123@email.com"
                                placeholderTextColor={'#777'}
                                onChangeText={(valueN) => handleChangeInput('userName', valueN)}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={{ position: 'relative' }}>
                            <Text style={[styles.labels]}>Mot de passe</Text>
                            <TextInput
                                style={[styles.inputs]}
                                secureTextEntry={securePassword}
                                type="password"
                                name="userPass"
                                placeholder="123456789"
                                placeholderTextColor={'#777'}
                                value={inputState.password}
                                onChangeText={(value) => handleChangeInput("userPass", value)}
                                ref={(input) => { this.secondTextInput = input; }}
                                onSubmitEditing={() => { checkLog() }}
                            />
                            <Pressable style={styles.hidePassword} onPress={() => setSecurePassword(!securePassword)}>
                                {
                                    securePassword
                                        ?
                                        <Eye fill={"#333"} />
                                        :
                                        <BarEye fill={"#333"} />
                                }
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.actionsForm}>
                        <Text style={styles.texts} onPress={() => setMemoryClick('register')}>Pas de compte ? Enregistrez-vous ici !</Text>
                        <Pressable style={[styles.button]} id="logIn" onPress={checkLog}>
                            <Text style={[styles.buttonText]}>Connexion</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            {/* </ImageBackground> */}
        </>
    )
}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        // backgroundColor: '#ecf6f3',
        // width: '100%',
        // height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // zIndex: -1
    },
    hidePassword: {
        flex: 1,
        position: 'absolute',
        top: 20,
        // left: 0,
        right: 15,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg2: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
        // resizeMode: 'cover',
        // height: null,
        // width: null,
        // android:windowSoftInputMode="adjustResize"
    },
    fix: {
        padding: 60
    },
    container: {
        // width: "90%",
        // marginTop: "10%",
        // marginLeft: "10%",
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 30,
        // padding: 18,
        // paddingHorizontal: 30,
        // position: 'absolute',
        // top: 100,
        // left: 0,
        // transform: [{ translateY: 100 }],
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 10,
        marginBottom: 120
    },
    form: {
        marginHorizontal: 50
    },
    mainTitle: {
        textAlign: "center",
        textTransform: 'uppercase',
        // padding: 32,
        // backgroundColor: "#04bf94",
        color: "#333",
        fontSize: 25,
        fontWeight: "bold",
        // marginBottom: 20,
        marginVertical: 20,
    },
    labels: {
        // textAlign: 'center',
        color: "#333",
        fontSize: 18,
        fontWeight: 'bold'
    },
    texts: {
        marginVertical: 10,
        color: '#333',
        textAlign: "center"
    },
    inputs: {
        borderRadius: 100,
        borderWidth: 2,
        paddingHorizontal: 20,
        borderColor: 'rgba(4, 191, 148, 0.3)',
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 15,
        color: '#333'
    },
    actionsForm: {
        justifyContent: 'center',
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
        paddingVertical: 15,
        paddingLeft: 15,
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
export default LoginUser