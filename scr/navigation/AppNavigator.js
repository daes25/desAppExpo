import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
                <Stack.Screen name="Detail" component={DetailScreen}  options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}