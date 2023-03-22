import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from './rootnav';
import { MAP_LIST, USER_DETAIL } from '../../context/initialRoutenNames';
import styles from './styles';
import Container from '../../components/commons/Contain';
import Navbar from '../../components/Navbar';
import { useAuthContext } from '../../hooks/useAuthContext';
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
            // {
            // icons:<MaterialCommunityIcons padding={10} size={25} name="cog"/>,
            // name: 'Settings',
            // onPress: () => {
            //     navigation.navigate(SETTINGS);
            // },
            // },
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