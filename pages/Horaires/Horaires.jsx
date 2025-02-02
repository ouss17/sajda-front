import React, { useContext, useEffect, useState } from 'react'
import { Pressable, StyleSheet, View, Text, ScrollView, ImageBackground, Image, Dimensions } from 'react-native'
import { Feedback } from '../../assets/Svg/Svg';
import CreateFeedback from '../Feedback/CreateFeedbacks';
import MasdjidConfigContext from '../../context/MasdjidConfigContext';
import MasdjidContext from '../../context/MasdjidContext';
import { useNetInfo } from "@react-native-community/netinfo";
import { useFocusEffect } from '@react-navigation/native';
import SessionContext from '../../context/SessionContext';

const Horaires = () => {

    const { session, setSession } = useContext(SessionContext);
    const { masdjidConfig, setMasdjidConfig } = useContext(MasdjidConfigContext)
    const { masdjid, setMasdjid } = useContext(MasdjidContext)
    const netInfo = useNetInfo();

    /**
     * Récupère les informations de la mosquée ainsi que sa configuration
     */
    const getMasdjidd = () => {
        fetch("https://alrahma.ammadec.com/backend/config/configMasdjid.php?id=1", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .then(data => {
                // console.log(data);
                let results = JSON.parse(data);

                setMasdjidConfig(results.datas)

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

            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getMasdjidd();
    }, [])


    /**
     * Raffraichit les données de la mosquée toutes les minutes
     */
    useFocusEffect(
        React.useCallback(() => {

            const intervalId = setInterval(() => {
                getMasdjidd();
            }, 10000);

            return () => {
                clearInterval(intervalId); // Nettoyer l'intervalle lorsque l'écran est démonté
            };
        }, [])
    );


    let [date, setDate] = useState(new Date());


    const daysArabic = {
        "dimanche": "Al-Ahad",
        "lundi": "Al-Ithnayn",
        "mardi": "Ath-Thulatha",
        "mercredi": "Al-Arbaa",
        "jeudi": "Al-Khamees",
        "vendredi": "Al-Jumuah",
        "samedi": "As-Sabt",
    }

    /******** Déclaration des dates et heure fr et ar    **************/
    const [currentFrDate, setCurrentFrDate] = useState(new Intl.DateTimeFormat('fr-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()).split(' ').map((value, index) => index == 0 ? daysArabic[value] : value).join(' '));

    const [currentHour, setCurrentHour] = useState(`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`);

    const [hijriDate, setHijriDate] = useState(new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));

    const [currentPrayer, setCurrentPrayer] = useState('none');

    const [horaires, setHoraires] = useState([]);


    useEffect(() => {
        // console.log(phoneticDate);
        console.log(new Intl.DateTimeFormat('fr-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));
        console.log(new Intl.DateTimeFormat('fr-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()).split(' ').map((value, index) => index == 0 ? daysArabic[value] : value).join(' '));
    }, [hijriDate]);

    /**
     * Affiliation des horaires pour chaque prière
     */
    useFocusEffect(
        React.useCallback(() => {
            const interval = setInterval(() => {
                let date = new Date();
                setDate(date);
                setCurrentFrDate(new Intl.DateTimeFormat('fr-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()).split(' ').map((value, index) => index == 0 ? daysArabic[value] : value).join(' '));
                setCurrentHour(`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`);
                setHijriDate(new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now()));
                // TIME STAMP POSSIBLE ECART 15 MIN
                if (horaires.length > 0) {
                    if (`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}` == horaires[0]) {
                        setCurrentPrayer('fajr');
                    } else if (`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}` == horaires[2]) {
                        setCurrentPrayer('dhuhr');
                    } else if (`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}` == horaires[3]) {
                        setCurrentPrayer('asr');
                    } else if (`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}` == horaires[4]) {
                        setCurrentPrayer('maghrib');
                    } else if (`${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}` == horaires[5]) {
                        setCurrentPrayer('isha');
                    } else {
                        setCurrentPrayer('none');
                    }
                }
            }, 1000);
            return () => {
                clearInterval(interval)
            }
        }, [])
    );

    /**
     * Requete récupérant le fichier des horaires par dates
     */
    useEffect(() => {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear().toString();

        let formattedDate = day + '/' + month + '/' + year;

        fetch('https://alrahma.ammadec.com/backend/horaires/getCsv.php?id=1&year=' + date.getFullYear(), {
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
                    console.log(formattedDate);
                    console.log(res[formattedDate]);
                    setHoraires(res[formattedDate]);
                })
            )
            .catch(error => {
                console.error(error);
            });
    }, [date.getDate(), netInfo.isConnected]);

    const [isFeedback, setIsFeedback] = useState(false)

    const imageStyle = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch',
    }


    return (
        <>
            {/* <Image style={[styles.bg2, imageStyle]} source={require('../../assets/ressources/pages/horaires.png')} />
            {
                isFeedback
                &&
                <CreateFeedback setIsFeedback={setIsFeedback} />
            }
            <View style={styles.containerDate}>
                <Text style={[styles.title, styles.titleFr]}>{currentFrDate}</Text>
                <Text style={[styles.title, styles.titleHour]}>{currentHour}</Text>
                <Text style={[styles.title, styles.titleAr]}>{hijriDate}</Text>
            </View>
            {
                session.log ?
                    <Pressable onPress={(() => setIsFeedback(true))} style={styles.feedBack}>
                        <Feedback width={35} height={35} fill={"#fff"} />
                    </Pressable>
                    :
                    ""
            }
            <ScrollView style={styles.scrollView}>
                {
                    (masdjid.name !== "" && masdjid.name !== undefined) &&
                    <Text style={[styles.masjidName, styles.texts]}>Mosquée {masdjid.name}</Text>
                }
                <View style={[styles.hourSalat, styles.noPad]}>
                    <Text style={[styles.texts]}>Prière</Text>
                    <Text style={[styles.texts]}>Adhan (+iqama)</Text>
                    <Text style={[styles.texts]}>صلاة</Text>
                </View>
                {
                    horaires.length > 0 &&
                    <View style={styles.salatHoursPage}>
                        <View className="hour-salat fajr" style={[styles.hourSalat, currentPrayer == 'fajr' && styles.prayIt]}>
                            <Text className="name-french" style={[styles.text, styles.nameFrench, currentPrayer == 'fajr' && styles.prayItText]}>Fajr</Text>
                            <Text className="time-salat" style={[styles.text, styles.timeSalat, currentPrayer == 'fajr' && styles.prayItText]}>{horaires[0]} {(masdjidConfig.iqamaFajr !== "" && masdjidConfig.iqamaFajr !== undefined) && `(+${masdjidConfig.iqamaFajr})`}</Text>
                            <Text className="name-arabic" style={[styles.text, styles.nameArabic, currentPrayer == 'fajr' && styles.prayItText]}>الفجر</Text>
                        </View>
                        <View className="hour-salat dhuhr" style={[styles.hourSalat, currentPrayer == 'dhuhr' && styles.prayIt]}>
                            <Text className="name-french" style={[styles.text, styles.nameFrench, currentPrayer == 'dhuhr' && styles.prayItText]}>Dhuhr</Text>
                            <Text className="time-salat" style={[styles.text, styles.timeSalat, currentPrayer == 'dhuhr' && styles.prayItText]}>{horaires[2]} {(masdjidConfig.iqamaDhuhr !== "" && masdjidConfig.iqamaDhuhr !== undefined) && `(+${masdjidConfig.iqamaDhuhr})`}</Text>
                            <Text className="name-arabic" style={[styles.text, styles.nameArabic, currentPrayer == 'dhuhr' && styles.prayItText]}>الظهر</Text>
                        </View>
                        <View className="hour-salat asr" style={[styles.hourSalat, currentPrayer == 'asr' && styles.prayIt]}>
                            <Text className="name-french" style={[styles.text, styles.nameFrench, currentPrayer == 'asr' && styles.prayItText]}>Asr</Text>
                            <Text className="time-salat" style={[styles.text, styles.timeSalat, currentPrayer == 'asr' && styles.prayItText]}>{horaires[3]} {(masdjidConfig.iqamaAsr !== "" && masdjidConfig.iqamaAsr !== undefined) && `(+${masdjidConfig.iqamaAsr})`}</Text>
                            <Text className="name-arabic" style={[styles.text, styles.nameArabic, currentPrayer == 'asr' && styles.prayItText]}>العصر</Text>
                        </View>
                        <View className="hour-salat maghrib" style={[styles.hourSalat, currentPrayer == 'maghrib' && styles.prayIt]}>
                            <Text className="name-french" style={[styles.text, styles.nameFrench, currentPrayer == 'maghrib' && styles.prayItText]}>Maghrib</Text>
                            <Text className="time-salat" style={[styles.text, styles.timeSalat, currentPrayer == 'maghrib' && styles.prayItText]}>{horaires[4]} {(masdjidConfig.iqamaMaghrib !== "" && masdjidConfig.iqamaMaghrib !== undefined) && `(+${masdjidConfig.iqamaMaghrib})`}</Text>
                            <Text className="name-arabic" style={[styles.text, styles.nameArabic, currentPrayer == 'maghrib' && styles.prayItText]}>المغرب</Text>
                        </View>
                        <View className="hour-salat isha" style={[styles.hourSalat, currentPrayer == 'isha' && styles.prayIt]}>
                            <Text className="name-french" style={[styles.text, styles.nameFrench, currentPrayer == 'isha' && styles.prayItText]}>Isha</Text>
                            <Text className="time-salat" style={[styles.text, styles.timeSalat, currentPrayer == 'isha' && styles.prayItText]}>{horaires[5]} {(masdjidConfig.iqamaIsha !== "" && masdjidConfig.iqamaIsha !== undefined) && `(+${masdjidConfig.iqamaIsha})`}</Text>
                            <Text className="name-arabic" style={[styles.text, styles.nameArabic, currentPrayer == 'isha' && styles.prayItText]}>العشاء</Text>
                        </View>
                    </View>
                }
                {
                    (masdjidConfig.jumuas !== "" && masdjidConfig.jumuas !== undefined)
                    &&
                    <>
                        <View style={[styles.juumua]}>
                            <View style={[{
                                borderStyle: 'dashed',
                                borderBottomWidth: 2,
                                borderBottomColor: "#04bf94",
                            }, styles.dashed]}>
                            </View>
                            <Text style={[styles.juumuaTitle]}>Juumua(s) | الجمعة</Text>
                        </View>
                        <View style={[styles.jumuasShow]}>
                            {
                                masdjidConfig.jumuas !== "" &&
                                    masdjidConfig.jumuas.includes(',')
                                    ?
                                    masdjidConfig.jumuas.split(",").map((jumua, index) => (
                                        <Text style={[styles.jumuaShowTxt]} key={index}>{jumua}</Text>
                                    ))
                                    :
                                    <Text style={[styles.jumuaShowTxt]}>{masdjidConfig.jumuas}</Text>
                            }
                        </View>
                    </>
                }
            </ScrollView> */}
        </>
    )
}
const styles = StyleSheet.create({
    feedBack: {
        flex: 1,
        position: 'absolute',
        top: 50,
        right: 10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(4, 191, 148, 0.7)',
        padding: 10,
        borderRadius: 100
    },
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    containerDate: {
        alignItems: 'center',
        // margin: 35,
        marginTop: 10,
        marginBottom: 0,
    },
    scrollView: {
        marginBottom: 120,
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginHorizontal: 25,
        borderRadius: 25,
        padding: 15,
    },
    hourSalat: {
        // padding: 10,
        paddingHorizontal: 35,
        paddingVertical: 8,
        borderRadius: 100,
        // backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        // marginHorizontal: 20,
    },
    noPad: {
        paddingVertical: 0
    },
    text: {
        fontWeight: 'bold',
        color: '#333'
    },
    texts: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#333'
    },
    masjidName: {
        fontSize: 18,
    },
    titleFr: {
        fontSize: 18,
        marginBottom: '20%',
    },
    titleHour: {
        color: '#fff',
        marginBottom: '15%',
        fontSize: 30
    },
    titleAr: {
        color: '#fff',
        fontSize: 23,
    },
    prayIt: {
        backgroundColor: '#04bf94',
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
    bg: {
        // flex: 1,
        // width: '100%',
        // height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // zIndex: -1
    },
    prayItText: {
        color: '#fff'
    },
    nameFrench: {
        color: '#333',
        flex: 1,
        textAlign: "left",
        // width: "20%",
    },
    timeSalat: {
        color: '#333',
        flex: 1,
        textAlign: "center",
        // width: "20%",
    },

    nameArabic: {
        color: '#333',
        flex: 1,
        textAlign: "right",
        // width: "20%",
    },
    title: {
        color: '#333',
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    juumua: {
        position: 'relative',
        height: 36,
        // backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    },
    dashed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 19.5
    },
    juumuaTitle: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 2.5,
        color: '#04bf94',
        fontSize: 18,
        backgroundColor: '#e5f9f4',
        borderRadius: 5
    },
    jumuasShow: {
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    jumuaShowTxt: {
        color: "#333",
        fontWeight: "bold",
        paddingHorizontal: 35,
        paddingVertical: 8,
    }
});

export default Horaires