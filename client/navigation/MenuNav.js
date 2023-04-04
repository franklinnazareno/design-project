import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PrefDetail from '../screens/Home';
import MapScreen from '../screens/MapScreen';
import colors from '../assets/themes/colors';
import { FAQ_DETAIL, MAP_LIST, REPORT_DETAIL, STARTNAV, USER_DETAIL } from '../context/initialRoutenNames';
import ReportScreen from '../screens/ReportScreen';
import ReportComponent from '../components/reportComp/reportComponent';
import StartNavScreen from '../screens/StartNavScreen';
import NewFaqScreen from '../screens/NewFaqScreen';





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
            <HomeStack.Screen name={REPORT_DETAIL} component={ReportScreen}
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
                <HomeStack.Screen name={STARTNAV} component={StartNavScreen}
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
                <HomeStack.Screen name={FAQ_DETAIL} component={NewFaqScreen}
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
        </HomeStack.Navigator>
    );
};

// screen > home > drawer
// screen > Auth
export default MenuNav;