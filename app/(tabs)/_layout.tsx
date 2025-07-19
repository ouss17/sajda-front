import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Actus as ActusIcon, Gear, Home, Marker, Media } from '../../assets/Svg/Svg';
import Actus from './actus';
import Categories from './categories';
import Horaires from './horaires';
import Localisation from './localisation';
import Settings from './settings';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        initialRouteName="Horaires"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#04bf94',
          tabBarInactiveTintColor: '#aaa',
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: 5,
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 5,
          },
        }}
      >
        <Tab.Screen
          name="Actus"
          component={Actus}
          options={{
            tabBarLabel: "Actus",
            tabBarIcon: ({ focused }) => (
              <ActusIcon
                stroke={focused ? "#04bf94" : "#aaa"}
                fill="none"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: "Catégories",
            tabBarIcon: ({ focused }) => (
              <Media
                stroke={focused ? "#04bf94" : "#aaa"}
                fill="none"
                fill2={focused ? "#04bf94" : "#aaa"}
                stroke2={focused ? "#04bf94" : "#aaa"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Horaires"
          component={Horaires}
          options={{
            tabBarLabel: "Horaires",
            tabBarIcon: ({ focused }) => (
              <Home stroke={focused ? "#04bf94" : "#aaa"} fill="none" />
            ),
          }}
        />
        <Tab.Screen
          name="Localisation"
          component={Localisation}
          options={{
            tabBarLabel: "Localisation",
            tabBarIcon: ({ focused }) => (
              <Marker stroke={focused ? "#04bf94" : "#aaa"} fill="none" />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Paramètres",
            tabBarIcon: ({ focused }) => (
              <Gear stroke={focused ? "#04bf94" : "#aaa"} fill="none" />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}