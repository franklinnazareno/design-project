import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuNav from './MenuNav';
import SideMenu from './SideMenu/sideMenu';


const NavItems=(navigation) => {
    
};

const getDrawerContent = (navigation)=>{
    return (
        <SideMenu navigation={navigation}/>
    );
};
const DrawNav =() => {
    const Drawer = createDrawerNavigator();
    return ( 
        
        <Drawer.Navigator 
        screenOptions={{ headerShown: false }}
        drawerType='Slide'
        drawerContent={({navigation})=>getDrawerContent(navigation)}
        >
            <Drawer.Screen name='Menu' component={MenuNav}></Drawer.Screen>
        </Drawer.Navigator> 
        
    );
};

// screen > home > drawer
// screen > Auth
export default DrawNav;