import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Button, ImageBackground } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import Input from '../inputs'
import SecondaryInput from '../commons/secondaryInput'
import styles from './styles'
import CustomButton from '../CustomButton'


const ReportComponent = () => {
  return (
    <SafeAreaView>
        <Text style={styles.subText}> Got a Problem? Report Now</Text>
        <ImageBackground 
            height={70} 
            width={70} 
            source={require('../../assets/images/Reg4.png')}
            style={[styles.loginImage]}/> 
        <View style={styles.Text}>
            
        <Input
            label='Source'
            icon={<TouchableOpacity >
            <Entypo name = 'location' size={25}></Entypo>
            </TouchableOpacity>}
            iconPosition='right'
            />

        <View>
        <SecondaryInput
        label='Report Problem'
        />
        </View>
        
        <CustomButton primary title='Report'></CustomButton>
        </View>
        
    
    </SafeAreaView>
  )
}

export default ReportComponent