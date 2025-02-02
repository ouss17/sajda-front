import React, { useState, useEffect, useRef, useContext } from 'react';
import { Pressable, Text, StyleSheet, View, Linking, TouchableOpacity, Image } from 'react-native'
import { Pin } from '../../assets/Svg/Svg';
import Lottie from 'lottie-react-native';
import lottiePlayer from "../../assets/ressources/lotties/loca.json";
import MasdjidContext from '../../context/MasdjidContext';
import { useFocusEffect } from '@react-navigation/native';

const Localisation = () => {
    function ouvrirGoogleMaps() {
        const adresse = '52 Av. du Dr Schaffner, 93270 Sevran';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;
        // console.log(url);

        Linking.openURL(url);
    }

    const { masdjid, setMasdjid } = useContext(MasdjidContext);

    function openSocial(adrs) {
        const url = adrs;
        // console.log(url);

        Linking.openURL(url);
    }

    // const [masdjid, setMasdjid] = useState();

    const getMasdjidd = () => {
        fetch("https://alrahma.ammadec.com/backend/masdjid/getMasdjid.php?id=1", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .then(data => {
                // console.log(data);
                let results = JSON.parse(data);

                setMasdjid(results.datas)

            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getMasdjidd()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            // console.log('Screen1 est monté');

            const intervalId = setInterval(() => {
                getMasdjidd();


            }, 10000);

            return () => {
                // console.log('Screen1 est démonté (unmounted)');
                clearInterval(intervalId); // Nettoyer l'intervalle lorsque l'écran est démonté
            };
        }, [])
    );


    // useEffect(() => {
    //     console.log(masdjid);
    // }, [masdjid])

    return (
        <View style={styles.container}>
            <Lottie style={styles.lottie} source={lottiePlayer} autoPlay loop />
            {
                masdjid &&
                <View style={styles.localisation}>
                    <Text style={styles.texts}>Mosquée : {masdjid.name}</Text>
                    <Text style={styles.texts}>Adresse : {masdjid.localisation}</Text>
                    <Text style={styles.texts}>Téléphone : {masdjid.num}</Text>
                    {
                        ((masdjid.facebook != null && masdjid.facebook != '') || (masdjid.instagram != null && masdjid.instagram != '') || (masdjid.twitter != null && masdjid.twitter != '')) &&
                        <View style={styles.socialContent}>
                            {
                                (masdjid.facebook != null && masdjid.facebook != '') &&
                                <Pressable onPress={() => openSocial(masdjid.facebook)}>
                                    <Image style={[styles.social]} source={require('../../assets/ressources/pics/fb.png')} />
                                </Pressable>
                            }
                            {
                                (masdjid.instagram != null && masdjid.instagram != '') &&
                                <Pressable onPress={() => openSocial(masdjid.instagram)}>
                                    <Image style={[styles.social]} source={require('../../assets/ressources/pics/insta.png')} />
                                </Pressable>
                            }
                            {
                                (masdjid.twitter != null && masdjid.twitter != '') &&
                                <Pressable onPress={() => openSocial(masdjid.twitter)}>
                                    <Image style={[styles.social]} source={require('../../assets/ressources/pics/tw.png')} />
                                </Pressable>
                            }
                        </View>
                    }
                    <TouchableOpacity style={styles.pin} onPress={ouvrirGoogleMaps}>
                        <Text style={styles.pinText}>Localiser la mosquée</Text>
                        <Pin />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    localisation: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        position: "absolute",
        bottom: 135,
        // transform: translateY(50 %) translateX(- 50 %),
        left: 10,
        zIndex: 1,
        width: "95%",
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    texts: {
        color: '#333'
    },
    lottie: {
        position: 'absolute',
        top: -50,
        bottom: -50,
        right: -50,
        left: -30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "135vw",
        height: '200vh',
        // marginBottom: 100,
        // marginRight: 50
    },
    socialContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around'
    },
    social: {
        width: 35,
        height: 35,
    },
    pinText: {
        color: '#04bf94',
        // fontWeight: 'bold'
    },
    pin: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    adrs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
});
export default Localisation