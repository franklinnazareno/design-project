import { View, Text, ImageBackground, Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'
import MapContainer from '../commons/mapContainer/Contain'

const AboutusComp = () => {
  return (
    <MapContainer>
        <ImageBackground 
          source={require('../../assets/images/Reg4.png')}
          style={[styles.loginImage]}>
          
          <View style={styles.aboutWrapper}>

          <View style={styles.memberimage}>
          <Image 
          source={require('../../assets/images/bats.png')}
          style={styles.imagesize}/>
          <Text style={styles.namefont}>Kristian John Q. Baturiano </Text>
          </View>

          <View style={styles.memberimage}>
          <Image 
          source={require('../../assets/images/trystan.jpg')}
          style={styles.imagesize}/>
          <Text style={styles.namefont}>Mickel Trystan Dones </Text>
          </View>

          <View style={styles.memberimage}>
          <Image 
          source={require('../../assets/images/Julongbayan.jpg')}
          style={styles.imagesize}/>
          <Text style={styles.namefont}>Dan Angelo A. Julongbayan </Text>
          </View>

          <View style={styles.memberimage}>
          <Image 
          source={require('../../assets/images/frank2.jpg')}
          style={styles.imagesize}/>
          <Text style={styles.namefont}>Franklin T. Nazareno Jr</Text>
          </View>

          </View>

        </ImageBackground>
    </MapContainer>
  )
}

export default AboutusComp