import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PrefDetail from '../screens/Home';
import MapScreen from '../screens/MapScreen';
import colors from '../assets/themes/colors';
import { MAP_LIST, USER_DETAIL } from '../context/initialRoutenNames';



const MenuNav =() => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator initialRouteName={MAP_LIST} 
        screenOptions={{ headerTitleAlign: 'center' }}>
            <HomeStack.Screen name={MAP_LIST} component={MapScreen} 
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
            <HomeStack.Screen name={USER_DETAIL} component={PrefDetail}
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
            {/* <HomeStack.Screen name={SETTINGS} component={Setting}
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