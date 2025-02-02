import React, { useState, useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native'

const ConfirmActus = ({ checkLog }) => {
    return (
        <View style={styles.containDelete}>
            <View style={styles.confirmDelete}>
                <Text style={[styles.confirmText, styles.textIndt]}>Envoyer ce retour ?</Text>
                <View style={styles.containPress}>
                    <Pressable onPress={() => checkLog(false)} style={[styles.confirmPress, styles.press]}>
                        <Text style={[styles.confirmText, styles.confirmButtonText]}>Annuler</Text>
                    </Pressable>
                    <Pressable onPress={() => checkLog(true)} style={[styles.notOkPress, styles.press]}>
                        <Text style={[styles.confirmText, styles.confirmButtonText, styles.cancelPress]}>Confirmer</Text>
                    </Pressable>
                </View>
            </View>
        </View>
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
        textTransform: 'capitalize'
    },
    pickers: {
        color: '#333',
        textTransform: 'capitalize'
        // backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 5,
        // borderColor: 'red',
    },
    containDelete: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 20
    },
    confirmDelete: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        width: '100%',
    },
    confirmText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
    containPress: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    press: {
        padding: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    confirmPress: {
        backgroundColor: "#ff4655",
    },
    confirmButtonText: {
        color: "#fff"
    },
    textIndt: {
        marginBottom: 10,
        fontSize: 18
    },
    notOkPress: {
        backgroundColor: "#04bf94",
    },
    form: {
        // width: "75%",
        // marginTop: 30,
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
        padding: 10,
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
    actionsForm: {
        // flex:1,
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    successAction: {
        color: "#04bf94",
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e5f9f4",
        margin: 15,
        padding: 15,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 10,
    },
    errorAction: {
        color: "#ff4655",
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffecee",
        margin: 15,
        padding: 15,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 10,
    }
})

export default ConfirmActus