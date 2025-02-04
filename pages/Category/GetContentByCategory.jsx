import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground, ScrollView, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Back } from '../../assets/Svg/Svg'
// import YoutubeIframe from 'react-native-youtube-iframe';

const GetContentByCategory = ({ handleMemoryClick, category, content, setContent }) => {

    const dimensionsForScreen = Dimensions.get("screen");
    const [contents, setContents] = useState([]);
    useEffect(() => {
        fetch(`https://sajda-back.vercel.app/posts/category/1/${category.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(res => {
                // console.log(res);
                if (res) {
                    let result = JSON.parse(res);
                    setContents(result.datas);
                }
            }
            )
            .catch(error => {
                console.error(error);
            });
    }, []);

    const passTtlmonde=(content) => {
        handleMemoryClick('mediaDetailContent')
        setContent(content)
    }

    return (
        <ImageBackground
            style={styles.bg}
            source={require('../../assets/ressources/pages/template.png')}
            resizeMode="cover"
        >
            <Pressable style={styles.buttonBack} onPress={() => handleMemoryClick('medias')}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#fff'} /></Text></Pressable>
            <Text style={[styles.titles, styles.mainTitle]}>{category.name}</Text>
            <ScrollView style={styles.container}>
                <View style={[styles.list]}>
                    {
                        contents.length > 0
                            ?
                            contents.map((content, index) => (
                                <>

                                    <TouchableOpacity
                                        key={content.id}
                                        style={[styles.containCategory, {
                                            textTransform: "capitalize",
                                            // borderBottomColor: index + 1 == contents.length ? "none" : 'rgba(4, 191, 148, 0.4)',
                                            // borderBottomWidth: index+1 == contents.length ? 0 : 1,
                                            // paddingBottom: 20 
                                        }]}
                                        onPress={() => passTtlmonde(content)}
                                    >
                                        <View style={[styles.numberMediaContent]}>
                                            <Text style={[styles.numberMedia]}>{index + 1}</Text>
                                        </View>
                                        <Text style={[styles.nameCategory]}>{content.title.length < 30 ? content.title : content.title.substring(0, 27) + "..."}</Text>
                                    </TouchableOpacity>
                                    {
                                        index + 1 != contents.length &&
                                        <View style={[styles.sep]}></View>
                                    }

                                </>
                            ))
                            :
                            <Text>Aucun contenu disponible pour le moment</Text>
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    );
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
    titles: {
        fontWeight: "bold"
    },
    mainTitle: {
        textAlign: "center",
        padding: 32,
        marginBottom: 45,
        color: "white",
        fontSize: 28,
        backgroundColor: "#04bf94",
        textTransform: "capitalize"
    },
    container: {
        marginHorizontal: 30,
        marginBottom: 120,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    containCategory: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginVertical: 10
    },
    numberMediaContent: {
        backgroundColor: 'rgba(4, 191, 148, 0.1)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    numberMedia: {
        color: '#04bf94',
        transform: [{ scale: 1.5 }],
        width: 20,
        height: 20,
        textAlign: 'center'
    },
    nameCategory: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 20,
    },
    buttonBack: {
        position: 'absolute',
        zIndex: 99,
        paddingVertical: 36,
        paddingLeft: 10,
    },
    sep: {
        width: '85%',
        height: 2,
        borderRadius: 5,
        backgroundColor: 'rgba(4, 191, 148, 0.4)',
    },
})

export default GetContentByCategory;
