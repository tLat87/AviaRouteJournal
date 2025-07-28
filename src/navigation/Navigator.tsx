import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import FlightPricesScreen from '../screens/FlightPricesScreen.tsx';
import VisitedCountriesScreen from '../screens/VisitedCountriesScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const Navigator = () => {
    useNavigation();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1a1a2e',
                    borderRadius: 30,
                    height: 80,
                    position: 'absolute',
                    marginTop: -10,
                    marginBottom: 10,
                    marginHorizontal: 15,
                    borderColor: '#ff69b4',
                    borderWidth: 2,
                    paddingTop: 10,
                    paddingBottom: 15,
                    shadowColor: '#ff69b4',
                    shadowOffset: { width: 0, height: -5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 15,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#ffe0f0',
                    marginTop: 5,
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/img/Home.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? '#ff69b4' : '#ffe0f0',
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="WorldAirScreen"
                component={FlightPricesScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/img/Airport.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? '#ff69b4' : '#ffe0f0',
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="MatchAeroplanesScreen"
                component={VisitedCountriesScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/img/Game.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? '#ff69b4' : '#ffe0f0',
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/img/Settings.png')}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? '#ff69b4' : '#ffe0f0',
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Navigator;
