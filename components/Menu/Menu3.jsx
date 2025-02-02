import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
export default Menu2 = () => {
    const navigation2 = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuBox} onPress={navigation2.navigate('Horaires')}>
                <Image
                    style={styles.icon}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4004/4004500.png' }}
                />
                <Text style={styles.info}>Quran</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBox}>
                <Image
                    style={styles.icon}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                />
                <Text style={styles.info}>Create Actus</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBox}>
                <Image
                    style={styles.icon}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                />
                <Text style={styles.info}>Create Category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBox}>
                <Image
                    style={styles.icon}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                />
                <Text style={styles.info}>Create Config</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBox}>
                <Image
                    style={styles.icon}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3658/3658756.png' }}
                />
                <Text style={styles.info}>Create User</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBox}>
                <Image
                    style={styles.icon}
                    source={{ uri: 'https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png' }}
                />
                <Text style={styles.info}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuBox: {
        backgroundColor: '#DCDCDC',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
    },
    icon: {
        width: 60,
        height: 60,
    },
    info: {
        fontSize: 14,
        color: '#696969',
        textAlign: 'center'
    },
})
