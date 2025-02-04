import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, ScrollView, ImageBackground, Pressable } from 'react-native'
import { View } from 'react-native-animatable';
import { Back } from '../../assets/Svg/Svg'
import { useFocusEffect } from '@react-navigation/native';

const GetFeedbacks = ({ handleMemoryClick }) => {

    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const getActus = () => {
        return fetch('https://sajda-back.vercel.app/feedbacks/mosquee/1', {
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
                    setAllFeedbacks(res.data);
                    // console.log(res);
                })
            )
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        getActus();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // console.log('Screen1 est monté');

            const intervalId = setInterval(() => {
                getActus();



            }, 10000);

            return () => {
                // console.log('Screen1 est démonté (unmounted)');
                clearInterval(intervalId); // Nettoyer l'intervalle lorsque l'écran est démonté
            };
        }, [])
    );

    useEffect(() => {
        // console.log(allFeedbacks.datas, 'heh');
    }, [allFeedbacks]);

    const [openedContentIndex, setOpenedContentIndex] = useState(null);

    const handleClick = (index) => {
        setOpenedContentIndex(index === openedContentIndex ? null : index);
    };

    const scrollView = useRef(null);

    return (
        <ImageBackground
            style={styles.bg}
            source={require('../../assets/ressources/pages/template.png')}
            resizeMode="cover"
        >
            <Pressable style={styles.buttonBack} onPress={() => handleMemoryClick('settings')}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#fff'} /></Text></Pressable>
            <Text style={[styles.mainTitle]}>Retours d'utilisateurs</Text>
            <ScrollView ref={scrollView} style={styles.scrollView}>
                {
                    // allFeedbacks.datas.length > 0
                    allFeedbacks.datas != undefined
                        ?
                        allFeedbacks.datas.length > 0
                            ?
                            allFeedbacks.datas.map(feedback => (
                                <Pressable key={feedback.idFeedback} style={[styles.actuContainer]} onPress={() => handleClick(feedback.idFeedback)}>
                                    <Text style={[styles.date]}>{feedback.creationTimestamp.split(' ')[0].replaceAll('-', '/').split('/').reverse().join('/')}</Text>
                                    <Text style={[styles.title]}>
                                        {feedback.title}
                                    </Text>
                                    <View style={[styles.contentContainer]}>
                                        <View style={[styles.more]}>
                                            {openedContentIndex === feedback.idFeedback ? <Text style={[styles.moreText]}>Voir moins</Text> : <Text style={[styles.moreText]}>Voir plus</Text>}
                                            <Text style={[styles.moreIcon, openedContentIndex === feedback.idFeedback && styles.moreIconActive]}><Back rotate={openedContentIndex === feedback.idFeedback ? '-90deg' : '90deg'} fill={'#fff'} /></Text>
                                        </View>
                                        {openedContentIndex === feedback.idFeedback && <Text style={[styles.content]}>{feedback.detail}</Text>}
                                    </View>
                                </Pressable>
                            ))
                            :
                            <Text style={styles.noRes}>
                                Aucun retours d'utilisateurs pour le moment.
                            </Text>
                        :
                        <Text style={styles.noRes}>
                            Aucun retours d'utilisateurs pour le moment.
                        </Text>
                }
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    noRes: {
        color: '#333',
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 50,
        marginVertical: 25,
        textAlign: 'center',
        fontStyle: 'italic',
        borderRadius: 5
    },
    mainTitle: {
        textAlign: "center",
        padding: 32,
        // paddingBottom: 52,
        backgroundColor: "#04bf94",
        color: "white",
        fontSize: 28,
        fontWeight: "bold"
    },
    date: {
        color: '#04bf94',
        fontWeight: 'bold',
        padding: 15,
        paddingBottom: 0,
        opacity: 0.6
    },
    actuContainer: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 20,
        marginHorizontal: 30
        // padding: 16,
    },
    buttonBack: {
        position: 'absolute',
        zIndex: 99,
        paddingVertical: 36,
        paddingLeft: 10,
    },
    scrollView: {
        marginBottom: 120,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        // position: "relative",
        color: "#333",
        marginBottom: 15
    },
    contentContainer: {
        backgroundColor: '#04bf94',
        padding: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    more: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    moreText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 5,
        fontSize: 16
    },
    moreIcon: {
        // transition: 'all 250ms',
    },
    moreIconActive: {},
    content: {
        // width: "100%",
        // overflow: "hidden",
        textAlign: "justify",
        // backgroundColor: "#fff",
        // borderRadius: 16,
        // height: "auto",
        // alignItems: "center",
        fontSize: 18,
        color: "#fff",
        paddingHorizontal: 5,
        fontWeight: 'bold'
    },
    bg: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // zIndex: -1
    },
})

export default GetFeedbacks