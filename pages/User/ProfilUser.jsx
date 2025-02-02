import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable, Dimensions, Image } from 'react-native'
import { Back, Eye, BarEye } from '../../assets/Svg/Svg';
import SessionContext from '../../context/SessionContext'

const ProfilUser = ({ handleMemoryClick }) => {

    const { session, setSession } = useContext(SessionContext);

    const [inputState, setInputState] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: ""
    });

    const [successAction, setSuccessAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        setInputState({ ...inputState, name: session.session.name, email: session.session.email })
    }, [session])


    const handleChangeInput = (name, value) => {
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const imageStyle = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch',
    }
    const checkLog = () => {

        const {
            name,
            email,
            password,
            newPassword
        } = inputState;
        return fetch('https://alrahma.ammadec.com/backend/user/connectUser.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "modify",
                name: name,
                email: email,
                password: password,
                newPassword: newPassword
            }),
        })
            .then(json => {
                return json.json();
            })
            .then(
                (res) => {

                    // console.log(res);
                    if (res.error) {
                        setError(res.error)
                        setErrorAction(true)
                        setTimeout(() => {
                            setErrorAction(false)
                            setError("");
                        }, 5000);

                    } else {
                        setSession(res);
                        setSuccessAction(true)
                        setTimeout(() => {
                            setSuccessAction(false)
                        }, 5000);
                    }
                }
            )
            .catch(error => {
                console.error(error);
            });
    };


    const scrollView = useRef(null);

    const [securePassword, setSecurePassword] = useState(true);
    const [secureNPassword, setSecureNPassword] = useState(true);

    return (
        <>
            {/* <ImageBackground
            style={styles.bg}
            source={require('../../assets/ressources/pages/template.png')}
            resizeMode="cover"
        > */}
            <Image style={[styles.bg2, imageStyle]} source={require('../../assets/ressources/pages/userInterface.png')} />
            <View style={[styles.fix]}></View>
            {
                successAction
                &&
                <Text style={styles.successAction}>Le profil a bien été modifié.</Text>
            }
            {
                errorAction
                &&
                <Text style={styles.errorAction}>{error}</Text>
            }
            {/* <ScrollView ref={scrollView} style={styles.containerForm}> */}
            <ScrollView style={styles.form}>
                <Pressable style={styles.buttonBack} onPress={() => handleMemoryClick('settings')}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#333'} /></Text></Pressable>
                <Text style={styles.mainTitle}>
                    Profil
                </Text>
                <View>
                    <View style={styles.field}>
                        <Text style={styles.titleForm}>Identifiant</Text>
                        <TextInput
                            style={styles.value}
                            value={inputState.name}
                            placeholder="titre"
                            onChangeText={(valueN) => handleChangeInput('name', valueN)}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.titleForm}>Email</Text>
                        <TextInput
                            style={styles.value}
                            editable
                            placeholder="email@gmail.com"
                            value={inputState.email}
                            onChangeText={(value) => handleChangeInput("email", value)}
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={[styles.field, { position: 'relative' }]}>
                        <Text style={[styles.titleForm]}>Ancien mot de passe #</Text>
                        <TextInput
                            style={[styles.value]}
                            secureTextEntry={securePassword}
                            type="password"
                            name="password"
                            placeholder="Monmotdepasse123#"
                            placeholderTextColor={'#777'}
                            value={inputState.password}
                            onChangeText={(valueP) => handleChangeInput("password", valueP)}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourTextInput.focus(); }}
                            blurOnSubmit={false}
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
                    <View style={[styles.field, { position: 'relative' }]}>
                        <Text style={[styles.titleForm]}>Nouveau mot de passe #</Text>
                        <TextInput
                            style={[styles.value]}
                            secureTextEntry={secureNPassword}
                            type="password"
                            name="newPassword"
                            placeholder="Monmotdepasse123#"
                            placeholderTextColor={'#777'}
                            value={inputState.newPassword}
                            onChangeText={(valueNP) => handleChangeInput("newPassword", valueNP)}
                            ref={(input) => { this.fourTextInput = input; }}
                            onSubmitEditing={() => { checkLog() }}
                        />
                        <Pressable style={styles.hidePassword} onPress={() => setSecureNPassword(!secureNPassword)}>
                            {
                                secureNPassword
                                    ?
                                    <Eye fill={"#333"} />
                                    :
                                    <BarEye fill={"#333"} />
                            }
                        </Pressable>
                    </View>

                </View>
                <View style={styles.actionsForm}>
                    <Pressable style={[styles.button]} onPress={checkLog}>
                        <Text style={[styles.buttonText]}>Modifier</Text>
                    </Pressable>
                </View>
            </ScrollView>
            {/* </ScrollView> */}
            {/* </ImageBackground> */}
        </>
    )
}
const styles = StyleSheet.create({
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
    fix: {
        padding: 20
    },
    mainTitle: {
        textAlign: "center",
        // padding: 32,
        // backgroundColor: "#04bf94",
        color: "#333",
        fontSize: 28,
        fontWeight: "bold",
    },
    containerForm: {
        // width: "100%",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    },
    required: {
        color: 'red',
    },
    form: {
        // width: "75%",
        marginTop: 50,
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 16,
        marginBottom: 120,
    },
    field: {
        // marginBottom: 15,
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
    actionsForm: {
        justifyContent: 'center',
        backgroundColor: '#04bf94',
        marginBottom: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 50,
    },
    button: {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    buttonText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonBack: {
        position: 'absolute',
        zIndex: 99,
        // paddingVertical: 36,
        // paddingLeft: 10,
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

export default ProfilUser