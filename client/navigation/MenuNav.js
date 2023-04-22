import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrefDetail from '../screens/Home';
import MapScreen from '../screens/MapScreen';
import colors from '../assets/themes/colors';
import { ABOUT_US, FAQ_DETAIL, MAP_LIST, REPORT_DETAIL, STARTNAV, USER_DETAIL } from '../context/initialRoutenNames';
import ReportScreen from '../screens/ReportScreen';
import StartNavScreen from '../screens/StartNavScreen';
import NewFaqScreen from '../screens/NewFaqScreen';
import AboutusScreen from '../screens/AboutusScreen';

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
                <HomeStack.Screen name={ABOUT_US} component={AboutusScreen}
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

export default MenuNav;