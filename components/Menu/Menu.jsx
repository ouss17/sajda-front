import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import { OneSignal } from 'react-native-onesignal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { Pressable, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Horaires from '../../pages/Horaires/Horaires.jsx';
import Localisation from '../../pages/Localisation/Localisation.jsx';
import CreateActus from '../../pages/Actus/CreateActus.jsx';
import GetActus from '../../pages/Actus/GetActus.jsx';
import CreateCategory from '../../pages/Category/CreateCategory.jsx';
import GetCategories from '../../pages/Category/GetCategories.jsx';
import Quran from '../../pages/Quran/Quran.jsx';
import Settings from '../../pages/Settings/Settings.jsx';
import CreateConfig from '../../pages/Settings/CreateConfig.jsx';
import LoginUser from '../../pages/User/LoginUser.jsx';
import CreateUser from '../../pages/User/CreateUser.jsx';
import Menu2 from './Menu2.jsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Actus, Gear, Home, Marker, Media } from '../../assets/Svg/Svg.jsx';
import * as Animatable from 'react-native-animatable';
import SessionContext from '../../context/SessionContext.js';
import MemoryClickContext from '../../context/MemoryClickContext.js';
import MasdjidContext from '../../context/MasdjidContext.js';
import MasdjidConfigContext from '../../context/MasdjidConfigContext.js';
import MemoryClickMediaContext from '../../context/MemoryClickMediaContext.js';
import TemplateCategory from '../../pages/Category/TemplateCategory.jsx';
import UserIdContext from '../../context/UserIdContext.js';

const Tab = createBottomTabNavigator();

const TabArr = [
    { name: 'GetActus', component: GetActus },
    { name: 'GetCategories', component: TemplateCategory },
    { name: 'Horaires', component: Horaires },
    { name: 'Localisation', component: Localisation },
    { name: 'Settings', component: Settings },
    // { name: 'Quran', component: Quran },
    // { name: 'CreateConfig', component: CreateConfig },
    { name: 'LoginUser', component: LoginUser },
    // { name: 'CreateUser', component: CreateUser },
    // { name: 'CreateActus', component: CreateActus },
    // { name: 'CreateCategory', component: CreateCategory },
];

const animateActive = { 0: { scale: 1, translateY: 0 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } };
const animateInactive = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 0 } };

const circleActive = { 0: { scale: 0 }, 1: { scale: 1 } };
const circleInactive = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
    const { memoryClick, setMemoryClick } = useContext(MemoryClickContext)
    const { memoryClickMedia, setMemoryClickMedia } = useContext(MemoryClickMediaContext)
    const { item, onPress, accessibilityState } = props;
    const onPressSettings = () => {
        setMemoryClick("settings");
        onPress();
    }
    const onPressMedias = () => {
        setMemoryClickMedia("medias");
        onPress();
    }
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    useEffect(() => {
        if (viewRef.current != null) {
            if (focused) {
                viewRef.current.animate(animateActive);
                circleRef.current.animate(circleActive);
            } else {
                viewRef.current.animate(animateInactive);
                circleRef.current.animate(circleInactive);
            }
        }
    }, [focused])

    return (
        <>
            {
                item.name == 'GetActus' ?
                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={1}
                        style={styles.container}>
                        <Animatable.View
                            ref={viewRef}
                            duration={250}
                            style={styles.btn}>
                            <Animatable.View
                                ref={circleRef}
                                duration={250}
                                style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#04bf94", borderRadius: 25 }} />
                            <Actus fill={"none"} stroke={focused ? '#fff' : '#04be9380'} />
                        </Animatable.View>
                    </TouchableOpacity>
                    : item.name == 'GetCategories' ?
                        <TouchableOpacity
                            onPress={onPressMedias}
                            activeOpacity={1}
                            style={styles.container}>
                            <Animatable.View
                                ref={viewRef}
                                duration={250}
                                style={styles.btn}>
                                <Animatable.View
                                    ref={circleRef}
                                    duration={250}
                                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#04bf94", borderRadius: 25 }} />
                                <Media fill={"none"} stroke2={'none'} stroke={focused ? '#fff' : '#04be9380'} fill2={focused ? '#fff' : '#04be9380'} />
                            </Animatable.View>
                        </TouchableOpacity>
                        : item.name == 'Horaires' ?
                            <TouchableOpacity
                                onPress={onPress}
                                activeOpacity={1}
                                style={styles.container}>
                                <Animatable.View
                                    ref={viewRef}
                                    duration={250}
                                    style={styles.btn}>
                                    <Animatable.View
                                        ref={circleRef}
                                        duration={250}
                                        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#04bf94", borderRadius: 25 }} />
                                    <Home fill={"none"} stroke={focused ? '#fff' : '#04be9380'} />
                                </Animatable.View>
                            </TouchableOpacity>
                            : item.name == 'Localisation' ?
                                <TouchableOpacity
                                    onPress={onPress}
                                    activeOpacity={1}
                                    style={styles.container}>
                                    <Animatable.View
                                        ref={viewRef}
                                        duration={250}
                                        style={styles.btn}>
                                        <Animatable.View
                                            ref={circleRef}
                                            duration={250}
                                            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#04bf94", borderRadius: 25 }} />
                                        <Marker fill={"none"} stroke={focused ? '#fff' : '#04be9380'} />
                                    </Animatable.View>
                                </TouchableOpacity>
                                : item.name == 'Settings' &&
                                <TouchableOpacity
                                    onPress={onPressSettings}
                                    activeOpacity={1}
                                    style={styles.container}>
                                    <Animatable.View
                                        ref={viewRef}
                                        duration={250}
                                        style={styles.btn}>
                                        <Animatable.View
                                            ref={circleRef}
                                            duration={250}
                                            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "#04bf94", borderRadius: 25 }} />
                                        <Gear fill={"none"} stroke={focused ? '#fff' : '#04be9380'} />
                                    </Animatable.View>
                                </TouchableOpacity>
            }
        </>
    )
}

const Menu = () => {

    const [usersId, setUsersId] = useState(null);
    const setExternalUserId = async (externalUserId) => {
        try {
            await OneSignal.setExternalUserId(externalUserId);
            console.log('External UserID défini avec succès :', externalUserId);
        } catch (error) {
            console.log('Erreur lors de la définition de l\'External UserID :', error);
        }
    };

    // const getExternalUserId = async () => {
    //     try {
    //         const externalUserId = await OneSignal.getExternalUserId();
    //         console.log('External UserID actuel :', externalUserId);
    //         setUsersId(externalUserId)
    //         // Faites quelque chose avec l'External UserID ici...
    //     } catch (error) {
    //         console.log('Erreur lors de la récupération de l\'External UserID :', error);
    //     }
    // };

    const getUserId = async () => {
        try {
            const deviceState = await OneSignal.getDeviceState();
            const userId = deviceState.userId;
            console.log('OneSignal User ID:', userId);
            setUsersId(userId)
            setExternalUserId(userId)
            // Faites quelque chose avec l'ID OneSignal ici...
        } catch (error) {
            console.log('Erreur lors de l\'obtention de l\'ID OneSignal:', error);
        }
    };
    useEffect(() => {
        // OneSignal.setAppId('aaff5f36-71db-4333-9b65-3c44458bc10f');
        OneSignal.initialize("aaff5f36-71db-4333-9b65-3c44458bc10f");

        getUserId()
        // getExternalUserId()
    }, [])

    const bottomSheetRef = useRef(null);
    const snapPoints = ['3%', '75%'];
    const [isOpen, setIsOpen] = useState(false);
    const handleSheetChanges = useCallback((index) => {
        setTimeout(() => {
            setIsOpen(true);
            console.log(isOpen);
        },)
    }, []);

    const [session, setSession] = useState({ "log": false });

    const [memoryClick, setMemoryClick] = useState('settings');
    const [memoryClickMedia, setMemoryClickMedia] = useState('medias');

    const [masdjid, setMasdjid] = useState({
        id: 1,
        name: "",
        localisation: "",
        num: "",
        facebook: "",
        twitter: "",
        instagram: "",
    })

    const [masdjidConfig, setMasdjidConfig] = useState({
        idMasdjid: "",
        iqamaFajr: "",
        iqamaDhuhr: "",
        iqamaAsr: "",
        iqamaMaghrib: "",
        iqamaIsha: "",
        nbJumuas: "",
        jumuas: "",
    })

    return (
        <UserIdContext.Provider value={{ usersId, setUsersId }}>

            <MasdjidContext.Provider value={{ masdjid, setMasdjid }}>
                <MasdjidConfigContext.Provider value={{ masdjidConfig, setMasdjidConfig }}>
                    <MemoryClickContext.Provider value={{ memoryClick, setMemoryClick }}>
                        <MemoryClickMediaContext.Provider value={{ memoryClickMedia, setMemoryClickMedia }}>
                            <SessionContext.Provider value={{ session, setSession }}>
                                <GestureHandlerRootView style={styles.container2}>
                                    <NavigationContainer style={styles.centre}>
                                        <Tab.Navigator
                                            initialRouteName="Horaires"
                                            screenOptions={{
                                                tabBarStyle: {
                                                    backgroundColor: "#fff",
                                                    width: "90%",
                                                    // marginVertical: 0,
                                                    // marginHorizontal: "auto",
                                                    // paddingVertical: 0,
                                                    paddingLeft: 50,
                                                    // padding: 0,
                                                    // margin: 0,
                                                    display: 'flex',
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'space-around',
                                                    position: 'absolute',
                                                    bottom: 30,
                                                    right: "50%",
                                                    transform: [{ translateX: "5%" }],
                                                    // left: 50,
                                                    // marginBottom: 30,
                                                    // marginRight: 50,
                                                    elevation: 0,
                                                    borderRadius: 15,
                                                    height: 60,
                                                    ...styles.shadow,
                                                }
                                            }}
                                        >
                                            {TabArr.map((item, index) => {
                                                return (
                                                    <Tab.Screen
                                                        key={index}
                                                        name={item.name}
                                                        component={item.component}
                                                        options={{
                                                            header: () => null,
                                                            tabBarButton: (props) => <TabButton {...props} item={item} />
                                                        }} />
                                                );
                                            })}
                                        </Tab.Navigator>
                                    </NavigationContainer >
                                    {/* <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                onDismiss={() => setIsOpen(false)}
            >
                <NavigationContainer>
                    <Menu2 />
                </NavigationContainer>
            </BottomSheet> */}
                                </GestureHandlerRootView>
                            </SessionContext.Provider>
                        </MemoryClickMediaContext.Provider>
                    </MemoryClickContext.Provider>
                </MasdjidConfigContext.Provider>
            </MasdjidContext.Provider>
        </UserIdContext.Provider>
    )
}

const styles = StyleSheet.create({
    icons: {
        backgroundColor: 'red'
    },
    shadow: {
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        flex: 1,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: 'center'
    },
});

export default Menu