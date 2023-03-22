import { View, Text } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import BottomNavComp from '../components/BottomSearchNav/BottomMapSearchNav'

const MapScreen = () => {
  return (
    <View>    
        <View style={{height:700}}>          
            <MapComponent></MapComponent>
        </View>
        <View>
          <BottomNavComp></BottomNavComp>
        </View>  
       </View>
  )
}

export default MapScreen