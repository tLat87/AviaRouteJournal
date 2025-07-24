import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import NewFlightScreen from "./src/screens/NewFlightScreen";
import FlightDetailsScreen from "./src/screens/FlightDetailsScreen";
import MealInfoFullScreen from "./src/screens/MealInfoFullScreen";
import MealManagerScreen from "./src/screens/MealManagerScreen";
import AirportInfoScreen from "./src/screens/AirportInfoScreen";
import MemoryGameScreen from "./src/screens/MemoryGameScreen";
import DeveloperInfoScreen from "./src/screens/DeveloperInfoScreen";

const Stack = createStackNavigator();


export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                    }}>

                        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="NewFlightScreen" component={NewFlightScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="FlightDetailsScreen" component={FlightDetailsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MealInfoFullScreen" component={MealInfoFullScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MealManagerScreen" component={MealManagerScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="AirportInfoScreen" component={AirportInfoScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MemoryGameScreen" component={MemoryGameScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="DeveloperInfoScreen" component={DeveloperInfoScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}
