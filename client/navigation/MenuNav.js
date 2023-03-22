import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PreferenceDetails from '../components/PreferenceDetails';


const MenuNav =() => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator initialRouteName={PreferenceDetails} 
        screenOptions={{ headerTitleAlign: 'center' }}>
            <HomeStack.Screen name='YES' component={MapScreen} 
            options={{
            headerStyle: {
            backgroundColor: "green",
            },
            headerTintColor: "white",
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            }}>
        </HomeStack.Screen>
            {/* <HomeStack.Screen name={USER_DETAIL} component={UserPref}
             options={{
                headerStyle: {
                backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                }}>
            </HomeStack.Screen>
            <HomeStack.Screen name={SETTINGS} component={Setting}
            options={{
                headerStyle: {
                backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                }}>
                </HomeStack.Screen> */}
        </HomeStack.Navigator>
    );
};

// screen > home > drawer
// screen > Auth
export default MenuNav;