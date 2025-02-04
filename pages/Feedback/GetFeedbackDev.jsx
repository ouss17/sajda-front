import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, ScrollView, ImageBackground, Pressable } from 'react-native'
import { View } from 'react-native-animatable';
import { Back, Trash } from '../../assets/Svg/Svg'
import { useFocusEffect } from '@react-navigation/native';
import SessionContext from '../../context/SessionContext';

const GetFeedbackDev = () => {

    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const getActus = () => {
        return fetch('https://sajda-back.vercel.app/feedback/target/1/developper', {
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

    }
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

    const [openedContentIndex, setOpenedContentIndex] = useState(null);
    const { session, setSession } = useContext(SessionContext);

    const handleClick = (feedback) => {
        setOpenedContentIndex(feedback.idFeedback === openedContentIndex ? null : feedback.idFeedback);
        // console.log(feedback.externalId);
    }


    const scrollView = useRef(null);


    const [successDelete, setSuccessDelete] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)
    const DeleteFeed = (feedback) => {
        return fetch('https://sajda-back.vercel.app/feedbacks/delete/'+feedback.idFeedback, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(data => {
                // console.log('test,' + data);
                let result = JSON.parse(data);
                if (result.response) {
                    setSuccessDelete(true)
                    // sendNotif();
                    getActus();
                    // setOpenPop(false);
                    // setTimeout(() => {
                    //     setSuccessDelete(false)
                    // }, 5000);
                } else {
                    // setErrorDelete(true)
                    // setTimeout(() => {
                    //     setErrorDelete(false)
                    // }, 5000);
                }
                // console.log(JSON.parse(data));
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <ScrollView ref={scrollView} style={styles.scrollView}>
            {
                // allFeedbacks.datas.length > 0
                allFeedbacks.datas != undefined
                    ?
                    allFeedbacks.datas.length > 0
                        ?
                        allFeedbacks.datas.map(feedback => (
                            <Pressable key={feedback.idFeedback} style={[styles.actuContainer]} onPress={() => handleClick(feedback)}>
                                <View style={[styles.topFeed]}>
                                    <Text style={[styles.date]}>{feedback.creationTimestamp.split(' ')[0].replaceAll('-', '/').split('/').reverse().join('/')}</Text>
                                    <Pressable onPress={() => DeleteFeed(feedback)} style={[styles.deleteBtn]}>
                                        <Trash />
                                    </Pressable>
                                </View>
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
    topFeed: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteBtn: {
        marginLeft: 'auto',
        marginRight: 15
    }
})

export default GetFeedbackDev