import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginUser from '../../pages/User/LoginUser.jsx';

function Login({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('LoginUser')}
            />
        </View>
    );
}

const Stack = createStackNavigator();

function Menu2() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ header: () => null }} component={Login} />
        </Stack.Navigator>
    );
}

export default Menu2;