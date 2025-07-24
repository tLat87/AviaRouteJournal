import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native'; // Keep these imports, even if not directly used in this snippet's final output
import HomeScreen from '../screens/HomeScreen';

import {useNavigation} from '@react-navigation/native';
import MealsScreen from "../screens/MealsScreen";
import WorldAirScreen from "../screens/WorldAirScreen";
import MatchAeroplanesScreen from "../screens/MatchAeroplanesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

// This function determines which icon image to use for each tab
const getTabIcon = (routeName) => {
    switch (routeName) {
        case 'Home':
            return require('../assets/img/Home.png'); // Ensure these paths are correct
        case 'MealsScreen':
            return require('../assets/img/Meal.png');
        case 'WorldAirScreen':
            return require('../assets/img/Airport.png');
        case 'MatchAeroplanesScreen':
            return require('../assets/img/Game.png');
        case 'SettingsScreen':
            return require('../assets/img/Settings.png');
        default:
            return require('../assets/img/Home.png'); // Fallback icon
    }
};

const MainTabNavigator = () => {
    const navigation = useNavigation(); // useNavigation is imported but not used in this component's render logic currently

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Hide the header for individual screens as per your previous setups
                headerShown: false,
                // You had headerTitleStyle here, but headerShown is false, so it won't apply.
                // If you re-enable headers, remember to apply your desired header styles in each screen's options.
                // headerTitleStyle: {
                //     color: '#ffe0f0', // Soft pinkish-white
                //     fontFamily:'Quantico-BoldItalic', // Make sure this font is loaded
                //     fontSize: 40,
                // },
                tabBarStyle: {
                    // Dark purple-blue background for the tab bar
                    backgroundColor: '#1a1a2e',
                    // Rounded corners for the tab bar
                    borderRadius: 30,
                    // Increased height for a more substantial look
                    height: 80,
                    position: 'absolute',
                    // Top margin to lift it slightly from the bottom edge
                    marginTop: -10,
                    marginBottom: 10, // Small bottom margin
                    marginHorizontal: 15, // Horizontal margin to create a "floating" effect
                    // Hot pink border
                    borderColor: '#ff69b4',
                    borderWidth: 2, // Thicker border
                    // Padding inside the tab bar for content spacing
                    paddingTop: 10,
                    paddingBottom: 15, // Increased padding to accommodate icon and label
                    // Shadow for depth on iOS
                    shadowColor: '#ff69b4',
                    shadowOffset: { width: 0, height: -5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    // Elevation for depth on Android
                    elevation: 15,
                },
                tabBarIcon: ({ focused }) => {
                    const iconSource = getTabIcon(route.name);
                    return (
                        <Image
                            source={iconSource}
                            style={{
                                width: 30,
                                height: 30,
                                // Hot pink when focused, soft pinkish-white when not
                                tintColor: focused ? '#ff69b4' : '#ffe0f0',
                            }}
                        />
                    );
                },
                // Style for the text label below the icon (if you decide to show it)
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    // Match the icon colors for labels
                    color: '#ffe0f0',
                    marginTop: 5, // Space between icon and label
                },
                // Style for the individual tab container
                tabBarItemStyle: {
                    justifyContent: 'center', // Center content vertically
                    alignItems: 'center',    // Center content horizontally
                    paddingVertical: 5, // Add some vertical padding for alignment
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '', // Set to 'Home' if you want text below the icon
                }}
            />

            <Tab.Screen
                name="MealsScreen"
                component={MealsScreen}
                options={{
                    tabBarLabel: '', // Set to 'Meals' if you want text below the icon
                }}
            />

            <Tab.Screen
                name="WorldAirScreen"
                component={WorldAirScreen}
                options={{
                    tabBarLabel: '', // Set to 'Airports' if you want text below the icon
                }}
            />

            <Tab.Screen
                name="MatchAeroplanesScreen"
                component={MatchAeroplanesScreen}
                options={{
                    tabBarLabel: '', // Set to 'Game' if you want text below the icon
                }}
            />

            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel: '', // Set to 'Settings' if you want text below the icon
                }}
            />

        </Tab.Navigator>
    );
};

export default MainTabNavigator;
