import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAQ_DETAIL, MAP_LIST, REPORT_DETAIL, USER_DETAIL } from '../../context/initialRoutenNames';
import styles from './styles';
import Container from '../../components/commons/Contain';
import { useLogout } from '../../hooks/useLogout';

const SideMenu = ({navigation}) => {
    const { logout } = useLogout()

    const menuItems=[

        {
            icons:<MaterialCommunityIcons  padding={10} size={25} name="map-search"/>,
            name: 'Map',
            onPress: () => {
                navigation.navigate(MAP_LIST);
            },
            },
            {
            icons:<MaterialCommunityIcons padding={10} size={25} name="account-settings"/>,
            name: 'User Preference',
            onPress: () => {
                navigation.navigate(USER_DETAIL);
            },
            },
            {
            icons:<MaterialCommunityIcons padding={10} size={25} name="alert"/>,
            name: 'Report',
            onPress: () => {
                navigation.navigate(REPORT_DETAIL);
            },
            },
            {
                icons:<MaterialCommunityIcons padding={10} size={25} name="information"/>,
                name: 'FAQ',
                onPress: () => {
                    navigation.navigate(FAQ_DETAIL);
                },
            },
            {
            icons:<MaterialCommunityIcons padding={10} size={25} name="logout"/>,
            name: 'Logout',
            onPress: () => {
                    logout();
                },
            },     
    ];
    return (
        <SafeAreaView>
            <Container>
            <ImageBackground
            //resizeMode='contain' 
            height={70} 
            width={70} 
            source={require('../../assets/images/Reg4.png')}
            style={[styles.regImage]}
            > 
            
            <Image
            //resizeMode='contain'  
            height={20} 
            width={20} 
            source={require('../../assets/images/pd-logo2.png')}
            style={[styles.logoImage]}/>
            
            <View>
                {menuItems.map(({ name, icons, onPress,key})=> (
                    <View>
                    <TouchableOpacity onPress={(onPress)}  key={name}  style={styles.items}>
                        <View>{icons}</View>
                        <Text style={styles.itemsText}>{name}</Text>
                    </TouchableOpacity>
                    </View>
                ))}
            </View>
            </ImageBackground>
            </Container>
        </SafeAreaView>
        );
}

export default SideMenu