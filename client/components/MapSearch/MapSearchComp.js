import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import Container from '../commons/Contain'
import Input from '../inputs'
import CustomButton from '../CustomButton'


const MapSearchComp = () => {
  return (
    
    <Container>

        <View style={styles.Current}>

        <Input
        label="Current Location"
        placeholder='Location' />
        </View>

        <View style={styles.Destination}>

        <Input
        label="Destination"
        placeholder='Destination'/>
        </View>
    
        {/* Custom Button OnPress does not work use touchableopacity */}
       <CustomButton primary title='Find Path'/> 

    
        
       

    </Container>
    
  )
}

export default MapSearchComp