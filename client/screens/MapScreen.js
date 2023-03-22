import { View, Text } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent/MapComponent'
import MapSearchComp from '../components/MapSearch/MapSearchComp'

const MapScreen = () => {
  return (
    <View>
        <View style={{height: 225}}>
           <MapSearchComp>
            
           </MapSearchComp>
        </View>

        <View style={{height: 700}}>
            <MapComponent></MapComponent>
        </View>
        </View>
  )
}

export default MapScreen