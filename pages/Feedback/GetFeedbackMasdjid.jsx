import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, ScrollView, ImageBackground, Pressable } from 'react-native'
import { View } from 'react-native-animatable';
import { Back, PickPicker } from '../../assets/Svg/Svg'
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Badge } from '@rneui/themed';
import FeedbackPopUp from './FeedbackPopUp';


const GetFeedbackMasdjid = () => {

    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const getActus = () => {

        return fetch('https://alrahma.ammadec.com/backend/feedbacks/getFeedbacksByTarget.php?id=1&target=masdjid', {
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
                    // res.datas.sort((a, b) => a.checked - b.checked);
                    // console.log(res);
                    setAllFeedbacks(res.datas);
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

    const handleClick = (feedback) => {
        setOpenedContentIndex(feedback.idFeedback === openedContentIndex ? null : feedback.idFeedback);
        if (!feedback.checked) {

            if (feedback.idFeedback !== openedContentIndex) {
                fetch('https://alrahma.ammadec.com/backend/feedbacks/checkFeedback.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        checked: true,
                        id: feedback.idFeedback
                    }),
                })
                    .then(json => {
                        return json.json();
                    })
                    .then(
                        (res => {
                            // console.log(res);
                            if (!res.error) {
                                getActus()
                            }
                        })
                    )
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    };

    const scrollView = useRef(null);

    const [inputState, setInputState] = useState({
        target: "all"
    })

    const handleChangeInput = (name, value) => {
        // console.log(name);
        // console.log(value);
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [sortedFeedbacks, setSortedFeedbacks] = useState(allFeedbacks)
    const [sortedResults, setSortedResults] = useState(sortedFeedbacks)
    useEffect(() => {
        if (sortedFeedbacks !== allFeedbacks) {
            setSortedFeedbacks(allFeedbacks)
        }
    }, [allFeedbacks]);
    useEffect(() => {
        if (sortedFeedbacks.length > 0) {
            switch (inputState.target) {
                case "all":
                    setSortedResults(sortedFeedbacks);
                    break;
                case "read":
                    setSortedResults(sortedFeedbacks.filter((feedback) => feedback.checked == 1));

                    break;
                case "unread":
                    setSortedResults(sortedFeedbacks.filter((feedback) => feedback.checked == 0));

                    break;
                case "awnser":
                    setSortedResults(sortedFeedbacks.filter((feedback) => feedback.responded == 1));

                    break;

                default:
                    break;
            }
        }
    }, [inputState.target, sortedFeedbacks]);

    const [openResPop, setOpenResPop] = useState(false)
    const [feedbackToPass, setFeedbackToPass] = useState(null)
    const [feedbackToSet, setFeedbackToSet] = useState(null)

    const OpenResPopUp = (feedback, behavior) => {
        setFeedbackToPass(feedback)
        setFeedbackToSet(behavior)
        setOpenResPop(true)
    }

    return (
        <>
            <View
                style={[styles.pickerCss]}
            >
                <Picker
                    style={styles.picker}
                    color='#333'
                    selectedValue={inputState.target}
                    onValueChange={(itemValue) => handleChangeInput('target', itemValue)}
                >

                    <Picker.Item
                        style={styles.pickers}
                        label={"Tous"}
                        value={"all"}
                    />
                    <Picker.Item
                        style={styles.pickers}
                        label={"Lus"}
                        value={"read"}
                    />
                    <Picker.Item
                        style={styles.pickers}
                        label={"Non Lus"}
                        value={"unread"}
                    />
                    <Picker.Item
                        style={styles.pickers}
                        label={"Répondus"}
                        value={"awnser"}
                    />
                </Picker>
                <View style={[styles.pickPicker]}>
                    <PickPicker fill={"black"} stroke={"none"} />
                </View>
            </View>
            {
                openResPop
                &&
                <FeedbackPopUp feedback={feedbackToPass} behavior={feedbackToSet} setOpenResPop={setOpenResPop} />
            }
            <ScrollView ref={scrollView} style={styles.scrollView}>
                {
                    // allFeedbacks.length > 0
                    sortedResults != undefined
                        ?
                        sortedResults.length > 0
                            ?
                            sortedResults.map(feedback => (
                                <Pressable key={feedback.idFeedback} style={[styles.actuContainer]} onPress={() => handleClick(feedback)}>
                                    <View style={[styles.dateAndBadge]}>
                                        <Text style={[styles.date]}>
                                            {feedback.creationTimestamp.split(' ')[0].replaceAll('-', '/').split('/').reverse().join('/')}
                                        </Text>
                                        {
                                            !feedback.checked ?
                                                //  <Text style={[styles.banner]}>Nouveau</Text>
                                                <View style={[styles.badge]}>
                                                    <Badge
                                                        value="Nouveau"
                                                        status="error" />
                                                </View>
                                                :
                                                ""
                                        }
                                        {
                                            feedback.responded ?
                                                <Text style={[styles.texts]}>{feedback.responses.length} réponse{feedback.responses.length > 1 && "s"}</Text>
                                                :
                                                ""
                                        }
                                    </View>
                                    <Text style={[styles.title]}>
                                        {feedback.title}
                                    </Text>
                                    <View style={[styles.contentContainer]}>
                                        <View style={[styles.more]}>
                                            {openedContentIndex === feedback.idFeedback ? <Text style={[styles.moreText]}>Voir moins</Text> : <Text style={[styles.moreText]}>Voir plus</Text>}
                                            <Text style={[styles.moreIcon, openedContentIndex === feedback.idFeedback && styles.moreIconActive]}><Back rotate={openedContentIndex === feedback.idFeedback ? '-90deg' : '90deg'} fill={'#fff'} /></Text>
                                        </View>
                                        {
                                            openedContentIndex === feedback.idFeedback
                                            &&
                                            <>
                                                <Text
                                                    style={[styles.content]}
                                                >
                                                    {feedback.detail}
                                                </Text>
                                                <View style={[styles.btns]}>

                                                    <Pressable onPress={() => OpenResPopUp(feedback, "answer")} style={[styles.responded]}>
                                                        <Text style={[styles.respondedText]}>Répondre</Text>
                                                    </Pressable>
                                                    {
                                                        feedback.responded ?
                                                            <Pressable onPress={() => OpenResPopUp(feedback, "responses")} style={[styles.responded]}>
                                                                <Text style={[styles.respondedText]}>Voir {feedback.responses.length <= 1 ? "la réponse" : "les réponses"}</Text>
                                                            </Pressable>
                                                            :
                                                            ""
                                                    }
                                                </View>
                                            </>
                                        }

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
        </>
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
    dateAndBadge: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 0,
    },
    date: {
        color: '#04bf94',
        fontWeight: 'bold',
        opacity: 0.6,
    },
    pickerCss: {
        backgroundColor: '#fff',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgba(4, 191, 148, 0.3)',
        paddingHorizontal: 30,
        marginTop: 10,
        marginHorizontal: 30,
        position: 'relative',
        // flex: 1,
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent : "space-between"
    },
    picker: {
        color: '#333',
        textTransform: 'capitalize',
        backgroundColor: '#fff',
    },
    pickers: {
        color: '#333',
        textTransform: 'capitalize',
        backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 5,
        // borderColor: 'red',
    },
    pickPicker: {
        position: 'absolute',
        right: 30,
        top: 12,
        pointerEvents: 'none',
        // transform: [{translateY : -50}]
    },
    actuContainer: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 20,
        marginHorizontal: 30,
        position: 'relative',
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
        marginBottom: 15,
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
        // "left": 0,
        // zIndex: -1
    },
    badge: {
        marginHorizontal: 5,
    },
    responded: {
        paddingHorizontal: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#fff",
        // backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 10,
        borderRadius: 5,
        paddingVertical: 5,
        width: 'auto',
        marginRight: 15
    },
    respondedText: {
        color: "#fff",
        fontWeight: 'bold',
        textAlign: "center",
    },
    texts: {
        color: '#888',
        marginLeft: "auto",
        fontStyle: "italic",
        fontSize: 12
    },
    btns: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
})

export default GetFeedbackMasdjid