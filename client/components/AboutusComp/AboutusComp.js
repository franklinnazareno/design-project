import { View, Text, ImageBackground, Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'
import MapContainer from '../commons/mapContainer/Contain'
import Container from '../commons/Container/Contain'

const AboutusComp = () => {

  const members = [
    {
      image: require('../../assets/images/bats.png'),
      name: 'Kristian John Q. Baturiano',
      specialization: 'Data Science',
    },
    {
      image: require('../../assets/images/trystan.jpg'),
      name: 'Mickel Trystan Dones',
      specialization: 'Intelligent Systems',
    },
    {
      image: require('../../assets/images/Julongbayan.jpg'),
      name: 'Dan Angelo A. Julongbayan',
      specialization: 'Data Science',
    },
    {
      image: require('../../assets/images/frank2.jpg'),
      name: 'Franklin T. Nazareno Jr',
      specialization: 'Technopreneurship',
    },
  ];
  
  return (
    <Container>
        <ImageBackground 
          source={require('../../assets/images/Reg4.png')}
          style={[styles.loginImage]}>
          
          <View style={styles.aboutWrapper}>
            <View>
              <Text style={{fontSize:20}}>Pathfinder Developers</Text>
            </View>
            <View style={styles.row}>
              {members.map((member, index) => (
                <View key={index} style={styles.memberimage}>
                <Image 
                source={member.image}
                style={styles.imagesize}/>
                <Text style={styles.namefont}>{member.name}</Text>
                <Text style={styles.namefont2}>{member.specialization}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{alignItems:'center',justifyContent:'flex-end'}}>
                <Text>App Version: 1.3.3</Text>
          </View>
        </ImageBackground>
    </Container>
  )
}

export default AboutusComp