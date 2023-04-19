import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuNav from './MenuNav';
import SideMenu from './SideMenu/SideMenuComp';

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
export default DrawNav;