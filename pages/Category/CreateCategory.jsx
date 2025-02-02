import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const CreateCategory = () => {

    const [inputState, setInputState] = useState({
        title: "",
        comment: "",
    });

    const [successAction, setSuccessAction] = useState(false);
    const [problemAction, setProblemAction] = useState(false);
    const [errorAction, setErrorAction] = useState(false);

    const emptyValue = () => {
        setInputState({
            title: "",
            comment: "",
        });
    };

    const handleChangeInput = (name, value) => {
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const checkLog = () => {
        const { title, comment } = inputState;
        return fetch('https://alrahma.ammadec.com/backend/actualites/createCategory.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                comment: comment
            }),
        })
            .then(response => response.text())
            .then(data => {
                let result = JSON.parse(data);
                emptyValue()
                if (result.send) {
                    setSuccessAction(true)
                    setTimeout(() => {
                        setSuccessAction(false)
                    }, 5000);
                } else {
                    if (result.doublon) {
                        setProblemAction(true)
                        setTimeout(() => {
                            setProblemAction(false)
                        }, 5000);
                    } else {
                        setErrorAction(true)
                        setTimeout(() => {
                            setErrorAction(false)
                        }, 5000);
                    }
                }
                console.log(JSON.parse(data));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View>
            <Text style={styles.mainTitle}>Ajouter une catégorie</Text>
            <View>
                {
                    successAction
                    &&
                    <Text style={styles.successAction}>La catégorie a bien été enregistrée.</Text>
                }
                {
                    problemAction
                    &&
                    <Text style={styles.problemAction}>La catégorie existe déjà !</Text>
                }
                {
                    errorAction
                    &&
                    <Text style={styles.errorAction}>La catégorie n'a pas été enregistrée.</Text>
                }
            </View>
            <View style={styles.containerForm}>

                <View style={styles.form}>
                    <View className="fieldsForm">
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Titre *</Text>
                            <TextInput
                                style={styles.value}
                                value={inputState.title}
                                placeholder="titre"
                                onChangeText={(valueN) => handleChangeInput('title', valueN)}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.titleForm}>Commentaire *</Text>
                            <TextInput
                                style={styles.value}
                                editable
                                multiline
                                numberOfLines={4}
                                placeholder="Un commentaire sur la catégorie"
                                value={inputState.comment}
                                onChangeText={(value) => handleChangeInput("comment", value)}
                            />
                        </View>
                    </View>
                    <View className="actionsForm">
                        <Button style={styles.button} title='Créer' onPress={checkLog}>
                            {this.res == 'null' ? <Text>heh</Text> : null}
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainTitle: {
        textAlign: "center",
        padding: 10,
        backgroundColor: "#04bf94",
        color: "white",
        fontSize: 28,
        fontWeight: "bold"
    },
    containerForm: {
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: "75%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 16,
    },
    field: {
        marginBottom: 30,
    },
    titleForm: {
        fontSize: 22,
        marginBottom: 10,
    },
    value: {
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 16,
        padding: 5,
        paddingHorizontal: 10,
        borderColor: "rgba(0,0,0,0.4)",
    },
    button: {
        borderRadius: 16
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
    problemAction: {
        color: "white",
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: "#FFA500",
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
export default CreateCategory