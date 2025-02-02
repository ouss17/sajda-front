import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Linking, TouchableOpacity, ImageBackground, ScrollView, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Back } from '../../assets/Svg/Svg'

const GetContent = ({ handleMemoryClick, content, setContent, category }) => {
    const GoYt = (media) => {
        Linking.openURL(media);
    }
    return (
        <ImageBackground
            style={styles.bg}
            source={require('../../assets/ressources/pages/template.png')}
            resizeMode="cover"
        >
            <Pressable style={styles.buttonBack} onPress={() => handleMemoryClick('mediaDetail')}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#fff'} /></Text></Pressable>
            <Text style={[styles.titles, styles.mainTitle]}>{content.title}</Text>
            {
                content.content && content.media
                    ?
                    <>

                        <TouchableOpacity onPress={() => GoYt(content.media)}>
                            <Text style={[styles.items]}>Voir la vidéo</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.container}>
                            <View style={[styles.list]}>
                                <Text style={[styles.nameCategory]}>{'\t\t\t\t\t'}{content.content}</Text>
                            </View>
                        </ScrollView>
                    </>
                    :
                    content.content && !content.media
                        ?
                        <>
                            <ScrollView style={[styles.container, styles.noVidContainer]}>
                                <View style={[styles.list]}>
                                    <Text style={[styles.nameCategory]}>{'\t\t\t\t\t'}{content.content}</Text>
                                </View>
                            </ScrollView>
                        </>
                        :
                        !content.content && content.media
                            ?
                            <TouchableOpacity onPress={() => GoYt(content.media)}>
                                <Text style={[styles.items, styles.Granditems]}>Voir la vidéo</Text>
                            </TouchableOpacity>
                            :
                            <Text style={[styles.noRes]}>Il n'y pas d'information pour ce contenu.</Text>
            }
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
        // marginBottom: 45,
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
    noVidContainer: {
        marginTop: 45,
    },
    list: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    nameCategory: {
        fontSize: 16,
        color: '#333',
        textAlign: 'justify',
        lineHeight: 30
    },
    buttonBack: {
        position: 'absolute',
        zIndex: 99,
        paddingVertical: 36,
        paddingLeft: 10,
    },
    items: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 15,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#04bf94',
        width: 100,
        marginLeft: 'auto',
        marginRight: 30
    },
    Granditems: {
        width: "auto",
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20
        // marginHorizontal: 30
    },
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
})

export default GetContent;
