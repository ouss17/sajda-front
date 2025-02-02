import React, { useState, useEffect, useContext } from 'react'
import { Button, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import AllActus from './AllActus';
import EditActus from './EditActus';
import CreateActus from './CreateActus';
import { Back } from '../../assets/Svg/Svg'

const Actus = ({ handleMemoryClick }) => {
    const [currentMenu, setCurrentMenu] = useState(0);

    const [idActu, setIdActu] = useState(null);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("https://alrahma.ammadec.com/backend/actualites/retrieveCategories.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .then(data => {
                let results = JSON.parse(data);
                // console.log(results);

                setCategories(results.data)

            })
            .catch(error => console.error(error));
    }, [])
    return (
        <>
            <Pressable style={styles.buttonBack} onPress={() => currentMenu !== 3 ? handleMemoryClick('settings') : currentMenu == 3 && setCurrentMenu(0)}><Text style={styles.buttonBackText}><Back rotate={'0deg'} fill={'#fff'} /></Text></Pressable>
            <Text style={styles.mainTitle}>
                Publications
            </Text>
            <View style={styles.list}>
                <TouchableOpacity onPress={() => setCurrentMenu(0)}><Text style={[styles.items, {
                    color: currentMenu == 0 ? "#fff" : "#04bf94", backgroundColor: currentMenu == 0 ? "#04bf94" : 'rgba(4, 191, 148, 0.1)' }]}>Actualités</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentMenu(1)}><Text style={[{ color: currentMenu == 1 ? "#fff" : "#04bf94", backgroundColor: currentMenu == 1 ? "#04bf94" : 'rgba(4, 191, 148, 0.1)', }, styles.items]}>Ajouter</Text></TouchableOpacity>
            </View>
            {
                currentMenu == 0
                    ?
                    <AllActus categories={categories} setIdActu={setIdActu} setCurrentMenu={setCurrentMenu} />
                    :
                    currentMenu == 1
                    ?
                        <CreateActus categories={categories} />
                    : 
                        <EditActus categories={categories} id={idActu} setCurrentMenu={setCurrentMenu}  />
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        textAlign: "center",
        padding: 32,
        backgroundColor: "#04bf94",
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
    },
    list: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    items:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 15,
        fontWeight: 'bold'
    },
    containerForm: {
        // width: "100%",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        marginBottom: 120,
    },
    required: {
        color: 'red',
    },
    pickerCss: {
        backgroundColor: '#fff',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'rgba(4, 191, 148, 0.3)',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    picker: {
        color: '#333',
    },
    pickers: {
        color: '#333',
        // backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 5,
        // borderColor: 'red',
    },
    form: {
        // width: "75%",
        marginTop: 50,
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 16,
    },
    field: {
        marginBottom: 15,
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
    button: {
        borderRadius: 20,
        backgroundColor: '#04bf94',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        // width: 150,
        marginHorizontal: 50,
        marginBottom: 20
    },
    buttonText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 'bold'
    },
    buttonBack: {
        position: 'absolute',
        zIndex: 99,
        paddingVertical: 36,
        paddingLeft: 10,
    },
    successAction: {
        color: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: "green",
        textAlign: "center",
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    errorAction: {
        color: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: "red",
        textAlign: "center",
        borderRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    }

})

export default Actus