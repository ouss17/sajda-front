import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, Dimensions, TouchableOpacity, View, ImageBackground, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import picRound from '../../assets/ressources/pics/media.png';

const GetCategories = ({ handleMemoryClick, setCategory }) => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [lastContent, setLastContent] = useState([]);

    const dimensionsForScreen = Dimensions.get("screen");

    const handlePress = (idCategory) => {
        navigation.navigate('GetContentByCategory', { idCategory: idCategory });
    };

    useEffect(() => {
        fetch('https://alrahma.ammadec.com/backend/actualites/getCategories.php', {
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
                    setCategories(result.datas);
                    setLastContent(result.lastContent);
                    // console.log(result.lastContent.media.split('v=')[1]);
                }
            }
            )
            .catch(error => {
                console.error(error);
            });
    }, []);
    const scrollView = useRef(null);
    const passTtlmonde = (category) => {
        handleMemoryClick('mediaDetail')
        setCategory(category)
    }
    return (
        <ImageBackground
            style={styles.bg}
            source={require('../../assets/ressources/pages/template.png')}
            resizeMode="cover"
        >
            <Text style={[styles.titles, styles.mainTitle]}>Médias</Text>
            <ScrollView style={styles.container}>
                <View style={[styles.list]}>
                    {
                        categories.length > 0
                        &&
                        categories.map((category) => (
                            <TouchableOpacity style={[styles.containCategory]} key={category.id} onPress={()=> passTtlmonde(category)}>
                                <Image style={[styles.imageMedia]} source={picRound} />
                                <Text style={[styles.nameCategory]}>{category.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    )
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
    },
    container: {
        marginHorizontal: 30,
        marginBottom: 120,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containCategory: {
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        // backgroundColor: 'red',
    },
    imageMedia: {
        width: 110,
        height: 110,
        borderRadius: 100
    },
    nameCategory: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
})

export default GetCategories